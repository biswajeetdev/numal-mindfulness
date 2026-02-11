import { sessions } from "@/utils/sessions";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  AccountSection,
  SessionExplorerCard,
  SessionHistoryCard,
} from "@/components/session";
import { useSessions } from "@/hooks/useSessions";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/colors";

export default function Index() {
  const { user } = useUser();
  const { sessions: sessionHistory, error: fetchError, refetch: fetchSessions } = useSessions();

  return (
    <ParallaxScrollView>
      <Text style={styles.sectionTitle}>Explore Sessions</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {sessions.map((session) => (
          <SessionExplorerCard key={session.id} session={session} />
        ))}
      </ScrollView>

      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        <Pressable onPress={fetchSessions}>
          <Ionicons
            name="refresh-circle-sharp"
            size={32}
            color={colors.primary}
          />
        </Pressable>
      </View>

      {fetchError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{fetchError}</Text>
          <Pressable onPress={fetchSessions}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {sessionHistory.length > 0 ? (
        sessionHistory.map((session) => (
          <SessionHistoryCard key={session.$id} session={session} />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No sessions found</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Account</Text>
      <AccountSection user={user} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContainer: { paddingLeft: 16, gap: 16 },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  emptyState: { alignItems: "center", paddingVertical: 32 },
  emptyText: { fontSize: 16, opacity: 0.6 },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fef2f2",
    borderRadius: 12,
  },
  errorText: {
    fontSize: 14,
    color: "#b91c1c",
    flex: 1,
  },
  retryText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
});
