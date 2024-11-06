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

export const getAllTour = async (req, res, next) => {
    try {
        const tours = await Tour.find({});
        res.status(200).json({ success: true, message: "Tours found successfully", data: tours })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getSingleTour = async (req, res, next) => {
    const tourId = req.params.id
    try {
        let tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ success: false, message: "Tour not found" });
        }
        res.status(200).json({ success: true, message: "Tour Found Successfully", data: tour });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const updateTour = async (req, res, next) => {
    const tourId = req.params.id
    try {
        let tour = await Tour.findOne({ _id: tourId })
        // console.log(tour);
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" })
        }
        await Tour.findByIdAndUpdate(
            tourId, { $set: req.body }, { new: true }
        )
        res.status(200).json({ success: true, message: "Tour Update Successfull" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const updateReview = async (req, res, next) => {
    // console.log(req.body);

    const { rating, comment, id: tourId, user } = req.body

    try {
        const tour = await Tour.findById(tourId);

        const totalRating = tour.reviews.reduce((acc,curr)=>{
            return acc+curr.rating
        },0)
        const avgRating = (totalRating+rating)/(tour.reviews.length+1)
        // console.log(avgRating);
        
        let existUserComment = tour.reviews.find((item) => {
            return item.userId === user._id;
        })
        // console.log("ExistUserComment : ", existUserComment);

        if (existUserComment) {
            existUserComment.rating = rating;
            existUserComment.comment = comment;
        } else {
            await Tour.findByIdAndUpdate(
                tourId, { $set: { reviews: [...tour.reviews, { userId: user._id, userName: user.name, rating, comment }],avgRating } }, { new: true }
            )
            // tour.reviews = [...tour.reviews, { userId: user._id, userName: user.name, rating, comment }]
        }
        res.status(200).json({ success: true, message: "Review added successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

