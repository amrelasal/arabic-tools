"use client";
import { useMemo, useState } from "react";
import { normalizeSearch } from "@/lib/arabic";
import CopyButton from "../CopyButton";

type Sort = "none" | "asc" | "desc" | "len" | "rev";

export default function DedupeSortTool() {
  const [text, setText] = useState("");
  const [dedupe, setDedupe] = useState(true);
  const [loose, setLoose] = useState(true);
  const [trim, setTrim] = useState(true);
  const [noEmpty, setNoEmpty] = useState(true);
  const [sort, setSort] = useState<Sort>("none");

  const r = useMemo(() => {
    let lines = text.split(/\r?\n/);
    const before = lines.length;
    if (trim) lines = lines.map((l) => l.trim());
    if (noEmpty) lines = lines.filter((l) => l !== "");
    if (dedupe) {
      const seen = new Set<string>();
      lines = lines.filter((l) => { const k = loose ? normalizeSearch(l) : l; if (seen.has(k)) return false; seen.add(k); return true; });
    }
    const col = new Intl.Collator("ar");
    if (sort === "asc") lines = [...lines].sort(col.compare);
    else if (sort === "desc") lines = [...lines].sort((a, b) => col.compare(b, a));
    else if (sort === "len") lines = [...lines].sort((a, b) => a.length - b.length);
    else if (sort === "rev") lines = [...lines].reverse();
    return { out: lines.join("\n"), before, after: lines.length };
  }, [text, dedupe, loose, trim, noEmpty, sort]);

  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="الصق القائمة هنا (كل عنصر في سطر)..." />
      <div className="opts" style={{ marginTop: 8 }}>
        <label><input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} /> حذف الأسطر المكررة</label>
        <label><input type="checkbox" checked={loose} onChange={(e) => setLoose(e.target.checked)} disabled={!dedupe} /> تجاهل التشكيل واختلاف الهمزات والحروف الكبيرة عند المقارنة</label>
        <label><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} /> حذف المسافات من بداية السطر ونهايته</label>
        <label><input type="checkbox" checked={noEmpty} onChange={(e) => setNoEmpty(e.target.checked)} /> حذف الأسطر الفارغة</label>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <div><label>الترتيب</label>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="none">بدون ترتيب</option><option value="asc">أبجدي تصاعدي (أ ← ي)</option><option value="desc">أبجدي تنازلي (ي ← أ)</option>
            <option value="len">حسب الطول</option><option value="rev">عكس الترتيب الحالي</option>
          </select></div>
      </div>
      <textarea value={r.out} readOnly style={{ marginTop: 12 }} placeholder="النتيجة..." />
      {text && <div className="note">عدد الأسطر قبل: {r.before} — بعد: {r.after} — المحذوف: {Math.max(0, r.before - r.after)}</div>}
      <CopyButton text={r.out} />
    </>
  );
}
