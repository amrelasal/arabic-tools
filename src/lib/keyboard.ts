// تخطيط لوحة المفاتيح العربية القياسية مقابل الإنجليزية (QWERTY)
const BASE: Record<string, string> = {
  q: "ض", w: "ص", e: "ث", r: "ق", t: "ف", y: "غ", u: "ع", i: "ه", o: "خ", p: "ح", "[": "ج", "]": "د",
  a: "ش", s: "س", d: "ي", f: "ب", g: "ل", h: "ا", j: "ت", k: "ن", l: "م", ";": "ك", "'": "ط",
  z: "ئ", x: "ء", c: "ؤ", v: "ر", b: "لا", n: "ى", m: "ة", ",": "و", ".": "ز", "/": "ظ",
};
const SHIFT: Record<string, string> = {
  T: "لإ", Y: "إ", G: "لأ", H: "أ", B: "لآ", N: "آ", "?": "؟",
};
const REVERSE: Record<string, string> = {};
for (const [k, v] of Object.entries(BASE)) if (v.length === 1) REVERSE[v] = k;
REVERSE["أ"] = "H"; REVERSE["إ"] = "Y"; REVERSE["آ"] = "N"; REVERSE["؟"] = "?";

export type KbMode = "auto" | "en2ar" | "ar2en";

export function detect(s: string): "en2ar" | "ar2en" {
  const ar = (s.match(/[\u0600-\u06FF]/g) ?? []).length;
  const en = (s.match(/[a-zA-Z]/g) ?? []).length;
  return ar > en ? "ar2en" : "en2ar";
}

export function convertKeyboard(s: string, mode: KbMode, shift = false): string {
  const m = mode === "auto" ? detect(s) : mode;
  if (m === "en2ar") {
    return Array.from(s).map((c) => {
      if (shift && SHIFT[c]) return SHIFT[c];
      if (c === "?") return "؟";
      return BASE[c.toLowerCase()] ?? c;
    }).join("");
  }
  return s.replace(/لا/g, "b").replace(/[\u0621-\u064A]/g, (c) => REVERSE[c] ?? c);
}
