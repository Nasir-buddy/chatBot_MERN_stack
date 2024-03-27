import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash, compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
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

        // create token and store cookie 
        // clearing the cookie 
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: "/",
        });
        // token will create after sussessfull login
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { 
            path: '/',
            domain: 'localhost', 
            expires, 
            httpOnly: true , 
            signed: true 
        });

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
        // clearing the cookie 
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: "/",
        });
        // token will create after sussessfull login
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { 
            path: '/',
            domain: 'localhost', 
            expires, 
            httpOnly: true , 
            signed: true 
        });

        return res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}