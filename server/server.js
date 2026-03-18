// ... existing imports ...

// Ensure this matches your vercel.json destination
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Add a test route specifically for checking the live API
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend API is reached successfully!" });
});

// ... existing export default app ...