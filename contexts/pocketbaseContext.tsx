import { PocketbaseStore } from "@/stores/pocketbaseStore";
import { createContext } from "react";

export const PocketbaseContext = createContext<PocketbaseStore | null>(null);
