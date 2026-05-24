import { motion } from "framer-motion";
import { useState } from "react";

export default function App() {
  const [reflection, setReflection] = useState("");
  const [mood, setMood] = useState("");
  const [productivity, setProductivity] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSave = () => {
    if (!reflection) return;

    const newEntry = {
      reflection,
      mood,
      productivity,
    };

    setEntries([newEntry, ...entries]);

    setReflection("");
    setMood("");
    setProductivity("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-6"
    >
      {/* Background Glow Effects */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}

        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/30 mb-6">
            <p className="text-sm text-purple-900 font-medium">
              🌸 AI-Powered Student Wellness Platform
            </p>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-purple-950 leading-tight mb-6">
            Reflect Your <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Thoughts & Growth
            </span>
          </h1>

          <p className="text-lg md:text-xl text-purple-800 max-w-2xl mx-auto leading-relaxed">
            An anime-inspired reflection platform designed to help students
            track mood, productivity, emotions, and personal growth without
            burnout.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-xl hover:scale-105 transition">
              ✨ Start Reflecting
            </button>

            <button className="px-8 py-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 text-purple-900 font-semibold hover:bg-white/70 transition">
              🎨 Explore Features
            </button>
          </div>
        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}

          <div className="bg-white/50 backdrop-blur-lg border border-white/40 rounded-3xl p-6 shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
            <div className="text-4xl mb-4">😊</div>

            <h3 className="text-xl font-bold text-purple-900 mb-3">
              Mood Tracking
            </h3>

            <p className="text-purple-700 leading-relaxed">
              Track your daily emotions and understand emotional patterns over
              time.
            </p>
          </div>

          {/* Card 2 */}

          <div className="bg-white/50 backdrop-blur-lg border border-white/40 rounded-3xl p-6 shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
            <div className="text-4xl mb-4">🧠</div>

            <h3 className="text-xl font-bold text-purple-900 mb-3">
              AI Reflection Insights
            </h3>

            <p className="text-purple-700 leading-relaxed">
              Analyze reflections and gain AI-powered emotional insights and
              feedback.
            </p>
          </div>

          {/* Card 3 */}

          <div className="bg-white/50 backdrop-blur-lg border border-white/40 rounded-3xl p-6 shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
            <div className="text-4xl mb-4">📈</div>

            <h3 className="text-xl font-bold text-purple-900 mb-3">
              Productivity Monitoring
            </h3>

            <p className="text-purple-700 leading-relaxed">
              Stay aware of productivity habits while balancing mental wellness.
            </p>
          </div>
        </div>

        {/* Main Glass Card */}

        <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8 space-y-6">
          {/* Reflection */}

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

          {/* Mood */}

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

          {/* Productivity */}

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

          {/* Button */}

          <button
            onClick={handleSave}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            ✨ Save Reflection ✨
          </button>
        </div>

        {/* Saved Reflections */}

        <div className="mt-8 space-y-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/40 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-purple-900 mb-3">{entry.reflection}</p>

              <div className="flex justify-between text-sm text-purple-700">
                <span>{entry.mood}</span>

                <span>{entry.productivity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}

        <div className="text-center mt-6 text-purple-700">
          ✨ Keep growing beautifully ✨
        </div>
      </div>
    </motion.div>
  );
}
