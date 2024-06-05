import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

const authStore = createStore<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearAuth: () => set({ user: null, token: null }),
}));

const useAuthStore = () => useStore(authStore);

export default useAuthStore;
export { authStore };
