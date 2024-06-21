import { io } from "socket.io-client";
const socket = io("http://localhost:3001");


import { useState } from "react"

export default function JoinRoom() {
  const [link, setLink] = useState('')

  const play = () => {
    socket.emit("joinRoom")
  }

  return (
    <div>
      {/* <h4 className="text-[1.5rem] font-extrabold mr-2 text-[#4bc3b5] ">Join a Room</h4> */}
      {/* <form action=""></form> */}
      {/* <input type="text" onChange={search} className="border-2 border-black w-[240px]"/> */}
      <button 
      onClick={play}
      className="text-[1.5rem] font-extrabold mr-2 text-[#4bc3b5]">Play</button>
    </div>
  )
}
