"use client";
import { useState } from "react";
import { cleanText, type CleanOptions } from "@/lib/arabic";
import CopyButton from "../CopyButton";

const LABELS: Record<keyof CleanOptions, string> = {
  tatweel: "إزالة التطويل (ـ)",
  tashkeel: "إزالة التشكيل",
  spaces: "حذف المسافات المتكررة",
  trimLines: "حذف المسافات من بداية ونهاية كل سطر",
  emptyLines: "حذف الأسطر الفارغة الزائدة",
};

export default function CleanerTool() {
  const [text, setText] = useState("");
  const [o, setO] = useState<CleanOptions>({
    tatweel: true, tashkeel: false, spaces: true, trimLines: true, emptyLines: true,
  });
  const out = cleanText(text, o);
  return (
    <>
      <div className="opts">
        {(Object.keys(LABELS) as (keyof CleanOptions)[]).map((k) => (
          <label key={k}>
            <input type="checkbox" checked={o[k]} onChange={(e) => setO({ ...o, [k]: e.target.checked })} /> {LABELS[k]}
          </label>
        ))}
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="الصق النص هنا..." style={{ marginTop: 12 }} />
      <textarea value={out} readOnly style={{ marginTop: 12 }} />
      <CopyButton text={out} />
    </>
  );
}
