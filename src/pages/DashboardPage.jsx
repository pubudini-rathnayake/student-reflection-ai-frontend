import InsightsPanel from "../components/InsightsPanel";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const sentimentColor = {
  Positive: "bg-green-100 text-green-800",
  Neutral: "bg-gray-100 text-gray-700",
  Negative: "bg-red-100 text-red-800",
};

const emotionEmoji = {
  Joy: "😊",
  Calm: "😌",
  Sadness: "😢",
  Fear: "😰",
  Anger: "😤",
  Stress: "😵",
};

const stressColor = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

export default function DashboardPage() {
  const [reflection, setReflection] = useState("");
  const [mood, setMood] = useState("");
  const [productivity, setProductivity] = useState("");
  const [entries, setEntries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice journaling is not supported in this browser. Please use Chrome.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setReflection(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopVoice = () => {
    recognitionRef?.current?.stop();
    setIsListening(false);
  };

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
    } catch {
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

  // Stats calculations
  const positiveCount = entries.filter(
    (e) => e.sentiment === "Positive",
  ).length;
  const highStressCount = entries.filter(
    (e) => e.stressLevel === "High",
  ).length;
  const dominantEmotion =
    entries.length > 0
      ? Object.entries(
          entries.reduce((acc, e) => {
            if (e.emotion) acc[e.emotion] = (acc[e.emotion] || 0) + 1;
            return acc;
          }, {}),
        ).sort((a, b) => b[1] - a[1])[0]?.[0]
      : null;

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
            An AI-powered reflection platform tracking your mood, emotions,
            stress, and growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">Total Reflections</p>
            <h2 className="text-3xl font-black text-purple-950">
              {entries.length}
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">Positive Days</p>
            <h2 className="text-3xl font-black text-green-700">
              {positiveCount}
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">High Stress Days</p>
            <h2 className="text-3xl font-black text-red-600">
              {highStressCount}
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 shadow-xl border border-white/40">
            <p className="text-purple-700 text-sm mb-2">Top Emotion</p>
            <h2 className="text-2xl font-black text-purple-950">
              {dominantEmotion
                ? `${emotionEmoji[dominantEmotion]} ${dominantEmotion}`
                : "–"}
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
              placeholder="Write about your day, how you felt, what you achieved..."
              className="w-full h-40 rounded-2xl border-2 border-purple-200 bg-pink-50/70 p-4 text-purple-900 placeholder-purple-400 resize-none outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition"
            />
          </div>

          {/* Add this right after the textarea, inside the input card */}
          <div className="flex items-center gap-3">
            <button
              onClick={startVoice}
              disabled={isListening}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                isListening
                  ? "bg-red-100 text-red-700 animate-pulse"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
            >
              🎙️{" "}
              {isListening ? "Listening... (click to stop)" : "Voice Journal"}
            </button>
            {isListening && (
              <button
                onClick={stopVoice}
                className="px-4 py-3 rounded-2xl bg-red-100 text-red-700 text-sm font-semibold hover:bg-red-200 transition"
              >
                ⏹ Stop
              </button>
            )}
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
            {saving ? "🧠 Analyzing your emotions..." : "✨ Save Reflection ✨"}
          </button>

          {saving && (
            <p className="text-center text-purple-600 text-sm animate-pulse">
              Getting AI insight + analyzing sentiment and stress level...
            </p>
          )}
        </div>

        <InsightsPanel />

        {/* Entries */}
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
                <p className="text-purple-900 mb-4 text-base leading-relaxed">
                  {entry.reflection}
                </p>

                {/* Sentiment / Emotion / Stress badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.sentiment && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${sentimentColor[entry.sentiment] || "bg-gray-100 text-gray-700"}`}
                    >
                      {entry.sentiment === "Positive"
                        ? "😊"
                        : entry.sentiment === "Negative"
                          ? "😔"
                          : "😐"}{" "}
                      {entry.sentiment}
                    </span>
                  )}
                  {entry.emotion && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      {emotionEmoji[entry.emotion] || "🎭"} {entry.emotion}
                    </span>
                  )}
                  {entry.stressLevel && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${stressColor[entry.stressLevel] || "bg-gray-100"}`}
                    >
                      ⚡ Stress: {entry.stressLevel}
                    </span>
                  )}
                  {entry.mood && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {entry.mood}
                    </span>
                  )}
                  {entry.productivity && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      {entry.productivity}
                    </span>
                  )}
                  {/* Add inside the badges flex div, after the existing badges */}
                  {entry.detectedLanguage &&
                    entry.detectedLanguage !== "English" && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                        🌍 {entry.detectedLanguage}
                      </span>
                    )}
                </div>

                <p className="text-purple-400 text-xs mb-4">
                  {formatDate(entry.createdAt)}
                </p>

                {entry.aiInsight && (
                  <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-4">
                    <p className="text-xs text-purple-500 font-semibold mb-1">
                      🧠 AI Insight
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
