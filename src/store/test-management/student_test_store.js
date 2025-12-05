import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1/test`,
  withCredentials: true,
});

const initialState = {
  date: new Date(),
  OngoingTestsInfo: [],
  ongoingTestData: {},
  isLoading: false,
  error: null,
  status: null,
};

const getAllOngoingTestsInfo = (set) => async () => {
  set({ isLoading: true, error: null });
  try {
    // console.log("Fetching call api initiated from student-store.jsx ongoing tests data...");
    const res = await api.get("/student/get-all-ongoing-tests");
    // console.log("Ongoing tests fetched:", res.data.data,"  type:",Array.isArray(res.data.data));
    set({
      OngoingTestsInfo: res.data.data || [],
      date: new Date(),
      isLoading: false,
    });
    return res;
  } catch (error) {
    console.error("getAllOngoingTestsInfo error:", error);
    set({
      error: error.response?.data?.message || error.message,
      isLoading: false,
    });
  }
};

const submitTest = (set) => async (StudentTestData) => {
  set({ isLoading: true, error: null ,status:null});
  try {
    const res = await api.post("/student/submit-test-data", StudentTestData, {
      "Content-Type": "application/json",
    });
    if(res.status === 200) {
      set({ date: new Date(), isLoading: false,status:true });
    }
  } catch (error) {
    set({
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status:false
    });
  }
};

const allAppearedTestsHistory = (set) => async () => {
  set({ isLoading: true, error: null, status: null });
  try {
    await api.get("/student/all-appeared-tests-history");
    set({ date: new Date(), isLoading: false ,status:true});
  } catch (error) {
    set({
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status:false
    });
  }
};

const getAllAssignments = (set) => async () => {
  set({ isLoading: true, error: null ,status:null});
  try {
    await api.get("/student/get-all-assignments");
    set({ date: new Date(), isLoading: false, status:true });
  } catch (error) {
    set({
      error: error.response?.data?.message || error.message,
      isLoading: false,
      status:false
    });
  }
};

const getTestData = (set) => async (testId) => {
  set({ isLoading: true, error: null, status: null });
  try {
    console.log("testId in store:", testId);
    const res = await api.get("/student/get-test-data", {
      params: { testId },
    });
    set({
      ongoingTestData: res.data.data || {},
      date: new Date(),
      isLoading: false,
      status: true,
    });
  } catch (error) {
    set({
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
      getAllAssignments: getAllAssignments(set),
      getAllOngoingTestsInfo: getAllOngoingTestsInfo(set),
      allAppearedTestsHistory: allAppearedTestsHistory(set),
      submitTest: submitTest(set),
    }),
    { name: "student-test-store" }
  )
);

export default useStudentTestStore;
