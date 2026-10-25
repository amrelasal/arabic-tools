"use client";
import { useState } from "react";
import { toEasternArabic, toWestern } from "@/lib/arabic";
import CopyButton from "../CopyButton";

export default function NumbersTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"west" | "east">("west");
  const out = mode === "west" ? toWestern(text) : toEasternArabic(text);
  return (
    <>
      <div className="opts">
        <label><input type="radio" checked={mode === "west"} onChange={() => setMode("west")} /> من ١٢٣ إلى 123</label>
        <label><input type="radio" checked={mode === "east"} onChange={() => setMode("east")} /> من 123 إلى ١٢٣</label>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب أو الصق النص هنا..." style={{ marginTop: 12 }} />
      <textarea value={out} readOnly style={{ marginTop: 12 }} />
      <CopyButton text={out} />
    </>
  );
}
