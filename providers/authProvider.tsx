import { AuthContext } from "@/contexts/authContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { usePocketbaseContext } from "@/hooks/usePocketbaseContext";
import { AuthProps, AuthStore, createAuthStore } from "@/stores/authStore";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

export type AuthProviderProps = React.PropsWithChildren<Partial<AuthProps>>;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AuthStore>();

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthContext.Provider value={storeRef.current}>
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </AuthContext.Provider>
  );
}

export function InnerAuthProvider({ children }: { children: React.ReactNode }) {
  const pb = usePocketbaseContext((state) => state.pb);
  const auth = useAuthContext((state) => state);
  useEffect(() => {
    auth.init(pb?.authStore.record ?? null, pb.authStore.isValid);
  }, [pb]);

  if (!auth.isInitialized) {
    return null;
  }

  return <>{children}</>;
}
