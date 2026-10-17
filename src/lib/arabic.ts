// حركات التشكيل + الألف الخنجرية + علامات القرآن الصغيرة
export const removeTashkeel = (s: string) =>
  s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");

export const removeTatweel = (s: string) => s.replace(/\u0640/g, "");

const AR = "٠١٢٣٤٥٦٧٨٩"; // الهندية (العربية الشرقية)
const FA = "۰۱۲۳۴۵۶۷۸۹"; // الفارسية

export const toWestern = (s: string) =>
  s.replace(/[٠-٩۰-۹]/g, (d) => {
    const i = AR.indexOf(d);
    return String(i >= 0 ? i : FA.indexOf(d));
  });

export const toEasternArabic = (s: string) => s.replace(/[0-9]/g, (d) => AR[+d]);

export interface CleanOptions {
  tatweel: boolean;
  tashkeel: boolean;
  spaces: boolean;
  emptyLines: boolean;
  trimLines: boolean;
}

export const cleanText = (s: string, o: CleanOptions) => {
  let t = s;
  if (o.tashkeel) t = removeTashkeel(t);
  if (o.tatweel) t = removeTatweel(t);
  if (o.spaces) t = t.replace(/[ \t\u00A0]+/g, " ");
  if (o.trimLines) t = t.split("\n").map((l) => l.trim()).join("\n");
  if (o.emptyLines) t = t.replace(/\n{3,}/g, "\n\n");
  return t.trim();
};

export const countWords = (s: string) => (s.match(/[\p{L}\p{N}]+/gu) ?? []).length;

export const countSentences = (s: string) =>
  s.split(/[.!?؟…\n]+/).filter((x) => x.trim().length > 0).length;

export const countParagraphs = (s: string) =>
  s.split(/\n\s*\n/).filter((x) => x.trim().length > 0).length;
