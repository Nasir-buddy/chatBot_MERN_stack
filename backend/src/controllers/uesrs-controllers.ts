import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash, compare } from 'bcrypt'
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User already registered" });
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    // user logIn
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({ message: "Incorrect Password" });
        }
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}