import { AuthModel, AuthRecord } from "pocketbase";
import { createStore } from "zustand";
import { usePocketbaseContext } from "~/hooks/usePocketbaseContext";

export interface AuthProps {
  user: AuthRecord | null;
  isInitialized: boolean;
  isLoggedIn: boolean;
}

export interface AuthState extends AuthProps {
  init: (user: AuthRecord | null, isLoggedIn: boolean) => void;
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | { user: AuthModel; error?: undefined }
    | { error: unknown; user?: undefined }
  >;
  signOut: () => void;
}

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = () => {
  const pb = usePocketbaseContext((state) => state.pb);
  return createStore<AuthState>()((set) => ({
    user: null,
    isInitialized: false,
    isLoggedIn: false,
    init: (user: AuthRecord | null, isLoggedIn: boolean) => {
      set({ user, isLoggedIn, isInitialized: true });
    },
    signIn: async (email: string, password: string) => {
      try {
        const response = await pb
          ?.collection("users")
          .authWithPassword(email, password);

        set({
          user: pb?.authStore.record,
          isLoggedIn: true,
        });

        return { user: response?.record };
      } catch (e) {
        return { error: e };
      }
    },
    signOut: () => {
      pb?.authStore.clear();
      set({ user: null, isLoggedIn: false });
    },
  }));
};
