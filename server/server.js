import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// 1. Connect to database immediately
connectDB();

// 2. Dynamic CORS Configuration
const allowedOrigins = [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:5175",
    process.env.FRONTEND_URL // This will be your Vercel URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// 3. Middleware
app.use(express.json());
app.use(cookieParser());

// 4. API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

// 5. Port Configuration for local development
const PORT = process.env.PORT || 4000;

// ONLY start the server if we are NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// 6. CRITICAL: Export for Vercel
export default app;