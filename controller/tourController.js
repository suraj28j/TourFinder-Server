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

export const getAllTour = async(req,res,next) => {
    try {
        const tours = await Tour.find({});
        res.status(200).json({success:true,message:"Tours found successfully",data:tours})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const getSingleTour = async(req,res,next) => {
    const tourId = req.params.id
    try {
        let tour = await Tour.findById(tourId);
        if(!tour){
            return res.status(404).json({success:false,message:"Tour not found"});
        }
         res.status(200).json({success:true,message:"Tour Found Successfully",data:tour});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}