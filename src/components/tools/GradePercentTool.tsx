"use client";
import { useState } from "react";

interface Row { id: number; name: string; score: string; max: string }
let uid = 100;
const blank = (): Row => ({ id: uid++, name: "", score: "", max: "100" });

export default function GradePercentTool() {
  const [rows, setRows] = useState<Row[]>([1, 2, 3, 4, 5].map(() => blank()));
  const upd = (id: number, p: Partial<Row>) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...p } : x)));
  let s = 0, m = 0;
  rows.forEach((r) => {
    const a = parseFloat(r.score), b = parseFloat(r.max);
    if (!isNaN(a) && b > 0) { s += a; m += b; }
  });
  const pct = m ? (s / m) * 100 : null;
  const label = pct === null ? "" : pct >= 85 ? "ممتاز" : pct >= 75 ? "جيد جدًا" : pct >= 65 ? "جيد" : pct >= 50 ? "مقبول" : "ضعيف";
  return (
    <>
      {rows.map((r, i) => (
        <div className="row" key={r.id} style={{ marginBottom: 8 }}>
          <div><input type="text" placeholder={`المادة ${i + 1}`} value={r.name} onChange={(e) => upd(r.id, { name: e.target.value })} /></div>
          <div><input type="number" placeholder="الدرجة" value={r.score} onChange={(e) => upd(r.id, { score: e.target.value })} /></div>
          <div><input type="number" placeholder="الدرجة النهائية" value={r.max} onChange={(e) => upd(r.id, { max: e.target.value })} /></div>
        </div>
      ))}
      <button className="btn alt" onClick={() => setRows([...rows, blank()])}>+ إضافة مادة</button>
      {rows.length > 1 && <button className="btn alt" onClick={() => setRows(rows.slice(0, -1))}>حذف آخر مادة</button>}
      <div className="result" style={{ marginTop: 14 }}>
        {pct === null ? "أدخل الدرجات لحساب النسبة." : (
          <>
            <div>المجموع: <b>{s}</b> من <b>{m}</b></div>
            <div>النسبة المئوية: <b>{pct.toFixed(2)}%</b> — {label}</div>
          </>
        )}
      </div>
      <p className="note">تقدير النسبة (ممتاز، جيد جدًا...) تقريبي وشائع، وتختلف حدوده بين المدارس والدول.</p>
    </>
  );
}
