import RoomCanvas from "@/components/roomCanvas";


export default async function CanvasPage({ params }:{
    params: { roomId: string }
}){

    const roomid = (await params).roomId;
    return <RoomCanvas roomId={roomid} />
   
}