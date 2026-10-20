"use client";
import { useState } from "react";

export default function BmiTool() {
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const kg = parseFloat(w), cm = parseFloat(h);
  const ok = kg > 0 && cm > 0;
  const m = cm / 100;
  const bmi = ok ? kg / (m * m) : 0;
  const cat = bmi < 18.5 ? "أقل من الوزن الطبيعي" : bmi < 25 ? "وزن طبيعي" : bmi < 30 ? "زيادة في الوزن" : "سمنة";
  return (
    <>
      <div className="row">
        <div><label>الوزن (كجم)</label><input type="number" value={w} onChange={(e) => setW(e.target.value)} /></div>
        <div><label>الطول (سم)</label><input type="number" value={h} onChange={(e) => setH(e.target.value)} /></div>
      </div>
      <div className="result">
        {ok ? (
          <>
            <div>مؤشر كتلة الجسم: <b>{bmi.toFixed(1)}</b> — {cat}</div>
            <div className="note">المدى الطبيعي لطولك: من {(18.5 * m * m).toFixed(1)} إلى {(24.9 * m * m).toFixed(1)} كجم</div>
          </>
        ) : "أدخل وزنك وطولك لحساب المؤشر."}
      </div>
      <p className="note">هذه الأداة للبالغين فقط، والمؤشر تقدير عام لا يميّز بين الدهون والعضلات، وليس بديلًا عن استشارة الطبيب.</p>
    </>
  );
}
