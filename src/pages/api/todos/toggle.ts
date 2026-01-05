import type { APIRoute } from "astro";
import { db } from "../../../db";
import { todos } from "../../../db/schema";
import { eq, and } from "drizzle-orm";
import { TodoHtml } from "../../../lib/ui";

export const POST: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));

  // 1. Buscamos el todo actual (asegurándonos que pertenezca al usuario)
  const existingTodo = await db.query.todos.findFirst({
    where: and(eq(todos.id, id), eq(todos.userId, locals.user!.id)),
  });

  if (!existingTodo) return new Response("No encontrado", { status: 404 });

  // 2. Invertimos el estado
  const [updatedTodo] = await db
    .update(todos)
    .set({ completed: !existingTodo.completed })
    .where(eq(todos.id, id))
    .returning();

  // 3. Devolvemos el HTML actualizado
  return new Response(TodoHtml(updatedTodo), {
    headers: { "Content-Type": "text/html" },
  });
};
