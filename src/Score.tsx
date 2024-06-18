export default function Score({player, score} : {player: string, score : number}) {
  return (
    <p className="text-[1.5rem]">{player} : {score}</p>
  )
}
