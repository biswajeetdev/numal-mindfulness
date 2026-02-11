/**
 * Root layout for web.
 * Mirrors app/_layout.native.tsx so auth, providers, and navigation
 * behave consistently across platforms.
 * ElevenLabsProvider is native-only; web uses Stack without it.
 */
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { config } from "@/utils/config";

function RootLayoutWithAuth() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={config.clerk.publishableKey}>
      <RootLayoutWithAuth />
    </ClerkProvider>
  );
}
