export default function Square({value, onSquareClick} : {value: string, onSquareClick: any}) {
    
return (
    <>
        <button
        onClick={onSquareClick} 
        className="border-2 border-black aspect-square font-bold text-[5rem]">
            {value}
        </button>
    </>
  )
}
