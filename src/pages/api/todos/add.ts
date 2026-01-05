import type { APIRoute } from "astro";
import { db } from "../../../db";
import { todos } from "../../../db/schema";
import { TodoHtml } from "../../../lib/ui";

export const POST: APIRoute = async ({ request, locals }) => {
  const formData = await request.formData();
  const content = formData.get("content") as string;

  if (!content) return new Response("Contenido vacío", { status: 400 });

  const [newTodo] = await db
    .insert(todos)
    .values({
      content,
      userId: locals.user!.id,
    })
    .returning();

  // Ahora sí devolvemos el HTML real que HTMX insertará en la lista
  return new Response(TodoHtml(newTodo), {
    headers: { "Content-Type": "text/html" },
  });
};
