export default function Square({ value, onSquareClick }: { value: string, onSquareClick: any }) {
    const imageSrc = value === 'X' ? '/x.png' : value === 'O' ? '/0.png' : null;
  
    return (
      <>
        <button
          onClick={onSquareClick} 
          className="border-2 border-black aspect-square font-bold flex justify-center items-center"
        >
          {imageSrc ? <img src={imageSrc} alt={value} /> : null}
        </button>
      </>
    )
  }
  