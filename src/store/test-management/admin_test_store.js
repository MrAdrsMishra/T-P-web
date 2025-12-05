import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useAuthStore from "../user-auth-store/useAuthStore";

const api = axios.create({
 
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1/test`,
  withCredentials: true,
});
const initialState = {
  testData: [],
  isLoading: false,
  error: null,
};

const withAuth = () => {
  const user = useAuthStore.getState().user;
  return {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  };
};
const createTest = (set) => async (testData) => {
  console.log("In admin test store create test", testData);
  try {
    set({ isLoading: false, error: null });
    const response = await api.post(
      "/admin/create-test",
      {testData},
      withAuth
    );
    if (response.status == 200) {
      set({ isLoading: false, error: null });
    }
    return response;  
  } catch (error) {
    set({isLoading:false, error:error.response?.data?.message|| error.message})
  }
};
const createProblemSet = (set) => async (problemSet) => {
 try {
    set({ isLoading: false, error: null });
    const response = await api.post(
      "/admin/create-problem-set",
      problemSet,
      withAuth
    );
    if (response.status == 200) {
      set({ isLoading: false, error: null });
    }
    return response;
  } catch (error) {
    set({isLoading:false, error:error.response?.data?.message|| error.message})
  }
};
const useAdminTestStore = create(
  persist((set, get) => ({
    createTest: createTest(set),
    createProblemSet: createProblemSet(set),
  })),
  {
    name: "admin-test-store",
  }
);
export default useAdminTestStore;
