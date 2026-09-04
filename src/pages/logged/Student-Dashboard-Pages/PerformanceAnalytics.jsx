import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';
import {
  PerformanceTrendChart,
  PercentileTrendChart,
  CategoryPerformanceChart,
  SubjectPerformanceRadarChart,
  AccuracyDistributionChart,
} from '@/components/Charts/ChartComponents';

const PerformanceAnalytics = () => {
  const token = useAuthStore((state) => state.token);
  const {
    studentSummary,
    skillsClassification,
    placementReadiness,
    peerComparison,
    codingAnalytics,
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

  // Format dynamic categories for chart
  const categoryData = Object.entries(studentSummary?.categoryPerformance || {}).map(([cat, val]) => ({
    category: cat,
    avgScore: val,
    testsCount: 1,
  }));

  // Format peer comparison chart
  const comparisonChartData = [
    { label: 'My Score', score: peerComparison?.myScore || 0 },
    { label: 'Branch Avg', score: peerComparison?.branchAvg || 0 },
    { label: 'Batch Avg', score: peerComparison?.batchAvg || 0 },
    { label: 'Course Avg', score: peerComparison?.courseAvg || 0 },
    { label: 'Top Score', score: peerComparison?.topScore || 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Performance Analytics
            </h1>
            <p className="text-slate-600">
              Extensible, metric-driven evaluation of your technical & academic growth
            </p>
          </div>
          <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                Placement Readiness
              </span>
              <span className="text-2xl font-black text-indigo-600">
                {placementReadiness?.readinessScore || 0}%
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                Global Rank
              </span>
              <span className="text-2xl font-black text-amber-500">
                #{studentSummary?.overallRank || 1}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Total Assessments</h3>
            <p className="text-3xl font-black text-blue-600">
              {studentSummary?.totalAssessments || 0}
            </p>
            <span className="text-xs text-slate-400 mt-1 block">
              {studentSummary?.questionsAttempted || 0} questions attempted
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Overall Score</h3>
            <p className="text-3xl font-black text-emerald-600">
              {studentSummary?.overallScore || 0}%
            </p>
            <span className="text-xs text-emerald-600 mt-1 block font-semibold">
              {studentSummary?.improvementPercentage >= 0 ? '+' : ''}{studentSummary?.improvementPercentage || 0}% recent trend
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Percentile</h3>
            <p className="text-3xl font-black text-purple-600">
              {studentSummary?.percentile || 100}%
            </p>
            <span className="text-xs text-slate-400 mt-1 block">
              Relative to active cohort
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Accuracy</h3>
            <p className="text-3xl font-black text-sky-600">
              {studentSummary?.accuracy || 0}%
            </p>
            <span className="text-xs text-slate-400 mt-1 block">
              {codingAnalytics?.problemsSolved || 0} coding problems solved
            </span>
          </div>
        </div>

        {/* Dynamic Category Performance & Readiness Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>📊 Dynamic Category Breakdown</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">Metric Driven</span>
            </h3>
            {categoryData.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No category metrics recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {categoryData.map((c, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span className="text-slate-700">{c.category}</span>
                      <span className="text-slate-900 font-bold">{c.avgScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, c.avgScore))}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>🎯 Placement Readiness Profile</span>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold">
                {placementReadiness?.profileName || 'Configured'}
              </span>
            </h3>
            <div className="space-y-4">
              {(placementReadiness?.breakdown || []).map((b, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-slate-700">{b.metricName} <span className="text-xs text-slate-400 font-normal">({b.weight}% weight)</span></span>
                    <span className="text-indigo-600 font-bold">{b.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, b.score))}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Peer Comparison */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            👥 Cohort Peer Comparison
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <span className="text-xs text-indigo-600 font-semibold block uppercase">My Score</span>
              <span className="text-2xl font-black text-indigo-900">{peerComparison?.myScore}%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Branch Avg</span>
              <span className="text-2xl font-bold text-slate-700">{peerComparison?.branchAvg}%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Batch Avg</span>
              <span className="text-2xl font-bold text-slate-700">{peerComparison?.batchAvg}%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Course Avg</span>
              <span className="text-2xl font-bold text-slate-700">{peerComparison?.courseAvg}%</span>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-xs text-amber-700 font-semibold block uppercase">Top Score</span>
              <span className="text-2xl font-black text-amber-900">{peerComparison?.topScore}%</span>
            </div>
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
