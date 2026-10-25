"use client";
import { useState } from "react";
import { printPage } from "@/lib/print";

const ALPHABET = "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي".split(" ");

function Item({ text, size, kind }: { text: string; size: number; kind: "solid" | "dash" | "light" }) {
  const w = Math.max(size * 0.9, size * (Array.from(text).length * 0.62 + 0.4));
  const h = size * 1.5;
  const common = { fontSize: size, fontFamily: "Cairo, sans-serif", textAnchor: "middle" as const, direction: "rtl" as const };
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flex: "0 0 auto" }} aria-hidden="true">
      {kind === "solid" && <text x={w / 2} y={h * 0.72} {...common} fill="#1f2933">{text}</text>}
      {kind === "dash" && <text x={w / 2} y={h * 0.72} {...common} fill="none" stroke="#8a97a3" strokeWidth="1.3" strokeDasharray="4 3">{text}</text>}
      {kind === "light" && <text x={w / 2} y={h * 0.72} {...common} fill="#d3d9df">{text}</text>}
    </svg>
  );
}

export default function TracingTool() {
  const [mode, setMode] = useState<"name" | "alphabet">("name");
  const [text, setText] = useState("");
  const [rows, setRows] = useState(7);
  const [size, setSize] = useState(60);
  const [style, setStyle] = useState<"dash" | "light">("dash");
  const word = text.trim() || "اسم الطفل";
  const avail = 700;
  const w = Math.max(size * 0.9, size * (Array.from(word).length * 0.62 + 0.4));
  const copies = Math.max(1, Math.floor(avail / (w + 8)) - 1);

  return (
    <>
      <div className="tabs">
        <button className={`tab ${mode === "name" ? "on" : ""}`} onClick={() => setMode("name")}>اسم أو كلمة</button>
        <button className={`tab ${mode === "alphabet" ? "on" : ""}`} onClick={() => setMode("alphabet")}>الحروف الهجائية</button>
      </div>
      <div className="row">
        {mode === "name" && <div><label>الاسم أو الكلمة</label><input type="text" value={text} onChange={(e) => setText(e.target.value)} maxLength={20} placeholder="مثال: ليلى" /></div>}
        {mode === "name" && <div><label>عدد الأسطر</label><input type="number" min={3} max={10} value={rows} onChange={(e) => setRows(Math.min(10, Math.max(3, +e.target.value || 7)))} /></div>}
        <div><label>حجم الخط</label><input type="number" min={30} max={110} step={5} value={size} onChange={(e) => setSize(Math.min(110, Math.max(30, +e.target.value || 60)))} /></div>
        <div><label>شكل التتبع</label><select value={style} onChange={(e) => setStyle(e.target.value as "dash" | "light")}><option value="dash">خط متقطع</option><option value="light">لون رمادي فاتح</option></select></div>
      </div>
      <button className="btn" onClick={() => printPage("portrait")}>طباعة الورقة</button>
      <div className="sheet-wrap" style={{ marginTop: 10 }}>
        <div className="sheet-print">
          <div className="sheet-title">{mode === "name" ? "ورقة تتبع الكتابة" : "ورقة تتبع الحروف الهجائية"}</div>
          {mode === "name" ? (
            Array.from({ length: rows }, (_, i) => (
              <div key={i} className="sheet-row">
                {i === 0 ? <Item text={word} size={size} kind="solid" /> : <Item text={word} size={size} kind="solid" />}
                {Array.from({ length: copies }, (_, j) => <Item key={j} text={word} size={size} kind={style} />)}
              </div>
            ))
          ) : (
            <div className="sheet-grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
              {ALPHABET.map((l) => (
                <div key={l} className="sheet-cell" style={{ justifyContent: "flex-start", gap: 4 }}>
                  <Item text={l} size={Math.min(size, 56)} kind="solid" />
                  {[0, 1, 2].map((j) => <Item key={j} text={l} size={Math.min(size, 56)} kind={style} />)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="note">من نافذة الطباعة اختر الحفظ كملف PDF أو الطابعة، والاتجاه رأسي وحجم A4، وأزل خيار «الرأس والتذييل». اترك الخط عريضًا ليسهل على الطفل تتبعه.</p>
    </>
  );
}
