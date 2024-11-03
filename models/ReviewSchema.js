import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    tour: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "Tour",
            require: true
        }
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