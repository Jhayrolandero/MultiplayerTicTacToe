// Components
import { useState } from "react"
import Square from "./Square"


export default function Board() {
const [player, setPlayer] = useState('x')
const [squares, setSquares] = useState(Array(9).fill(null))


function handleClick(idx : number) {
    const nextSquares = squares.slice();

    nextSquares[idx] === null ? nextSquares[idx] = player === "x" ? "X" : "O" : nextSquares[idx] 
    setPlayer(player === "x" ? "o" : "x");
    setSquares(nextSquares);
  }
  return (
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
  )
}
