"use client";
import { useEffect, useState } from "react";
import { fromHijri, GREG_MONTHS, HIJRI_MONTHS, toHijri, weekdayOf } from "@/lib/hijri";

const today = () => {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
};

function Inner() {
  const t = today();
  const th = toHijri(t.y, t.m, t.d);
  const [g, setG] = useState(`${t.y}-${String(t.m).padStart(2, "0")}-${String(t.d).padStart(2, "0")}`);
  const [hy, setHy] = useState(String(th.y));
  const [hm, setHm] = useState(th.m);
  const [hd, setHd] = useState(String(th.d));

  let gResult = "";
  const gp = g.split("-").map(Number);
  if (gp.length === 3 && gp.every((x) => x > 0)) {
    const h = toHijri(gp[0], gp[1], gp[2]);
    gResult = `${weekdayOf(gp[0], gp[1], gp[2])} ${h.d} ${HIJRI_MONTHS[h.m - 1]} ${h.y} هـ`;
  }

  let hResult = "";
  const y = parseInt(hy, 10), d = parseInt(hd, 10);
  if (y >= 1300 && y <= 1600 && d >= 1 && d <= 30) {
    const r = fromHijri(y, hm, d);
    hResult = r
      ? `${weekdayOf(r.y, r.m, r.d)} ${r.d} ${GREG_MONTHS[r.m - 1]} ${r.y} م`
      : "تاريخ غير صحيح (قد لا يحتوي هذا الشهر على 30 يومًا)";
  } else if (hy) hResult = "أدخل سنة بين 1300 و1600 ويومًا بين 1 و30";

  return (
    <>
      <div className="result" style={{ marginBottom: 16 }}>
        اليوم: {weekdayOf(t.y, t.m, t.d)} {th.d} {HIJRI_MONTHS[th.m - 1]} {th.y} هـ — الموافق {t.d} {GREG_MONTHS[t.m - 1]} {t.y} م
      </div>
      <h2 style={{ marginTop: 0 }}>من الميلادي إلى الهجري</h2>
      <input type="date" value={g} onChange={(e) => setG(e.target.value)} />
      {gResult && <div className="result" style={{ marginTop: 10 }}>{gResult}</div>}
      <h2>من الهجري إلى الميلادي</h2>
      <div className="row">
        <div><label>اليوم</label><input type="number" min={1} max={30} value={hd} onChange={(e) => setHd(e.target.value)} /></div>
        <div>
          <label>الشهر</label>
          <select value={hm} onChange={(e) => setHm(+e.target.value)}>
            {HIJRI_MONTHS.map((n, i) => <option key={n} value={i + 1}>{n}</option>)}
          </select>
        </div>
        <div><label>السنة</label><input type="number" min={1300} max={1600} value={hy} onChange={(e) => setHy(e.target.value)} /></div>
      </div>
      {hResult && <div className="result" style={{ marginTop: 10 }}>{hResult}</div>}
      <p className="note">يعتمد التحويل على تقويم أم القرى، وقد يختلف يومًا واحدًا عن رؤية الهلال المحلية في بلدك.</p>
    </>
  );
}

// يُعرض بعد التحميل في المتصفح لأن التاريخ الحالي يتغير يوميًا (تجنبًا لعدم تطابق الصفحة الثابتة)
export default function HijriTool() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <Inner /> : <p className="note">جارٍ التحميل...</p>;
}
