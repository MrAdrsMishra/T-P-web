import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/user-auth-store/useAuthStore';
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';

const Leaderboard = () => {
  const token = useAuthStore((state) => state.token);
  const {
    metricTree,
    flatMetrics,
    leaderboardData,
    isLoading,
    fetchMetricTree,
    fetchMetricLeaderboard,
  } = useAnalyticsStore();

  const [selectedMetricId, setSelectedMetricId] = useState('');
  const [scopeType, setScopeType] = useState('GLOBAL'); // 'GLOBAL', 'BRANCH', 'BATCH'
  const [scopeId, setScopeId] = useState('ALL');

  useEffect(() => {
    fetchMetricTree(token);
  }, [token, fetchMetricTree]);

  useEffect(() => {
    if (flatMetrics.length > 0 && !selectedMetricId) {
      setSelectedMetricId(flatMetrics[0]._id);
    }
  }, [flatMetrics, selectedMetricId]);

  useEffect(() => {
    if (selectedMetricId) {
      fetchMetricLeaderboard(
        {
          metricId: selectedMetricId,
          scopeType,
          scopeId: scopeType === 'GLOBAL' ? 'ALL' : scopeId,
          page: 1,
          limit: 20,
        },
        token
      );
    }
  }, [selectedMetricId, scopeType, scopeId, token, fetchMetricLeaderboard]);

  const rankings = leaderboardData?.rankings || [];
  const selectedMetricObj = flatMetrics.find((m) => String(m._id) === String(selectedMetricId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            🏆 Dynamic Metric Leaderboard
          </h1>
          <p className="text-slate-600">
            Real-time cohort ranking snapshots powered by dynamic metric tree performance
          </p>
        </div>

        {/* Dynamic Metric & Scope Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metric Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Metric Node
            </label>
            <select
              value={selectedMetricId}
              onChange={(e) => setSelectedMetricId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {flatMetrics.map((metric) => (
                <option key={metric._id} value={metric._id}>
                  {metric.type} — {metric.name} ({metric.slug})
                </option>
              ))}
            </select>
          </div>

          {/* Scope Type Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Cohort Scope Type
            </label>
            <select
              value={scopeType}
              onChange={(e) => {
                const newScope = e.target.value;
                setScopeType(newScope);
                if (newScope === 'GLOBAL') setScopeId('ALL');
                else if (newScope === 'BRANCH') setScopeId('CSE');
                else if (newScope === 'BATCH') setScopeId('2023-2027');
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="GLOBAL">GLOBAL (All Students)</option>
              <option value="COURSE">COURSE</option>
              <option value="STREAM">STREAM</option>
              <option value="BRANCH">BRANCH</option>
              <option value="BATCH">BATCH</option>
            </select>
          </div>

          {/* Scope ID Input/Select */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Cohort Filter ID
            </label>
            {scopeType === 'GLOBAL' ? (
              <input
                type="text"
                disabled
                value="ALL"
                className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-500 font-medium"
              />
            ) : scopeType === 'BRANCH' ? (
              <select
                value={scopeId}
                onChange={(e) => setScopeId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
                <option value="ECE">ECE</option>
                <option value="DS">DS</option>
                <option value="MECH">MECH</option>
              </select>
            ) : scopeType === 'BATCH' ? (
              <select
                value={scopeId}
                onChange={(e) => setScopeId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>
                <option value="2024-2028">2024-2028</option>
              </select>
            ) : (
              <input
                type="text"
                value={scopeId}
                onChange={(e) => setScopeId(e.target.value)}
                placeholder="Enter scope identifier..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* Live Leaderboard Snapshot Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Leaderboard Snapshots: {selectedMetricObj?.name || 'Selected Metric'}
              </h2>
              <p className="text-sm text-slate-500">
                Scope: {scopeType} ({scopeId}) | Total Participants: {leaderboardData?.total || 0}
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
              Dense Tie Strategy
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto mb-2"></div>
              Loading leaderboard snapshots...
            </div>
          ) : rankings.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No ranking snapshot entries available for this metric and cohort scope.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Enrollment</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Branch / Batch</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Metric Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rankings.map((item) => {
                    const student = item.studentId || {};
                    return (
                      <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                              item.rank === 1
                                ? 'bg-amber-100 text-amber-700'
                                : item.rank === 2
                                ? 'bg-slate-200 text-slate-700'
                                : item.rank === 3
                                ? 'bg-amber-700/10 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            #{item.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-900">{student.fullName || 'Student'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {student.enrollment || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {student.branch || 'N/A'} / {student.batch || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {item.score}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

