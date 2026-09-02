import React from "react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { useAnalyticsStore } from "@/store/analytics-store/useAnalyticsStore";

const fallbackData = [
  { subject: "Aptitude", A: 85, fullMark: 100 },
  { subject: "English", A: 90, fullMark: 100 },
  { subject: "Coding", A: 78, fullMark: 100 },
  { subject: "Core CS", A: 88, fullMark: 100 },
];

const SubjectAnalysis = () => {
  const { hierarchicalPerformance, flatMetrics } = useAnalyticsStore();

  const domainMetrics = flatMetrics.filter(m => m.type === "DOMAIN" || !m.parentId);
  
  let radarData = domainMetrics.map(m => {
    const perf = hierarchicalPerformance[m._id] || {};
    return {
      subject: m.name,
      A: perf.percentage || 0,
      fullMark: 100,
    };
  });

  if (radarData.length === 0) {
    radarData = fallbackData;
  }

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col items-center">
      <h3 className="text-center text-sm md:text-lg font-sans font-normal text-black mb-2">
        Domain Metric Percentage Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          outerRadius="80%"
          data={radarData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            name="Performance"
            dataKey="A"
            stroke="#8884d8"
            fill="#0066ff"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectAnalysis;
