import { Message } from "./Message";

export interface ClientToServer {
    joinRoom: () => any;
    startMatch: (data:Message) => void;
}
  