// Components
import Board from "./Board"

export default function App() {

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className="w-1/2 max-w-[800px] aspect-square"><Board/></div>
    </main>
  )
}