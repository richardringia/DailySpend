import { PocketbaseContext } from "@/contexts/pocketbaseContext";
import {
  PocketbaseStore,
  createPocketbaseStore,
} from "@/stores/pocketbaseStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import { useRef } from "react";

export function PocketbaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = new AsyncAuthStore({
    save: async (serialized) => AsyncStorage.setItem("pb_auth", serialized),
    initial: AsyncStorage.getItem("pb_auth"),
    clear: async () => AsyncStorage.removeItem("pb_auth"),
  });
  const pbInstance = new PocketBase("http://192.168.1.42:8090", store);

  const storeRef = useRef<PocketbaseStore>();
  if (!storeRef.current) {
    storeRef.current = createPocketbaseStore({
      pb: pbInstance,
    });
  }

  return (
    <PocketbaseContext.Provider value={storeRef.current}>
      {children}
    </PocketbaseContext.Provider>
  );
}
