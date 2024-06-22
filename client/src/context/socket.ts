import { Socket, io } from "socket.io-client";
import { ClientToServerEvents } from "../interfaces/ClientToServer";
import React from "react";
import { ServerToClientEvents } from "../interfaces/ServerToClient";

export const socket : Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001")
export const SocketContext = React.createContext(socket)