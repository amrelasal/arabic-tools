import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from "adhan";

export const METHODS: { key: string; label: string }[] = [
  { key: "egypt", label: "الهيئة المصرية العامة للمساحة" },
  { key: "ummalqura", label: "جامعة أم القرى (السعودية)" },
  { key: "kuwait", label: "الكويت" },
  { key: "qatar", label: "قطر" },
  { key: "dubai", label: "دبي" },
  { key: "mwl", label: "رابطة العالم الإسلامي" },
  { key: "karachi", label: "جامعة العلوم الإسلامية بكراتشي" },
  { key: "turkey", label: "رئاسة الشؤون الدينية التركية" },
  { key: "northamerica", label: "الجمعية الإسلامية لأمريكا الشمالية" },
];

function params(key: string, madhab: string) {
  const p = ({
    egypt: CalculationMethod.Egyptian, ummalqura: CalculationMethod.UmmAlQura, kuwait: CalculationMethod.Kuwait,
    qatar: CalculationMethod.Qatar, dubai: CalculationMethod.Dubai, mwl: CalculationMethod.MuslimWorldLeague,
    karachi: CalculationMethod.Karachi, turkey: CalculationMethod.Turkey, northamerica: CalculationMethod.NorthAmerica,
  } as Record<string, () => ReturnType<typeof CalculationMethod.Egyptian>>)[key]();
  p.madhab = madhab === "hanafi" ? Madhab.Hanafi : Madhab.Shafi;
  return p;
}

export interface YMD { y: number; m: number; d: number }
export interface DayTimes { fajr: Date; sunrise: Date; dhuhr: Date; asr: Date; maghrib: Date; isha: Date }

export function ymdInTz(date: Date, tz: string): YMD {
  const s = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  const [y, m, d] = s.split("-").map(Number);
  return { y, m, d };
}

export function addDays(x: YMD, n: number): YMD {
  const dt = new Date(Date.UTC(x.y, x.m - 1, x.d + n));
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

export function timesFor(lat: number, lon: number, ymd: YMD, method: string, madhab: string): DayTimes {
  // تستخدم المكتبة مكوّنات اليوم والشهر والسنة فقط، فننشئ التاريخ بها مباشرة
  const t = new PrayerTimes(new Coordinates(lat, lon), new Date(ymd.y, ymd.m - 1, ymd.d), params(method, madhab));
  return { fajr: t.fajr, sunrise: t.sunrise, dhuhr: t.dhuhr, asr: t.asr, maghrib: t.maghrib, isha: t.isha };
}

export const fmtTime = (d: Date, tz: string, h12: boolean) =>
  new Intl.DateTimeFormat("ar-EG-u-nu-latn", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: h12 }).format(d);

export const fmtDay = (x: YMD) => {
  const dt = new Date(Date.UTC(x.y, x.m - 1, x.d));
  return new Intl.DateTimeFormat("ar-EG-u-nu-latn", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(dt);
};

export const PRAYER_NAMES: [keyof DayTimes, string][] = [
  ["fajr", "الفجر"], ["sunrise", "الشروق"], ["dhuhr", "الظهر"], ["asr", "العصر"], ["maghrib", "المغرب"], ["isha", "العشاء"],
];
