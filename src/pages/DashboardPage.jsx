import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function DashboardPage() {
  const [reflection, setReflection] = useState("");
  const [mood, setMood] = useState("");
  const [productivity, setProductivity] = useState("");
  const [entries, setEntries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const navigate = useNavigate();

  // Load reflections from backend on mount
  useEffect(() => {
    api
      .get("/api/reflections")
      .then((res) => setEntries(res.data))
      .catch(() => handleLogout())
      .finally(() => setLoadingEntries(false));
  }, []);

  const handleSave = async () => {
    if (!reflection) return;
    setSaving(true);

    try {
      const res = await api.post("/api/reflections", {
        reflection,
        mood,
        productivity,
      });
      setEntries([res.data, ...entries]);
      setReflection("");
      setMood("");
      setProductivity("");
    } catch (err) {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-6"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/30">
              <p className="text-sm text-purple-900 font-medium">
                🌸 AI-Powered Student Wellness
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/40 text-purple-900 text-sm font-medium hover:bg-white/70 transition"
            >
              Sign Out 👋
            </button>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-purple-950 leading-tight mb-6">
            Reflect Your <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Thoughts & Growth
            </span>
          </h1>

          <p className="text-lg md:text-xl text-purple-800 max-w-2xl mx-auto leading-relaxed">
            An anime-inspired reflection platform designed to help students
            track mood, productivity, and personal growth — powered by real AI.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            {
              icon: "😊",
              title: "Mood Tracking",
              desc: "Track your daily emotions and understand patterns over time.",
            },
            {
              icon: "🧠",
              title: "AI Reflection Insights",
              desc: "Get personalized emotional support from Claude AI after every reflection.",
            },
            {
              icon: "📈",
              title: "Productivity Monitoring",
              desc: "Stay aware of habits while balancing your mental wellness.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/50 backdrop-blur-lg border border-white/40 rounded-3xl p-6 shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                {card.title}
              </h3>
              <p className="text-purple-700 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">Total Reflections</p>
            <h2 className="text-3xl font-black text-purple-950">
              {entries.length}
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">Latest Mood</p>
            <h2 className="text-2xl font-bold text-purple-950">
              {entries[0]?.mood || "No Data"}
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">Productivity</p>
            <h2 className="text-xl font-bold text-purple-950">
              {entries[0]?.productivity || "No Data"}
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">Streak</p>
            <h2 className="text-3xl font-black text-purple-950">
              🔥 {entries.length}
            </h2>
          </div>
        </div>

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8 space-y-6 mb-8">
          <div>
            <label className="block text-purple-900 mb-3 text-lg">
              🌸 Today's Reflection
            </label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write about your day..."
              className="w-full h-40 rounded-2xl border-2 border-purple-200 bg-pink-50/70 p-4 text-purple-900 placeholder-purple-400 resize-none outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition"
            />
          </div>

          <div>
            <label className="block text-purple-900 mb-3 text-lg">
              😊 Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full rounded-2xl border-2 border-purple-200 bg-pink-50/70 p-4 text-purple-900 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition"
            >
              <option value="">Select mood...</option>
              <option>😊 Happy</option>
              <option>😌 Calm</option>
              <option>😴 Tired</option>
              <option>😰 Stressed</option>
              <option>💪 Motivated</option>
            </select>
          </div>

          <div>
            <label className="block text-purple-900 mb-3 text-lg">
              ⭐ Productivity
            </label>
            <select
              value={productivity}
              onChange={(e) => setProductivity(e.target.value)}
              className="w-full rounded-2xl border-2 border-purple-200 bg-pink-50/70 p-4 text-purple-900 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition"
            >
              <option value="">Rate productivity...</option>
              <option>⭐⭐⭐⭐⭐ Excellent</option>
              <option>⭐⭐⭐⭐ Good</option>
              <option>⭐⭐⭐ Average</option>
              <option>⭐⭐ Low</option>
              <option>⭐ Very Low</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !reflection}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "🧠 Claude is thinking..." : "✨ Save Reflection ✨"}
          </button>

          {saving && (
            <p className="text-center text-purple-600 text-sm animate-pulse">
              Getting your personalized AI insight from Claude...
            </p>
          )}
        </div>

        {/* Weekly Summary */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-3xl font-black text-purple-950 mb-4">
            📊 Weekly Summary
          </h2>
          <p className="text-purple-800 text-lg leading-relaxed">
            You have written{" "}
            <span className="font-bold text-purple-950">{entries.length}</span>{" "}
            reflections.
          </p>
          <p className="text-purple-800 text-lg leading-relaxed mt-3">
            Latest mood:{" "}
            <span className="font-bold text-purple-950">
              {entries[0]?.mood || "Not yet recorded"}
            </span>
            .
          </p>
          <p className="text-purple-800 text-lg leading-relaxed mt-3">
            {entries.length > 5
              ? "✨ Amazing consistency! Keep reflecting and growing."
              : "🌸 Start building your reflection habit consistently."}
          </p>
        </div>

        {/* Saved Reflections with AI Insights */}
        {loadingEntries ? (
          <p className="text-center text-purple-700 animate-pulse">
            Loading your reflections...
          </p>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/40 hover:scale-[1.01] transition-all duration-300"
              >
                <p className="text-purple-900 mb-3 text-base leading-relaxed">
                  {entry.reflection}
                </p>

                <div className="flex justify-between text-sm text-purple-600 mb-4">
                  <span>{entry.mood}</span>
                  <span>{entry.productivity}</span>
                  <span className="text-purple-400">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                {entry.aiInsight && (
                  <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-4">
                    <p className="text-xs text-purple-500 font-semibold mb-1">
                      🧠 Claude's Insight
                    </p>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      {entry.aiInsight}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8 text-purple-700">
          ✨ Keep growing beautifully ✨
        </div>
      </div>
    </motion.div>
  );
}
