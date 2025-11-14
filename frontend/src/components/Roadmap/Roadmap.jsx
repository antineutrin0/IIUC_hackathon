// src/components/Roadmap/Roadmap.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, ChevronDown } from "lucide-react";

export default function Roadmap({ roadmap }) {
  const [selectedPhase, setSelectedPhase] = useState(null);

  if (!roadmap) {
    return <div className="text-center p-6 text-lg">No roadmap available</div>;
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-green-700">
          {roadmap.jobTitle} Roadmap
        </h1>
        <p className="text-lg text-green-900 mt-2">
          Target Role: {roadmap.targetRole}
        </p>
      </motion.div>

      {/* Overview */}
      <Card className="shadow-md rounded-2xl bg-white">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">Overview</h2>
          <p className="text-gray-700">{roadmap.overview.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <SectionList title="Skills to Develop" items={roadmap.overview.skillsToDevelop} />
            <SectionList title="Technologies" items={roadmap.overview.technologiesToLearn} />
            <SectionList title="Prerequisites" items={roadmap.overview.prerequisites} />
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-10">
        <h2 className="text-3xl font-semibold text-red-600 text-center">
          Learning Timeline
        </h2>

        <div className="relative border-l-4 border-blue-400 ml-4">
          {roadmap.phases.map((phase, i) => (
            <TimelinePhase
              key={phase.phaseNumber}
              phase={phase}
              index={i}
              isOpen={selectedPhase === i}
              onClick={() => setSelectedPhase(i === selectedPhase ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Application Guidance */}
      <Card className="shadow-md bg-white rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">Application Guidance</h2>

          <p className="text-gray-700">
            Start applying from Week{" "}
            <span className="font-bold text-red-600">
              {roadmap.applicationGuidance.recommendedStartWeek}
            </span>
          </p>

          <SectionList title="What to Prepare" items={roadmap.applicationGuidance.whatToHaveReady} />
          <SectionList title="How to Apply" items={roadmap.applicationGuidance.howToApply} />
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------------- COMPONENTS -------------------------- */

function SectionList({ title, items }) {
  return (
    <div>
      <h3 className="font-semibold text-green-700">{title}</h3>
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        {items?.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function TimelinePhase({ phase, index, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      className="mb-10 ml-6"
    >
      <button
        onClick={onClick}
        className="flex items-center space-x-4 group"
      >
        <span className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow group-hover:scale-110 transition"></span>

        <div>
          <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            Phase {phase.phaseNumber}: {phase.title}
            <ChevronDown
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              size={20}
            />
          </h3>

          <p className="text-gray-600 flex items-center gap-1">
            <Clock size={16} /> Week {phase.startWeek} – {phase.endWeek}
          </p>
        </div>
      </button>

      {/* Progress bar */}
      <div className="mt-4 w-full h-2 bg-blue-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: `${(phase.endWeek - phase.startWeek + 1) * 10}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {isOpen && (
        <Card className="mt-4 border-none shadow bg-white rounded-xl">
          <CardContent className="p-4 space-y-4">
            <SectionList title="Topics" items={phase.topics} />
            <SectionList title="Technologies" items={phase.technologies} />
            <SectionList title="Project Ideas" items={phase.projectIdeas} />

            <h4 className="font-semibold text-green-700">Expected Outcome</h4>
            <p className="text-gray-700">{phase.expectedOutcome}</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
