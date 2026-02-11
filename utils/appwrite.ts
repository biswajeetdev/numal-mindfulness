import { Client, Databases, ID, Models, Query } from "react-native-appwrite";
import type { RemoteSessionDocument } from "@/types/session";
import { config } from "./config";

export class AppwriteError extends Error {
  constructor(
    message: string,
    public readonly code?: number,
    public readonly type?: string
  ) {
    super(message);
    this.name = "AppwriteError";
  }
}

function normalizeError(e: unknown): AppwriteError {
  if (e instanceof AppwriteError) return e;
  if (e instanceof Error) {
    const msg = (e as { message?: string }).message ?? e.message;
    const code = (e as { code?: number }).code;
    const type = (e as { type?: string }).type;
    return new AppwriteError(msg, code, type);
  }
  return new AppwriteError(String(e));
}

const appwriteConfig = {
  endpoint: config.appwrite.endpoint,
  projectId: config.appwrite.projectId,
  platform: config.appwrite.platform,
  db: config.appwrite.dbId,
  tables: {
    session: config.appwrite.collectionId,
  },
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const database = new Databases(client);
export { appwriteConfig, client, database };

/** @deprecated Use RemoteSessionDocument from @/types/session */
export type Session = RemoteSessionDocument;

export async function listSessions(
  userId: string
): Promise<RemoteSessionDocument[]> {
  try {
    const response = await database.listDocuments<
      RemoteSessionDocument & Models.Document
    >({
      databaseId: appwriteConfig.db,
      collectionId: appwriteConfig.tables.session,
      queries: [Query.equal("user_id", userId)],
    });
    return response.documents;
  } catch (e) {
    throw normalizeError(e);
  }
}

export interface CreateSessionInput {
  user_id: string;
  status: string;
  conv_id: string;
  tokens?: number;
  call_duration_secs?: number;
  transcript: string;
  call_summary_title: string;
}

export async function createSession(
  data: CreateSessionInput
): Promise<RemoteSessionDocument> {
  try {
    const doc = await database.createDocument(
      appwriteConfig.db,
      appwriteConfig.tables.session,
      ID.unique(),
      {
        user_id: data.user_id,
        status: data.status,
        conv_id: data.conv_id,
        tokens: data.tokens,
        call_duration_secs: data.call_duration_secs,
        transcript: data.transcript,
        call_summary_title: data.call_summary_title,
      }
    );
    return doc as unknown as RemoteSessionDocument;
  } catch (e) {
    throw normalizeError(e);
  }
}
