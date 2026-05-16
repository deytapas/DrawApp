import axios from "axios";
import { useRef } from "react"
import { BACKEND_URL, FONTEND_URL } from "../app/config";
import { useRouter } from "next/navigation";

export function CreateRoom() {
    const roomRef = useRef<HTMLInputElement>(null);
    const route = useRouter();
    async function createRoom() {
        const tokenn: any = localStorage.getItem("token");
        try {
            console.log(roomRef);
            //@ts-ignore
            const response = await axios.post(`${BACKEND_URL}/create-room`, {
            name: roomRef.current?.value
            },{
                headers: { 'authorization': tokenn }
            })

            if(response.data.roomId) {
                route.push(`${FONTEND_URL}/canvas/${response.data.roomId}`)
            }
        } catch(e) {
            alert("Something Wrong")
        }
    }
    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
    }}>
        <div style={{
            border:"1px solid white",
            padding:"10px",
            borderRadius:"5px",
            display:"flex",
            flexDirection: "column",
        }}>
            <div style={{
                display:"flex",
                padding: "5px",
                color: "white",
                textAlign: 'center',
                justifyContent: "center"
            }}>
                Create Room
            </div>
           <input ref={roomRef} style={{
            marginBottom: "5px",
            outline: "none",
            borderBottom: "1px solid white"
           }} type="text"  placeholder="Enter Room Name" />
           <div style={{
            display: "flex",
            justifyContent:"center"
           }}>
            <div style={{
                border: "1px solid",
                padding: "5px 10px",
                backgroundColor: "white",
                color: "black",
                cursor:"pointer"
            }}>
                <span onClick={ createRoom }>Create room</span>
            </div>
           </div>
        </div>
    </div>
}