import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import SignOutButton from "@/components/clerk/SignOutButton";
import type { UserResource } from "@clerk/types";

interface Props {
  user: UserResource | null | undefined;
}

export function AccountSection({ user }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.imageUrl }}
        style={styles.avatar}
      />
      <Text style={styles.name}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={styles.email}>
        {user?.emailAddresses[0]?.emailAddress}
      </Text>
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "white",
    gap: 8,
    marginBottom: 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { fontSize: 16 },
});
