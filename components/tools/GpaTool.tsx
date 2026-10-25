"use client";
import { useState } from "react";

const GRADES: [string, number][] = [
  ["A+", 4], ["A", 4], ["A-", 3.7], ["B+", 3.3], ["B", 3], ["B-", 2.7],
  ["C+", 2.3], ["C", 2], ["C-", 1.7], ["D+", 1.3], ["D", 1], ["F", 0],
];
interface Row { id: number; name: string; hours: string; points: string }
let uid = 10;
const blank = (): Row => ({ id: uid++, name: "", hours: "3", points: "" });

export default function GpaTool() {
  const [rows, setRows] = useState<Row[]>([1, 2, 3, 4].map(() => blank()));
  const [prevGpa, setPrevGpa] = useState("");
  const [prevHours, setPrevHours] = useState("");

  const upd = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  let pts = 0, hrs = 0;
  rows.forEach((r) => {
    const h = parseFloat(r.hours), p = parseFloat(r.points);
    if (h > 0 && !isNaN(p)) { pts += h * p; hrs += h; }
  });
  const gpa = hrs ? pts / hrs : null;

  const ph = parseFloat(prevHours), pg = parseFloat(prevGpa);
  const cum = gpa !== null && ph > 0 && !isNaN(pg) ? (pts + pg * ph) / (hrs + ph) : null;

  return (
    <>
      {rows.map((r, i) => (
        <div className="row" key={r.id} style={{ marginBottom: 8 }}>
          <div><input type="text" placeholder={`المادة ${i + 1} (اختياري)`} value={r.name} onChange={(e) => upd(r.id, { name: e.target.value })} /></div>
          <div><input type="number" min={0} placeholder="الساعات" value={r.hours} onChange={(e) => upd(r.id, { hours: e.target.value })} /></div>
          <div>
            <select value="" onChange={(e) => e.target.value && upd(r.id, { points: e.target.value })}>
              <option value="">التقدير</option>
              {GRADES.map(([g, p]) => <option key={g} value={p}>{g} ({p})</option>)}
            </select>
          </div>
          <div><input type="number" step="0.01" min={0} placeholder="النقاط" value={r.points} onChange={(e) => upd(r.id, { points: e.target.value })} /></div>
        </div>
      ))}
      <button className="btn alt" onClick={() => setRows([...rows, blank()])}>+ إضافة مادة</button>
      {rows.length > 1 && <button className="btn alt" onClick={() => setRows(rows.slice(0, -1))}>حذف آخر مادة</button>}

      <h2>المعدل التراكمي السابق (اختياري)</h2>
      <div className="row">
        <div><label>المعدل السابق</label><input type="number" step="0.01" value={prevGpa} onChange={(e) => setPrevGpa(e.target.value)} /></div>
        <div><label>الساعات المنجزة سابقًا</label><input type="number" value={prevHours} onChange={(e) => setPrevHours(e.target.value)} /></div>
      </div>

      <div className="result" style={{ marginTop: 14 }}>
        {gpa === null ? "أدخل الساعات والنقاط لكل مادة لحساب المعدل." : (
          <>
            <div>معدل الفصل: <b>{gpa.toFixed(2)}</b> ({hrs} ساعة)</div>
            {cum !== null && <div>المعدل التراكمي: <b>{cum.toFixed(2)}</b></div>}
          </>
        )}
      </div>
      <p className="note">جدول التقديرات المعروض شائع، لكن الجامعات تختلف فيه. يمكنك كتابة نقاط جامعتك مباشرة في خانة النقاط.</p>
    </>
  );
}
