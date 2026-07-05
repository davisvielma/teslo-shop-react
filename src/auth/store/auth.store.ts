import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.ation";
import { checkAuthAction } from "../actions/check-auth.ation";
import { registerAction } from "../actions/register.ation";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

interface AuthState {
  // properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  // getters
  isAdmin: () => boolean;
  // actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",
  isAdmin: () => {
    const user = get().user?.roles || [];
    return user.includes("admin");
  },
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction({ email, password });
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
  register: async (email: string, password: string, fullName: string) => {
    try {
      const data = await registerAction({ email, password, fullName });
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
    return true;
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user, token, authStatus: "authenticated" });
      return true;
    } catch {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
}));
