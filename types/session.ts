import type { ImageSourcePropType } from "react-native";

/** Local session template shown in the Explore section (images, titles) */
export interface LocalSession {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

/** Remote session document from Appwrite (saved conversation record) */
export interface RemoteSessionDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
  $sequence: number;
  user_id: string;
  status: string;
  conv_id: string;
  tokens?: number;
  call_duration_secs?: number;
  transcript: string;
  call_summary_title: string;
}
