import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { practiceService, handleApiError } from '@/services/api.service';

/**
 * Practice & Coding Problems Store
 * Manages code execution, problem-solving, and practice history
 */
export const usePracticeStore = create(
  persist(
    (set, get) => ({
      // Code Editor State
      code: '',
      language: 'javascript',
      input: '',
      output: '',
      executionTime: 0,
      memory: 0,

      // Problems State
      currentProblem: null,
      problems: [],
      selectedProblemId: null,

      // Execution State
      isExecuting: false,
      executionError: null,
      executionSuccess: false,
      executionHistory: [],

      // Submission State
      isSubmitting: false,
      submissionResult: null,
      submissions: [],

      // General State
      isLoading: false,
      error: null,
      success: null,

      // =============== CODE EXECUTION ===============
      executeCode: async (token, codeData) => {
        set({ isExecuting: true, executionError: null, executionSuccess: false });
        try {
          const response = await practiceService.runCode(codeData, token);
          const result = response.data.data;

          // Add to history
          const currentHistory = get().executionHistory;
          set({
            output: result.output || '',
            executionTime: result.time || 0,
            memory: result.memory || 0,
            executionSuccess: result.status === 'success',
            isExecuting: false,
            executionHistory: [
              ...currentHistory,
              {
                timestamp: new Date(),
                code: codeData.code,
                language: codeData.language,
                ...result,
              },
            ].slice(-20), // Keep only last 20 executions
          });
          return result;
        } catch (error) {
          const { message } = handleApiError(error);
          set({
            executionError: message,
            executionSuccess: false,
            isExecuting: false,
          });
          return null;
        }
      },

      // =============== CODE MANAGEMENT ===============
      setCode: (code) => set({ code }),
      setLanguage: (language) => set({ language }),
      setInput: (input) => set({ input }),
      clearCode: () =>
        set({
          code: '',
          input: '',
          output: '',
          executionError: null,
          executionSuccess: false,
        }),

      // =============== PROBLEMS MANAGEMENT ===============
      selectProblem: (problemId) => set({ selectedProblemId: problemId }),

      // =============== EXECUTION HISTORY ===============
      getExecutionHistory: () => get().executionHistory,
      clearExecutionHistory: () =>
        set({
          executionHistory: [],
          output: '',
          executionError: null,
        }),

      // =============== SUBMISSION MANAGEMENT ===============
      submit: async (token, submissionData) => {
        set({ isSubmitting: true, error: null, success: null });
        try {
          const response = await practiceService.runCode(submissionData, token);
          const result = response.data.data;

          // Add to submissions
          const currentSubmissions = get().submissions;
          set({
            submissionResult: result,
            isSubmitting: false,
            success: 'Code submitted successfully!',
            submissions: [
              ...currentSubmissions,
              {
                timestamp: new Date(),
                problemId: submissionData.problemId,
                language: submissionData.language,
                ...result,
              },
            ].slice(-10), // Keep only last 10 submissions
          });
          return result;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isSubmitting: false });
          return null;
        }
      },

      getSubmissions: () => get().submissions,
      clearSubmissions: () => set({ submissions: [], submissionResult: null }),

      // =============== ERROR HANDLING ===============
      clearError: () => set({ error: null, executionError: null }),
      clearSuccess: () => set({ success: null, executionSuccess: false }),
    }),
    { name: 'practice-store' }
  )
);

/**
 * Code Template Store - Predefined templates for different languages
 */
export const useCodeTemplateStore = create((set) => ({
  templates: {
    javascript: `function solution(input) {
  // Write your code here
  
  return result;
}`,
    python: `def solution(input):
    # Write your code here
    
    return result`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}`,
    java: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`,
    c: `#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`,
  },

  getTemplate: (language) => {
    const templates = get().templates;
    return templates[language] || templates.javascript;
  },
}));