import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  // En desarrollo usamos localhost, en producción la URL real
  baseURL: import.meta.env.BETTER_AUTH_URL || "http://localhost:4321",
});
