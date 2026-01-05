import { auth } from "./lib/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Verificación de sesión (Autenticación)
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  context.locals.user = session?.user ?? null;
  context.locals.session = session?.session ?? null;

  // 2. Redirección de seguridad (Autorización)
  if (context.url.pathname.startsWith("/dashboard") && !session) {
    return context.redirect("/login");
  }

  // 3. Procesar la petición y obtener la respuesta
  const response = await next();

  // 4. Inyección de Cabeceras de Seguridad (Protección Extra)
  // Evita que tu app sea cargada en iframes (Anti-Clickjacking)
  response.headers.set("X-Frame-Options", "DENY");

  // Evita que el navegador intente adivinar el tipo de contenido (Anti-Sniffing)
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Controla cuánta información de referencia se envía
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  /**
   * Content Security Policy (CSP) - Versión RAD
   * Permite scripts de tu propio dominio y de htmx.org (que estamos usando)
   */
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' unpkg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';",
  );

  return response;
});
