import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

// updated the store with PERSIST
const authStore = createStore(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // using localStorage to persist authstate
    }
  )
);

const useAuthStore = () => useStore(authStore);

export default useAuthStore;
export { authStore };
