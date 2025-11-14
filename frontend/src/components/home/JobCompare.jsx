import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Loader2, ArrowRight, RefreshCw } from "lucide-react";
import { getData } from "@/context/userContext";

// AiJobCompare.jsx
// Frontend AI comparison page
// - Fetches POST /compare/ai
// - Displays match score, summary, strengths, weaknesses
// - Shows Radar + Bar charts if available

const AiJobCompare = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const {user} = getData();
  const userId = user?._id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Comparing for jobId:", jobId, "userId:", userId);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:8000/compare", { userId, jobId });
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <div className="text-gray-600">Analyzing job & profile — AI doing the heavy lifting...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
            >
              <RefreshCw size={16} /> Retry
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );

  // normalize safe data
  const matchScore = data.matchScore ?? 0;
  const summary = data.fitSummary ?? "No summary provided";
  const strengths = data.strengths ?? [];
  const weaknesses = data.weaknesses ?? [];
  const experienceNote = data.experienceNote ?? "";

  const radar = data.charts?.skillsRadar ?? { labels: [], user: [], job: [] };
  const gap = data.charts?.gapBar ?? { labels: [], values: [] };

  const radarData = radar.labels.map((label, i) => ({
    skill: label,
    user: Number(radar.user[i] ?? 0),
    job: Number(radar.job[i] ?? 0),
  }));

  const gapData = gap.labels.map((label, i) => ({ skill: label, value: Number(gap.values[i] ?? 0) }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">AI Job Comparison</h1>
            <p className="text-gray-600 mt-1">Deep insights & visual breakdown of fit</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow">
                {matchScore}%
              </div>
              <div className="text-sm text-gray-500 mt-2">Match Score</div>
            </div>

            <button
              onClick={() => navigate(`/roadmap/${jobId}`)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
            >
              Continue to Personalized Roadmap
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">AI Summary</h2>
          <p className="text-gray-700">{summary}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border">
              <h3 className="font-semibold text-green-700 mb-2">Top Strengths</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {strengths.length ? strengths.map((s, i) => <li key={i}>{s}</li>) : <li>No strengths detected</li>}
              </ul>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border">
              <h3 className="font-semibold text-red-700 mb-2">Weaknesses / Gaps</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {weaknesses.length ? weaknesses.map((w, i) => <li key={i}>{w}</li>) : <li>No weaknesses detected</li>}
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border">
            <h3 className="font-semibold text-yellow-700">Experience Note</h3>
            <p className="text-gray-700 mt-1">{experienceNote}</p>
          </div>
        </article>

        {/* quick stats */}
        <aside className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
          <div>
            <h4 className="text-sm text-gray-500">Skills matched</h4>
            <div className="text-2xl font-bold mt-1">{(data.skillMatch || []).length}</div>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">Missing skills</h4>
            <div className="text-2xl font-bold mt-1">{(data.missingSkills || []).length}</div>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">Strengths identified</h4>
            <div className="text-2xl font-bold mt-1">{strengths.length}</div>
          </div>

          <button onClick={() => fetch("#")} className="mt-auto text-sm text-gray-500 underline">View raw AI output</button>
        </aside>
      </section>

      {/* charts section */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Skill Fit Radar</h3>

          {radarData.length ? (
            <div style={{ width: "100%", height: 360 }}>
              <ResponsiveContainer>
                <RadarChart data={radarData} outerRadius={120}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <Radar name="You" dataKey="user" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Job" dataKey="job" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-gray-500">No radar data available for this job/profile.</div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Missing Skill Severity</h3>

          {gapData.length ? (
            <div style={{ width: "100%", height: 360 }}>
              <ResponsiveContainer>
                <BarChart data={gapData}>
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="skill" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-gray-500">No gap data available — AI could not quantify missing skills.</div>
          )}
        </div>
      </section>

      {/* footer insights */}
      <section className="mt-8 bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-3">AI Insights & Actionables</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Quick Wins</h4>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {(data.skillMatch || []).slice(0, 3).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
              {!data.skillMatch?.length && <li>No quick wins found</li>}
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">High Priority Gaps</h4>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {(data.missingSkills || []).slice(0, 3).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
              {!data.missingSkills?.length && <li>None identified</li>}
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Communication Note</h4>
            <p className="mt-2 text-gray-700">Use the AI summary when contacting recruiters — shorten it to 2 lines and highlight projects that match required skills.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AiJobCompare;
