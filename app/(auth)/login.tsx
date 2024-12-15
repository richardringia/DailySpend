import { useRouter } from "expo-router";
import { Alert, View } from "react-native";
import { create } from "zustand";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H1, Muted } from "~/components/ui/typography";
import { useAuthContext } from "~/hooks/useAuthContext";

interface LoginFormState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const useLoginFormStore = create<LoginFormState>((set) => ({
  email: "",
  password: "",
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
}));

export default function LoginScreen() {
  const router = useRouter();

  const signIn = useAuthContext((state) => state.signIn);
  const { email, password, setEmail, setPassword } = useLoginFormStore();

  return (
    <View className="flex-1 justify-center items-center">
      <View className="p-4 native:pb-32 max-w-md gap-6">
        <View className="gap-1">
          <H1 className="text-foreground text-center">Login</H1>
          <Muted className="text-base text-center">
            Enter you email below to create your account
          </Muted>
        </View>
        <Input
          placeholder="name@example.com"
          autoCapitalize="none"
          nativeID="email"
          onChangeText={setEmail}
        />
        <Input
          placeholder="password"
          secureTextEntry={true}
          nativeID="password"
          onChangeText={setPassword}
        />
        <Button
          onPress={async () => {
            if (email && password) {
              const resp = await signIn(email, password);

              if (resp?.user) {
                router.replace("/(tabs)/explore");
              } else {
                //@ts-ignore
                Alert.alert("Login Error", resp.error?.message);
              }
            }
          }}
        >
          <Text>Login</Text>
        </Button>
      </View>
    </View>
  );
}
