"use client";
import { useMemo, useState } from "react";
import CopyButton from "../CopyButton";

function enc64(s: string, urlSafe: boolean) {
  const bytes = new TextEncoder().encode(s);
  let bin = ""; bytes.forEach((b) => (bin += String.fromCharCode(b)));
  let out = btoa(bin);
  if (urlSafe) out = out.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return out;
}
function dec64(s: string) {
  const t = s.trim().replace(/-/g, "+").replace(/_/g, "/");
  const pad = t + "=".repeat((4 - (t.length % 4)) % 4);
  const bin = atob(pad);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export default function Base64Tool() {
  const [tab, setTab] = useState<"b64" | "url">("b64");
  const [mode, setMode] = useState<"enc" | "dec">("enc");
  const [text, setText] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [full, setFull] = useState(false);

  const r = useMemo(() => {
    if (!text) return { out: "", err: "" };
    try {
      if (tab === "b64") return { out: mode === "enc" ? enc64(text, urlSafe) : dec64(text), err: "" };
      return { out: mode === "enc" ? (full ? encodeURI(text) : encodeURIComponent(text)) : (full ? decodeURI(text) : decodeURIComponent(text)), err: "" };
    } catch { return { out: "", err: "تعذر التحويل. تأكد أن النص المُدخل صالح لهذا الاتجاه." }; }
  }, [text, tab, mode, urlSafe, full]);

  return (
    <>
      <div className="tabs">
        <button className={`tab ${tab === "b64" ? "on" : ""}`} onClick={() => setTab("b64")}>Base64</button>
        <button className={`tab ${tab === "url" ? "on" : ""}`} onClick={() => setTab("url")}>الروابط (URL)</button>
      </div>
      <div className="tabs">
        <button className={`tab ${mode === "enc" ? "on" : ""}`} onClick={() => setMode("enc")}>ترميز</button>
        <button className={`tab ${mode === "dec" ? "on" : ""}`} onClick={() => setMode("dec")}>فك الترميز</button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={mode === "enc" ? "اكتب النص (يدعم العربية)..." : "الصق النص المرمَّز..."} />
      <div className="opts">
        {tab === "b64" && mode === "enc" && <label><input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} /> صيغة آمنة للروابط (URL-safe)</label>}
        {tab === "url" && <label><input type="checkbox" checked={full} onChange={(e) => setFull(e.target.checked)} /> رابط كامل (لا ترمّز الرموز : / ? &amp; =)</label>}
      </div>
      {r.err && <div className="err">{r.err}</div>}
      <textarea value={r.out} readOnly style={{ marginTop: 10 }} placeholder="النتيجة..." />
      <CopyButton text={r.out} />
      <p className="note">Base64 وتشفير الروابط ليسا تشفيرًا آمنًا ولا يحميان بياناتك، فهما مجرد صيغ لتمثيل النص. لا تستخدمهما لإخفاء كلمات المرور.</p>
    </>
  );
}
