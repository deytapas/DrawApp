
"use client"

import { WS_URL } from "@/app/config";
import { useEffect, useState } from "react"
import { CanvasSide } from "./CanvasSide";


export default function RoomCanvas({ roomId }: {
    roomId: string
}) {
    const [socket, setSocket] = useState<WebSocket | null>();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const ws = new WebSocket(`${WS_URL}?token=${token}`);
        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId: roomId
            })
            ws.send(data);
        }
    },[])

    if (!socket) {
        return <div>
            Connecting to the server.................
        </div>
    }

    return  <CanvasSide roomId={roomId} socket={socket} />
}