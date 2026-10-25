"use client";
import { useCallback, useEffect, useState } from "react";
import CopyButton from "../CopyButton";

const SETS = { lower: "abcdefghijklmnopqrstuvwxyz", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", digits: "0123456789", symbols: "!@#$%^&*()-_=+[]{};:,.?/" };
const AMBIG = /[0O1lI|`'"]/g;

function rnd(n: number) {
  const lim = Math.floor(0x100000000 / n) * n;
  const a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= lim);
  return a[0] % n;
}

export default function PasswordTool() {
  const [len, setLen] = useState(16);
  const [opt, setOpt] = useState({ lower: true, upper: true, digits: true, symbols: true, noAmbig: false });
  const [pw, setPw] = useState("");

  const sets = (Object.keys(SETS) as (keyof typeof SETS)[]).filter((k) => opt[k]).map((k) => (opt.noAmbig ? SETS[k].replace(AMBIG, "") : SETS[k]));
  const pool = sets.join("");
  const bits = pool ? Math.round(len * Math.log2(pool.length)) : 0;
  const level = bits < 40 ? ["ضعيفة", "#c0392b", 25] : bits < 60 ? ["متوسطة", "#d68910", 50] : bits < 80 ? ["قوية", "#2e7d32", 75] : ["قوية جدًا", "#0f766e", 100];

  const gen = useCallback(() => {
    if (!pool) return setPw("");
    const chars = sets.map((s) => s[rnd(s.length)]);
    while (chars.length < len) chars.push(pool[rnd(pool.length)]);
    for (let i = chars.length - 1; i > 0; i--) { const j = rnd(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    setPw(chars.slice(0, len).join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len, opt.lower, opt.upper, opt.digits, opt.symbols, opt.noAmbig]);

  useEffect(() => { gen(); }, [gen]);
  const tog = (k: keyof typeof opt) => setOpt({ ...opt, [k]: !opt[k] });

  return (
    <>
      <div className="result pw">{pw || "اختر نوعًا واحدًا على الأقل من الرموز"}</div>
      {pw && (
        <>
          <div className="meter"><i style={{ width: `${level[2]}%`, background: level[1] as string }} /></div>
          <div className="note">قوة كلمة المرور: <b style={{ color: level[1] as string }}>{level[0]}</b> (نحو {bits} بت من العشوائية)</div>
        </>
      )}
      <CopyButton text={pw} />
      <button className="btn alt" onClick={gen}>توليد كلمة جديدة</button>
      <div style={{ marginTop: 12 }}>
        <label>الطول: {len} خانة</label>
        <input type="range" min={8} max={64} value={len} onChange={(e) => setLen(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div className="opts">
        <label><input type="checkbox" checked={opt.lower} onChange={() => tog("lower")} /> حروف صغيرة (a-z)</label>
        <label><input type="checkbox" checked={opt.upper} onChange={() => tog("upper")} /> حروف كبيرة (A-Z)</label>
        <label><input type="checkbox" checked={opt.digits} onChange={() => tog("digits")} /> أرقام (0-9)</label>
        <label><input type="checkbox" checked={opt.symbols} onChange={() => tog("symbols")} /> رموز (!@#$%)</label>
        <label><input type="checkbox" checked={opt.noAmbig} onChange={() => tog("noAmbig")} /> استبعاد الأحرف المتشابهة (0 O 1 l I)</label>
      </div>
      <p className="note">تُولَّد كلمة المرور داخل متصفحك بمولّد أرقام عشوائية آمن، ولا تُرسل ولا تُحفظ في أي مكان. استخدم كلمة مختلفة لكل حساب، ويُفضَّل مدير كلمات مرور موثوق.</p>
    </>
  );
}
