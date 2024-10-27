import User from "../models/UserSchema.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res, next) => {
    // console.log(req.body);
    const { name, email, password } = req.body;

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
            password: hashPassword
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
        let user = await User.findById(email);
        if (!user) {
            return res.status(400).json({ success: false, message: "Email not exists" })
        }
        const isPasswordMatch = await bcrypt.compare(req.body, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Incorrect Password" });
        }
        res.status(200).json({ success: true, message: "User Login successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

