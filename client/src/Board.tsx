// Hooks
import { useState, useEffect, useContext } from "react";

// Components
import Square from "./Square";
import Score from "./Score";
import { SocketContext } from "./context/socket";

function calculateWinner(squares : string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const socket = useContext(SocketContext);
  const squaresArr = Array(9).fill(null);
  const [player, setPlayer] = useState("x");
  const [squares, setSquares] = useState(squaresArr);
  const [xScore, setXScore] = useState(0);
  const [yScore, setYScore] = useState(0);
  const [round, setRound] = useState(true);
  const [status, setStatus] = useState(`Player: ${player.toUpperCase()}`);
  const [initialMount, setInitialMount] = useState(true);
  const [gameOver, setGameOver] = useState(false); // New state to track if the game is over

  const updateScore = () => {
    socket.emit("update_score", { xScore, yScore });
  };

  const updateBoard = (board: string[]) => {
    socket.emit("update_board", { board });
  };

  const updatePlayer = (playerState: string) => {
    socket.emit("update_player", { player: playerState });
  };

  const updateRound = (roundStatus:boolean) => {
    socket.emit("updateRound", { round: roundStatus });
  };

  function handleClick(idx : number) {
    if (!round || squares[idx] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[idx] = player === "x" ? "X" : "O";
    setSquares(nextSquares);
    updateBoard(nextSquares);

    // Update the player state first
    const nextPlayer = player === "x" ? "o" : "x";
    updatePlayer(nextPlayer);
    setPlayer(nextPlayer);
    setStatus(`Player: ${nextPlayer.toUpperCase()}`);
  }

  // Calculate the score
  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    const currWinner = calculateWinner(squares);
    if (currWinner) {
      if (currWinner === "X") {
        setXScore((prev) => prev + 1);
      } else {
        setYScore((prev) => prev + 1);
      }
      setStatus(`Winner: ${currWinner}`);
      setRound(false);
      updateRound(false);
      setGameOver(true); // Set the game as over
    }

    // if there's no square left but no winner
    if (!squares.includes(null) && !currWinner) {
      setStatus("Draw!");
      setRound(false);
      updateRound(false);
      setGameOver(true); // Set the game as over
    }
  }, [squares]);

  // Sync the scores
  useEffect(() => {
    updateScore();
  }, [xScore, yScore]);

  // Reset the round
  useEffect(() => {
    if (!round) {
      const timer = setTimeout(() => {
        setSquares(Array(9).fill(null));
        setPlayer("x");
        setRound(true);
        updateRound(true);
        setStatus(`Player: X`);
        setGameOver(false); // Reset game over status
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [round]);

  useEffect(() => {
    // sync the scores
    socket.on("receive_update", (data) => {
      setXScore(data.xScore);
      setYScore(data.yScore);
    });

    // Sync the board
    socket.on("receive_updateBoard", (data) => {
      if (!gameOver) {
        setSquares(data.squares);
      }
    });

    // Sync the player turn
    socket.on("receiveUpdatePlayer", (data) => {
      if (!gameOver) {
        setPlayer(data.player);
        setStatus(`Player: ${data.player.toUpperCase()}`);
      }
    });

    // sync the round
    socket.on("receiveUpdateRound", (data) => {
      setRound(data.round);
    });

    return () => {
      socket.off("receive_update");
      socket.off("receive_updateBoard");
      socket.off("receiveUpdatePlayer");
      socket.off("receiveUpdateRound");
    };
  }, [gameOver, socket]);

  return (
    <>
      {status}
      <div className="grid grid-cols-3 grid-rows-3">
        {squares.map((square, idx) => (
          <Square key={idx} value={square} onSquareClick={() => handleClick(idx)} />
        ))}
      </div>
      <div className="flex gap-2">
        <Score player="x" score={xScore} />
        <Score player="o" score={yScore} />
      </div>
    </>
  );
}
