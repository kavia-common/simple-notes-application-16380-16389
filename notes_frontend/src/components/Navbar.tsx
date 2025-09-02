"use client";

import React from "react";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container h-stack" style={{ justifyContent: "space-between", padding: "0.75rem 1rem" }}>
        <div className="h-stack">
          <span className="badge" aria-label="App brand">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden className="opacity-80">
              <path d="M6 2h9a3 3 0 0 1 3 3v14.5a.5.5 0 0 1-.79.407L12 16l-5.21 3.907A.5.5 0 0 1 6 19.5V2z" />
            </svg>
            Simple Notes
          </span>
          <span style={{ color: "var(--secondary)" }}>Minimal, fast, yours.</span>
        </div>
        <div className="h-stack">
          {isAuthenticated ? (
            <button className="btn btn-secondary" onClick={logout} aria-label="Sign out">
              Sign out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
