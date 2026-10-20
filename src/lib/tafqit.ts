import { toWestern } from "./arabic";

type Gender = "m" | "f";
export interface Unit { s: string; acc: string; d: string; p: string; g: Gender }
export interface Currency { code: string; name: string; main: Unit; sub: Unit; digits: number }

const UNITS_M = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة"];
const UNITS_F = ["", "واحدة", "اثنتان", "ثلاث", "أربع", "خمس", "ست", "سبع", "ثمان", "تسع", "عشر"];
const TEENS_M = ["أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
const TEENS_F = ["إحدى عشرة", "اثنتا عشرة", "ثلاث عشرة", "أربع عشرة", "خمس عشرة", "ست عشرة", "سبع عشرة", "ثماني عشرة", "تسع عشرة"];
const TENS = ["", "", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
const HUNDREDS = ["", "مائة", "مائتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"];
const SCALES = [
  { s: "ألف", a: "ألفًا", d: "ألفان", p: "آلاف" },
  { s: "مليون", a: "مليونًا", d: "مليونان", p: "ملايين" },
  { s: "مليار", a: "مليارًا", d: "ملياران", p: "مليارات" },
  { s: "تريليون", a: "تريليونًا", d: "تريليونان", p: "تريليونات" },
];

const below100 = (n: number, g: Gender) => {
  const U = g === "m" ? UNITS_M : UNITS_F;
  if (n <= 10) return U[n];
  if (n < 20) return (g === "m" ? TEENS_M : TEENS_F)[n - 11];
  const t = Math.floor(n / 10), u = n % 10;
  return u === 0 ? TENS[t] : `${U[u]} و${TENS[t]}`;
};

const below1000 = (n: number, g: Gender) => {
  const h = Math.floor(n / 100), r = n % 100;
  const parts: string[] = [];
  if (h) parts.push(HUNDREDS[h]);
  if (r) parts.push(below100(r, g));
  return parts.join(" و");
};

const groupWithScale = (g: number, idx: number, plain: boolean) => {
  const sc = SCALES[idx - 1];
  const r = g % 100;
  if (g === 1) return sc.s;
  if (g === 2) return sc.d;
  if (g > 100 && (r === 1 || r === 2)) return `${HUNDREDS[Math.floor(g / 100)]} و${r === 1 ? sc.s : sc.d}`;
  const body = below1000(g, "m");
  if (r >= 3 && r <= 10) return `${body} ${sc.p}`;
  return `${body} ${r >= 11 && !plain ? sc.a : sc.s}`;
};

export const integerToWords = (n: bigint, g: Gender = "m", nounFollows = false): string => {
  if (n === 0n) return "صفر";
  const parts: string[] = [];
  let idx = 0;
  let lowest = true;
  while (n > 0n) {
    const group = Number(n % 1000n);
    n /= 1000n;
    if (group) {
      parts.unshift(idx === 0 ? below1000(group, g) : groupWithScale(group, idx, nounFollows && lowest));
      lowest = false;
    }
    idx++;
  }
  return parts.join(" و");
};

const phrase = (n: bigint, u: Unit): string => {
  if (n === 1n) return `${u.s} ${u.g === "m" ? "واحد" : "واحدة"}`;
  if (n === 2n) return u.d;
  const r = Number(n % 100n);
  if (n > 2n && (r === 1 || r === 2)) {
    return `${integerToWords(n - BigInt(r), u.g, false)} و${r === 1 ? `${u.s} ${u.g === "m" ? "واحد" : "واحدة"}` : u.d}`;
  }
  const w = integerToWords(n, u.g, true);
  if (r >= 3 && r <= 10) return `${w} ${u.p}`;
  return `${w} ${r === 0 ? u.s : u.acc}`;
};

const M = (s: string, acc: string, d: string, p: string): Unit => ({ s, acc, d, p, g: "m" });

export const currencies: Currency[] = [
  { code: "EGP", name: "جنيه مصري", digits: 2, main: M("جنيه", "جنيهًا", "جنيهان", "جنيهات"), sub: M("قرش", "قرشًا", "قرشان", "قروش") },
  { code: "SAR", name: "ريال سعودي", digits: 2, main: M("ريال", "ريالًا", "ريالان", "ريالات"), sub: { s: "هللة", acc: "هللةً", d: "هللتان", p: "هللات", g: "f" } },
  { code: "AED", name: "درهم إماراتي", digits: 2, main: M("درهم", "درهمًا", "درهمان", "دراهم"), sub: M("فلس", "فلسًا", "فلسان", "فلوس") },
  { code: "KWD", name: "دينار كويتي", digits: 3, main: M("دينار", "دينارًا", "ديناران", "دنانير"), sub: M("فلس", "فلسًا", "فلسان", "فلوس") },
  { code: "QAR", name: "ريال قطري", digits: 2, main: M("ريال", "ريالًا", "ريالان", "ريالات"), sub: M("درهم", "درهمًا", "درهمان", "دراهم") },
  { code: "USD", name: "دولار أمريكي", digits: 2, main: M("دولار", "دولارًا", "دولاران", "دولارات"), sub: M("سنت", "سنتًا", "سنتان", "سنتات") },
  { code: "EUR", name: "يورو", digits: 2, main: M("يورو", "يورو", "يورو", "يورو"), sub: M("سنت", "سنتًا", "سنتان", "سنتات") },
];

export interface TafqitResult { ok: boolean; text: string }

export function tafqit(
  input: string,
  currencyCode: string | null,
  opts: { prefix: boolean; suffix: boolean } = { prefix: true, suffix: true },
): TafqitResult {
  const clean = toWestern(input).replace(/[,٬\s]/g, "").replace("٫", ".");
  if (!clean) return { ok: false, text: "" };
  if (!/^\d+(\.\d+)?$/.test(clean)) return { ok: false, text: "أدخل رقمًا صحيحًا فقط (مثال: 1250.75)" };
  let [whole, frac = ""] = clean.split(".");
  whole = whole.replace(/^0+(?=\d)/, "");
  if (whole.length > 15) return { ok: false, text: "الرقم كبير جدًا (الحد الأقصى 15 خانة)" };

  const cur = currencies.find((c) => c.code === currencyCode) ?? null;
  let body: string;

  if (!cur) {
    body = integerToWords(BigInt(whole));
    if (frac) body += " فاصلة " + frac.split("").map((d) => (d === "0" ? "صفر" : UNITS_M[+d])).join(" ");
  } else {
    let w = BigInt(whole);
    const f = (frac + "0".repeat(cur.digits + 1)).slice(0, cur.digits + 1);
    let sub = BigInt(f.slice(0, cur.digits));
    if (+f[cur.digits] >= 5) sub += 1n;
    if (sub >= 10n ** BigInt(cur.digits)) { sub -= 10n ** BigInt(cur.digits); w += 1n; }
    const parts: string[] = [];
    if (w > 0n) parts.push(phrase(w, cur.main));
    if (sub > 0n) parts.push(phrase(sub, cur.sub));
    body = parts.length ? parts.join(" و") : `صفر ${cur.main.s}`;
  }
  return { ok: true, text: `${opts.prefix ? "فقط " : ""}${body}${opts.suffix ? " لا غير" : ""}` };
}
