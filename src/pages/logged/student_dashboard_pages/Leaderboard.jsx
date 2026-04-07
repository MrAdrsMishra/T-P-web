import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';
import {
  DistributionPieChart,
  MultiBarChart,
  PercentileTrendChart,
  ScoreDistributionChart,
} from '@/components/Charts/ChartComponents';

// Mock leaderboard data
const mockLeaderboardData = [
  { rank: 1, name: 'Raj Kumar', score: 92, branch: 'CSE', batch: '2023-2027' },
  { rank: 2, name: 'Priya Singh', score: 90, branch: 'AIML', batch: '2023-2027' },
  { rank: 3, name: 'Ahmed Hassan', score: 88, branch: 'CSE', batch: '2023-2027' },
  { rank: 4, name: 'Emma Wilson', score: 85, branch: 'DS', batch: '2023-2027' },
  { rank: 5, name: 'Arun Patel', score: 83, branch: 'ECE', batch: '2023-2027' },
  { rank: 6, name: 'Sarah Chen', score: 81, branch: 'CSE', batch: '2023-2027' },
  { rank: 7, name: 'Vikram Desai', score: 79, branch: 'AIML', batch: '2023-2027' },
  { rank: 8, name: 'Lisa Anderson', score: 77, branch: 'DS', batch: '2023-2027' },
  { rank: 9, name: 'Nikhil Gupta', score: 75, branch: 'CSE', batch: '2023-2027' },
  { rank: 10, name: 'Sophie Martin', score: 73, branch: 'ECE', batch: '2023-2027' },
];

// Branch distribution
const branchDistribution = [
  { name: 'CSE', value: 145 },
  { name: 'AIML', value: 98 },
  { name: 'ECE', value: 87 },
  { name: 'DS', value: 65 },
  { name: 'Others', value: 45 },
];

// Score intervals
const scoreIntervals = [
  { scoreRange: '90-100', count: 32 },
  { scoreRange: '80-90', count: 78 },
  { scoreRange: '70-80', count: 125 },
  { scoreRange: '60-70', count: 98 },
  { scoreRange: '50-60', count: 45 },
];

// Top performers comparison
const topPerformersComparison = [
  { name: 'Raj Kumar', myTests: 8, avgScore: 92, totalScore: 736 },
  { name: 'Priya Singh', myTests: 8, avgScore: 90, totalScore: 720 },
  { name: 'Ahmed Hassan', myTests: 7, avgScore: 88, totalScore: 616 },
  { name: 'Emma Wilson', myTests: 8, avgScore: 85, totalScore: 680 },
];

// Ranking trend by batch
const rankingTrendByBatch = [
  { month: 'Aug', '2022-2026': 145, '2023-2027': 12, '2024-2028': 2 },
  { month: 'Sep', '2022-2026': 138, '2023-2027': 15, '2024-2028': 3 },
  { month: 'Oct', '2022-2026': 134, '2023-2027': 18, '2024-2028': 5 },
  { month: 'Nov', '2022-2026': 128, '2023-2027': 22, '2024-2028': 8 },
  { month: 'Dec', '2022-2026': 120, '2023-2027': 25, '2024-2028': 12 },
];

const Leaderboard = () => {
  const token = useAuthStore((state) => state.token);
  const {
    leaderboard,
    isLoading,
    fetchLeaderboard,
  } = useAnalyticsStore();
  const [viewMode, setViewMode] = useState('all'); // 'all', 'branch', 'batch'

  useEffect(() => {
    if (token) {
      fetchLeaderboard(token);
    }
  }, [token, fetchLeaderboard]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
      </div>
    );
  }

  const data = leaderboard && leaderboard.length > 0 ? leaderboard : mockLeaderboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-slate-600">
            Track top performers and student rankings
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'all', label: 'Overall', icon: '📊' },
            { id: 'branch', label: 'By Branch', icon: '🏢' },
            { id: 'batch', label: 'By Batch', icon: '📚' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                viewMode === tab.id
                  ? 'bg-sky-400 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-400'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Top 10 Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-md border border-slate-200 mb-8 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Top 10 Performers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Branch</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Batch</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Score</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((student, idx) => (
                  <tr
                    key={student.rank}
                    className="border-b border-slate-100 hover:bg-sky-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold text-sm">
                        {student.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{student.name}</td>
                    <td className="px-6 py-4 text-slate-600">{student.branch}</td>
                    <td className="px-6 py-4 text-slate-600">{student.batch}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                        {student.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DistributionPieChart
            data={branchDistribution}
            height={350}
            title="Student Distribution by Branch"
            dataKey="value"
            nameKey="name"
          />
          <ScoreDistributionChart
            data={scoreIntervals}
            height={350}
            title="Score Distribution"
          />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MultiBarChart
            data={topPerformersComparison}
            height={350}
            title="Top Performers Comparison"
            bars={[
              { dataKey: 'avgScore', name: 'Avg Score', fill: '#3b82f6' },
              { dataKey: 'myTests', name: 'Tests Count', fill: '#10b981' },
            ]}
            xAxisKey="name"
          />
          <PercentileTrendChart
            data={rankingTrendByBatch}
            height={350}
            title="Rankings by Batch Trend"
          />
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Your Current Rank</h3>
            <p className="text-3xl font-bold text-blue-500">#42</p>
            <p className="text-xs text-slate-500 mt-2">↑ Improved by 5 positions</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Your Score</h3>
            <p className="text-3xl font-bold text-green-500">78.5%</p>
            <p className="text-xs text-slate-500 mt-2">vs Batch Avg: 72%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Your Percentile</h3>
            <p className="text-3xl font-bold text-yellow-500">72.3%</p>
            <p className="text-xs text-slate-500 mt-2">Above college average</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Total Participants</h3>
            <p className="text-3xl font-bold text-purple-500">440</p>
            <p className="text-xs text-slate-500 mt-2">in your batch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
