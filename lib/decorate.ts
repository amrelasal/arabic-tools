const NON_CONNECT = "ادذرزوؤةىءأإآ";
const isAr = (c: string) => /[\u0621-\u064A]/.test(c);

export function tatweelize(s: string, count = 1): string {
  const chars = Array.from(s.replace(/\u0640/g, ""));
  let out = "";
  for (let i = 0; i < chars.length; i++) {
    out += chars[i];
    const next = chars[i + 1];
    if (next && isAr(chars[i]) && isAr(next) && !NON_CONNECT.includes(chars[i]) && next !== "ء") out += "ـ".repeat(count);
  }
  return out;
}

const RANGES: [string, number, number][] = [
  ["خط عريض", 0x1d400, 0x1d41a],
  ["خط مزخرف", 0x1d4d0, 0x1d4ea],
  ["خط قوطي", 0x1d56c, 0x1d586],
  ["خط بدون زوائد عريض", 0x1d5d4, 0x1d5ee],
  ["خط آلة كاتبة", 0x1d670, 0x1d68a],
  ["حروف داخل دوائر", 0x24b6, 0x24d0],
];

const mapLatin = (s: string, up: number, low: number) =>
  Array.from(s).map((c) => {
    if (/[A-Z]/.test(c)) return String.fromCodePoint(up + c.charCodeAt(0) - 65);
    if (/[a-z]/.test(c)) return String.fromCodePoint(low + c.charCodeAt(0) - 97);
    return c;
  }).join("");

export interface Deco { label: string; text: string }

export function decorate(name: string): Deco[] {
  const n = name.trim();
  if (!n) return [];
  const hasAr = /[\u0621-\u064A]/.test(n);
  const hasEn = /[A-Za-z]/.test(n);
  const res: Deco[] = [];
  if (hasAr) {
    res.push({ label: "تطويل", text: tatweelize(n, 1) });
    res.push({ label: "تطويل مضاعف", text: tatweelize(n, 2) });
  }
  if (hasEn) for (const [label, up, low] of RANGES) res.push({ label, text: mapLatin(n, up, low) });
  const frames: [string, (x: string) => string][] = [
    ["نجوم", (x) => `★ ${x} ★`],
    ["زهور", (x) => `✿ ${x} ✿`],
    ["أقواس", (x) => `『 ${x} 』`],
    ["ملكي", (x) => `꧁༺ ${x} ༻꧂`],
    ["تاج", (x) => `♛ ${x} ♛`],
    ["قلوب", (x) => `♥ ${x} ♥`],
    ["خطوط", (x) => `━━ ${x} ━━`],
    ["نقاط", (x) => `•°•°• ${x} •°•°•`],
    ["أسهم", (x) => `»»— ${x} —««`],
  ];
  const base = hasAr ? tatweelize(n, 1) : n;
  for (const [label, f] of frames) res.push({ label, text: f(base) });
  return res;
}
