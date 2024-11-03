import Review from "../models/ReviewSchema.js";

export const createReview = async (req, res, next) => {
    // console.log(req.body);

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
        res.status(200).json({ success: true, message: "Review added successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getReview = async (req, res, next) => {
    const id = req.params.id
    try {
        const allReview = await Review.find({});
        res.status(200).json({ success: true, message: "Fetch all review successfully", data: allReview })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }

}