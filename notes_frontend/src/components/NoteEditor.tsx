"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Note, NoteInput } from "@/lib/api";

type Props = {
  note?: Note | null;
  onSave: (payload: NoteInput, existingId?: string) => Promise<void> | void;
  onDelete?: (id: string) => void;
};

export default function NoteEditor({ note, onSave, onDelete }: Props) {
  const isExisting = !!note?.id;
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [saving, setSaving] = useState(false);
  const changed = useMemo(
    () => title !== (note?.title || "") || content !== (note?.content || ""),
    [title, content, note]
  );

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note?.id, note?.title, note?.content]);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave({ title: title.trim(), content }, note?.id);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="card" style={{ padding: "1rem", minHeight: "calc(100vh - 90px)" }}>
      <div className="h-stack" style={{ justifyContent: "space-between" }}>
        <div className="h-stack">
          <span className="badge">{isExisting ? "Edit note" : "New note"}</span>
        </div>
        <div className="h-stack">
          {isExisting && onDelete ? (
            <button
              className="btn btn-danger"
              onClick={() => onDelete(note!.id)}
              aria-label="Delete note"
            >
              Delete
            </button>
          ) : null}
          <button
            className="btn"
            onClick={handleSave}
            disabled={saving || (!changed && isExisting)}
            aria-label="Save note"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="stack" style={{ marginTop: "1rem" }}>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <textarea
          className="textarea"
          placeholder="Start typing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Note content"
        />
      </div>
    </section>
  );
}
