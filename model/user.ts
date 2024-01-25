// import { Hash } from "crypto";
import mongoose from "mongoose";



interface UserInterface {
  email: string;
  password?:string;
  salt?: string;
  name: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
  
    password: {
        type: String,
        required: true,
    },

    salt: {
        type: String,
        required: true,
    },

    name: {
        type: String
    },

    role: {
        type: String,
        default: 'user',
    }
})


export default mongoose.model<UserInterface & mongoose.Document>('Demo', userSchema)
