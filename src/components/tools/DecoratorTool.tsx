"use client";
import { useState } from "react";
import { decorate } from "@/lib/decorate";
import CopyButton from "../CopyButton";

export default function DecoratorTool() {
  const [name, setName] = useState("");
  const list = decorate(name);
  return (
    <>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب اسمك أو نصك بالعربية أو الإنجليزية..." maxLength={60} />
      {list.length === 0 && <p className="note">اكتب اسمًا لتظهر الزخارف هنا.</p>}
      {list.map((d) => (
        <div key={d.label} className="result" style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <div>
            <div className="note" style={{ margin: 0 }}>{d.label}</div>
            <div style={{ fontSize: "1.3rem", wordBreak: "break-word" }}>{d.text}</div>
          </div>
          <CopyButton text={d.text} />
        </div>
      ))}
      {list.length > 0 && <p className="note">بعض الرموز قد لا تظهر بشكل صحيح في بعض التطبيقات أو الأجهزة القديمة.</p>}
    </>
  );
}
