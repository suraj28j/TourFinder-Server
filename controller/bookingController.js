import Booking from "../models/BookingSchema.js";

export const createBooking = async (req, res) => {
    // console.log(req.body);
    const { name, phone, date, guest } = req.body;
    try {
        const bookingTour = new Booking({
            name,
            phone,
            date,
            guest
        })
        await bookingTour.save();
        res.status(200).json({ success: true, message: "Your tour is booked successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}