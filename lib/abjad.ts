// حساب الجُمَّل (الأبجدية المشرقية)
const VALUES: Record<string, number> = {
  ا: 1, ب: 2, ج: 3, د: 4, ه: 5, و: 6, ز: 7, ح: 8, ط: 9, ي: 10, ك: 20, ل: 30, م: 40, ن: 50,
  س: 60, ع: 70, ف: 80, ص: 90, ق: 100, ر: 200, ش: 300, ت: 400, ث: 500, خ: 600, ذ: 700, ض: 800, ظ: 900, غ: 1000,
};
const NORMALIZE: Record<string, string> = { أ: "ا", إ: "ا", آ: "ا", ٱ: "ا", ة: "ه", ى: "ي", ؤ: "و", ئ: "ي" };

export interface AbjadResult { total: number; letters: { ch: string; v: number }[] }

export function abjad(s: string): AbjadResult {
  const letters: { ch: string; v: number }[] = [];
  let total = 0;
  for (const c of Array.from(s)) {
    const n = NORMALIZE[c] ?? c;
    const v = VALUES[n];
    if (v) { letters.push({ ch: c, v }); total += v; }
  }
  return { total, letters };
}
