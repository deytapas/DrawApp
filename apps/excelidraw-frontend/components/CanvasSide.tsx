import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react"
import { IconButton } from "./IconButton"
import { useEffect, useRef, useState } from "react"
import { Game } from "@/draw/Game"

export type tool = "pencil" | "rect" | "circle"

export function CanvasSide({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<tool>("rect");
    const [game, setGame] = useState<Game>();

    useEffect(() => {
        console.log(game);

        game?.setTool(selectedTool);
    }, [selectedTool, game])

    useEffect(() => {
        if (canvasRef.current) {
            const game = new Game(canvasRef.current, roomId, socket)
            setGame(game);
            game.setTool(selectedTool);

            return () => {
                game.destroy();
            }
        }
    }, [canvasRef])
    return <div className="bg-black">
        <canvas ref={canvasRef} height={window.innerHeight} width={window.innerWidth} />
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
}

function Topbar({ selectedTool, setSelectedTool }: {
    selectedTool: tool,
    setSelectedTool: (s: tool) => void
}) {
    return <div className="fixed top-5 left-5">
        <div className="flex gap-5">
            <IconButton icon={<Pencil />} onclick={() => { setSelectedTool("pencil") }} activated={selectedTool === "pencil"} />
            <IconButton icon={<RectangleHorizontalIcon />} onclick={() => { setSelectedTool("rect") }} activated={selectedTool === "rect"} />
            <IconButton icon={<Circle />} onclick={() => { setSelectedTool("circle") }} activated={selectedTool === "circle"} />
        </div>
    </div>
}