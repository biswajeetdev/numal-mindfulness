import { ApiError, apiGet } from "@/utils/apiClient";
import { createSession } from "@/utils/appwrite";
import { ConversationResponse } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Gradient } from "../gradient";
import Button from "./Buttons";

type ConversationPayload = { conversation: ConversationResponse };

export default function SummaryScreen() {
    const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
    const [conversation, setConversation] = useState<ConversationResponse>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { user } = useUser();
    const [isSaving, setIsSaving] = useState(false);

    const getSummary = useCallback(async () => {
        if (!conversationId) return;
        setErrorMessage(null);
        setIsLoading(true);
        try {
            const data = await apiGet<ConversationPayload>(
                `/api/conversations?conversationId=${encodeURIComponent(conversationId)}`
            );
            setConversation(data.conversation);
        } catch (e) {
            const msg =
                e instanceof ApiError
                    ? e.message
                    : e instanceof Error
                      ? e.message
                      : "Failed to load conversation summary.";
            setErrorMessage(msg);
        } finally {
            setIsLoading(false);
        }
    }, [conversationId]);

    useEffect(() => {
        getSummary();
    }, [getSummary]);

    async function saveAndContinue() {

        try {
            setIsSaving(true);
            if (!user?.id) throw new Error("You must be signed in to save.");
            await createSession({
                user_id: user.id,
                status: conversation?.status ?? "in-progress",
                conv_id: conversationId,
                tokens: Number(conversation?.metadata?.cost),
                call_duration_secs: Number(conversation?.metadata?.call_duration_secs),
                transcript:
                    conversation?.transcript
                        ?.map((t) => (t as { message?: string }).message ?? "")
                        .join("\n") ?? "",
                call_summary_title: conversation?.analysis?.call_summary_title ?? "Session Summary",
            });
            router.dismissAll();
        } catch (e) {
            setErrorMessage(
                e instanceof Error ? e.message : "Failed to save session."
            );
        } finally {
            setIsSaving(false)
        }
    }
    

    return (
        <>
            <Gradient position="bottom" isSpeaking={false} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {errorMessage && (
                    <View style={{ gap: 16, paddingBottom: 16 }}>
                        <Text style={[styles.subtitle, { color: "#c00" }]}>
                            {errorMessage}
                        </Text>
                        <Button onPress={getSummary}>Retry</Button>
                    </View>
                )}
                {isLoading && !conversation && (
                    <Text style={styles.subtitle}>Loading summary...</Text>
                )}
        {conversation?.status !== "done" &&
            conversation?.status !== "failed" &&
            !errorMessage && (
                <View style={{ gap: 16, paddingBottom: 16 }}>
                    <Text style={styles.title}>
                        We are processing your call...
                    </Text>
                    <Text style={styles.subtitle}>
                        This may take a few minutes.
                    </Text>
                    <Text style={styles.subtitle}>
                        Current Status: {conversation?.status}
                    </Text>
                    <Button onPress={getSummary}>Refresh</Button>
                </View>
            )}
        {conversation?.status === "failed" && !errorMessage && (
            <View style={{ gap: 16, paddingBottom: 16 }}>
                <Text style={styles.title}>Conversation ended early</Text>
                <Text style={styles.subtitle}>
                    This session did not complete (e.g. quota limit or
                    connection issue). You can save what we have or go back.
                </Text>
                <Text style={styles.subtitle}>
                    Reason:{" "}
                    {conversation?.metadata?.termination_reason ??
                        conversation?.metadata?.error?.reason ??
                        "Unknown"}
                </Text>
            </View>
        )}
        {(conversation?.status === "done" ||
            conversation?.status === "failed") && (
            <View style={{ gap: 16, paddingBottom: 16 }}>
                <Text style={styles.caption}>{conversationId}</Text>
                <Text style={styles.title}>
                    {conversation?.analysis?.call_summary_title}
                </Text>
                <Text style={styles.subtitle}>
                    {conversation?.analysis?.transcript_summary.trim()}
                </Text>
                <Text style={styles.title}>Status</Text>
                <Text style={styles.subtitle}>
                    {conversation?.metadata?.call_duration_secs} seconds
                </Text>
                <Text style={styles.subtitle}>
                    {conversation?.metadata?.cost} tokens
                </Text>
                <Text style={styles.subtitle}>
                    {new Date(
                        conversation?.metadata?.start_time_unix_secs! * 1000
                    ).toLocaleString()}
                </Text>
                <Text style={styles.title}>Transcript</Text>
                <Text style={styles.subtitle}>
                    {conversation?.transcript.map((t) => t.message).join("\n")}
                </Text>
            </View>
        )}
        <View style={{ alignItems: "center", gap: 12 }}>
            <Button onPress={saveAndContinue} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save and Continue"}
            </Button>
            {conversation?.status === "failed" && (
                <Button
                    onPress={() => router.dismissAll()}
                    disabled={isSaving}
                >
                    Go back without saving
                </Button>
            )}
        </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 24, fontWeight: "bold" },
    subtitle: { fontSize: 16 },
    caption: { fontSize: 12, color: "gray" },
});