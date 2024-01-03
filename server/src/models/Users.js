import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true },
    verified: {
        type: Boolean, 
        default: false
    },
    verificationToken: String,

});

export const UserModel = mongoose.model("users", UserSchema);