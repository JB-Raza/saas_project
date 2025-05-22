import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'

// routes
import userRoutes from './routes/userAuth.routes.js'
import adminRoutes from './routes/adminUser.routes.js'
import blogRoutes from './routes/blog.routes.js'

dotenv.config();

const app = express();

app.use(cors())

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



// routes

app.use("/api/user/auth", userRoutes)
app.use("/api/admin/auth", adminRoutes)
app.use("/api/blogs", blogRoutes)



// final error handler
// app.use((err, req, res) => {
//     console.error("UPLOAD ERROR:", err);
//     res.status(500).json({ success: false, message: err.message });
// });


let PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log("Server is running on ", PORT));
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

