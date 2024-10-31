import express from 'express';
import dotenv from  'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRouter from './routes/authRoute.js';
import tourRouter from './routes/tourRoute.js';


dotenv.config();

const app = express();

const port =  8000

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection established");
    } catch (error) {
        console.log("DB connection error", error);
    }
}

const coreOptions = {
    origin: true,
    credentials: true
}

app.use(cors(coreOptions))

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/tour",tourRouter)

connectDB()
    .then(() => {
        app.listen(port);
        console.log(`app is listening on port ${port}`);
    })
    .catch((err) => {
        console.log("Error : ",err);
    })