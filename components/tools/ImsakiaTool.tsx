"use client";
import { useMemo, useState } from "react";
import { PRAYER_CITIES } from "@/lib/cities";
import { METHODS, addDays, fmtDay, fmtTime, timesFor, type YMD } from "@/lib/prayer";
import { fromHijri, toHijri } from "@/lib/hijri";
import { printPage } from "@/lib/print";

export default function ImsakiaTool() {
  const n = new Date();
  const th = toHijri(n.getFullYear(), n.getMonth() + 1, n.getDate());
  const [cityId, setCityId] = useState("cairo");
  const [method, setMethod] = useState("egypt");
  const [madhab, setMadhab] = useState("shafi");
  const [hy, setHy] = useState(String(th.m > 9 ? th.y + 1 : th.y));
  const [shift, setShift] = useState(0);
  const [imsak, setImsak] = useState("10");
  const [h12, setH12] = useState(true);
  const city = PRAYER_CITIES.find((c) => c.id === cityId)!;

  const start = useMemo(() => {
    const y = parseInt(hy, 10);
    if (!(y >= 1300 && y <= 1600)) return null;
    const g = fromHijri(y, 9, 1);
    return g ? addDays(g, shift) : null;
  }, [hy, shift]);

  const rows = useMemo(() => {
    if (!start) return [];
    const m = Math.max(0, Math.min(60, parseInt(imsak, 10) || 0));
    return Array.from({ length: 30 }, (_, i) => {
      const ymd: YMD = addDays(start, i);
      const t = timesFor(city.lat, city.lon, ymd, method, madhab);
      return { i: i + 1, ymd, t, imsak: new Date(t.fajr.getTime() - m * 60000) };
    });
  }, [start, city, method, madhab, imsak]);

  function pickCity(id: string) { setCityId(id); setMethod(PRAYER_CITIES.find((c) => c.id === id)!.method); }
  const f = (d: Date) => fmtTime(d, city.tz, h12);

  return (
    <>
      <div className="row">
        <div><label>المدينة</label><select value={cityId} onChange={(e) => pickCity(e.target.value)}>{PRAYER_CITIES.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.country}</option>)}</select></div>
        <div><label>طريقة الحساب</label><select value={method} onChange={(e) => setMethod(e.target.value)}>{METHODS.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}</select></div>
        <div><label>السنة الهجرية</label><input type="number" min={1300} max={1600} value={hy} onChange={(e) => setHy(e.target.value)} /></div>
        <div><label>بداية رمضان</label>
          <select value={shift} onChange={(e) => setShift(+e.target.value)}>
            <option value={-1}>يوم قبل الحساب</option><option value={0}>حسب تقويم أم القرى</option><option value={1}>يوم بعد الحساب</option>
          </select>
        </div>
        <div><label>الإمساك قبل الفجر (دقيقة)</label><input type="number" min={0} max={60} value={imsak} onChange={(e) => setImsak(e.target.value)} /></div>
        <div><label>نظام الساعة</label><select value={h12 ? "12" : "24"} onChange={(e) => setH12(e.target.value === "12")}><option value="12">12 ساعة</option><option value="24">24 ساعة</option></select></div>
      </div>
      <div className="opts"><label>وقت العصر:
        <select value={madhab} onChange={(e) => setMadhab(e.target.value)} style={{ width: "auto", marginInlineStart: 8 }}>
          <option value="shafi">المذاهب الثلاثة</option><option value="hanafi">الحنفي</option>
        </select></label></div>
      {!start ? <div className="err">أدخل سنة هجرية بين 1300 و1600.</div> : (
        <>
          <button className="btn alt" onClick={() => printPage("landscape")}>طباعة الإمساكية</button>
          <div className="print-area">
            <div className="sheet-title">إمساكية رمضان {hy} هـ — {city.name}</div>
            <div style={{ overflowX: "auto" }}>
              <table className="ptable">
                <thead><tr><th>رمضان</th><th>اليوم والتاريخ</th><th>الإمساك</th><th>الفجر</th><th>الشروق</th><th>الظهر</th><th>العصر</th><th>المغرب (الإفطار)</th><th>العشاء</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.i}><td>{r.i}</td><td>{fmtDay(r.ymd)}</td><td>{f(r.imsak)}</td><td>{f(r.t.fajr)}</td><td>{f(r.t.sunrise)}</td><td>{f(r.t.dhuhr)}</td><td>{f(r.t.asr)}</td><td><b>{f(r.t.maghrib)}</b></td><td>{f(r.t.isha)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <p className="note">الجدول يعرض 30 يومًا، وقد يكون رمضان 29 يومًا. تُحسب بداية الشهر بتقويم أم القرى، وتعتمد دول كثيرة رؤية الهلال، فعدّل «بداية رمضان» ليوافق إعلان بلدك. المواقيت حسابية وقد تختلف بدقائق عن الجهة الرسمية، فاعتمد ما تعلنه الجهات الدينية.</p>
    </>
  );
}
