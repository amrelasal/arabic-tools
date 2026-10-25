"use client";
import { useState } from "react";
import { countParagraphs, countSentences, countWords } from "@/lib/arabic";

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const words = countWords(text);
  const chars = text.length;
  const noSpaces = text.replace(/\s/g, "").length;
  const minutes = Math.max(words ? 1 : 0, Math.ceil(words / 180));
  const stats: [string, number | string][] = [
    ["كلمة", words], ["حرف", chars], ["حرف بدون مسافات", noSpaces],
    ["جملة", countSentences(text)], ["فقرة", countParagraphs(text)],
    ["دقيقة قراءة", minutes],
  ];
  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب أو الصق النص هنا..." style={{ minHeight: 220 }} />
      <div className="stats">
        {stats.map(([label, v]) => (
          <div className="stat" key={label}><b>{v}</b>{label}</div>
        ))}
      </div>
    </>
  );
}
