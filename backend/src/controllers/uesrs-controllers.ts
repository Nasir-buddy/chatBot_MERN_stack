import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash } from 'bcrypt'
export const getALLUsers = async (req: Request, res: Response, next: NextFunction) => {
    // get all users from database
    try {
        const users = await User.find();
        return res.status(201).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    // user signup
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        return res.status(200).json({ message: "OK", id:user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}