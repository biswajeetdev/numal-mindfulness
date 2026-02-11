import { Stack } from "expo-router";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/** Authenticated routes - wrap with error boundary to catch render errors */
export default function ProtectedLayout() {
  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }} />
    </ErrorBoundary>
  );
}