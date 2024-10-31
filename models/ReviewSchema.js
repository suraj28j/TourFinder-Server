import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    review: {
        type: Number,
        require: true
    },
    user: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            require: true
        },
        name: {
            type: String,
            require: true
        }
    }

})

export default mongoose.model("Review", ReviewSchema);