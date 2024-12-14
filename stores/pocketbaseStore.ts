import { createStore } from "zustand";
import PocketBase from "pocketbase";

export interface PocketbaseProps {
  pb: PocketBase;
}

export interface PocketbaseState extends PocketbaseProps {}

export type PocketbaseStore = ReturnType<typeof createPocketbaseStore>;

export const createPocketbaseStore = (initProps: PocketbaseProps) => {
  return createStore<PocketbaseState>()((set) => ({
    ...initProps,
  }));
};
