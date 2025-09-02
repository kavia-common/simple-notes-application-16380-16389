"use client";

import React, { useEffect, useState } from "react";

type Props = {
  onSearch: (query: string) => void;
  initial?: string;
};

export default function SearchBar({ onSearch, initial }: Props) {
  const [q, setQ] = useState(initial || "");

  useEffect(() => {
    const id = setTimeout(() => onSearch(q.trim()), 300);
    return () => clearTimeout(id);
  }, [q, onSearch]);

  return (
    <div className="card" style={{ padding: "0.5rem" }}>
      <div className="h-stack" style={{ gap: "0.5rem" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14zM9.5 14A4.5 4.5 0 119.5 5a4.5 4.5 0 010 9z"/>
        </svg>
        <input
          className="input"
          placeholder="Search notes..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search notes"
        />
      </div>
    </div>
  );
}
