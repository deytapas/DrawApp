import axios from "axios"
import { BACKEND_URL } from "../app/config"
import ChatRoomClient from "./ChatRoomClient";

async function getChats(id:string) {
    const response = await axios.get(`${BACKEND_URL}/chat/${id}`)
    return response.data.chats;
}

export default async function ChatRoom({roomId}:{
    roomId: string
}) {
    const messages = await getChats(roomId);
    
    return <ChatRoomClient roomid={roomId} messages={messages} />
}