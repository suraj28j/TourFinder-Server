import Tour from "../models/TourSchema.js";

export const createTour = async (req, res, next) => {
    // console.log(req.body);
    const { title, city, address, distance, price, maxGroupSize, desc, reviews, photo, featured } = req.body

    try {
        let tour = new Tour({
            title, city, address, distance, price, maxGroupSize, desc, reviews, photo, featured
        })
        await tour.save();
        res.status(200).json({ success: true, message: "Tour Data Added Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}