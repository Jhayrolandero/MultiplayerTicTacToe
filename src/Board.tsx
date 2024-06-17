// Components
import { useState } from "react"
import Square from "./Square"

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
const [player, setPlayer] = useState('x')
const [squares, setSquares] = useState(Array(9).fill(null))


function handleClick(idx : number) {

  if(calculateWinner(squares)) return
  const nextSquares = squares.slice();
  nextSquares[idx] === null ? nextSquares[idx] = player === "x" ? "X" : "O" : nextSquares[idx] 
  setPlayer(player === "x" ? "o" : "x");
  setSquares(nextSquares);
}

let status = calculateWinner(squares) !== null ? `Winner: ${calculateWinner(squares)}` : `Player: ${player}`

  return (
    <>
    {status}
    <div className="grid grid-cols-3 grid-rows-3">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
  )
}
