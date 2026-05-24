import { getServerConfig } from "@/utils/config";
import { ConversationResponse } from "@/utils/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return new Response("Conversation ID is required", { status: 400 });
  }

  const { elevenLabs } = getServerConfig();

  const response = await fetch(
    `${elevenLabs.baseUrl}/v1/convai/conversations/${conversationId}`,
    {
      method: "GET",
      headers: {
        "xi-api-key": elevenLabs.apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch conversation" }),
      { status: response.status, headers: { "Content-Type": "application/json" } }
    );
  }

  const conversation: ConversationResponse = await response.json();

  return new Response(JSON.stringify({ conversation }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
