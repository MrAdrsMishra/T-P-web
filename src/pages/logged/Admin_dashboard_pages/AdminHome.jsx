

import { useState, useEffect } from "react";
import {
  PerformanceTrendChart,
  PercentileTrendChart,
  CategoryPerformanceChart,
  SubjectPerformanceRadarChart,
  DistributionPieChart,
  MultiBarChart,
} from "../../../components/Charts/ChartComponents";
import { SUBJECT_PERFORMANCE_DATA, RANKING_TREND_DATA } from "../../../constant";

// Mock data for demonstration
const mockProgressData = [
  { month: "Sep", score: 20 },
  { month: "Oct", score: 45 },
  { month: "Nov", score: 78 },
  { month: "Dec", score: 82 },
  { month: "Jan", score: 85 },
];

const mockPerformanceData = [
  { category: "Technical", avgScore: 85, testsCount: 2 },
  { category: "Reasoning", avgScore: 88, testsCount: 1 },
  { category: "Aptitude", avgScore: 82, testsCount: 1 },
  { category: "Mixed", avgScore: 80, testsCount: 1 },
];

const mockDistributionData = [
  { name: "CSE", value: 45 },
  { name: "AIML", value: 32 },
  { name: "ECE", value: 28 },
  { name: "DS", value: 15 },
];

const Dashboard = () => {
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("");

  const handleApplyFilters = () => {
    console.log("Filters applied:", { batch, branch });
    // Call API to fetch filtered data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Monitor student performance and analytics
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Filters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Batch
              </label>
              <select
                name="batch"
                id="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="">Select Batch</option>
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>
                <option value="2024-2028">2024-2028</option>
                <option value="2025-2029">2025-2029</option>
                <option value="2026-2030">2026-2030</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Branch
              </label>
              <select
                name="branch"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
                <option value="ECE">ECE</option>
                <option value="CSBS">CSBS</option>
                <option value="DS">DS</option>
                <option value="BS">BS</option>
                <option value="AIDS">AIDS</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-1 flex items-end">
              <button
                onClick={handleApplyFilters}
                className="w-full px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="space-y-6">
          {/* Row 1: Performance Trend and Subject Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceTrendChart
              data={mockProgressData}
              height={350}
              title="Student Progress Over Time"
            />
            <SubjectPerformanceRadarChart
              data={SUBJECT_PERFORMANCE_DATA}
              height={350}
              title="Subject-wise Performance"
            />
          </div>

          {/* Row 2: Percentile Trend */}
          <div className="w-full">
            <PercentileTrendChart
              data={RANKING_TREND_DATA}
              height={350}
              title="Percentile Trend (College vs Batch vs Branch)"
            />
          </div>

          {/* Row 3: Performance by Category and Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryPerformanceChart
              data={mockPerformanceData}
              height={350}
              title="Performance by Category"
            />
            <DistributionPieChart
              data={mockDistributionData}
              height={350}
              title="Student Distribution by Branch"
              dataKey="value"
              nameKey="name"
            />
          </div>

          {/* Row 4: Multi-bar Comparison */}
          <div className="w-full">
            <MultiBarChart
              data={mockPerformanceData}
              height={350}
              title="Tests vs Average Score Comparison"
              bars={[
                { dataKey: "avgScore", name: "Avg Score", fill: "#3b82f6" },
                { dataKey: "testsCount", name: "Tests Count", fill: "#10b981" },
              ]}
              xAxisKey="category"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Total Students", value: "1,245", color: "bg-blue-500" },
            { label: "Avg Score", value: "82.5%", color: "bg-green-500" },
            { label: "Pass Rate", value: "87%", color: "bg-yellow-500" },
            { label: "Active Tests", value: "12", color: "bg-purple-500" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 border border-slate-200"
            >
              <h3 className="text-sm font-medium text-slate-600 mb-2">
                {stat.label}
              </h3>
              <p className={`text-3xl font-bold ${stat.color.replace("bg-", "text-")}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
