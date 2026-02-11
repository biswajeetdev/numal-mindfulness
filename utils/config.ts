/**
 * Centralized configuration from environment variables.
 * All env access should go through this module.
 *
 * Client (EXPO_PUBLIC_*): Available in app bundle.
 * Server-only: ELEVENLABS_* used only in API routes.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim() !== "" ? value : fallback;
}

/** Client config - use in app components/screens */
export const config = {
  clerk: {
    publishableKey: requireEnv("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  },
  appwrite: {
    projectId: requireEnv("EXPO_PUBLIC_APPWRITE_APP_ID"),
    endpoint: optionalEnv("EXPO_PUBLIC_APPWRITE_ENDPOINT", "https://nyc.cloud.appwrite.io/v1"),
    dbId: optionalEnv("EXPO_PUBLIC_APPWRITE_DB_ID", "697e32630002bb152aef"),
    collectionId: optionalEnv("EXPO_PUBLIC_APPWRITE_COLLECTION_ID", "test"),
    platform: optionalEnv("EXPO_PUBLIC_APPWRITE_PLATFORM", "com.anonymous.numal-mindfulness"),
  },
  agentId: requireEnv("EXPO_PUBLIC_AGENT_ID"),
  /** Base URL for this app's API routes (e.g. /api/conversations). Required for native; can be empty for web (uses relative URLs). */
  apiUrl: optionalEnv("EXPO_PUBLIC_API_URL", ""),
} as const;

/**
 * Base URL for calling this app's API routes.
 * On web with empty EXPO_PUBLIC_API_URL, returns "" so callers can use relative paths.
 * On native, must be set (e.g. http://localhost:8081 in dev, or deployed URL).
 */
export function getApiBaseUrl(): string {
  return config.apiUrl;
}

/** Server-only config - use only in API routes (app/api/*) */
export function getServerConfig() {
  return {
    elevenLabs: {
      apiKey: requireEnv("ELEVENLABS_API_KEY"),
      baseUrl: optionalEnv("ELEVENLABS_BASE_URL", "https://api.elevenlabs.io"),
    },
  };
}
