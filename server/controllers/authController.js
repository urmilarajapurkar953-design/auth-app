import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { PASSWORD_RESET_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "../config/emailTemplates.js";


// REGISTER
export const register = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Please provide name, email and password",
    });
  }

  try {

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ FIXED COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,          // 🔥 IMPORTANT (localhost)
      sameSite: "lax",        // 🔥 IMPORTANT
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send welcome email (non-blocking)
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to Our App!",
      html: WELCOME_EMAIL_TEMPLATE(user.name)
    };

    transporter.sendMail(mailOptions).catch(error => {
      console.log("Welcome email failed:", error.message);
    });

    return res.json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// LOGIN
export const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ FIXED COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Logged in successfully"
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// LOGOUT
export const logout = (req, res) => {

  try {

    // ✅ FIXED COOKIE CLEAR
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }

};


// ✅ CHECK AUTH (FIXED)
export const isAuthenticated = async (req, res) => {

  try {

    const token = req.cookies.token;

    if (!token) {
      return res.json({ success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ success: true });

  } catch (error) {
    return res.json({ success: false });
  }

};

// SEND PASSWORD RESET OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      html: PASSWORD_RESET_TEMPLATE(otp)
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP sent to your email" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Email, OTP, and new password are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    res.json({ success: true, message: "Password has been reset successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};