import React, { useEffect } from "react";
import {
  RankingTrendGraph,
  UserBLock,
  ProgressOverTimeGraph,
  SubjectAnalysis,
} from "@/shared";
import { useAnalyticsStore } from "@/store/analytics-store/useAnalyticsStore";
import { useAuthStore } from "@/store/user-auth-store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const { tagDiagnostics, fetchTagDiagnostics, fetchMetricTree, fetchHierarchicalPerformance } = useAnalyticsStore();

  useEffect(() => {
    fetchMetricTree(token);
    fetchHierarchicalPerformance(token);
    fetchTagDiagnostics(null, token);
  }, [token, fetchMetricTree, fetchHierarchicalPerformance, fetchTagDiagnostics]);

  const weakTopics = tagDiagnostics?.weakTopics || [];
  const strongTopics = tagDiagnostics?.strongTopics || [];

  return (
    <div className="flex flex-col space-y-4 p-4 md:p-6">
      <UserBLock />

      {/* Weak & Strong Micro-Topics Diagnostic Widget */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🎯 Diagnostic Micro-Topics Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weak Topics */}
          <div className="bg-red-50/60 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-red-800 mb-3 flex items-center justify-between">
              <span>⚠️ Weak Topics (&lt; 60% Accuracy)</span>
              <span className="bg-red-200 text-red-900 text-xs px-2 py-0.5 rounded-full font-bold">
                {weakTopics.length}
              </span>
            </h4>
            {weakTopics.length === 0 ? (
              <p className="text-xs text-red-600 italic">No weak micro-topics identified!</p>
            ) : (
              <div className="space-y-2">
                {weakTopics.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded border border-red-100 shadow-sm">
                    <div>
                      <span className="font-semibold text-gray-800 text-sm">{item.tag}</span>
                      <span className="text-xs text-gray-500 block">
                        Accuracy: {item.accuracy}% ({item.correct}/{item.attempted})
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/practice?tag=${encodeURIComponent(item.tag)}`)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded shadow transition"
                    >
                      Practice Topic
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strong Topics */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center justify-between">
              <span>🌟 Strong Topics (&gt; 80% Accuracy)</span>
              <span className="bg-emerald-200 text-emerald-900 text-xs px-2 py-0.5 rounded-full font-bold">
                {strongTopics.length}
              </span>
            </h4>
            {strongTopics.length === 0 ? (
              <p className="text-xs text-emerald-600 italic">Complete more assessments to highlight strong topics.</p>
            ) : (
              <div className="space-y-2">
                {strongTopics.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded border border-emerald-100 shadow-sm">
                    <div>
                      <span className="font-semibold text-gray-800 text-sm">{item.tag}</span>
                      <span className="text-xs text-gray-500 block">
                        Accuracy: {item.accuracy}% ({item.correct}/{item.attempted})
                      </span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                      STRONG
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div id="row2" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SubjectAnalysis />
        <RankingTrendGraph />
      </div>
      <div id="row3" className="grid grid-cols-1 gap-4">
        <ProgressOverTimeGraph />
      </div>
    </div>
  );
};

export default Analysis;
