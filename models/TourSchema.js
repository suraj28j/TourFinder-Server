import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
    title:{
        type:String
    },
    city:{
        type:String
    },
    address:{
        type:String
    },
    distance:{
        type:Number
    },
    price:{
        type:String
    },
    maxGroupSize:{
        type:String
    },
    description:{
        type:String
    },
    reviews:{
        type:String
    },
    featured:{
        type:Boolean,
        default:true
    }
})