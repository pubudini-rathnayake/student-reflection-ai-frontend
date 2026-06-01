import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) return setError("Please fill in all fields.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/register", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-6"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/30 mb-4">
            <p className="text-sm text-purple-900 font-medium">
              🌸 Student Reflection AI
            </p>
          </div>
          <h1 className="text-5xl font-black text-purple-950 mb-2">Join Us</h1>
          <p className="text-purple-700">
            Create your account and start reflecting 🌱
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8 space-y-5">
          <div>
            <label className="block text-purple-900 mb-2 font-medium">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border-2 border-purple-200 bg-pink-50/70 p-4 text-purple-900 placeholder-purple-400 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition"
            />
          </div>

          <div>
            <label className="block text-purple-900 mb-2 font-medium">
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              className="w-full rounded-2xl border-2 border-purple-200 bg-pink-50/70 p-4 text-purple-900 placeholder-purple-400 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 rounded-xl py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "🌸 Create Account"}
          </button>

          <p className="text-center text-purple-700 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-purple-900 hover:underline"
            >
              Sign in here ✨
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
