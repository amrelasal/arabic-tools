export const HIJRI_MONTHS = ["محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];
export const GREG_MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
export const WEEKDAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export interface YMD { y: number; m: number; d: number }

const fmt = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura-nu-latn", {
  year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC",
});

const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d, 12));

export function toHijri(y: number, m: number, d: number): YMD {
  const parts = fmt.formatToParts(utc(y, m, d));
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  return { y: get("year"), m: get("month"), d: get("day") };
}

export const weekdayOf = (y: number, m: number, d: number) => WEEKDAYS[utc(y, m, d).getUTCDay()];

const approxDays = (h: YMD) => (h.y - 1) * 354.36707 + (h.m - 1) * 29.530588 + (h.d - 1);

export function fromHijri(hy: number, hm: number, hd: number): YMD | null {
  const anchor = utc(2024, 1, 1);
  const a = toHijri(2024, 1, 1);
  const diff = Math.round(approxDays({ y: hy, m: hm, d: hd }) - approxDays(a));
  const base = anchor.getTime() + diff * 86400000;
  for (let k = 0; k <= 45; k++) {
    for (const s of k === 0 ? [0] : [k, -k]) {
      const dt = new Date(base + s * 86400000);
      const g = { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
      const h = toHijri(g.y, g.m, g.d);
      if (h.y === hy && h.m === hm && h.d === hd) return g;
    }
  }
  return null;
}
