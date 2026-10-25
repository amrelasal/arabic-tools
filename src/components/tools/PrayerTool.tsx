"use client";
import { useEffect, useMemo, useState } from "react";
import { PRAYER_CITIES } from "@/lib/cities";
import { METHODS, PRAYER_NAMES, addDays, fmtDay, fmtTime, timesFor, ymdInTz } from "@/lib/prayer";
import { printPage } from "@/lib/print";

const pad = (n: number) => String(n).padStart(2, "0");

export default function PrayerTool() {
  const [cityId, setCityId] = useState("cairo");
  const [custom, setCustom] = useState<{ lat: number; lon: number; tz: string } | null>(null);
  const [method, setMethod] = useState("egypt");
  const [madhab, setMadhab] = useState("shafi");
  const [h12, setH12] = useState(true);
  const [now, setNow] = useState(() => new Date());
  const [msg, setMsg] = useState("");
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  const city = PRAYER_CITIES.find((c) => c.id === cityId)!;
  const loc = custom ?? { lat: city.lat, lon: city.lon, tz: city.tz };
  const label = custom ? "موقعك الحالي" : `${city.name} — ${city.country}`;
  const today = ymdInTz(now, loc.tz);

  const t = useMemo(() => timesFor(loc.lat, loc.lon, today, method, madhab),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loc.lat, loc.lon, today.y, today.m, today.d, method, madhab]);
  const tomorrowFajr = useMemo(() => timesFor(loc.lat, loc.lon, addDays(today, 1), method, madhab).fajr,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loc.lat, loc.lon, today.y, today.m, today.d, method, madhab]);

  const list: [string, string, Date][] = [
    ["fajr", "الفجر", t.fajr], ["dhuhr", "الظهر", t.dhuhr], ["asr", "العصر", t.asr], ["maghrib", "المغرب", t.maghrib], ["isha", "العشاء", t.isha],
  ];
  const nextIdx = list.findIndex(([, , d]) => d.getTime() > now.getTime());
  const next = nextIdx >= 0 ? list[nextIdx] : (["fajr", "الفجر", tomorrowFajr] as [string, string, Date]);
  const diff = Math.max(0, Math.floor((next[2].getTime() - now.getTime()) / 1000));
  const cd = `${pad(Math.floor(diff / 3600))}:${pad(Math.floor((diff % 3600) / 60))}:${pad(diff % 60)}`;

  const days = new Date(Date.UTC(today.y, today.m, 0)).getUTCDate();
  const month = useMemo(() => Array.from({ length: days }, (_, i) => {
    const ymd = { y: today.y, m: today.m, d: i + 1 };
    return { ymd, t: timesFor(loc.lat, loc.lon, ymd, method, madhab) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [loc.lat, loc.lon, today.y, today.m, days, method, madhab]);

  function pickCity(id: string) { setCityId(id); setCustom(null); setMethod(PRAYER_CITIES.find((c) => c.id === id)!.method); }
  function locate() {
    setMsg("");
    if (!navigator.geolocation) return setMsg("المتصفح لا يدعم تحديد الموقع.");
    navigator.geolocation.getCurrentPosition(
      (p) => setCustom({ lat: p.coords.latitude, lon: p.coords.longitude, tz: Intl.DateTimeFormat().resolvedOptions().timeZone }),
      () => setMsg("تعذر تحديد موقعك. اسمح للمتصفح بالوصول إلى الموقع أو اختر مدينتك من القائمة."),
    );
  }

  return (
    <>
      <div className="row">
        <div>
          <label>المدينة</label>
          <select value={custom ? "" : cityId} onChange={(e) => e.target.value && pickCity(e.target.value)}>
            {custom && <option value="">موقعي الحالي</option>}
            {PRAYER_CITIES.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.country}</option>)}
          </select>
        </div>
        <div>
          <label>طريقة الحساب</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>{METHODS.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}</select>
        </div>
        <div>
          <label>وقت العصر</label>
          <select value={madhab} onChange={(e) => setMadhab(e.target.value)}>
            <option value="shafi">المذاهب الثلاثة (ظل المثل)</option><option value="hanafi">الحنفي (ظل المثلين)</option>
          </select>
        </div>
        <div>
          <label>نظام الساعة</label>
          <select value={h12 ? "12" : "24"} onChange={(e) => setH12(e.target.value === "12")}><option value="12">12 ساعة</option><option value="24">24 ساعة</option></select>
        </div>
      </div>
      <button className="btn alt" onClick={locate}>حدد موقعي</button>
      {msg && <div className="err">{msg}</div>}

      <div className="next-card" style={{ marginTop: 12 }}>
        <div className="note" style={{ margin: 0 }}>{label}</div>
        <div>الصلاة القادمة: <b>{next[1]}</b> عند {fmtTime(next[2], loc.tz, h12)}</div>
        <div className="big">{cd}</div>
      </div>

      <div className="times-grid">
        {PRAYER_NAMES.map(([k, n]) => (
          <div key={k} className={`time-box ${next[0] === k ? "on" : ""}`}>{n}<b>{fmtTime(t[k], loc.tz, h12)}</b></div>
        ))}
      </div>

      <h2>جدول الشهر</h2>
      <button className="btn alt" onClick={() => printPage("portrait")}>طباعة الجدول</button>
      <div className="print-area">
        <div className="sheet-title print-only-title">مواقيت الصلاة — {label}</div>
        <div style={{ overflowX: "auto" }}>
          <table className="ptable">
            <thead><tr><th>اليوم</th>{PRAYER_NAMES.map(([k, n]) => <th key={k}>{n}</th>)}</tr></thead>
            <tbody>
              {month.map((r) => (
                <tr key={r.ymd.d} className={r.ymd.d === today.d ? "today" : ""}>
                  <td>{fmtDay(r.ymd)}</td>
                  {PRAYER_NAMES.map(([k]) => <td key={k}>{fmtTime(r.t[k], loc.tz, h12)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="note">المواقيت محسوبة فلكيًا بطريقة «{METHODS.find((m) => m.key === method)?.label}» وبالتوقيت المحلي للمدينة (يشمل التوقيت الصيفي تلقائيًا). قد تختلف بدقائق عن إعلان الجهة الرسمية أو مسجد حيّك، وبعض الدول تعتمد جداول رسمية خاصة، فاعتمد دائمًا ما تعلنه الجهات الدينية في بلدك.</p>
    </>
  );
}
