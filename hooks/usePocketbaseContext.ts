import { PocketbaseContext } from "@/contexts/pocketbaseContext";
import { PocketbaseState } from "@/stores/pocketbaseStore";
import { useContext } from "react";
import { useStore } from "zustand";

export function usePocketbaseContext<T>(
  selector: (state: PocketbaseState) => T
): T {
  const store = useContext(PocketbaseContext);
  if (!store) throw new Error("Missing PocketbaseContext.Provider in the tree");
  return useStore(store, selector);
}
