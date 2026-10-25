"use client";
import { useState } from "react";
import { abjad } from "@/lib/abjad";

export default function AbjadTool() {
  const [text, setText] = useState("");
  const r = abjad(text);
  return (
    <>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب كلمة أو اسمًا..." />
      <div className="result" style={{ marginTop: 12 }}>
        {r.letters.length ? <>قيمة الجُمَّل: <b>{r.total}</b></> : "اكتب كلمة عربية لتظهر قيمتها."}
      </div>
      {r.letters.length > 0 && (
        <div className="stats">
          {r.letters.map((l, i) => <div className="stat" key={i}><b>{l.ch}</b>{l.v}</div>)}
        </div>
      )}
      <p className="note">يعتمد الحساب على ترتيب «أبجد هوز» المشرقي. التاء المربوطة تُحسب هاءً، والألف المهموزة ألفًا، والألف المقصورة ياءً.</p>
    </>
  );
}
