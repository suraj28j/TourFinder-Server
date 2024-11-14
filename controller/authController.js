import User from "../models/UserSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '3d' }
    )
}

export const registerUser = async (req, res, next) => {
    // console.log(req.body);
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashPassword,
            role
        })
        await user.save();
        res.status(200).json({ success: true, message: "User registration successful" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const loginUser = async (req, res, next) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not exists" })
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Failed to login" });
        }

        const token = generateToken(user)

        const { password, role, ...rest } = user._doc;

        res.status(200).json({ success: true, message: "User Login successfully", token, data: { ...rest },role:role })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

