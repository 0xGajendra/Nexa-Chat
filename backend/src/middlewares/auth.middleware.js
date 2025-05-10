import jwt from "jsonwebtoken";
import User from "../models/user.model.js";



export const verifyToken = async (req, res, next)=> {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({success: false, message: "unauthorized - No Token Provided"});
        }
    } catch (error) {
        
    }
}