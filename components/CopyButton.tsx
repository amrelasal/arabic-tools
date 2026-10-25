"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="btn"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); } catch {}
      }}
    >
      {done ? "تم النسخ ✓" : "نسخ النتيجة"}
    </button>
  );
}
