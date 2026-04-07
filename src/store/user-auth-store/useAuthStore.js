import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handleApiError,authService } from "../../services/api.service";
const initialState = {
  user: {
    _id: null,
    email: null,
    role: null,
    accessToken: null,
  },
  token: null,
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
  success: null,
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Register Admin
      registerAdmin: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.registerAdmin(credentials);
          set({ isLoading: false, success: "Admin registered successfully!" });
          return res;
        } catch (err) {
          const { message } = handleApiError(err);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Login
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.login(credentials);
          const { _id, email, role } = res?.data?.data?.user || {};
          const { accessToken } = res?.data?.data || {};

          set({
            user: { _id, email, role, accessToken },
            token: accessToken,
          });

          if (role === "Student") {
            const u = res?.data?.data?.user;
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

          set({
            isLoggedIn: true,
            isLoading: false,
            error: null,
            success: "Login successful!",
          });
          return res;
        } catch (err) {
          const { message } = handleApiError(err);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Update User Profile
      updateUserProfile: async (updatedData) => {
        set({ isLoading: true, error: null });
        try {
          const { user, studentProfile, adminProfile } = get();
          const token = user?.accessToken;

          const res = await authService.updateUserProfile(updatedData, token);
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
              },
            });
          } else if (user?.role === "Admin") {
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

          set({ isLoading: false, success: "Profile updated successfully!" });
          return res;
        } catch (error) {
          const { message } = handleApiError(error);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Register Students  
      registerStudents: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = get();
          const token = user?.accessToken;

          const res = await authService.registerStudent(credentials, token);
          set({ isLoading: false, success: "Student registered successfully!" });
          return res;
        } catch (err) {
          const { message } = handleApiError(err);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Logout
      logout: async () => {
        const { user } = get();
        const token = user?.accessToken;

        try {
          if (token) {
            await authService.logout(token);
          }
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ ...initialState });
        }
      },

      // Delete Student
      deleteStudent: async (studentId) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = get();
          const token = user?.accessToken;

          const res = await authService.deleteStudent(studentId, token);
          set({ isLoading: false, success: "Student deleted successfully!" });
          return res;
        } catch (err) {
          const { message } = handleApiError(err);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      // Clear errors
      clearError: () => set({ error: null }),
      clearSuccess: () => set({ success: null }),
    }),
    {
      name: "auth-store",
    },
  ),
);

export default useAuthStore;
