import { useContext } from "react";
import { SocketContext } from "./context/socket";

export default function JoinRoom() {
  const socket = useContext(SocketContext)

  const play = () => {
    socket.emit("joinRoom");
  };

  return (
    <div>
      <button
        onClick={play}
        className="text-[1.5rem] font-extrabold mr-2 text-[#4bc3b5]"
      >
        Play
      </button>
    </div>
  );
}
