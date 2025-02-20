import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      if (res.data && res.data.user) {
        set({ authUser: res.data.user });
        initializeSocket(res.data.user._id);
        toast.success("Account created successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      if (res.data && res.data.user) {
        set({ authUser: res.data.user });
        initializeSocket(res.data.user._id);
        toast.success("Logged in successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        disconnectSocket();
        set({ authUser: null });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
	try {
	  const res = await axiosInstance.get("/auth/me");
	  initializeSocket(res.data.user._id);
	  set({ authUser: res.data.user });
	} catch (error) {
	  console.error("Auth check failed:", error); // ✅ Logs the error to the console
	  set({ authUser: null });
	} finally {
	  set({ checkingAuth: false });
	}
  },
  
  setAuthUser: (user) => set({ authUser: user }),
}));
