import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
    withCredentials: true,
});

const initialState = {
  user: {
    _id: null,
    email: null,
    role: null,
    accessToken: null,
  },
  studentProfile: {
    fullName: null,
    enrollment: null,
    branch: null,
    batch: null,
    total_test_appeared: null,
    average_score: null,
    last_test_date: null,
    photo: null,
    phone: null,
    social_Links: {
      LinkedIn: null,
      GitHub: null,
      LeetCode: null,
      GeekForGeeks: null,
    },
  },
  adminProfile: {
    fullName: null,
    subject: [],
    phone: null,
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const registerAdmin = (set) => async (credentials) => {
  set({ isLoading: true, error: null });
  try {
    console.log(api)
    const res = await api.post("/register-admin", credentials);
    set({ isLoading: false });
    return res;
  } catch (err) {
    set({
      error: err.response?.data?.message || err.message,
      isLoading: false,
    });
  }
};

const login = (set, get) => async (credentials) => {
  set({ isLoading: true, error: null });
  try {
    const res = await api.post("/login", credentials);
    // console.log("Login response:", res);
    const { _id, email, role } = res?.data?.data?.user || {};
    const { accessToken } = res?.data?.data || {};

    set({
      user: { _id, email, role, accessToken },
    });

    if (role === "Student") {
      const u = res?.data?.data?.user;
      console.log("Student profile data on login:", u.social_links);
      set({
        studentProfile: {
          fullName: u?.fullName || null,
          enrollment: u?.enrollment || null,
          branch: u?.branch || null,
          batch: u?.batch || null,
          total_test_appeared: u?.total_test_appeared || null,
          average_score: u?.average_score || null,
          last_test_date: u?.last_test_date || null,
          photo: u?.photo || null,
          phone: u?.phone || null,
          social_Links: {
            LinkedIn: u?.social_links?.LinkedIn || null,
            GitHub: u?.social_links?.Github || null,
            LeetCode: u?.social_links?.Leetcode || null,
            GeekForGeeks: u?.social_links?.GeekForGeeks || null,
          },
        },
      });
    } else if (role === "Admin") {
      const u = res?.data?.data?.user;

      set({
        adminProfile: {
          fullName: u?.fullName || null,
          subject: u?.subject || [],
          phone: u?.phone || null,
        },
      });
    }

    set({ isLoggedIn: true, isLoading: false, error: null });
    return res;
  } catch (err) {
    set({
      error: err.response?.data?.message || err.message,
      isLoading: false,
    });
  }
};

const updateUserProfile = (set, get) => async (updatedData) => {
  try {
    set({ isLoading: true, error: null });
    const { user, studentProfile } = get();
    const res = await api.post("/update-user-profile", updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });

    const { _id, email, role } = res?.data?.data || {};
    set({
      user: { ...user, _id, email, role },
    });
    if (user?.role === "Student") {
      const u = res?.data?.data;
      set({
        studentProfile: {
          ...studentProfile,
          fullName: u?.fullName || null,
          enrollment: u?.enrollment || null,
          branch: u?.branch || null,
          batch: u?.batch || null,
          total_test_appeared: u?.total_test_appeared || null,
          average_score: u?.average_score || null,
          last_test_date: u?.last_test_date || null,
          photo: u?.photo || null,
          phone: u?.phone || null,
          social_Links: {
            LinkedIn: u?.social_links?.LinkedIn || null,
            GitHub: u?.social_links?.Github || null,
            LeetCode: u?.social_links?.Leetcode || null,
            GeekForGeeks: u?.social_links?.GeekForGeeks || null,
          },
//           GeekorGeeks
// : 
// "https://www.geeksforgeeks.org/user/adrshmisgp2e/"
// Github
// : 
// "https://github.com/MrAdrsMishra"
// Leetcode
// : 
// "https://leetcode.com/u/Mr_Adrs_Misra"
// LinkedIn
// :
        },
      });
    }
    if (user?.role === "Admin") {
      const u = res?.data?.data;
      set({
        adminProfile: {
          ...adminProfile,
          fullName: u?.fullName || null,
          subject: u?.subject || [],
          phone: u?.phone || null,
        },
      });
    }
    set({ isLoading: false });
    const obj = get();
    console.log(obj);
    return res;
  } catch (error) {
    set({
      error: error.response?.data?.message || error.message,
      isLoading: false,
    });
  }
};

const registerStudents = (set, get) => async (credentials) => {
  set({ isLoading: true, error: null });
  const { user } = get();

  try {
    const res = await api.post("/register-student", credentials, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    set({ isLoading: false });
    return res;
  } catch (err) {
    set({
      error: err.response?.data?.message || err.message,
      isLoading: false,
    });
  }
};

const logout = (set, get) => async () => {
  const { user } = get();

  try {
    if (user?.accessToken) {
      await api.post(
        "/logout",
        {},
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
    }
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
  } finally {
    set({ ...initialState });
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      registerAdmin: registerAdmin(set),
      login: login(set, get),
      updateUserProfile: updateUserProfile(set, get),
      registerStudents: registerStudents(set, get),
      logout: logout(set, get),
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
