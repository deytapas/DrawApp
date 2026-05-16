"use client"

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"

export default function ChatRoomClient({ roomid, messages }: {
    roomid: string,
    messages: { message: string }[]
}) {

    const [chats, setChats] = useState(messages)
    const { socket, loading } = useSocket();
    const [currectMessage, setCurrentMessage] = useState("");
    useEffect(() => {
        if (socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: roomid
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats(c => [...c, {message: parsedData.message}])
                }
            }
        }
    },[socket,loading,roomid])
    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column"
    }}>
        <div style={{
            height: "200px",
            border: "1px solid white",
            padding: "15px",
            width: "300px",
        }}>
            {chats.map(m => <div>{m.message}</div>)}


        </div>
        <div>
            <input type="text" placeholder="Enter message" onChange={(e)=>{
                setCurrentMessage(e.target.value)
            }}/>
            <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type: "chat",
                    roomId: roomid,
                    message: currectMessage
                }))
                setCurrentMessage("");
            }}>Send</button>
        </div>
    </div>
}