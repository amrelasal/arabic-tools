"use client";
import { useMemo, useState } from "react";
import { WORLD_CITIES } from "@/lib/cities";

function offsetMin(tz: string, d: Date) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(d);
  const g = (t: string) => +(p.find((x) => x.type === t)?.value ?? 0);
  return Math.round((Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second")) - Math.floor(d.getTime() / 1000) * 1000) / 60000);
}
function wallToInstant(tz: string, v: string): Date | null {
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  let t = guess - offsetMin(tz, new Date(guess)) * 60000;
  t = guess - offsetMin(tz, new Date(t)) * 60000;
  return new Date(t);
}
const wall = (tz: string, d: Date) => new Intl.DateTimeFormat("ar-EG-u-nu-latn", { timeZone: tz, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: true }).format(d);
const inputFmt = (tz: string, d: Date) => {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(d);
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "00";
  return `${g("year")}-${g("month")}-${g("day")}T${g("hour")}:${g("minute")}`;
};

export default function TimeDiffTool() {
  const [a, setA] = useState("Africa/Cairo");
  const [b, setB] = useState("America/New_York");
  const [dt, setDt] = useState(() => inputFmt("Africa/Cairo", new Date()));
  const nameOf = (tz: string) => WORLD_CITIES.find((c) => c.tz === tz)?.name ?? tz;

  const inst = useMemo(() => wallToInstant(a, dt), [a, dt]);
  const res = useMemo(() => {
    if (!inst) return null;
    const diff = (offsetMin(b, inst) - offsetMin(a, inst)) / 60;
    return { diff, tb: wall(b, inst), ta: wall(a, inst) };
  }, [inst, a, b]);
  const now = new Date();
  const quick = ["Africa/Cairo", "Asia/Riyadh", "Asia/Dubai", "Europe/London", "America/New_York", "Asia/Tokyo"];
  const sel = (v: string, set: (s: string) => void) => (
    <select value={v} onChange={(e) => set(e.target.value)}>{WORLD_CITIES.map((c) => <option key={c.tz + c.name} value={c.tz}>{c.name}</option>)}</select>
  );
  function setNow() { setDt(inputFmt(a, new Date())); }
  function swap() { setA(b); setB(a); if (inst) setDt(inputFmt(b, inst)); }

  return (
    <>
      <div className="row">
        <div><label>من مدينة</label>{sel(a, (v) => { if (inst) setDt(inputFmt(v, inst)); setA(v); })}</div>
        <div><label>إلى مدينة</label>{sel(b, setB)}</div>
        <div><label>التاريخ والوقت في {nameOf(a)}</label><input type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} /></div>
      </div>
      <button className="btn alt" onClick={setNow}>الوقت الآن</button>
      <button className="btn alt" onClick={swap}>تبديل المدينتين</button>
      {res && (
        <div className="result" style={{ marginTop: 12 }}>
          <div>{nameOf(a)}: <b>{res.ta}</b></div>
          <div>{nameOf(b)}: <b>{res.tb}</b></div>
          <div className="note">{res.diff === 0 ? "لا فرق بين التوقيتين." : `${nameOf(b)} ${res.diff > 0 ? "تسبق" : "تتأخر عن"} ${nameOf(a)} بمقدار ${Math.abs(res.diff).toLocaleString("en-US")} ساعة.`}</div>
        </div>
      )}
      <h2>الوقت الآن في مدن شهيرة</h2>
      <div className="times-grid">
        {quick.map((tz) => (
          <div key={tz} className="time-box">{nameOf(tz)}<b>{new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: true }).format(now)}</b></div>
        ))}
      </div>
      <p className="note">يراعي الحساب التوقيت الصيفي في كل مدينة تلقائيًا بحسب التاريخ الذي تختاره.</p>
    </>
  );
}
