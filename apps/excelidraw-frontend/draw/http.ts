import { BACKEND_URL } from "@/app/config";
import axios from "axios";

export async function getExistingShapes(roomId:string){
   const response = await axios.get(`${BACKEND_URL}/chat/${roomId}`)
   const chats = response.data.chats;

   const shaps = chats.map((s: {message: string}) => {
        const messageData = JSON.parse(s.message)
        console.log(messageData);
        
        return messageData.shape;
   })
   return shaps;
}