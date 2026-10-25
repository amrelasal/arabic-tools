"use client";
import { useState } from "react";
import { dayNumber, diffYMD, isoOf, parseISO, todayYMD, type YMD } from "@/lib/dates";
import { HIJRI_MONTHS, toHijri, weekdayOf } from "@/lib/hijri";

const nf = (n: number) => n.toLocaleString("en-US");

export default function AgeTool() {
  const t = todayYMD();
  const [birth, setBirth] = useState("");
  const [d1, setD1] = useState(isoOf(t));
  const [d2, setD2] = useState(isoOf(t));

  const b = parseISO(birth);
  let age: React.ReactNode = null;
  if (b) {
    if (dayNumber(b) > dayNumber(t)) age = <div className="err">تاريخ الميلاد في المستقبل.</div>;
    else {
      const g = diffYMD(b, t);
      const hb = toHijri(b.y, b.m, b.d), ht = toHijri(t.y, t.m, t.d);
      let hy = ht.y - hb.y, hm = ht.m - hb.m, hd = ht.d - hb.d;
      if (hd < 0) { hm--; hd += 30; }
      if (hm < 0) { hy--; hm += 12; }
      let next: YMD = { y: t.y, m: b.m, d: b.d };
      if (b.m === 2 && b.d === 29 && new Date(Date.UTC(t.y, 1, 29)).getUTCMonth() !== 1) next = { y: t.y, m: 3, d: 1 };
      if (dayNumber(next) < dayNumber(t)) next = { y: t.y + 1, m: b.m, d: b.d };
      const daysLeft = dayNumber(next) - dayNumber(t);
      age = (
        <>
          <div className="result">العمر بالميلادي: <b>{g.y}</b> سنة و<b>{g.m}</b> شهر و<b>{g.d}</b> يوم</div>
          <div className="result" style={{ marginTop: 8 }}>العمر بالهجري (تقريبي): <b>{hy}</b> سنة و<b>{hm}</b> شهر و<b>{hd}</b> يوم</div>
          <div className="stats">
            <div className="stat"><b>{nf(dayNumber(t) - dayNumber(b))}</b>يوم عشتها</div>
            <div className="stat"><b>{nf(Math.floor((dayNumber(t) - dayNumber(b)) / 7))}</b>أسبوع</div>
            <div className="stat"><b>{daysLeft === 0 ? "اليوم!" : daysLeft}</b>{daysLeft === 0 ? "عيد ميلادك" : "يوم على عيد ميلادك"}</div>
          </div>
          <p className="note">وُلدت يوم {weekdayOf(b.y, b.m, b.d)}، الموافق {hb.d} {HIJRI_MONTHS[hb.m - 1]} {hb.y} هـ.</p>
        </>
      );
    }
  }

  const a = parseISO(d1), c = parseISO(d2);
  let diff: React.ReactNode = null;
  if (a && c) {
    const [from, to] = dayNumber(a) <= dayNumber(c) ? [a, c] : [c, a];
    const g = diffYMD(from, to);
    diff = (
      <div className="result" style={{ marginTop: 10 }}>
        الفرق: <b>{g.y}</b> سنة و<b>{g.m}</b> شهر و<b>{g.d}</b> يوم
        <div className="note">ما يعادل {nf(Math.abs(dayNumber(c) - dayNumber(a)))} يومًا</div>
      </div>
    );
  }

  return (
    <>
      <h2 style={{ marginTop: 0 }}>حاسبة العمر</h2>
      <label>تاريخ الميلاد</label>
      <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
      <div style={{ marginTop: 10 }}>{age}</div>
      <h2>الفرق بين تاريخين</h2>
      <div className="row">
        <div><label>من</label><input type="date" value={d1} onChange={(e) => setD1(e.target.value)} /></div>
        <div><label>إلى</label><input type="date" value={d2} onChange={(e) => setD2(e.target.value)} /></div>
      </div>
      {diff}
    </>
  );
}
