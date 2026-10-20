"use client";
import { useState } from "react";
import { convertKeyboard, detect, type KbMode } from "@/lib/keyboard";
import CopyButton from "../CopyButton";

export default function KeyboardTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<KbMode>("auto");
  const [shift, setShift] = useState(false);
  const out = convertKeyboard(text, mode, shift);
  const dir = mode === "auto" ? detect(text) : mode;
  return (
    <>
      <div className="opts">
        <label><input type="radio" checked={mode === "auto"} onChange={() => setMode("auto")} /> تلقائي</label>
        <label><input type="radio" checked={mode === "en2ar"} onChange={() => setMode("en2ar")} /> من الإنجليزية إلى العربية (hgsghl ← السلام)</label>
        <label><input type="radio" checked={mode === "ar2en"} onChange={() => setMode("ar2en")} /> من العربية إلى الإنجليزية (ؤيخقمهخن ← hello)</label>
        <label><input type="checkbox" checked={shift} onChange={(e) => setShift(e.target.checked)} /> اعتبر الحروف الكبيرة (Shift) لإنتاج أ إ آ</label>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="الصق النص المكتوب بلغة لوحة المفاتيح الخطأ..." style={{ marginTop: 12 }} />
      {text && <div className="note">الاتجاه المستخدم: {dir === "en2ar" ? "من الإنجليزية إلى العربية" : "من العربية إلى الإنجليزية"}</div>}
      <textarea value={out} readOnly style={{ marginTop: 12 }} />
      <CopyButton text={out} />
    </>
  );
}
