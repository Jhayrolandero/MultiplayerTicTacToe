import { SocketContext, socket } from "./context/socket";

// Components
import Title from "./Title";
import Home from "./Home";

export default function App() {
  return (
    <main className="bg-[#5119af] h-screen flex flex-col items-center">
    <Title />
    <SocketContext.Provider value={socket}>
    <Home />
    </SocketContext.Provider>
    </main>
  )
}
