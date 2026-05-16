import { tool } from "@/components/CanvasSide";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
export class Game {
    private canvas: HTMLCanvasElement;
    private roomId: string;
    private socket: WebSocket;
    private selectedTool: tool = "circle";
    private existingsShapes: Shape[]
    private startX = 0;
    private startY = 0;
    private clicked: boolean;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.roomId = roomId;
        this.socket = socket
        this.clicked = false;
        this.existingsShapes = [];
        this.init();
        this.ctx = canvas.getContext("2d")!;
        this.initHandler();
        this.initMouseHandler();
    }

    setTool(tool: "pencil" | "rect" | "circle") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingsShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.onMouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.onMouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.onMouseMoverHandler)
    }

    initHandler = () => {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            if(message.type == "chat") {
                const messageParse = JSON.parse(message.message)
                this.existingsShapes.push(messageParse.shape);
                this.clearCanvas();
            }
        }
    }

    onMouseDownHandler = (e: any) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    onMouseUpHandler = (e) => {
        this.clicked = false
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;

        if (selectedTool == "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        } else if (selectedTool == "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                centerX: this.startX + radius,
                centerY: this.startY + radius,
                radius: radius,

            }
        }

        if (!shape) {
            return;
        }

        this.existingsShapes.push(shape);

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({shape}),
            roomId: this.roomId
        }))

    }

    onMouseMoverHandler = (e: any) => {
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearCanvas();
            const selectedTool = this.selectedTool;
            this.ctx.strokeStyle = "rgba(255,255,255)";
            console.log(selectedTool);

            if (selectedTool == "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (selectedTool == "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingsShapes.map((shape) => {
            if (shape.type == "rect") {
                this.ctx.strokeStyle = "rgba(255,255,255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type == "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    }

    initMouseHandler() {
        console.log(this.ctx);
        this.canvas.addEventListener("mousedown", this.onMouseDownHandler);

        this.canvas.addEventListener("mouseup", this.onMouseUpHandler);

        this.canvas.addEventListener("mousemove", this.onMouseMoverHandler);


    }
}