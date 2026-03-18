import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
connectDB();

// 🛡️ CRITICAL: Updated CORS Configuration
const allowedOrigins = [
    'http://localhost:5173', // Local Development
    'https://auth-app.vercel.app' // Replace with your ACTUAL main Vercel domain
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl) 
        // OR origins that contain 'vercel.app'
        if (!origin || origin.includes('vercel.app') || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true 
}));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Test Route
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend API is reached successfully!" });
});

export default app;