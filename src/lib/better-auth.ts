import { createAuthClient } from "better-auth/react";

/**
 * Shared Better Auth client entry point.
 *
 * The current API exposes its established HTTP-only JWT contract under
 * `/api/auth`; keeping this client isolated makes adding social providers
 * straightforward when the server auth adapter is enabled.
 */
export const betterAuthClient = createAuthClient({
  baseURL: typeof window === "undefined" ? "http://localhost:3000/api/auth" : `${window.location.origin}/api/auth`,
});
