// Components
import { useState, useEffect } from "react";
import Square from "./Square";
import Score from "./Score";

function calculateWinner(squares : string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
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
  const [player, setPlayer] = useState('x');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xScore, setXScore] = useState(0);
  const [yScore, setYScore] = useState(0);
  const [round, setRound] = useState(true);
  const [status, setStatus] = useState(`Player: ${player.toUpperCase()}`);

  function handleClick(idx : number) {
    if (!round || squares[idx] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[idx] = player === "x" ? "X" : "O";
    setSquares(nextSquares);

    // Update the player state first
    const nextPlayer = player === "x" ? "o" : "x";
    setPlayer(nextPlayer);
    setStatus(`Player: ${nextPlayer.toUpperCase()}`);
  }

  // Calculate the score
  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      if (winner === "X") {
        setXScore((prev) => prev + 1);
      } else {
        setYScore((prev) => prev + 1);
      }
      setStatus(`Winner: ${winner}`);
      setRound(false);
    }

    // if there's no square left but no winner
    if (!squares.includes(null) && !winner) {
      setStatus("Draw!");
      setRound(false);
    }
  }, [squares]);

  // Reset the round
  useEffect(() => {
    if (!round) {
      const timer = setTimeout(() => {
        setSquares(Array(9).fill(null));
        setPlayer('x');
        setRound(true);
        setStatus(`Player: X`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [round]);

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
