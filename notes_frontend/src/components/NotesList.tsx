"use client";

import React from "react";
import type { Note } from "@/lib/api";

type Props = {
  notes: Note[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
};

export default function NotesList({ notes, selectedId, onSelect, onDelete, onNew }: Props) {
  return (
    <aside className="card scroll" aria-label="Notes list" style={{ padding: "0.5rem", height: "calc(100vh - 90px)" }}>
      <div className="h-stack" style={{ justifyContent: "space-between", padding: "0.5rem" }}>
        <strong>Notes</strong>
        <button className="btn btn-secondary" onClick={onNew} aria-label="Create new note">New</button>
      </div>
      <ul className="stack" style={{ listStyle: "none", padding: "0.25rem" }}>
        {notes.length === 0 ? (
          <li style={{ padding: "0.75rem", color: "var(--secondary)" }}>No notes yet.</li>
        ) : null}
        {notes.map((n) => {
          const active = selectedId === n.id;
          return (
            <li key={n.id}>
              <button
                aria-current={active ? "true" : "false"}
                onClick={() => onSelect(n.id)}
                className="h-stack"
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border)",
                  background: active ? "var(--muted)" : "#fff",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{n.title || "Untitled"}</div>
                  <div style={{ fontSize: 12, color: "var(--secondary)" }}>
                    {new Date(n.updatedAt || n.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  className="btn btn-ghost"
                  aria-label={`Delete note ${n.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(n.id);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" aria-hidden>
                    <path d="M6 7h12v2H6zm2 3h8l-1 10H9L8 10zm3-6h2v2h-2z" />
                  </svg>
                </button>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
