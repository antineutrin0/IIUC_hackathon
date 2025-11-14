// src/pages/RoadmapDashboard.jsx
import { useState } from "react";
import Roadmap from "../components/Roadmap/Roadmap";
import { fetchRoadmap } from "@/api/roadmapApi";


export default function RoadmapDashboard() {
  const [userId, setUserId] = useState("");
  const [jobId, setJobId] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadRoadmap() {
    console.log("Loading roadmap for userId:", userId, "jobId:", jobId);
    setLoading(true);
    try {
      const data = await fetchRoadmap(userId, jobId);
      console.log("Roadmap data:", data);
      setRoadmap(data);
    } catch (err) {
      console.error(err);
      alert("Could not load roadmap.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold text-green-700 text-center">
          Roadmap Generator Dashboard
        </h1>

        <div className="p-6 bg-white rounded-xl shadow space-y-4">
          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Enter Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          />

          <button
            onClick={loadRoadmap}
            className="bg-green-600 text-white px-6 py-3 w-full rounded-lg hover:bg-green-700"
          >
            {loading ? "Loading..." : "Generate Roadmap"}
          </button>
        </div>

        {roadmap && (
          <div className="mt-10">
            <Roadmap roadmap={roadmap} />
          </div>
        )}

      </div>
    </div>
  );
}
