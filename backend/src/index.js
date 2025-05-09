import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //extract json data from body
app.use(cookieParser()); 

app.get('/', (req,res)=>{
    res.status(200).send("Wassup Nigga!");
});

app.use("/api/v1/auth", authRoutes);


app.listen(PORT, ()=>{
    console.log(`server is running on the port ${PORT}`);
    connectDB();
    
})
