import { createAuthClient } from "better-auth/react";

export const betterAuthClient = createAuthClient({
  baseURL: typeof window === "undefined"
    ? "http://localhost:3000/api/auth"
    : `${window.location.origin}/api/auth`,
  fetchOptions: {
    credentials: "include",
  },
});