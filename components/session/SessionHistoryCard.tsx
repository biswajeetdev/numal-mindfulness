import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/utils/colors";
import type { RemoteSessionDocument } from "@/types/session";

interface Props {
  session: RemoteSessionDocument;
}

export function SessionHistoryCard({ session }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const randomEmoji = useMemo(() => {
    const emojis = ["🌿", "🌊", "🌤️", "🌙", "✨", "🍃", "🧘"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{randomEmoji}</Text>
      <Text style={styles.title}>{session.call_summary_title}</Text>

      {isExpanded ? (
        <>
          <Text style={styles.transcript}>{session.transcript}</Text>
          <Pressable onPress={() => setIsExpanded(false)}>
            <Text style={styles.readMore}>Read less</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={() => setIsExpanded(true)}>
          <Text style={styles.readMore}>Read more</Text>
        </Pressable>
      )}

      <Text style={styles.meta}>
        {session.call_duration_secs} seconds, {session.tokens} tokens
      </Text>
      <Text style={styles.meta}>
        {new Date(session.$createdAt).toLocaleDateString("en-US", {
          weekday: "long",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "white",
    gap: 8,
  },
  emoji: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: "bold" },
  transcript: { fontSize: 16 },
  readMore: { fontSize: 16, color: colors.primary },
  meta: { fontSize: 14, opacity: 0.6 },
});
