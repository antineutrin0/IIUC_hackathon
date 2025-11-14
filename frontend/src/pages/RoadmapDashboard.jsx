import { useState, useEffect } from "react";
import Roadmap from "../components/Roadmap/Roadmap";
import { fetchRoadmap } from "@/api/roadmapApi";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "@/context/userContext";

export default function RoadmapDashboard() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = getData();
  const userId = user?._id;

  async function loadRoadmap() {
    if (!userId || !jobId) return;

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

  // ✅ Run only when userId or jobId changes
  useEffect(() => {
    loadRoadmap();
  }, [userId, jobId]);

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {roadmap && (
          <div className="mt-10">
            <Roadmap roadmap={roadmap} />
          </div>
        )}
        {loading && <p className="text-center text-green-700">Loading roadmap...</p>}
      </div>
    </div>
  );
}
