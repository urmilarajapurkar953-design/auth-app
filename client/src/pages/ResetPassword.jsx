import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const navigate = useNavigate();
  const { backendURL } = useContext(AppContext);

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // STEP 1 → Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.post(
        `${backendURL}/api/auth/send-reset-otp`,
        { email }
      );

      if (data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // STEP 2 → Verify OTP
  const verifyOtp = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Enter valid 6 digit OTP");
      return;
    }

    setStep(3);
  };

  // STEP 3 → Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      const { data } = await axios.post(
        `${backendURL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200">

      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (

          <form onSubmit={sendOtp} className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md outline-none"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Send OTP
            </button>

          </form>

        )}

        {/* STEP 2 */}
        {step === 2 && (

          <form onSubmit={verifyOtp} className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Enter 6 digit OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded-md outline-none"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Verify OTP
            </button>

          </form>

        )}

        {/* STEP 3 */}
        {step === 3 && (

          <form onSubmit={resetPassword} className="flex flex-col gap-4">

            {/* New Password */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 rounded-md outline-none w-full"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500"
              >
                👁
              </span>

            </div>

            {/* Confirm Password */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded-md outline-none"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Reset Password
            </button>

          </form>

        )}

      </div>

    </div>
  );
};

export default ResetPassword;