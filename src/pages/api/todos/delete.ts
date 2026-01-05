import type { APIRoute } from "astro";
import { db } from "../../../db";
import { todos } from "../../../db/schema";
import { eq, and } from "drizzle-orm";

export const DELETE: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));

  // Eliminamos solo si el ID pertenece al usuario autenticado
  await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, locals.user!.id)));

  // Devolvemos vacío. HTMX eliminará el elemento automáticamente.
  return new Response(null, { status: 200 });
};
