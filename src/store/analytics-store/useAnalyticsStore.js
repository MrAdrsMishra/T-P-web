import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { analyticsService, metricsService, handleApiError } from '@/services/api.service';

/**
 * Analytics & Performance Store
 */
export const useAnalyticsStore = create(
  persist(
    (set, get) => ({
      metricTree: [],
      flatMetrics: [],
      selectedMetric: null,
      hierarchicalPerformance: {},
      leaderboardData: { rankings: [], total: 0, page: 1, limit: 20, totalPages: 0 },
      tagDiagnostics: { weakTopics: [], strongTopics: [], averageTopics: [], allTags: [] },

      // Student Analytics State
      studentSummary: {
        overallScore: 0,
        overallRank: 0,
        percentile: 0,
        totalAssessments: 0,
        questionsAttempted: 0,
        accuracy: 0,
        improvementPercentage: 0,
        categoryPerformance: {},
      },
      skillsClassification: {
        weakSkills: [],
        averageSkills: [],
        strongSkills: [],
      },
      placementReadiness: {
        readinessScore: 0,
        profileName: '',
        breakdown: [],
      },
      peerComparison: {
        myScore: 0,
        branchAvg: 0,
        batchAvg: 0,
        streamAvg: 0,
        courseAvg: 0,
        topScore: 100,
      },
      codingAnalytics: {
        problemsSolved: 0,
        accuracy: 0,
        languagePerformance: {},
        topicPerformance: {},
      },

      // Admin Analytics State
      adminOverview: {
        totalStudents: 0,
        activeStudents: 0,
        totalAssessments: 0,
        completedAssessments: 0,
        questionsAttempted: 0,
        averageScore: 0,
        averageAccuracy: 0,
        participationRate: 0,
      },
      academicPerformance: {
        coursePerformance: {},
        streamPerformance: {},
        branchPerformance: {},
        batchPerformance: {},
      },
      topicHeatmap: [],
      atRiskStudents: [],

      isLoading: false,
      error: null,
      lastUpdated: null,

      setSelectedMetric: (metric) => set({ selectedMetric: metric }),

      // Fetch metric hierarchy tree
      fetchMetricTree: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await metricsService.getMetricTree(token);
          const data = response.data?.data || {};
          set({
            metricTree: data.tree || [],
            flatMetrics: data.flat || [],
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch student tree performance
      fetchHierarchicalPerformance: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getStudentTreePerformance(token);
          const data = response.data?.data || {};
          set({
            hierarchicalPerformance: data.performanceMap || {},
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch metric ranking snapshots
      fetchMetricLeaderboard: async (params, token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getMetricLeaderboard(params, token);
          const data = response.data?.data || { rankings: [], total: 0, page: 1, limit: 20, totalPages: 0 };
          set({
            leaderboardData: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch student summary
      fetchStudentSummary: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getStudentSummary(token);
          const data = response.data?.data || {};
          set({
            studentSummary: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch skills classification
      fetchSkillsClassification: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getSkillsClassification(token);
          const data = response.data?.data || { weakSkills: [], averageSkills: [], strongSkills: [] };
          set({
            skillsClassification: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch placement readiness
      fetchPlacementReadiness: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getPlacementReadiness(token);
          const data = response.data?.data || { readinessScore: 0, breakdown: [] };
          set({
            placementReadiness: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch peer comparison
      fetchPeerComparison: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getPeerComparison(token);
          const data = response.data?.data || { myScore: 0, branchAvg: 0, batchAvg: 0, streamAvg: 0, courseAvg: 0, topScore: 100 };
          set({
            peerComparison: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch coding analytics
      fetchCodingAnalytics: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getCodingAnalytics(token);
          const data = response.data?.data || { problemsSolved: 0, accuracy: 0, languagePerformance: {}, topicPerformance: {} };
          set({
            codingAnalytics: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Admin: Fetch Overview
      fetchAdminOverview: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getAdminOverview(token);
          const data = response.data?.data || {};
          set({
            adminOverview: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Admin: Fetch Academic Performance
      fetchAcademicPerformance: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getAcademicPerformance(token);
          const data = response.data?.data || {};
          set({
            academicPerformance: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Admin: Fetch Topic Heatmap
      fetchTopicHeatmap: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getTopicHeatmap(token);
          const data = response.data?.data?.heatmap || [];
          set({
            topicHeatmap: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Admin: Fetch At-Risk Students
      fetchAtRiskStudents: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getAtRiskStudents(token);
          const data = response.data?.data?.atRiskStudents || [];
          set({
            atRiskStudents: data,
            isLoading: false,
            lastUpdated: new Date(),
          });
          return data;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch all student analytics at once
      fetchAllAnalytics: async (token) => {
        set({ isLoading: true, error: null });
        try {
          await Promise.all([
            get().fetchStudentSummary(token),
            get().fetchSkillsClassification(token),
            get().fetchPlacementReadiness(token),
            get().fetchPeerComparison(token),
            get().fetchCodingAnalytics(token),
            get().fetchMetricTree(token),
            get().fetchHierarchicalPerformance(token),
          ]);
          set({ isLoading: false, lastUpdated: new Date() });
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    { name: 'analytics-store' }
  )
);