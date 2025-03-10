import http from 'http'
import app from './app.js'
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import ProjectModel from './models/projectsmodel.js';
const PORT=process.env.PORT;
const server=http.createServer(app);
const io= new Server(server,{cors: {
        origin: '*'
    }});

io.use(async (socket,next)=>{
    try {
        let token= socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        let projectId= socket.handshake.query.projectId;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            throw new Error("Invalid ProjectId");
        }
        if(!token){
            throw new Error("Authentication User");
        }
        socket.project= await ProjectModel.findById(projectId);
        let decoded= jwt.verify(token,process.env.SECRETE);
        if(!decoded){
            throw new Error("Authentication User");
        }
        socket.user=decoded
        next();
    } catch (error) {
        next(error);
    }
})
io.on('connection',socket=>{
    console.log("a user connected");
    socket.roomId= socket.project._id.toString();
    console.log(socket.roomId);
    socket.join(socket.roomId);
    socket.on('project-message',data=>{
        console.log(data);
        io.to(socket.roomId).emit('project-message',data)
    })
    socket.on('event',()=>{});
    socket.on('disconnect',()=>{});
})
server.listen(PORT,()=>{
    console.log("LISTENING ON PORT : ",PORT);
})