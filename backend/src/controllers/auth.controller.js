import cloudinary from "../config/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "Email already exists "});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        if(newUser){
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            })
        }
        else{
            res.status(400).json({ message: "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message : "Internal Server Error"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({ success: false, message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        })
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {maxAge : 0});
        res.status(200).json({success: true, message: "Logget out successfully "});
    } catch (error) { 
        console.log("Error in the logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePicture} = req.body;
        const userId = req.user._id; //this is possible becuase of verifyToken middleware
        console.log("Pic aya");
        
        
        if(!profilePicture){
            console.log("pic ni aya");
            
            return res.status(400).json({message: "Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture: uploadResponse.secure_url},{new: true}) //new:true returns the updated User not the old one(by default)
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in update profile", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error"}); 
    }
}