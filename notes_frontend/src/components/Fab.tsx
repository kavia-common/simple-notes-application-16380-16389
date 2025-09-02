"use client";

import React from "react";

export default function Fab({ onClick, label = "Add note" }: { onClick: () => void; label?: string }) {
  return (
    <button className="fab" onClick={onClick} aria-label={label} title={label}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#083344" aria-hidden>
        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
      </svg>
    </button>
  );
}
