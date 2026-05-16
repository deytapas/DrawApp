import { WebSocket, WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";
import { JWT_SCRECT } from '@repo/backend-common/config';
import { prismaClient  } from "@repo/db/client";

const wss = new WebSocketServer({ port: 9090 });

const checkUser = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SCRECT);  
    if(typeof decoded == "string") {
      return null;
    }
    if(decoded.userId != undefined || decoded.userId){
      return decoded.userId;
    } else {
      return null
    }
  } catch(e) {
    return null;
  }
}

interface User {
  socket: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

wss.on('connection', function(ws, request) {
  
  const URL = request.url;
  if(!URL){
    return;
  }

  const queryParams = new URLSearchParams(URL.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if(userId == null){
    ws.close();
    return null;
  }

  users.push({
    socket:ws,
    rooms: [],
    userId
  })
  console.log(users);
  
  ws.on('message', async function(data) {

    let parseData;
    if(typeof data != "string") {
      parseData = JSON.parse(data.toString());
    } else {
      parseData = JSON.parse(data);
    }
    
    if(parseData.type == "join_room") {
      const uData = users.find(x => x.socket == ws);
      uData?.rooms.push(parseData.roomId)
      console.log(users);
      
    }

    if(parseData.type == "leave_room") {
      const uData = users.find(x => x.socket === ws);    
      if(!uData) {
        return;
      }
      uData.rooms = uData?.rooms.filter(x => x === parseData.room);    
    }



     if(parseData.type == "chat") {

      await prismaClient.chat.create({
        data: {
          roomId: Number(parseData.roomId),
          message: parseData.message,
          userId

        }
      })
      users.forEach(user => {
        if(user.rooms.includes(parseData.roomId)) {
          user.socket.send(JSON.stringify({
            type:"chat",
            message: parseData.message,
            roomId: parseData.roomId
          }))
        }
      })
    }
  });
});