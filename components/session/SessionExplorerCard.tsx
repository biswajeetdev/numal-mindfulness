import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { LocalSession } from "@/types/session";

interface Props {
  session: LocalSession;
}

export function SessionExplorerCard({ session }: Props) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/session",
          params: { sessionId: session.id },
        })
      }
    >
      <Image
        source={session.image}
        style={styles.image}
        contentFit="cover"
        transition={800}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{session.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  textContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
