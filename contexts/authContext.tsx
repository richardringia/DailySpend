import { AuthStore } from "~/stores/authStore";
import { createContext } from "react";

export const AuthContext = createContext<AuthStore | null>(null);
