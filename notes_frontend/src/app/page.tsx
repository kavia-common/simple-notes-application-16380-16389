"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import Fab from "@/components/Fab";
import { useAuth } from "@/lib/auth";
import type { Note } from "@/lib/api";
import { apiCreateNote, apiDeleteNote, apiGetNote, apiGetNotes, apiUpdateNote } from "@/lib/api";

export default function Home() {
  const { isAuthenticated, tokens } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Redirect to login when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);



  const loadNotes = React.useCallback(
    async (q?: string) => {
      if (!tokens) return;
      setLoading(true);
      try {
        const data = await apiGetNotes(tokens, q);
        setNotes(data);
        setSelectedId((prev) => {
          if (prev && data.some((n) => n.id === prev)) return prev;
          return data[0]?.id || null;
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [tokens]
  );

  const loadNoteDetail = React.useCallback(
    async (id: string) => {
      if (!tokens) return;
      try {
        const full = await apiGetNote(tokens, id);
        setActiveNote(full);
      } catch (e) {
        console.error(e);
        setActiveNote((curr) => curr);
      }
    },
    [tokens]
  );

  useEffect(() => {
    if (tokens) {
      loadNotes(query);
    }
  }, [tokens, query, loadNotes]);

  useEffect(() => {
    if (selectedId) {
      loadNoteDetail(selectedId);
    } else {
      setActiveNote(null);
    }
  }, [selectedId, loadNoteDetail]);

  async function handleSave(payload: { title: string; content: string }, existingId?: string) {
    if (!tokens) return;
    if (existingId) {
      const updated = await apiUpdateNote(tokens, existingId, payload);
      setNotes((prev) => prev.map((n) => (n.id === existingId ? updated : n)));
      setActiveNote(updated);
    } else {
      const created = await apiCreateNote(tokens, payload);
      setNotes((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setActiveNote(created);
    }
  }

  async function handleDelete(id: string) {
    if (!tokens) return;
    if (!confirm("Delete this note?")) return;
    await apiDeleteNote(tokens, id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) {
      const next = notes.find((n) => n.id !== id);
      setSelectedId(next?.id || null);
      setActiveNote(next || null);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="container" style={{ padding: "1rem" }}>
      <div className="stack" style={{ marginBottom: "1rem" }}>
        <SearchBar onSearch={setQuery} initial={query} />
      </div>
      <div className="content">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          onDelete={handleDelete}
          onNew={() => {
            setSelectedId(null);
            setActiveNote({ id: "", title: "", content: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
          }}
        />
        <div>
          {loading && notes.length === 0 ? (
            <section className="card" style={{ padding: "1rem" }}>Loading…</section>
          ) : (
            <NoteEditor note={selectedId ? activeNote : activeNote} onSave={handleSave} onDelete={handleDelete} />
          )}
        </div>
      </div>
      <Fab onClick={() => {
        setSelectedId(null);
        setActiveNote({ id: "", title: "", content: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      }} />
    </main>
  );
}
