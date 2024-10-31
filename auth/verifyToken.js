import jwt from 'jsonwebtoken';
import User from '../models/UserSchema';

export const authenticate = (req, res, next) => {
    const authToken = req.headers.authorization;

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
        res.status(401).json({ success: false, message: "Invalid token, Please login again" })
    }
}

  