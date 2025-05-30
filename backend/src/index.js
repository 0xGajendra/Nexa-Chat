import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors"
import bodyParser from "body-parser";
import {app, server} from "./lib/socket.js"

dotenv.config();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}
));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json()); //extract json data from body
app.use(cookieParser()); //to grab the token from the cookie

app.get('/', (req,res)=>{
    res.status(200).send("Wassup Nigga!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);

server.listen(PORT, ()=>{
    console.log(`server is running on the port ${PORT}`);
    connectDB();
    
})
