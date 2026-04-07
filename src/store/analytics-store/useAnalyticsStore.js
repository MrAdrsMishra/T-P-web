import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { analyticsService, handleApiError } from '@/services/api.service';

/**
 * Analytics & Performance Store
 */
export const useAnalyticsStore = create(
  persist(
    (set, get) => ({
      studentStats: {
        totalTests: 0,
        avgScore: 0,
        bestRank: 0,
        totalQuestionsAttempted: 0,
        accuracy: 0,
      },
      subjectPerformance: {},
      performanceTrends: [],
      accuracyMatrix: {
        overall: 0,
        streak: { current: 0, longest: 0 },
        byDifficulty: { easy: 0, medium: 0, hard: 0 },
      },
      consistencyMetrics: {
        practiceFrequency: 0,
        engagementScore: 0,
        consistency: 'N/A',
      },
      leaderboard: [],
      personalRanking: {
        globalRank: 0,
        subjectRanks: {},
        tierRank: 0,
      },
      isLoading: false,
      error: null,
      lastUpdated: null,

      // Fetch student stats
      fetchStudentStats: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getStudentStats(token);
          set({
            studentStats: response.data.data || {},
            isLoading: false,
            lastUpdated: new Date(),
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch subject-wise performance
      fetchSubjectPerformance: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getSubjectPerformance(token);
          set({
            subjectPerformance: response.data.data || {},
            isLoading: false,
            lastUpdated: new Date(),
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch performance trends
      fetchPerformanceTrends: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getPerformanceTrends(token);
          set({
            performanceTrends: response.data.data || [],
            isLoading: false,
            lastUpdated: new Date(),
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch accuracy matrix
      fetchAccuracyMatrix: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getAccuracyMatrix(token);
          set({
            accuracyMatrix: response.data.data || {},
            isLoading: false,
            lastUpdated: new Date(),
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch consistency metrics
      fetchConsistencyMetrics: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getConsistencyMetrics(token);
          set({
            consistencyMetrics: response.data.data || {},
            isLoading: false,
            lastUpdated: new Date(),
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch leaderboard
      fetchLeaderboard: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getLeaderboard(token);
          set({
            leaderboard: response.data.data || [],
            isLoading: false,
            lastUpdated: new Date(),
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch personal ranking
      fetchPersonalRanking: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await analyticsService.getPersonalRanking(token);
          set({
            personalRanking: response.data.data || {},
            isLoading: false,
            lastUpdated: new Date(),
          });
          return response;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Fetch all analytics at once
      fetchAllAnalytics: async (token) => {
        set({ isLoading: true, error: null });
        try {
          await Promise.all([
            get().fetchStudentStats(token),
            get().fetchSubjectPerformance(token),
            get().fetchPerformanceTrends(token),
            get().fetchAccuracyMatrix(token),
            get().fetchConsistencyMetrics(token),
            get().fetchPersonalRanking(token),
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