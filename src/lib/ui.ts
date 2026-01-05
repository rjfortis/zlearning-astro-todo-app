// src/lib/ui.ts
export function TodoHtml(todo: {
  id: number;
  content: string;
  completed: boolean;
}) {
  const checked = todo.completed ? "checked" : "";
  // Estilo de texto: más tenue si está completado
  const textStyle = todo.completed
    ? "line-through text-slate-400 decoration-slate-300"
    : "text-slate-700";

  return `
        <div id="todo-${todo.id}" class="group flex items-center justify-between p-4 transition-all hover:bg-slate-50/80">
            <div class="flex items-center gap-4 flex-1">
                <input
                    type="checkbox"
                    ${checked}
                    hx-post="/api/todos/toggle?id=${todo.id}"
                    hx-target="#todo-${todo.id}"
                    hx-swap="outerHTML"
                    class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-transform active:scale-90"
                />
                <span class="text-sm font-medium transition-all duration-300 ${textStyle}">
                    ${todo.content}
                </span>
            </div>
            <button
                hx-delete="/api/todos/delete?id=${todo.id}"
                hx-target="#todo-${todo.id}"
                hx-swap="outerHTML"
                class="md:opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all focus:opacity-100"
                aria-label="Eliminar tarea"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    `;
}
