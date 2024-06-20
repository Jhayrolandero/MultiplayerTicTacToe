import { io } from "socket.io-client";
const socket = io("http://localhost:3001")

export default function JoinRoom() {
  return (
    <div>JoinRoom</div>
  )
}
