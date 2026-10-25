"use client";
import { useRef, useState } from "react";

function rnd(n: number) {
  const lim = Math.floor(0x100000000 / n) * n;
  const a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= lim);
  return a[0] % n;
}
const shuffle = <T,>(arr: T[]) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export default function RandomPickerTool() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(1);
  const [groups, setGroups] = useState(4);
  const [removeChosen, setRemoveChosen] = useState(false);
  const [shown, setShown] = useState<string[] | null>(null);
  const [grp, setGrp] = useState<string[][] | null>(null);
  const [spin, setSpin] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const names = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

  function pick() {
    setGrp(null);
    if (names.length === 0) return setShown([]);
    const n = Math.min(Math.max(1, count), names.length);
    const winners = shuffle(names).slice(0, n);
    let i = 0;
    setSpin(true);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      i++;
      if (i < 14) setShown([names[rnd(names.length)]]);
      else {
        clearInterval(timer.current!); setSpin(false); setShown(winners);
        if (removeChosen) { const rest = [...names]; for (const w of winners) { const k = rest.indexOf(w); if (k >= 0) rest.splice(k, 1); } setText(rest.join("\n")); }
      }
    }, 70);
  }
  function split() {
    setShown(null);
    const g = Math.min(Math.max(2, groups), Math.max(2, names.length));
    const out: string[][] = Array.from({ length: g }, () => []);
    shuffle(names).forEach((n, i) => out[i % g].push(n));
    setGrp(out);
  }

  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب الأسماء، اسمًا في كل سطر..." />
      <div className="note">عدد الأسماء: {names.length}</div>
      <div className="row" style={{ marginTop: 8 }}>
        <div><label>عدد المختارين</label><input type="number" min={1} value={count} onChange={(e) => setCount(+e.target.value || 1)} /></div>
        <div><label>عدد المجموعات</label><input type="number" min={2} value={groups} onChange={(e) => setGroups(+e.target.value || 2)} /></div>
      </div>
      <div className="opts"><label><input type="checkbox" checked={removeChosen} onChange={(e) => setRemoveChosen(e.target.checked)} /> إزالة الأسماء المختارة من القائمة بعد السحب</label></div>
      <button className="btn" onClick={pick} disabled={spin || names.length === 0}>اختر عشوائيًا</button>
      <button className="btn alt" onClick={split} disabled={names.length < 2}>قسّم إلى مجموعات</button>
      {shown && (
        <div className="result" style={{ marginTop: 12, textAlign: "center", fontSize: "1.6rem" }}>
          {shown.length === 0 ? "أضف أسماء أولًا." : shown.map((n) => <div key={n}><b>{n}</b></div>)}
        </div>
      )}
      {grp && (
        <div style={{ marginTop: 12 }}>
          {grp.map((g, i) => (<div key={i} className="group-box"><b>المجموعة {i + 1}</b>{g.map((n) => <div key={n + i}>{n}</div>)}</div>))}
        </div>
      )}
      <p className="note">الاختيار يتم بمولّد أرقام عشوائية آمن داخل متصفحك، ولا تُحفظ الأسماء في أي مكان.</p>
    </>
  );
}
