import express from "express";
import { config } from 'dotenv';
import morgan from "morgan"
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
config();

const app = express();

//middleware 
app.use(cors({ origin:"https://chat-bot-mern-stack-49nj.vercel.app/", credentials: true}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter)

export default app;