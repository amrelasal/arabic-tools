"use client";
import { useState } from "react";
import { removeTashkeel } from "@/lib/arabic";
import CopyButton from "../CopyButton";

const MAX = 1500;
const ERRORS: Record<string, string> = {
  not_configured: "ميزة إضافة التشكيل غير مفعّلة حاليًا.",
  no_arabic: "أدخل نصًا عربيًا أولًا.",
  too_long: `النص أطول من الحد المسموح (${MAX} حرف). قسّمه إلى أجزاء.`,
  rate_limited: "وصلت للحد المسموح به مؤقتًا. حاول بعد قليل.",
  mismatch: "تعذر الحصول على تشكيل دقيق لهذا النص. جرّب نصًا أقصر.",
  upstream: "حدث خطأ مؤقت. حاول مرة أخرى.",
  bad_request: "تعذر إرسال الطلب.",
};

export default function TashkeelTool({ initial = "remove" }: { initial?: "remove" | "add" }) {
  const [mode, setMode] = useState<"remove" | "add">(initial);
  const [text, setText] = useState("");
  const [added, setAdded] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const out = mode === "remove" ? removeTashkeel(text) : added;

  async function addTashkeel() {
    setErr(""); setAdded(""); setBusy(true);
    try {
      const r = await fetch("/api/tashkeel", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) setErr(ERRORS[j.error] ?? ERRORS.upstream);
      else setAdded(j.text);
    } catch { setErr(ERRORS.upstream); }
    setBusy(false);
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
          <button className="btn" disabled={busy || !text.trim()} onClick={addTashkeel}>
            {busy ? "جارٍ التشكيل..." : "شكّل النص"}
          </button>
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
        <p className="note">التشكيل الآلي قد يخطئ أحيانًا، فراجعه قبل الاستخدام، خصوصًا في النصوص الشرعية والأدبية.</p>
      )}
    </>
  );
}
