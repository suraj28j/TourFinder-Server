import Booking from "../models/BookingSchema.js";
import Tour from "../models/TourSchema.js";

export const createBooking = async (req, res) => {
    // console.log(req.body);
    const { name, phone, date, guest, id: tourId } = req.body;
    try {
        const tour = await Tour.findById(tourId);
        const total = (tour.price * guest) + 10;
        const bookingTour = new Booking({
            name,
            phone,
            date,
            guest,
            total,
            tour: {
                id: tourId
            }
        })
        await bookingTour.save();
        res.status(200).json({ success: true, message: "Your tour is booked successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        console.log(error);

    }
}