import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../Components/ChatRoom";

async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.roomId;
}

export default async function chatRoomStart({ params }: {
    params: {
        slug: string
    }
}) {
    const slug = (await params).slug;
    const roomId = await getRoomId(slug);
    return <ChatRoom roomId={roomId} />
}