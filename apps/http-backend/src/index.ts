import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SCRECT } from "@repo/backend-common/config"
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SigninSchema  } from "@repo/common/types"
import { prismaClient  } from "@repo/db/client";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())

app.post("/signup" , async (req,res) => {
    console.log(req.body);
    
    const verify = CreateUserSchema.safeParse(req.body);
    console.log(verify);
    
    if(!verify.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: verify.data?.username,
                password: verify.data.password,
                name: verify.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            "message" : "User Already exists with this username"
        });
    }
})

app.post("/signin" ,async (req,res) => {
    
    const verify = SigninSchema.safeParse(req.body);
    if(!verify.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: verify.data.username,
            password: verify.data.password
        }
    })

    if(!user) {
        res.status(403).json({
            "message": "Not Authorized"
        })
        return;
    }
    const token = jwt.sign({
        userId: user?.id
    }, JWT_SCRECT)

    res.json({
        token
    })
})

app.post("/create-room", middleware, async (req,res) => {
    
    const verify = CreateRoomSchema.safeParse(req.body);
    if(!verify.success) {
        res.json({
            "message": "Incorrct input"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId;
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: verify.data?.name,
                adminId: userId
            }
        })
        res.json({
            "roomId": room.id
        })
    } catch(e) {
        res.status(411).json({
            "message": "Room already exists with this name"
        })
    }
})

app.get("/chat/:roomId", async (req,res) => {
    const roomId = Number(req.params.roomId);
    try {
        const chats = await prismaClient.chat.findMany({
            where:{
                roomId: roomId
            },
            orderBy:{
                id:"desc"
            },
            take:100
        })
        res.json({
            "chats": chats
        })
    } catch(e) {
        res.json(
            {
                "message": []
            }
        )
    }
})

app.get("/room/:slug", async (req,res) => {
    const slug = req.params.slug;
    try{
        const result = await prismaClient.room.findFirst({
            where : {
                slug
            }
        })
        res.json({
            roomId: result?.id
        })
    } catch(e) {
        res.json({
            message: "Something wrong"
        })
    }
})

app.get("/user/details", middleware , async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    try{
        const UserData = await prismaClient.user.findFirst({
            where:{
                id: userId
            }
        })

        if(UserData) {
            res.json({
                user: UserData
            })
        } else {
            res.json({
                message: "User Not Found"
            })
        }
    } catch(e) {
        console.log(e);
        
         res.json({
            message: "Something wrong"
         })
    }
})

app.listen(3001);