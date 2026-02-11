import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { listSessions } from "@/utils/appwrite";
import type { RemoteSessionDocument } from "@/types/session";

export function useSessions() {
  const { user } = useUser();
  const [sessions, setSessions] = useState<RemoteSessionDocument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSessions = useCallback(async () => {
    if (!user) return;
    setError(null);
    setIsLoading(true);
    try {
      const documents = await listSessions(user.id);
      setSessions(documents);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load sessions.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, error, isLoading, refetch: fetchSessions };
}
