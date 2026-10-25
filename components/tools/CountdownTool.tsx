"use client";
import { dayNumber, fromDayNumber, todayYMD } from "@/lib/dates";
import { fromHijri, GREG_MONTHS, HIJRI_MONTHS, toHijri, weekdayOf } from "@/lib/hijri";

const EVENTS: { name: string; m: number; d: number }[] = [
  { name: "رأس السنة الهجرية", m: 1, d: 1 },
  { name: "يوم عاشوراء", m: 1, d: 10 },
  { name: "أول أيام رمضان", m: 9, d: 1 },
  { name: "عيد الفطر", m: 10, d: 1 },
  { name: "يوم عرفة", m: 12, d: 9 },
  { name: "عيد الأضحى", m: 12, d: 10 },
];

export default function CountdownTool() {
  const t = todayYMD();
  const today = dayNumber(t);
  const th = toHijri(t.y, t.m, t.d);
  const list = EVENTS.map((e) => {
    let y = th.y;
    let g = fromHijri(y, e.m, e.d);
    if (!g || dayNumber(g) < today) { y += 1; g = fromHijri(y, e.m, e.d); }
    return { ...e, y, g, days: g ? dayNumber(g) - today : 9999 };
  }).sort((a, b) => a.days - b.days);
  const first = list[0];
  return (
    <>
      <div className="result" style={{ textAlign: "center" }}>
        <div className="note" style={{ margin: 0 }}>الموعد القادم</div>
        <div style={{ fontSize: "1.3rem" }}>{first.name}</div>
        <div style={{ fontSize: "2.4rem", color: "var(--brand)", fontWeight: 800 }}>{first.days === 0 ? "اليوم" : first.days}</div>
        <div>{first.days === 0 ? "" : "يومًا متبقيًا"}</div>
      </div>
      <div style={{ marginTop: 12 }}>
        {list.map((e) => {
          const g = e.g ? fromDayNumber(dayNumber(e.g)) : null;
          return (
            <div key={e.name} className="tool" style={{ marginBottom: 8 }}>
              <b>{e.name}</b>
              <span>
                {e.d} {HIJRI_MONTHS[e.m - 1]} {e.y} هـ
                {g && <> — {weekdayOf(g.y, g.m, g.d)} {g.d} {GREG_MONTHS[g.m - 1]} {g.y} م</>}
                {" — "}{e.days === 0 ? "اليوم" : `بعد ${e.days} يومًا`}
              </span>
            </div>
          );
        })}
      </div>
      <p className="note">المواعيد حسب تقويم أم القرى، وقد تختلف يومًا واحدًا في بلدك بحسب رؤية الهلال.</p>
    </>
  );
}
