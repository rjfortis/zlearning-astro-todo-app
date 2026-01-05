# 📝 Private Todo App

A private task management application designed to be deployed in minutes, focused on server-side security and a smooth user experience without the complexity of heavy client-side frameworks.

---

## 🚀 Key Points & Learnings

* **Server-First**: All rendering and business logic live on the server for maximum security.
* **Zero Client-Side State**: Uses **HTMX** to swap HTML fragments, removing the need for JSON APIs or complex frontend state.
* **OAuth Only**: Password handling is eliminated by delegating identity to **GitHub**, reducing the attack surface.
* **Database Isolation**: SQL queries are always scoped by the session user ID to prevent **IDOR (Insecure Direct Object Reference)** vulnerabilities.

---

## 🛠️ Tech Stack

* **Framework**: Astro (SSR mode)
* **Authentication**: BetterAuth with GitHub Provider
* **Database**: SQLite (local & fast)
* **ORM**: Drizzle ORM
* **UI**: Tailwind CSS + HTMX (reactivity without heavy JS)

---

## ⚙️ Installation & Setup

### 1. Clone the repository and install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file at the project root with the following values:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
BETTER_AUTH_SECRET=a_very_long_random_string
BETTER_AUTH_URL=http://localhost:4321
```

### 3. Prepare the database

```bash
npx drizzle-kit push # Creates the tables in sqlite.db
```

### 4. Run in development

```bash
npm run dev
```

---

## 🔒 Security Checklist Implemented

* [x] **HttpOnly Cookies**: Session tokens are inaccessible to malicious scripts.
* [x] **IDOR Protection**: Every database query validates the owner `userId`.
* [x] **Secure Headers**: Middleware configured with `X-Frame-Options: DENY` (anti-clickjacking) and `Content-Security-Policy`.
* [x] **CSRF Protection**: Provided natively by BetterAuth.
* [x] **Social Auth**: No local password storage.

---

## 📂 Project Structure

* `/src/db`: Data schema and Drizzle configuration.
* `/src/lib`: Core logic (Auth client and HTML UI generators).
* `/src/pages`: App routes and HTMX API endpoints.
* `/src/middleware.ts`: Global security guard and HTTP headers.

---

## 💡 Maintenance Notes

* **Database**: The `sqlite.db` file is ignored by Git. In production, ensure proper persistence on the server.
* **Security**: Always deploy under **HTTPS** so the session cookie automatically enables the `Secure` flag.
