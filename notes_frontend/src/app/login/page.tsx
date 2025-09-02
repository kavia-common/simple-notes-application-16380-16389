"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { apiLogin, apiRegister } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const tokens = await apiLogin(email, password);
        login(tokens);
        window.location.href = "/";
      } else {
        await apiRegister(email, password);
        const tokens = await apiLogin(email, password);
        login(tokens);
        window.location.href = "/";
      }
    } catch (err) {
      let message = "Authentication failed";
      if (typeof err === "object" && err !== null) {
        if ("message" in err) {
          const m = (err as Record<string, unknown>).message;
          if (typeof m === "string") message = m;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="layout">
      <Navbar />
      <main className="container" style={{ padding: "2rem 1rem", maxWidth: 560 }}>
        <section className="card" style={{ padding: "1.25rem" }}>
          <header className="stack" style={{ marginBottom: "0.75rem" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>{mode === "login" ? "Sign in" : "Create account"}</h1>
            <p style={{ color: "var(--secondary)" }}>
              Use your email and password to {mode === "login" ? "access your notes." : "create a new account."}
            </p>
          </header>

          <form className="stack" onSubmit={handleSubmit}>
            <label className="stack">
              <span>Email</span>
              <input
                className="input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label className="stack">
              <span>Password</span>
              <input
                className="input"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>

            {error ? (
              <div className="card" style={{ borderColor: "#fecaca", background: "#fef2f2", color: "#7f1d1d", padding: "0.75rem" }}>
                {error}
              </div>
            ) : null}

            <div className="h-stack" style={{ justifyContent: "space-between" }}>
              <button type="button" className="btn btn-secondary" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                {mode === "login" ? "Need an account? Register" : "Have an account? Sign in"}
              </button>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
