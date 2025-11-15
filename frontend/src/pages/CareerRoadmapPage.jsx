// FINAL Combined Screen + Print Optimized Career Roadmap Component
// Beautiful Screen UI + Absolutely Reliable Print Layout

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle2,
  BookOpen,
  Rocket,
  Brain,
  LineChart,
} from "lucide-react";

export default function CareerRoadmapPage() {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const [searchParams] = useSearchParams();
  const targetJob = searchParams.get("targetJob");
  const timeframe = searchParams.get("timeframe");
  const token = localStorage.getItem("accessToken");

  const fetchRoadmap = async () => {
    if (!targetJob || !timeframe) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/career-roadmap/",
        { targetJob, timeframe },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRoadmap(res.data);
    } catch (err) {
      console.error("Failed to fetch roadmap:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoadmap();
  }, [targetJob, timeframe]);

  if (!targetJob || !timeframe) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 text-xl">
        Missing roadmap parameters. Please go back and create a roadmap.
      </div>
    );
  }

  if (loading || !roadmap) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 mb-3" />
        <p className="text-gray-500">Generating your roadmap...</p>
      </div>
    );
  }

  const skillData = roadmap.overview.skillsToDevelop.map((s) => ({
    name: s,
    level: Math.floor(Math.random() * 50) + 50,
  }));

  return (
    <>
      {/* PRINT CSS */}
      <style>{`
        @media print {
          body { background: white; }
          .screen-only { display: none !important; }
          .print-only { display: block !important; }
        }
        @media screen {
          .print-only { display: none; }
        }
      `}</style>

      {/* ------------------------- SCREEN VERSION (Beautiful Modern UI) --------------------------- */}

      <div className="screen-only p-6 max-w-5xl mx-auto space-y-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-green-700 flex items-center gap-2">
            <Brain className="w-8 h-8" /> Career Roadmap →{" "}
            <span className="text-blue-600">{roadmap.jobTitle}</span>
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Total Duration: {roadmap.totalDurationWeeks} weeks
          </p>
        </motion.div>

        {/* Overview */}
        <Card className="border-l-4 border-green-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 text-lg">
            <p>{roadmap.overview.summary}</p>

            <div>
              <h3 className="font-semibold text-blue-700">Technologies to Learn</h3>
              <ul className="list-disc pl-6">
                {roadmap.overview.technologiesToLearn.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Prerequisites</h3>
              <ul className="list-disc pl-6">
                {roadmap.overview.prerequisites.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Skill Chart */}
        <Card className="shadow-xl border-l-4 border-blue-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <LineChart className="w-5 h-5" /> Skill Development Chart
            </CardTitle>
          </CardHeader>

          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="level" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Phases */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-green-700">Roadmap Phases</h2>

          {roadmap.phases.map((phase, idx) => (
            <motion.div
              key={phase.phaseNumber}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-l-4 border-red-400 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-red-600">
                    Phase {phase.phaseNumber}: {phase.title}
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                  </CardTitle>
                  <p className="text-gray-500">
                    Week {phase.startWeek} → Week {phase.endWeek}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-blue-700">Topics</h3>
                    <ul className="list-disc pl-6">
                      {phase.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-700">Technologies</h3>
                    <ul className="list-disc pl-6">
                      {phase.technologies.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-700">Project Ideas</h3>
                    <ul className="list-disc pl-6">
                      {phase.projectIdeas.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    <strong className="text-green-700">Expected Outcome:</strong>{" "}
                    {phase.expectedOutcome}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Application Guidance */}
        <Card className="border-l-4 border-purple-400 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-700 flex items-center gap-2">
              <Rocket className="w-5 h-5" /> Application Guidance
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p>
              Start applying from week:{" "}
              <strong className="text-purple-700">
                {roadmap.applicationGuidance.recommendedStartWeek}
              </strong>
            </p>

            <div>
              <h3 className="font-semibold text-blue-700">What to Have Ready</h3>
              <ul className="list-disc pl-6">
                {roadmap.applicationGuidance.whatToHaveReady.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">How to Apply</h3>
              <ul className="list-disc pl-6">
                {roadmap.applicationGuidance.howToApply.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Extra Recommendations */}
        <Card className="border-l-4 border-yellow-400 shadow-lg">
          <CardHeader>
            <CardTitle className="text-yellow-600">Extra Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-700">Learning Resources</h3>
              <ul className="list-disc pl-6">
                {roadmap.extraRecommendations.learningResources.map((r, idx) => (
                  <li key={idx}>
                    {r.title} ({r.type}) – {r.platform}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Common Mistakes</h3>
              <ul className="list-disc pl-6">
                {roadmap.extraRecommendations.commonMistakes.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <p className="italic text-green-700">
              "{roadmap.extraRecommendations.motivation}"
            </p>
          </CardContent>
        </Card>

        {/* PRINT BUTTON */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Download Roadmap as PDF
          </Button>
        </div>
      </div>

      {/* ------------------------- PRINT VERSION (Minimal, Error-Free) --------------------------- */}

      <div className="print-only p-6 text-black max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Career Roadmap → {roadmap.jobTitle}
        </h1>
        <p className="mb-6">Total Duration: {roadmap.totalDurationWeeks} weeks</p>

        <h2 className="text-xl font-bold">Overview</h2>
        <p>{roadmap.overview.summary}</p>

        <h3 className="font-semibold mt-4">Technologies to Learn</h3>
        <ul>
          {roadmap.overview.technologiesToLearn.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <h3 className="font-semibold mt-4">Prerequisites</h3>
        <ul>
          {roadmap.overview.prerequisites.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-8">Phases</h2>

        {roadmap.phases.map((phase) => (
          <div key={phase.phaseNumber} className="mt-4">
            <h3 className="font-semibold">
              Phase {phase.phaseNumber}: {phase.title}
            </h3>
            <p>
              Week {phase.startWeek} → Week {phase.endWeek}
            </p>

            <ul>
              {phase.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <h4 className="font-medium mt-2">Technologies</h4>
            <ul>
              {phase.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <h4 className="font-medium mt-2">Project Ideas</h4>
            <ul>
              {phase.projectIdeas.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <p className="mt-2">
              <strong>Expected Outcome:</strong> {phase.expectedOutcome}
            </p>
          </div>
        ))}

        <h2 className="text-xl font-bold mt-8">Application Guidance</h2>

        <p>
          Recommended start week: {roadmap.applicationGuidance.recommendedStartWeek}
        </p>

        <h3 className="font-semibold mt-4">What to Have Ready</h3>
        <ul>
          {roadmap.applicationGuidance.whatToHaveReady.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <h3 className="font-semibold mt-4">How to Apply</h3>
        <ul>
          {roadmap.applicationGuidance.howToApply.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-8">Extra Recommendations</h2>

        <h3 className="font-semibold mt-2">Learning Resources</h3>
        <ul>
          {roadmap.extraRecommendations.learningResources.map((r, idx) => (
            <li key={idx}>
              {r.title} ({r.type}) – {r.platform}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold mt-2">Common Mistakes</h3>
        <ul>
          {roadmap.extraRecommendations.commonMistakes.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>

        <p className="italic mt-4">
          "{roadmap.extraRecommendations.motivation}"
        </p>
      </div>
    </>
  );
}
