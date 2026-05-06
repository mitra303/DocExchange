import { useState } from "react";
import { api } from "../services/api";
import docImg from "../assets/doc_share.jpeg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      const { token } = data;

      // ✅ Save token
      localStorage.setItem("token", token);

      // ✅ Decode role
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const role = decoded.role;

      // ✅ Redirect based on role
     if (role === 1) {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }


    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Login failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

const handleForgot = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", { email });

      toast.success(
        res.data?.message || "Reset link sent to your email"
      );

      setEmail("");
      // 🔄 Reload page
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
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

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
            {isForgot ? "Reset Password" : "Welcome to DocExchange"}
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 text-center mb-10">
            {isForgot
              ? "Enter your email and we’ll send you a reset link."
              : "Sign in to continue your document sharing experience."}
          </p>

          {/* INPUTS */}
          <div className="space-y-6">

            {/* Email */}
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-purple-400">
              <span className="mr-3 text-gray-400">📧</span>
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none w-full text-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password (only login) */}
            {!isForgot && (
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-purple-400">
                <span className="mr-3 text-gray-400">🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent outline-none w-full text-lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {/* LINKS */}
            <div className="flex justify-between items-center text-sm">
              {!isForgot ? (
                <>
                  <label className="flex items-center gap-2 text-gray-500">
                    <input type="checkbox" className="accent-purple-500" />
                    Remember me
                  </label>

                  <button
                    onClick={() => setIsForgot(true)}
                    className="text-indigo-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsForgot(false)}
                  className="text-indigo-500 hover:underline w-full text-center"
                >
                  ← Back to Login
                </button>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={isForgot ? handleForgot : handleLogin}
            disabled={loading}
            className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 text-lg rounded-xl shadow-md hover:scale-105 transition"
          >
            {loading
              ? "Please wait..."
              : isForgot
                ? "Send Reset Link"
                : "Login Now"}
          </button>

          {/* Forgot info */}
          {isForgot && (
            <p className="text-xs text-gray-400 text-center mt-4">
              You’ll receive an email with instructions to reset your password.
            </p>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 items-center justify-center relative">

          {/* Glass Card */}
          <div className="w-[380px] h-[460px] bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-xl border border-white/20">
            <img
              src={docImg}
              alt="doc"
              className="h-[85%] object-contain"
            />
          </div>

          {/* Floating icon */}
          <div className="absolute left-10 top-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
            ✨
          </div>
        </div>
      </div>
    </div>
  );
}