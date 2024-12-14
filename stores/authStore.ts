// import { usePocketBase } from "@/contexts/pocketbase";
// import { AuthRecord, RecordModel } from "pocketbase";
// import { createStore } from "zustand";

// export interface AuthProps {
//   user: AuthRecord | null;
//   isInitialized: boolean;
//   isLoggedIn: boolean;
// }

// export interface AuthState extends AuthProps {
//   //   appSignin: (
//   //     email: string,
//   //     password: string
//   //   ) => Promise<{
//   //     user: RecordModel | null;
//   //     error: Error | null;
//   //   }>;
//   //   appSignout: () => Promise<{ error: Error | null }>;
//   //   createAccount: (
//   //     email: string,
//   //     password: string,
//   //     passwordConfirm: string,
//   //     name: string
//   //   ) => Promise<{ user: RecordModel | null; error: Error | null }>;
// }

// export type AuthStore = ReturnType<typeof createAuthStore>;

// export const createAuthStore = (initState?: Partial<AuthProps>) => {
//   const { pb } = usePocketBase();
//   return createStore<AuthState>()((set) => ({
//     user: pb?.authStore.record ?? null,
//     isInitialized: pb?.authStore.isValid ?? false,
//     isLoggedIn: pb?.authStore.isValid ?? false,
//   }));
// };

import { usePocketbaseContext } from "@/hooks/usePocketbaseContext";
import { AuthModel, AuthRecord } from "pocketbase";
import { createStore } from "zustand";

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
