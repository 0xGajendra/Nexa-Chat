import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    }
}, {timestamps: true});


//mongoDB will store "User" in users automatically
const User = mongoose.model("User", userSchema);

export default User;