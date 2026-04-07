import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adminService } from "../../services/api.service.js";
import useAuthStore from "../user-auth-store/useAuthStore";

const initialState = {
  TestMetaData: {},
  isLoading: false,
  error: null,
};

const createTest = (set) => async (testData) => {
  console.log("In admin test store create test", testData);
  try {
    set({ isLoading: true, error: null });
    const token = useAuthStore.getState().user?.accessToken;
    const response = await adminService.createTest(testData, token);
    if (response.status === 200) {
      set({ isLoading: false, error: null });
    }
    return response;  
  } catch (error) {
    set({ isLoading: false, error: error.response?.data?.message || error.message });
  }
};

const createProblemSet = (set) => async (problemSet) => {
  try {
    set({ isLoading: true, error: null });
    const token = useAuthStore.getState().user?.accessToken;
    const response = await adminService.createProblemSet(problemSet, token);
    if (response.status === 200) {
      set({ isLoading: false, error: null });
    }
    return response;
  } catch (error) {
    set({ isLoading: false, error: error.response?.data?.message || error.message });
  }
};

const getProblemSet = (set) => async () => {
  try {
    set({ isLoading: true, error: null });
    const token = useAuthStore.getState().user?.accessToken;
    const response = await adminService.getProblemSet(token);
    if (response.status === 200) {
      set({ TestMetaData: response.data.data });
    }
    return response;
  } catch (error) {
    set({ isLoading: false, error: error.response?.data?.message || error.message });
  }
};

const useAdminTestStore = create(
  persist((set, get) => ({
    ...initialState,
    createTest: createTest(set),
    createProblemSet: createProblemSet(set),
    getProblemSet: getProblemSet(set),
  })),
  {
    name: "admin-test-store",
  }
);

export default useAdminTestStore;
