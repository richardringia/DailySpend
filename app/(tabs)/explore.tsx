import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useAuthContext } from "~/hooks/useAuthContext";

export default function TabTwoScreen() {
  const { user, isLoggedIn } = useAuthContext((state) => state);

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6">
      {isLoggedIn ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{user?.email}</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Card Content</Text>
          </CardContent>
          <CardFooter>
            <Text>Card Footer</Text>
          </CardFooter>
        </Card>
      ) : (
        <Text>Please login to view this page</Text>
      )}
    </View>
  );
}
