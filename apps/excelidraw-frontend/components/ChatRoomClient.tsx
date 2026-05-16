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
    return <div className="h-full w-full min-h-max" style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        backgroundColor: "black"
    }}>
        <div className="h-full text-white m-10 overflow-auto" style={{
            // height: "200px",
            border: "1px solid white",
            padding: "15px",
            // width: "300px",
        }}>
            {chats.map(m => <div>{m.message}</div>)}


        </div>
        <div className="m-10">
            <input className="border-b-2 outline-none text-white mr-5" type="text" placeholder="Enter message" onChange={(e)=>{
                setCurrentMessage(e.target.value)
            }} />
            <button className="border-2 px-5 rounded-2xl py-1 text-white" onClick={()=>{
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