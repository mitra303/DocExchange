// src/pages/ResetPassword.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import docImg from "../assets/doc_share.jpeg";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>(); // ✅ FIX
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleReset = async () => {
  if (!password || !confirmPassword) {
    toast.error("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setLoading(true);
        const url = `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`;

    //console.log("FINAL URL:", url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    toast.success(data.message || "Password updated successfully");

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (err: any) {
    toast.error(err.message || "Reset failed ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#cfcbe8] to-[#b8b3d9] p-6">
      
      {/* MAIN CARD */}
      <div className="flex w-full max-w-6xl md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white">

        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 py-12">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Reset Password
          </h2>

          <p className="text-gray-500 text-center mb-10">
            Enter your new password below.
          </p>

          <div className="space-y-6">

            {/* New Password */}
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-purple-400">
              <span className="mr-3 text-gray-400"></span>
              <input
                type="password"
                placeholder="New Password"
                className="bg-transparent outline-none w-full text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-purple-400">
              <span className="mr-3 text-gray-400"></span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent outline-none w-full text-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 text-lg rounded-xl shadow-md hover:scale-105 transition"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Make sure your password is strong and secure.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 items-center justify-center relative">

          <div className="w-[380px] h-[460px] bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-xl border border-white/20">
            <img
              src={docImg}
              alt="doc"
              className="h-[85%] object-contain"
            />
          </div>

          <div className="absolute left-10 top-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
            ✨
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;