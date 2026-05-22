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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-900 mb-3">
            ✨ Student Reflection AI ✨
          </h1>

          <p className="text-purple-700 text-lg">
            Reflect. Grow. Prevent Burnout.
          </p>
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
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            ✨ Save Reflection ✨
          </button>
        </div>

        {/* Saved Reflections */}

        <div className="mt-8 space-y-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/40"
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
    </div>
  );
}
