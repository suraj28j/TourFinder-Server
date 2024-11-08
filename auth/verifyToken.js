import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

export const authenticate = (req, res, next) => {
    const authToken = req.headers.authorization;
    // console.log("Token : ", req.headers.authorization);
    if (!authToken || !authToken.startsWith("Bearer"))
        return res.status(401).json({ success: false, message: "Authorization denied" });

    try {
        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.UserId = decoded.id;
        req.userName = decoded.name;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token Expired" })
        }
        res.status(401).json({ success: false, message: "Invalid token, Please login again" });
    }
}

export const restrict = (roles) => async (req, res, next) => {
    try {
        const userId = req.UserId;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const userRole = user.role;

        if (userRole === "admin" && roles.includes("admin")) {
            next()
        } else {
            res.status(401).json({ success: false, message: "You do not have to access this route" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}