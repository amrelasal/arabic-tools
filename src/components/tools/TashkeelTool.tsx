"use client";
import { useState } from "react";
import { removeTashkeel } from "@/lib/arabic";
import CopyButton from "../CopyButton";

const MAX = 5000;

export default function TashkeelTool({ initial = "remove" }: { initial?: "remove" | "add" }) {
  const [mode, setMode] = useState<"remove" | "add">(initial);
  const [text, setText] = useState("");
  const [added, setAdded] = useState("");
  const [partial, setPartial] = useState(false);
  const [busy, setBusy] = useState(false);
  const [prog, setProg] = useState("");
  const [err, setErr] = useState("");

  const out = mode === "remove" ? removeTashkeel(text) : added;

  async function run() {
    setErr(""); setAdded(""); setBusy(true); setProg("جارٍ تحميل نموذج التشكيل (نحو 13 ميجابايت، يُحمَّل مرة واحدة فقط)...");
    try {
      const { addTashkeel } = await import("@/lib/tashkeel-local");
      setProg("جارٍ التشكيل...");
      const r = await addTashkeel(text, partial, (d, t) => setProg(`جارٍ التشكيل... ${d} من ${t}`));
      setAdded(r);
    } catch {
      setErr("تعذر تشغيل نموذج التشكيل في هذا المتصفح. جرّب متصفحًا حديثًا مثل Chrome أو Firefox أو Safari المحدّث.");
    }
    setBusy(false); setProg("");
  }

  return (
    <>
      <div className="tabs">
        <button className={`tab ${mode === "remove" ? "on" : ""}`} onClick={() => setMode("remove")}>إزالة التشكيل</button>
        <button className={`tab ${mode === "add" ? "on" : ""}`} onClick={() => setMode("add")}>إضافة التشكيل</button>
      </div>
      <textarea
        value={text} onChange={(e) => setText(e.target.value)}
        placeholder={mode === "remove" ? "الصق النص المشكول هنا..." : "اكتب النص العربي المراد تشكيله هنا..."}
        maxLength={mode === "add" ? MAX : undefined}
      />
      {mode === "add" && (
        <>
          <div className="note">{text.length} / {MAX} حرف</div>
          <div className="opts">
            <label><input type="checkbox" checked={partial} onChange={(e) => setPartial(e.target.checked)} /> اترك آخر الكلمات بلا حركة إعراب (تشكيل جزئي، أقل عرضة للخطأ)</label>
          </div>
          <button className="btn" disabled={busy || !text.trim()} onClick={run}>{busy ? "يعمل..." : "شكّل النص"}</button>
          {prog && <div className="note">{prog}</div>}
          {err && <div className="err">{err}</div>}
        </>
      )}
      <textarea
        value={out} readOnly style={{ marginTop: 12 }}
        placeholder={mode === "remove" ? "النتيجة بدون تشكيل..." : "النص المشكول يظهر هنا..."}
      />
      <CopyButton text={out} />
      <button className="btn alt" onClick={() => { setText(""); setAdded(""); setErr(""); }}>مسح</button>
      {mode === "add" && (
        <p className="note"><b>تشكيل آلي تقريبي:</b> يعمل النموذج داخل متصفحك دون رفع نصك، لكنه قد يخطئ، خصوصًا في حركات الإعراب وبعض الأسماء والجموع. راجع النتيجة قبل النشر، ولا تعتمد عليها في النصوص الدينية أو الرسمية دون تدقيق.</p>
      )}
    </>
  );
}
