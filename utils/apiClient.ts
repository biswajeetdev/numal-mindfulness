/**
 * Centralized API client for calling this app's Expo API routes.
 * Handles base URL, JSON parsing, and standardized error handling.
 */

import { getApiBaseUrl } from "./config";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly endpoint: string,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Fetch JSON from an app API route.
 * Uses relative path on web (when apiUrl is empty), absolute URL on native.
 */
export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  const url = base ? `${base.replace(/\/$/, "")}${path}` : path;

  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  let body: unknown;
  const text = await response.text();
  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    body = text;
  }

  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "message" in body
        ? String((body as { message: unknown }).message)
        : response.statusText || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, path, body);
  }

  return body as T;
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const base = getApiBaseUrl();
  const url = base ? `${base.replace(/\/$/, "")}${path}` : path;

  const response = await fetch(url, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json", ...init?.headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let parsed: unknown;
  try {
    parsed = text ? JSON.parse(text) : undefined;
  } catch {
    parsed = text;
  }

  if (!response.ok) {
    const message =
      typeof parsed === "object" &&
      parsed !== null &&
      "message" in parsed
        ? String((parsed as { message: unknown }).message)
        : response.statusText || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, path, parsed);
  }

  return parsed as T;
}
