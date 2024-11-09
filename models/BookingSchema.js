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
    group:{
        type:Number,
        require:true
    }
})

export default mongoose.model("Booking",BookingSchema);