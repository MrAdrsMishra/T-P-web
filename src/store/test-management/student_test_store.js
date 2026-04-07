import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, studentService } from "../../services/api.service.js";
import useAuthStore from "../user-auth-store/useAuthStore";

const initialState = {
  date: new Date(),
  OngoingTestsInfo: [],
  ongoingTestData: {},
  assignments: [],
  testHistory: [],
  isLoading: false,
  error: null,
  status: null,
};

const getAllOngoingTestsInfo = (set) => async () => {
  set({ isLoading: true, error: null });
  try {
    const token = useAuthStore.getState().user?.accessToken;
    const res = await authService.getOngoingTestsInfo(token);
    
    // Handle response structure: { statusCode, data: { results, page, limit, total, totalPages }, message }
    const testsData = res.data?.data?.results || [];
    const testsArray = Array.isArray(testsData) ? testsData : [];
    
    set({
      OngoingTestsInfo: testsArray,
      date: new Date(),
      isLoading: false,
      status: true,
    });
    return res;
  } catch (error) {
    console.error("getAllOngoingTestsInfo error:", error);
    set({
      OngoingTestsInfo: [],
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status: false,
    });
  }
};

const submitTest = (set) => async (StudentTestData) => {
  set({ isLoading: true, error: null, status: null });
  try {
    const token = useAuthStore.getState().user?.accessToken;
    const res = await studentService.submitTest(StudentTestData, token);
    if (res.status === 200) {
      set({ date: new Date(), isLoading: false, status: true });
    }
    return res;
  } catch (error) {
    set({
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status: false,
    });
  }
};

const getTestHistory = (set) => async () => {
  set({ isLoading: true, error: null, status: null });
  try {
    const token = useAuthStore.getState().user?.accessToken;
    const res = await studentService.getTestHistory(token);
    
    // Handle response structure: { statusCode, data, message }
    const historyData = res.data?.data || [];
    
    set({
      date: new Date(),
      isLoading: false,
      status: true,
    });
    return res;
  } catch (error) {
    console.error("getTestHistory error:", error);
    set({
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status: false,
    });
  }
};

/**
 * Fetch full test data with questions/problems for a specific test
 */
const getTestData = (set) => async (testId) => {
  if (!testId) {
    set({
      error: "Test ID is required",
      isLoading: false,
      status: false,
      ongoingTestData: {},
    });
    return;
  }

  set({ isLoading: true, error: null, status: null });
  try {
    const token = useAuthStore.getState().user?.accessToken;
    const res = await authService.getOngoingTestData(testId, token);
    
    // Handle response structure: { statusCode, data, message }
    const testData = res.data?.data || {};
    
    set({
      ongoingTestData: testData,
      date: new Date(),
      isLoading: false,
      status: true,
    });
    return res;
  } catch (error) {
    console.error("getTestData error:", error);
    set({
      ongoingTestData: {},
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status: false,
    });
  }
};

/**
 * Fetch all assignments for the student
 * NOTE: Backend endpoint /student/get-all-assignments needs to be implemented
 */
const getAllAssignments = (set) => async () => {
  set({ isLoading: true, error: null, status: null });
  try {
    const token = useAuthStore.getState().user?.accessToken;
    // TODO: Implement backend endpoint: GET /student/get-all-assignments
    console.warn("getAllAssignments: Backend endpoint not yet implemented");
    
    set({
      assignments: [],
      date: new Date(),
      isLoading: false,
      status: false,
    });
  } catch (error) {
    console.error("getAllAssignments error:", error);
    set({
      assignments: [],
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status: false,
    });
  }
};

const useStudentTestStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      getTestData: getTestData(set),
      getAllOngoingTestsInfo: getAllOngoingTestsInfo(set),
      getTestHistory: getTestHistory(set),
      getAllAssignments: getAllAssignments(set),
      submitTest: submitTest(set),
    }),
    { name: "student-test-store" }
  )
);

export default useStudentTestStore;
