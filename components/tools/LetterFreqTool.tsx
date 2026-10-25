"use client";
import { useMemo, useState } from "react";

const strip = (s: string) => s.replace(/[\u064B-\u065F\u0670\u0640]/g, "");

export default function LetterFreqTool() {
  const [text, setText] = useState("");
  const [tab, setTab] = useState<"letters" | "words">("letters");
  const [merge, setMerge] = useState(true);
  const [minLen, setMinLen] = useState(2);

  const data = useMemo(() => {
    let t = strip(text);
    if (merge) t = t.replace(/[أإآٱ]/g, "ا");
    const letters = new Map<string, number>();
    for (const c of t) if (/[\u0621-\u064A]/.test(c)) letters.set(c, (letters.get(c) ?? 0) + 1);
    const words = new Map<string, number>();
    for (const w of t.match(/[\u0621-\u064A]+/g) ?? []) if (w.length >= minLen) words.set(w, (words.get(w) ?? 0) + 1);
    const sorted = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ar"));
    return { letters: sorted(letters), words: sorted(words) };
  }, [text, merge, minLen]);

  const total = data.letters.reduce((s, [, n]) => s + n, 0);
  const list = tab === "letters" ? data.letters : data.words.slice(0, 40);
  const sum = tab === "letters" ? total : data.words.reduce((s, [, n]) => s + n, 0);
  const max = list[0]?.[1] ?? 1;

  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="الصق النص العربي هنا..." />
      <div className="tabs" style={{ marginTop: 10 }}>
        <button className={`tab ${tab === "letters" ? "on" : ""}`} onClick={() => setTab("letters")}>تكرار الحروف</button>
        <button className={`tab ${tab === "words" ? "on" : ""}`} onClick={() => setTab("words")}>تكرار الكلمات</button>
      </div>
      <div className="opts">
        {tab === "letters" && <label><input type="checkbox" checked={merge} onChange={(e) => setMerge(e.target.checked)} /> اعتبر أ وإ وآ حرف ألف واحدًا</label>}
        {tab === "words" && <label>أقل طول للكلمة: <input type="number" min={1} max={6} value={minLen} onChange={(e) => setMinLen(Math.max(1, +e.target.value || 1))} style={{ width: 70, display: "inline-block" }} /></label>}
      </div>
      {list.length === 0 ? <p className="note">الصق نصًا عربيًا لتظهر الإحصاءات.</p> : (
        <>
          <div className="note">
            {tab === "letters" ? `إجمالي الحروف: ${total} — عدد الحروف المختلفة: ${data.letters.length}` : `إجمالي الكلمات: ${sum} — عدد الكلمات المختلفة: ${data.words.length} (يظهر أعلى 40)`}
          </div>
          <table className="ptable">
            <thead><tr><th>{tab === "letters" ? "الحرف" : "الكلمة"}</th><th>التكرار</th><th>النسبة</th><th style={{ width: "35%" }}></th></tr></thead>
            <tbody>
              {list.map(([k, n]) => (
                <tr key={k}><td style={{ fontSize: "1.1rem" }}>{k}</td><td>{n}</td><td>{((n / sum) * 100).toFixed(1)}%</td><td><div className="bar" style={{ width: `${(n / max) * 100}%` }} /></td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
