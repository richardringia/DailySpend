import { Image, StyleSheet, Platform, View, Text } from "react-native";

import Animated, { useAnimatedRef } from "react-native-reanimated";
import { usePocketbaseContext } from "~/hooks/usePocketbaseContext";
import { useRouter } from "expo-router";
import { useAuthContext } from "~/hooks/useAuthContext";
import { Button } from "~/components/ui/button";
import { useBottomTabOverflow } from "~/components/ui/TabBarBackground";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { signOut, isLoggedIn } = useAuthContext((state) => state);
  const router = useRouter();

  return (
    <SafeAreaView>
      {isLoggedIn ? (
        <Button onPress={() => signOut()}>
          <Text>Logout</Text>
        </Button>
      ) : (
        <Button onPress={() => router.push("/login")}>
          <Text>Login</Text>
        </Button>
      )}
      <Button onPress={() => router.push("/expenses")}>
        <Text>Expenses</Text>
      </Button>
    </SafeAreaView>
  );
}
