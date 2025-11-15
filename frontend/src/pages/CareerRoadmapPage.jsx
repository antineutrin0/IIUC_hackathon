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
import { Loader2, CheckCircle2, BookOpen, Rocket } from "lucide-react";

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
      {/* ------------------------- SCREEN VERSION --------------------------- */}
      <div className="screen-only p-6 max-w-5xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold">
            Career Roadmap →{" "}
            <span className="text-blue-600">{roadmap.jobTitle}</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Timeline: {roadmap.totalDurationWeeks} weeks
          </p>
        </motion.div>

        {/* OVERVIEW */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{roadmap.overview.summary}</p>

            <div>
              <h3 className="font-medium">Technologies to Learn</h3>
              <ul className="list-disc pl-6 text-gray-700">
                {roadmap.overview.technologiesToLearn.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Prerequisites</h3>
              <ul className="list-disc pl-6 text-gray-700">
                {roadmap.overview.prerequisites.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* SKILL CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Development Breakdown</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="level" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PHASES */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Roadmap Phases</h2>
          {roadmap.phases.map((phase, index) => (
            <motion.div
              key={phase.phaseNumber}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>
                      Phase {phase.phaseNumber}: {phase.title}
                    </span>
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                  </CardTitle>
                  <p className="text-gray-500">
                    Week {phase.startWeek} → Week {phase.endWeek}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Topics</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      {phase.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium">Technologies</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      {phase.technologies.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium">Project Ideas</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      {phase.projectIdeas.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    <strong>Expected Outcome:</strong> {phase.expectedOutcome}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* APPLICATION GUIDANCE */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" /> Application Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Recommended start week:{" "}
              {roadmap.applicationGuidance.recommendedStartWeek}
            </p>

            <div>
              <h3 className="font-medium">What to Have Ready</h3>
              <ul className="list-disc pl-6">
                {roadmap.applicationGuidance.whatToHaveReady.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium">How to Apply</h3>
              <ul className="list-disc pl-6">
                {roadmap.applicationGuidance.howToApply.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* EXTRA RECOMMENDATIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Extra Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Learning Resources</h3>
              <ul className="list-disc pl-6">
                {roadmap.extraRecommendations.learningResources.map(
                  (r, idx) => (
                    <li key={idx}>
                      {r.title} ({r.type}) – {r.platform}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Common Mistakes</h3>
              <ul className="list-disc pl-6">
                {roadmap.extraRecommendations.commonMistakes.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <p className="italic text-gray-700">
              "{roadmap.extraRecommendations.motivation}"
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button onClick={() => window.print()}>Download PDF</Button>
        </div>
      </div>

      {/* ------------------------- MINIMAL PRINT VERSION --------------------------- */}

      <div className="print-only print-container">
        <div className="print-section">
          <div className="print-title">
            Career Roadmap → {roadmap.jobTitle}
          </div>
          <p>Timeline: {roadmap.totalDurationWeeks} weeks</p>
        </div>

        {/* Overview */}
        <div className="print-section">
          <div className="print-subtitle">Overview</div>
          <p>{roadmap.overview.summary}</p>

          <div className="print-subtitle">Technologies to Learn</div>
          <ul className="print-list">
            {roadmap.overview.technologiesToLearn.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="print-subtitle">Prerequisites</div>
          <ul className="print-list">
            {roadmap.overview.prerequisites.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Phases */}
        <div className="print-section">
          <div className="print-title">Phases</div>

          {roadmap.phases.map((phase) => (
            <div
              key={phase.phaseNumber}
              className="print-section"
              style={{ marginBottom: 20 }}
            >
              <div className="print-subtitle">
                Phase {phase.phaseNumber}: {phase.title}
              </div>
              <p>
                Week {phase.startWeek} → Week {phase.endWeek}
              </p>

              <ul className="print-list">
                {phase.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="print-subtitle">Technologies</div>
              <ul className="print-list">
                {phase.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="print-subtitle">Project Ideas</div>
              <ul className="print-list">
                {phase.projectIdeas.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>

              <p>
                <strong>Expected Outcome:</strong> {phase.expectedOutcome}
              </p>
            </div>
          ))}
        </div>

        {/* Application Guidance */}
        <div className="print-section">
          <div className="print-title">Application Guidance</div>

          <p>
            Recommended start week:{" "}
            {roadmap.applicationGuidance.recommendedStartWeek}
          </p>

          <div className="print-subtitle">What to Have Ready</div>
          <ul className="print-list">
            {roadmap.applicationGuidance.whatToHaveReady.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <div className="print-subtitle">How to Apply</div>
          <ul className="print-list">
            {roadmap.applicationGuidance.howToApply.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}

        <div className="print-section">
          <div className="print-title">Extra Recommendations</div>

          <div className="print-subtitle">Learning Resources</div>
          <ul className="print-list">
            {roadmap.extraRecommendations.learningResources.map(
              (r, idx) => (
                <li key={idx}>
                  {r.title} ({r.type}) – {r.platform}
                </li>
              )
            )}
          </ul>

          <div className="print-subtitle">Common Mistakes</div>
          <ul className="print-list">
            {roadmap.extraRecommendations.commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <p style={{ fontStyle: "italic", marginTop: 12 }}>
            "{roadmap.extraRecommendations.motivation}"
          </p>
        </div>
      </div>
    </>
  );
}
