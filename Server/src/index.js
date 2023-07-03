import { Socket } from "dgram";
import {creatServer} from "http";
import {Server} from "socket.io"

const httpServer = creatServer();
const io = new Server (httpServer,{
    cors:{

        origin:"http://localhost:3000",
        methods:["Get","Post"],
    }
});

io.on("Connection",async(Socket)=>{
    // socket events
});


console.log("listnening to port ...");
httpServer.listen(process.env.PORT || 4000)