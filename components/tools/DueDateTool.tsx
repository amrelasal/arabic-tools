"use client";
import { useState } from "react";
import { dayNumber, fromDayNumber, isoOf, parseISO, todayYMD } from "@/lib/dates";
import { GREG_MONTHS, weekdayOf } from "@/lib/hijri";

const fmtDate = (n: number) => {
  const x = fromDayNumber(n);
  return `${weekdayOf(x.y, x.m, x.d)} ${x.d} ${GREG_MONTHS[x.m - 1]} ${x.y}`;
};

export default function DueDateTool() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const l = parseISO(lmp);
  const c = Math.min(45, Math.max(21, parseInt(cycle, 10) || 28));
  let out: React.ReactNode = "أدخل تاريخ أول يوم من آخر دورة شهرية.";
  if (l) {
    const start = dayNumber(l);
    const due = start + 280 + (c - 28);
    const today = dayNumber(todayYMD());
    const elapsed = today - start;
    out = (
      <>
        <div>موعد الولادة المتوقع: <b>{fmtDate(due)}</b></div>
        <div className="note">الإباضة المتوقعة نحو {fmtDate(start + c - 14)}</div>
        {elapsed >= 0 && elapsed <= 300 && <div className="note">عمر الحمل اليوم: {Math.floor(elapsed / 7)} أسبوعًا و{elapsed % 7} أيام (من أول يوم في آخر دورة)</div>}
        {elapsed < 0 && <div className="err">التاريخ في المستقبل.</div>}
      </>
    );
  }
  return (
    <>
      <div className="row">
        <div><label>أول يوم في آخر دورة شهرية</label><input type="date" value={lmp} max={isoOf(todayYMD())} onChange={(e) => setLmp(e.target.value)} /></div>
        <div><label>طول الدورة (21 - 45 يومًا)</label><input type="number" min={21} max={45} value={cycle} onChange={(e) => setCycle(e.target.value)} /></div>
      </div>
      <div className="result">{out}</div>
      <p className="note">الموعد تقديري (قاعدة ناغيل: 280 يومًا من أول يوم في آخر دورة)، وقليل من الولادات تقع في اليوم نفسه تمامًا. يحدد طبيبك الموعد الدقيق بالفحص.</p>
    </>
  );
}
