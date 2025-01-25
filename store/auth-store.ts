/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (authData: { isAuthenticated: boolean }) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,

  setAuth: (authData) => {
    set({
      isAuthenticated: authData.isAuthenticated,
    });
  },

  logout: async () => {
    const logoutMutation = useLogout();
    const router = useRouter();
    set({ loading: true });
    try {
      const response = await logoutMutation.mutateAsync();
      if (response.success) {
        set({ isAuthenticated: false });
        toast.success("Successfully logged out!");
        router.push("/");
      } else {
        toast.error("Logout failed!");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Logout failed! Please try again.");
    } finally {
      set({ loading: false });
    }
  },
}));
