import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';
import {
  PerformanceTrendChart,
  PercentileTrendChart,
  CategoryPerformanceChart,
  SubjectPerformanceRadarChart,
  DistributionPieChart,
  AccuracyDistributionChart,
  ScoreDistributionChart,
} from '@/components/Charts/ChartComponents';

// Mock data for accuracy distribution
const accuracyDistributionData = [
  { range: '0-25%', count: 5 },
  { range: '25-50%', count: 12 },
  { range: '50-75%', count: 28 },
  { range: '75-100%', count: 45 },
];

// Mock data for score distribution
const scoreDistributionData = [
  { scoreRange: '30-40', count: 8 },
  { scoreRange: '40-50', count: 15 },
  { scoreRange: '50-60', count: 25 },
  { scoreRange: '60-70', count: 32 },
  { scoreRange: '70-80', count: 28 },
  { scoreRange: '80-90', count: 18 },
  { scoreRange: '90-100', count: 10 },
];

// Mock progress data
const mockProgressData = [
  { month: 'Sep', score: 35 },
  { month: 'Oct', score: 42 },
  { month: 'Nov', score: 58 },
  { month: 'Dec', score: 65 },
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 78 },
];

// Mock subject performance
const mockSubjectPerformance = [
  { subject: 'DSA', A: 105, B: 120, fullMark: 150 },
  { subject: 'Web Dev', A: 95, B: 110, fullMark: 150 },
  { subject: 'DBMS', A: 88, B: 95, fullMark: 150 },
  { subject: 'OS', A: 92, B: 105, fullMark: 150 },
  { subject: 'CN', A: 78, B: 85, fullMark: 150 },
];

// Mock category performance
const mockCategoryPerformance = [
  { category: 'Easy', avgScore: 92, testsCount: 15 },
  { category: 'Medium', avgScore: 78, testsCount: 12 },
  { category: 'Hard', avgScore: 65, testsCount: 8 },
  { category: 'Very Hard', avgScore: 48, testsCount: 3 },
];

// Mock ranking data
const mockRankingData = [
  { month: 'jan', college: 450, batch: 120, branch: 85 },
  { month: 'feb', college: 380, batch: 95, branch: 72 },
  { month: 'mar', college: 315, batch: 78, branch: 58 },
  { month: 'apr', college: 280, batch: 65, branch: 45 },
  { month: 'may', college: 245, batch: 52, branch: 38 },
];

const PerformanceAnalytics = () => {
  const token = useAuthStore((state) => state.token);
  const {
    studentStats,
    isLoading,
    error,
    fetchAllAnalytics,
  } = useAnalyticsStore();

  useEffect(() => {
    if (token) {
      fetchAllAnalytics(token);
    }
  }, [token, fetchAllAnalytics]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Performance Analytics
          </h1>
          <p className="text-slate-600">
            Comprehensive analysis of your test performance and progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Total Tests</h3>
            <p className="text-3xl font-bold text-blue-500">
              {studentStats?.totalTests || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Avg Score</h3>
            <p className="text-3xl font-bold text-green-500">
              {studentStats?.avgScore?.toFixed(1) || 0}%
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Best Rank</h3>
            <p className="text-3xl font-bold text-yellow-500">
              #{studentStats?.bestRank || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Accuracy</h3>
            <p className="text-3xl font-bold text-purple-500">
              {studentStats?.accuracy?.toFixed(1) || 0}%
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Row 1: Progress and Subject Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceTrendChart
              data={mockProgressData}
              height={350}
              title="Your Progress Over Time"
            />
            <SubjectPerformanceRadarChart
              data={mockSubjectPerformance}
              height={350}
              title="Subject-wise Performance"
            />
          </div>

          {/* Row 2: Category Performance and Accuracy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryPerformanceChart
              data={mockCategoryPerformance}
              height={350}
              title="Performance by Difficulty"
            />
            <AccuracyDistributionChart
              data={accuracyDistributionData}
              height={350}
              title="Accuracy Distribution"
            />
          </div>

          {/* Row 3: Score Distribution and Ranking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScoreDistributionChart
              data={scoreDistributionData}
              height={350}
              title="Score Distribution in College"
            />
            <PercentileTrendChart
              data={mockRankingData}
              height={350}
              title="Ranking Trend (College vs Batch vs Branch)"
            />
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">💡 Quick Insights</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Your accuracy improved by 12% this month</li>
              <li>✓ Best performance in Hard difficulty questions</li>
              <li>✓ Consistent with batch average</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">🎯 Recommendations</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Focus on DBMS fundamentals</li>
              <li>• Practice more medium difficulty problems</li>
              <li>• Take timed mock tests weekly</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">📊 Comparison</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• You vs Batch: +5 percentile</li>
              <li>• You vs Branch: +8 percentile</li>
              <li>• You vs College: -2 percentile</li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
