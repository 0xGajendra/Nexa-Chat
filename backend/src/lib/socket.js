import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const userSocketMap = {}; //{userId: socketId}

const io = new Server(server, {
    cors:{
        origin: process.env.FRONTEND_URL,
    }
});

export const getReceiverSocketId = (userId)=>{
    try {   
        return userSocketMap[userId]; 
    } catch (error) {
        console.log("Error in getReceiverSocketId", error.message); 
    }
}

//used to store online users

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if(userId) userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("A user disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {io, app, server};