import { Socket } from "dgram";
import {creatServer} from "http";
import {Server} from "socket.io"
import { v4 as uuidv4}from"uuid"

const httpServer = creatServer();
const io = new Server (httpServer,{
    cors:{

        origin:"http://localhost:3006",
        methods:["Get","Post"],
    }
});
io.use((socket,next)=>{
    const username=Socket.handshake.auth.username;

    if(!username){
        return next(new Error("Invalid username"));
    }
    socket.username=username;
    socket.userid=uuidv4();

    next()

})

io.on("Connection",async(Socket)=>{
Socket.emit("session",{userid:Socket.userid,username:Socket.username})
});


console.log("listnening to port ...");
httpServer.listen(process.env.PORT || 4000)