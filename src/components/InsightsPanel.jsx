import { useState } from "react";
import api from "../api/axios";

const buttons = [
  {
    key: "burnout",
    label: "🔥 Burnout Check",
    endpoint: "/api/insights/burnout",
    field: "burnoutWarning",
  },
  {
    key: "suggestions",
    label: "💡 Study Suggestions",
    endpoint: "/api/insights/suggestions",
    field: "suggestions",
  },
  {
    key: "weekly",
    label: "🌟 Weekly Summary",
    endpoint: "/api/insights/weekly-summary",
    field: "weeklySummary",
  },
  {
    key: "productivity",
    label: "📈 Productivity Insight",
    endpoint: "/api/insights/productivity",
    field: "productivityInsight",
  },
];

export default function InsightsPanel() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const fetchInsight = async (key, endpoint, field) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await api.get(endpoint);
      setResults((prev) => ({ ...prev, [key]: res.data[field] }));
    } catch {
      setResults((prev) => ({
        ...prev,
        [key]: "Could not load insight. Try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8 mb-8">
      <h2 className="text-2xl font-black text-purple-950 mb-2">
        🤖 AI Insights Panel
      </h2>
      <p className="text-purple-700 text-sm mb-6">
        Powered by Gemini — click any insight to generate it from your recent
        reflections.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {buttons.map(({ key, label, endpoint, field }) => (
          <button
            key={key}
            onClick={() => fetchInsight(key, endpoint, field)}
            disabled={loading[key]}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-sm font-semibold shadow hover:scale-105 transition-all duration-200 disabled:opacity-60"
          >
            {loading[key] ? "Thinking..." : label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {buttons.map(({ key, label }) =>
          results[key] ? (
            <div
              key={key}
              className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-4"
            >
              <p className="text-xs text-purple-500 font-semibold mb-2">
                {label}
              </p>
              <p className="text-purple-800 text-sm leading-relaxed whitespace-pre-line">
                {results[key]}
              </p>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
