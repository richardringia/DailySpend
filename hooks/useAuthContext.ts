import { AuthContext } from "@/contexts/authContext";
import { AuthState } from "@/stores/authStore";
import { useContext } from "react";
import { useStore } from "zustand";

export function useAuthContext<T>(selector: (state: AuthState) => T): T {
  const store = useContext(AuthContext);
  if (!store) throw new Error("Missing AuthContext.Provider in the tree");
  return useStore(store, selector);
}
