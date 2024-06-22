import { useContext, useEffect, useState } from "react"
import { SocketContext } from "./context/socket";

// Components
import Board from "./Board"
import JoinRoom from "./JoinRoom"

export default function Home() {

    const [match, setMatch] = useState(false)
    const socket = useContext(SocketContext);
    
    useEffect(() => {
        socket.on("startMatch", () => {
            setMatch(true)
        })
    }, [])

    return (
    <div className="flex justify-center ">
    {match ? (
        <div className="w-1/2 max-w-[800px] aspect-square">
            <Board/>
        </div>     
    ) : (
        <JoinRoom />
    )}
    </div>  
    )
}
