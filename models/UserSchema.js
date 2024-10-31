import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }, 
    role:{
        type:String,
        enum:["user","admin","manager"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model('User', UserSchema);