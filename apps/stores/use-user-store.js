import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTokenStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));

export const useUserStore = create((set) => ({
  userInfo: null,
  isLoading: true,
  setUserInfo: (userData) => set({ userInfo: userData }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  fetch: async ({ user }) => {
    const res = await fetch(user);
    set({ userInfo: await res.json() });
  },
}));
