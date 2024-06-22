import { ClientToServer } from "./interfaces/ClientToServer";
import { Socket } from "socket.io-client";

interface JoinRoomProps {
  socket: Socket<ClientToServer, ClientToServer>;
}

export default function JoinRoom({ socket }: JoinRoomProps) {
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
