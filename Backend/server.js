import http from 'http'
import app from './app.js'
// import { Server } from 'socket.io';
// import jwt from 'jsonwebtoken'
const PORT=process.env.PORT;
const server=http.createServer(app);
// const io= new Server(server);

// io.use((socket,next)=>{
//     try {
//         let token= socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
//         if(!token){
//             throw new Error("Authentication User");
//         }
//         let decoded= jwt.verify(token,process.env.SECRETE);
//         if(!decoded){
//             throw new Error("Authentication User");
//         }
//         socket.user=decoded
//         next();
//     } catch (error) {
//         next(error);
//     }
// })
// io.on('connection',socket=>{
//     console.log("a user connected");
//     socket.on('event',()=>{});
//     socket.on('disconnect',()=>{});
// })
server.listen(PORT,()=>{
    console.log("LISTENING ON PORT : ",PORT);
})