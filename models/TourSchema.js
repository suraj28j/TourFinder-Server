import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    distance: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    maxGroupSize: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    reviews: {
        type: Array,
        require: true
    },
    avgRating:{
        type:Number
    },
    photo: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("Tour", TourSchema);