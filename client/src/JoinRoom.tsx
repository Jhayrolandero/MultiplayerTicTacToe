import { useContext } from "react";
import { SocketContext } from "./context/socket";

export default function JoinRoom() {
  const socket = useContext(SocketContext)

  const play = () => {
    socket.emit("quickPlay", { user : "User1"});
  };

  return (
    <div>
      <button
        onClick={play}
        className="text-[1.5rem] font-extrabold mr-2 text-[#4bc3b5]"
      >
        Quick Play
      </button>
    </div>
  );
}
