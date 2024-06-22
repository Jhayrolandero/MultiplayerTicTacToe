import { ClientToServer } from "./interfaces/ClientToServer";
import { Message } from "./interfaces/Message";

import { Socket, io } from "socket.io-client";
// const socket: Socket<ClientToServer, ClientToServer> = io();
// const socket = io("http://localhost:3001");
import { useEffect, useRef, useState } from "react";

// Components
import Board from "./Board"
import JoinRoom from "./JoinRoom"

export default function App() {
  const [match, setMatch] = useState(false)
  const socket = useRef<Socket<ClientToServer, ClientToServer>>();
  
  useEffect(() => {
    socket.current = io("http://localhost:3001")
    socket.current.on("startMatch", (data : Message) => {
      alert(data.message)
      setMatch(true)
    })
  }, [])

  
  return (
    <main className="bg-[#5119af] h-screen flex flex-col items-center">
    <h1 className=" m-20">
      <span className="text-[5.5rem] font-extrabold mr-2 text-[#4bc3b5] drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,1)]">TIC</span>
      <span className="text-[5.5rem] font-extrabold mr-2 text-[#e0207b] drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,1)]">TAC</span>
      <span className="text-[5.5rem] font-extrabold mr-2 text-[#4bc3b5] drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,1)]">TOE</span>
    </h1>
    <div 
    className="flex justify-center ">
      {match ? (
        <div className="w-1/2 max-w-[800px] aspect-square"><Board/></div>     
      ) : (
        <JoinRoom socket={socket.current!}/>
      )}
    </div>
    </main>
  )
}
