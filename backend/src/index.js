import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.status(200).send("Wassup Nigga!");
});

app.listen(PORT, ()=>{
    console.log(`server is running on the port ${PORT}`);
    
})
