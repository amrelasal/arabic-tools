"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Kind = "text" | "wifi" | "whatsapp" | "phone";
const esc = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");

export default function QrTool() {
  const [kind, setKind] = useState<Kind>("text");
  const [text, setText] = useState("");
  const [ssid, setSsid] = useState("");
  const [pass, setPass] = useState("");
  const [enc, setEnc] = useState("WPA");
  const [phone, setPhone] = useState("");
  const [waText, setWaText] = useState("");
  const [size, setSize] = useState(300);
  const [ecc, setEcc] = useState<"L" | "M" | "Q" | "H">("M");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [png, setPng] = useState("");
  const [err, setErr] = useState("");

  const digits = phone.replace(/[^\d]/g, "");
  const data =
    kind === "text" ? text.trim()
    : kind === "wifi" ? (ssid ? `WIFI:T:${enc};S:${esc(ssid)};${enc === "nopass" ? "" : `P:${esc(pass)};`};` : "")
    : kind === "whatsapp" ? (digits ? `https://wa.me/${digits}${waText.trim() ? `?text=${encodeURIComponent(waText.trim())}` : ""}` : "")
    : (digits ? `tel:+${digits}` : "");

  useEffect(() => {
    let alive = true;
    if (!data) { setPng(""); setErr(""); return; }
    QRCode.toDataURL(data, { width: size, margin: 2, errorCorrectionLevel: ecc, color: { dark: fg, light: bg } })
      .then((u) => { if (alive) { setPng(u); setErr(""); } })
      .catch(() => { if (alive) { setPng(""); setErr("النص طويل جدًا لرمز QR. اختصره."); } });
    return () => { alive = false; };
  }, [data, size, ecc, fg, bg]);

  async function downloadSvg() {
    const svg = await QRCode.toString(data, { type: "svg", margin: 2, errorCorrectionLevel: ecc, color: { dark: fg, light: bg } });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    a.download = "qr-code.svg"; a.click(); URL.revokeObjectURL(a.href);
  }

  return (
    <>
      <div className="tabs">
        {([["text", "نص أو رابط"], ["wifi", "واي فاي"], ["whatsapp", "واتساب"], ["phone", "رقم هاتف"]] as [Kind, string][]).map(([k, l]) => (
          <button key={k} className={`tab ${kind === k ? "on" : ""}`} onClick={() => setKind(k)}>{l}</button>
        ))}
      </div>
      {kind === "text" && <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="الصق الرابط أو اكتب النص هنا..." style={{ minHeight: 90 }} />}
      {kind === "wifi" && (
        <div className="row">
          <div><label>اسم الشبكة</label><input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} /></div>
          <div><label>كلمة المرور</label><input type="text" value={pass} onChange={(e) => setPass(e.target.value)} disabled={enc === "nopass"} /></div>
          <div><label>نوع التشفير</label><select value={enc} onChange={(e) => setEnc(e.target.value)}><option value="WPA">WPA/WPA2/WPA3</option><option value="WEP">WEP</option><option value="nopass">بدون كلمة مرور</option></select></div>
        </div>
      )}
      {(kind === "whatsapp" || kind === "phone") && (
        <div className="row">
          <div><label>الرقم مع رمز الدولة (بدون صفر أو +)</label><input type="text" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="مثال: 201001234567" /></div>
          {kind === "whatsapp" && <div><label>رسالة جاهزة (اختياري)</label><input type="text" value={waText} onChange={(e) => setWaText(e.target.value)} /></div>}
        </div>
      )}
      <div className="row" style={{ marginTop: 10 }}>
        <div><label>الحجم (بكسل)</label><input type="number" min={128} max={1024} step={32} value={size} onChange={(e) => setSize(Math.min(1024, Math.max(128, +e.target.value || 300)))} /></div>
        <div><label>مستوى تصحيح الخطأ</label><select value={ecc} onChange={(e) => setEcc(e.target.value as "L" | "M" | "Q" | "H")}><option value="L">منخفض</option><option value="M">متوسط</option><option value="Q">عالٍ</option><option value="H">أعلى</option></select></div>
        <div><label>لون الرمز</label><input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: "100%", height: 38 }} /></div>
        <div><label>لون الخلفية</label><input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: "100%", height: 38 }} /></div>
      </div>
      {err && <div className="err">{err}</div>}
      {png ? (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={png} alt="رمز QR" width={Math.min(size, 320)} height={Math.min(size, 320)} style={{ background: bg, borderRadius: 8 }} />
          <div>
            <a className="btn" href={png} download="qr-code.png">تنزيل PNG</a>
            <button className="btn alt" onClick={downloadSvg}>تنزيل SVG</button>
          </div>
        </div>
      ) : (!err && <p className="note">أدخل البيانات ليظهر الرمز.</p>)}
      <p className="note">اجعل لون الرمز أغمق من الخلفية بوضوح، وجرّب مسح الرمز بهاتفك قبل طباعته أو نشره. الرمز يُنشأ داخل متصفحك دون رفع بياناتك.</p>
    </>
  );
}
