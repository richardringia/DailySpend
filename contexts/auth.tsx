// import {
//   AuthProps,
//   AuthState,
//   AuthStore,
//   createAuthStore,
// } from "@/stores/auth-store";
// import { createContext, useRef } from "react";

// export const AuthContext = createContext<AuthState | null>(null);

// type AuthProviderProps = React.PropsWithChildren<AuthProps>;

// function AuthProvider({ children, ...props }: AuthProviderProps) {
//   const storeRef = useRef<AuthStore>();
//   if (!storeRef.current) {
//     storeRef.current = createAuthStore(props);
//   }
//   return (
//     <AuthContext.Provider value={storeRef.current}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// import { AuthProps, AuthStore, createAuthStore } from "@/stores/authStore";
// import { createContext } from "react";
// import { useRef } from "react";

// export const AuthContext = createContext<AuthStore | null>(null);
