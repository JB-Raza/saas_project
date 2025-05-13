import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'

// routes
import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express();

app.use(cors())

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))




// routes
app.use("/auth", authRoutes)


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => console.log("Server is running on 3000"));
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
