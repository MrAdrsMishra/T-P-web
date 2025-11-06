import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { mockStudents } from "../../../data/mockData";
const ProgressOverTimeGraph = () => {
  const currentStudent = mockStudents[0]; // Assuming current user
  const progressData = [
    { month: "Sep", score: 20 },
    { month: "Oct", score: 45 },
    { month: "Nov", score: 78 },
    { month: "Dec", score: 82 },
    { month: "Jan", score: currentStudent.overallScore },
  ];
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Progress Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#374151"
            strokeWidth={3}
            dot={{ fill: "#374151" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressOverTimeGraph;
