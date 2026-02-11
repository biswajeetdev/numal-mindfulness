import { Stack } from "expo-router";

/** Unauthenticated routes: sign-in, sign-up, landing */
/** Unauthenticated routes: sign-in, sign-up, landing */
export default function PublicLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}