import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/user-auth-store/useAuthStore';
import { useAnalyticsStore } from '@/store/analytics-store/useAnalyticsStore';

const AdminAnalytics = () => {
  const token = useAuthStore((state) => state.token);
  const {
    adminOverview,
    topicHeatmap,
    atRiskStudents,
    flatMetrics,
    leaderboardData,
    fetchAdminOverview,
    fetchTopicHeatmap,
    fetchAtRiskStudents,
    fetchMetricTree,
    fetchMetricLeaderboard,
  } = useAnalyticsStore();

  const [activeTab, setActiveTab] = useState('overview');

  // Ranking Explorer state
  const [selectedMetricId, setSelectedMetricId] = useState('');
  const [scopeType, setScopeType] = useState('GLOBAL');
  const [scopeId, setScopeId] = useState('ALL');
  const [rankFrom, setRankFrom] = useState('');
  const [rankTo, setRankTo] = useState('');

  useEffect(() => {
    if (token) {
      fetchAdminOverview(token);
      fetchTopicHeatmap(token);
      fetchAtRiskStudents(token);
      fetchMetricTree(token);
    }
  }, [token, fetchAdminOverview, fetchTopicHeatmap, fetchAtRiskStudents, fetchMetricTree]);

  useEffect(() => {
    if (token && flatMetrics.length > 0 && !selectedMetricId) {
      setSelectedMetricId(flatMetrics[0]._id);
    }
  }, [token, flatMetrics, selectedMetricId]);

  const handleQueryRankings = () => {
    if (token && selectedMetricId) {
      fetchMetricLeaderboard(
        {
          metricId: selectedMetricId,
          scopeType,
          scopeId,
          rankFrom: rankFrom ? Number(rankFrom) : undefined,
          rankTo: rankTo ? Number(rankTo) : undefined,
        },
        token
      );
    }
  };

  useEffect(() => {
    if (token && selectedMetricId && activeTab === 'rankings') {
      handleQueryRankings();
    }
  }, [selectedMetricId, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Admin Analytics & Insights
            </h1>
            <p className="text-slate-600">
              Institution-wide performance, topic heatmap, at-risk interventions & ranking explorer
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 gap-1 self-start">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'heatmap'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🔥 Topic Heatmap
            </button>
            <button
              onClick={() => setActiveTab('atrisk')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'atrisk'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ⚠️ At-Risk Students
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'rankings'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🏆 Ranking Explorer
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Total Students</span>
                <span className="text-3xl font-black text-slate-900">{adminOverview?.totalStudents || 0}</span>
                <span className="text-xs text-emerald-600 font-semibold block mt-1">
                  {adminOverview?.activeStudents || 0} active in last 30 days
                </span>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Assessments Conducted</span>
                <span className="text-3xl font-black text-indigo-600">{adminOverview?.totalAssessments || 0}</span>
                <span className="text-xs text-slate-400 block mt-1">
                  {adminOverview?.completedAssessments || 0} submissions
                </span>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Institution Avg Score</span>
                <span className="text-3xl font-black text-emerald-600">{adminOverview?.averageScore || 0}%</span>
                <span className="text-xs text-slate-400 block mt-1">
                  {adminOverview?.averageAccuracy || 0}% overall accuracy
                </span>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Participation Rate</span>
                <span className="text-3xl font-black text-sky-600">{adminOverview?.participationRate || 0}%</span>
                <span className="text-xs text-slate-400 block mt-1">
                  {adminOverview?.questionsAttempted || 0} questions attempted
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TOPIC HEATMAP (HIGH PRIORITY) */}
        {activeTab === 'heatmap' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">🔥 Institution Topic Performance Heatmap</h2>
            <p className="text-sm text-slate-600 mb-6">
              Identifies exact metric areas and weak student percentages across topics
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
                    <th className="py-3 px-4">Topic / Skill</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Avg Score</th>
                    <th className="py-3 px-4">Avg Accuracy</th>
                    <th className="py-3 px-4">Students</th>
                    <th className="py-3 px-4">Weak Students</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topicHeatmap.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-slate-400 italic">No topic heatmap records available yet.</td>
                    </tr>
                  ) : (
                    topicHeatmap.map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-semibold text-slate-900">{t.topicName}</td>
                        <td className="py-3 px-4"><span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-mono">{t.type}</span></td>
                        <td className="py-3 px-4 font-bold text-slate-800">{t.averageScore}%</td>
                        <td className="py-3 px-4 font-bold text-indigo-600">{t.averageAccuracy}%</td>
                        <td className="py-3 px-4">{t.totalStudents}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              t.weakStudentsPercentage > 50
                                ? 'bg-red-100 text-red-700'
                                : t.weakStudentsPercentage > 20
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {t.weakStudentsPercentage}% ({t.weakStudentsCount} students)
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: AT-RISK STUDENTS */}
        {activeTab === 'atrisk' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">⚠️ At-Risk Intervention Center</h2>
            <p className="text-sm text-slate-600 mb-6">
              Students identified for intervention with explainable risk reasons
            </p>

            <div className="space-y-4">
              {atRiskStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-500 italic bg-slate-50 rounded-xl">
                  No at-risk students identified under current criteria!
                </div>
              ) : (
                atRiskStudents.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-slate-900 text-base">{s.fullName}</span>
                        <span className="text-xs text-slate-500 font-mono">({s.enrollment || 'N/A'})</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                            s.riskLevel === 'HIGH'
                              ? 'bg-red-600 text-white'
                              : s.riskLevel === 'MEDIUM'
                              ? 'bg-amber-500 text-white'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {s.riskLevel} RISK
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block mb-2">
                        {s.branch || 'Branch'} • {s.batch || 'Batch'} • Overall Score: <strong className="text-slate-800">{s.overallScore}%</strong>
                      </span>
                      <ul className="space-y-1">
                        {s.reasons.map((r, rIdx) => (
                          <li key={rIdx} className="text-xs text-red-600 font-medium flex items-center gap-1.5">
                            <span>•</span> <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: RANKING EXPLORER */}
        {activeTab === 'rankings' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">🏆 Scoped Ranking Explorer</h2>
            <p className="text-sm text-slate-600 mb-6">
              Query student rankings dynamically by Metric, Scope (Branch/Batch/Course), Period and Rank Range
            </p>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Metric</label>
                <select
                  value={selectedMetricId}
                  onChange={(e) => setSelectedMetricId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                >
                  {flatMetrics.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name} ({m.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Scope Type</label>
                <select
                  value={scopeType}
                  onChange={(e) => setScopeType(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                >
                  <option value="GLOBAL">GLOBAL</option>
                  <option value="COURSE">COURSE</option>
                  <option value="STREAM">STREAM</option>
                  <option value="BRANCH">BRANCH</option>
                  <option value="BATCH">BATCH</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Scope Value</label>
                <input
                  type="text"
                  value={scopeId}
                  onChange={(e) => setScopeId(e.target.value)}
                  placeholder="ALL / CSE-AIML"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Rank From - To</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={rankFrom}
                    onChange={(e) => setRankFrom(e.target.value)}
                    placeholder="1"
                    className="w-1/2 text-xs p-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                  />
                  <input
                    type="number"
                    value={rankTo}
                    onChange={(e) => setRankTo(e.target.value)}
                    placeholder="25"
                    className="w-1/2 text-xs p-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleQueryRankings}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition"
                >
                  Search Rankings
                </button>
              </div>
            </div>

            {/* Ranking Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Branch / Batch</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Percentile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaderboardData.rankings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-slate-400 italic">
                        No ranking snapshots found for this query.
                      </td>
                    </tr>
                  ) : (
                    leaderboardData.rankings.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-black text-indigo-600">#{r.rank}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {r.studentId?.fullName || 'Student'}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-500">
                          {r.studentId?.branch || 'Branch'} • {r.studentId?.batch || 'Batch'}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">{r.score}%</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">{r.percentile}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
