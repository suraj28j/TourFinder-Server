import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    guest:{
        type:Number,
        require:true
    },
    total:{
        type:Number,
        require:true
    },
    tour:{
        id:{
            type:mongoose.Schema.ObjectId,
            ref:"Tour",
            require:true
        }
    }
})

export default mongoose.model("Booking",BookingSchema);