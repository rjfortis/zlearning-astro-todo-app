// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...schema },
  }),
  // Desactivamos email y activamos GitHub
  emailAndPassword: { enabled: false },
  socialProviders: {
    github: {
      // Cambia process.env por import.meta.env
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    },
  },
});
