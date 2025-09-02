import React from "react";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "2rem 1rem" }}>
      <section className="card" role="alert" aria-live="assertive" style={{ padding: "1.25rem" }}>
        <header className="stack">
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>404 – Page Not Found</h1>
          <p style={{ color: "var(--secondary)" }}>The page you’re looking for doesn’t exist.</p>
        </header>
      </section>
    </main>
  );
}
