import { sessions } from "@/utils/sessions";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Gradient } from "../gradient";

/** Web fallback: voice sessions require native (iOS/Android) */
export default function SessionScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const session =
    sessions.find((s) => s.id === Number(sessionId)) ?? sessions[0];

  return (
    <>
      <Gradient position="top" isSpeaking={false} />
      <View style={styles.container}>
        <Text style={styles.title}>{session.title}</Text>
        <Text style={styles.description}>{session.description}</Text>
        <Text style={styles.message}>
          Voice sessions are available on the mobile app (iOS or Android).
          Please open this app on your phone to start a meditation session.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 24,
  },
});
