"use client";
import { useState } from "react";

const KAABA = { lat: 21.422487, lon: 39.826206 };
const rad = (x: number) => (x * Math.PI) / 180;
const DIRS = ["الشمال", "الشمال الشرقي", "الشرق", "الجنوب الشرقي", "الجنوب", "الجنوب الغربي", "الغرب", "الشمال الغربي"];

function qibla(lat: number, lon: number) {
  const p1 = rad(lat), p2 = rad(KAABA.lat), dl = rad(KAABA.lon - lon);
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const a = Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  const km = 2 * 6371 * Math.asin(Math.sqrt(a));
  return { bearing, km };
}

export default function QiblaTool() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [msg, setMsg] = useState("");
  const la = parseFloat(lat), lo = parseFloat(lon);
  const ok = la >= -90 && la <= 90 && lo >= -180 && lo <= 180;
  const r = ok ? qibla(la, lo) : null;

  function locate() {
    setMsg("");
    if (!navigator.geolocation) return setMsg("المتصفح لا يدعم تحديد الموقع.");
    navigator.geolocation.getCurrentPosition(
      (p) => { setLat(p.coords.latitude.toFixed(5)); setLon(p.coords.longitude.toFixed(5)); },
      () => setMsg("تعذر تحديد موقعك. اسمح للموقع بالوصول إلى موقعك أو أدخل الإحداثيات يدويًا."),
    );
  }

  return (
    <>
      <button className="btn" onClick={locate}>حدد موقعي</button>
      {msg && <div className="err">{msg}</div>}
      <div className="row" style={{ marginTop: 10 }}>
        <div><label>خط العرض</label><input type="text" inputMode="decimal" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="مثال: 30.0444" /></div>
        <div><label>خط الطول</label><input type="text" inputMode="decimal" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="مثال: 31.2357" /></div>
      </div>
      {r && (
        <>
          <div className="result">
            اتجاه القبلة: <b>{r.bearing.toFixed(1)}°</b> من الشمال باتجاه عقارب الساعة، أي نحو {DIRS[Math.round(r.bearing / 45) % 8]}
            <div className="note">المسافة إلى الكعبة: نحو {Math.round(r.km).toLocaleString("en-US")} كم</div>
          </div>
          <svg viewBox="-110 -110 220 220" width="220" height="220" style={{ display: "block", margin: "12px auto" }} role="img" aria-label="اتجاه القبلة">
            <circle r="100" fill="none" stroke="var(--line)" strokeWidth="3" />
            <text y="-84" textAnchor="middle" fontSize="16" fill="var(--muted)">ش</text>
            <text y="98" textAnchor="middle" fontSize="16" fill="var(--muted)">ج</text>
            <text x="90" y="5" textAnchor="middle" fontSize="16" fill="var(--muted)">شرق</text>
            <text x="-90" y="5" textAnchor="middle" fontSize="16" fill="var(--muted)">غرب</text>
            <g transform={`rotate(${r.bearing})`}>
              <polygon points="0,-70 10,0 -10,0" fill="var(--brand)" />
              <rect x="-3" y="0" width="6" height="40" fill="var(--brand)" opacity=".5" />
            </g>
            <circle r="5" fill="var(--text)" />
          </svg>
        </>
      )}
      <p className="note">ضع الهاتف أفقيًا واستخدم بوصلته مع الدرجة المذكورة. الاتجاه محسوب بدقة رياضية، لكن بوصلات الأجهزة قد تنحرف بسبب المعادن القريبة، فتحقق منه بوسيلة أخرى عند الحاجة.</p>
    </>
  );
}
