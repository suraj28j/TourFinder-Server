import User from "../models/UserSchema.js"
import bcrypt from 'bcrypt'

export const updateUser = async (req, res, next) => {
    const id = req.params.id
    const { name, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newData = { name, password:hashPassword };

        await User.findByIdAndUpdate(
            id, { $set: newData }, { new: true }
        )
        res.status(200).json({ success: true, message: "User update successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Update Failed" })
    }

}