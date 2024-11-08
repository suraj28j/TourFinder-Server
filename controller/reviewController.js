import Review from "../models/ReviewSchema.js";
import Tour from "../models/TourSchema.js";

export const createReview = async (req, res, next) => {
    const { rating, comment, id: tourId, user } = req.body
    try {
        let review = new Review({
            rating,
            comment,
            tour: {
                id: tourId
            },
            user: {
                id: user._id,
                name: user.name
            }
        })
        await review.save()

        await Tour.findByIdAndUpdate(
            tourId, { $push: { reviews:rating } }, { new: true }
        )
        res.status(200).json({ success: true, message: "Review added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getReview = async (req, res, next) => {
    const tourId = req.params.id

    try {
        const allReview = await Review.find({});
        const tourReview = allReview.filter((item) => {
            return item.tour.id.toString() === tourId;
        })
        // console.log(tourReview);

        res.status(200).json({ success: true, message: "Fetch all review successfully", data: tourReview })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}