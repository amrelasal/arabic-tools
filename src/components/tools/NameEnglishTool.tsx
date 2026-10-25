"use client";
import { useState } from "react";
import { transliterate, type Style } from "@/lib/translit";
import CopyButton from "../CopyButton";

const STYLES: [Style, string, string][] = [
  ["egypt", "النمط المصري", "Mohamed, Abdel, El-"],
  ["gulf", "النمط الخليجي", "Mohammed, Abdul, Al-"],
  ["formal", "النمط الأكاديمي (معيار)", "Muhammad, Abd al-"],
];

export default function NameEnglishTool() {
  const [name, setName] = useState("");
  const res = name.trim() ? STYLES.map(([k, label, ex]) => ({ k, label, ex, r: transliterate(name, k) })) : [];
  const unknown = res[0]?.r.unknown ?? [];
  return (
    <>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب الاسم بالعربية، مثال: محمد عبد الرحمن" maxLength={80} />
      {res.length === 0 && <p className="note">اكتب اسمك الكامل لتظهر الصيغ الإنجليزية الشائعة.</p>}
      {res.map(({ k, label, ex, r }) => (
        <div key={k} className="result" style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <div>
            <div className="note" style={{ margin: 0 }}>{label} ({ex})</div>
            <div style={{ fontSize: "1.3rem", direction: "ltr", textAlign: "left" }}>{r.text}</div>
          </div>
          <CopyButton text={r.text} />
        </div>
      ))}
      {unknown.length > 0 && <p className="note">كلمات غير موجودة في قاموس الأسماء، وتهجئتها تقريبية وقد تحتاج تعديلًا: {unknown.join("، ")}</p>}
      <p className="note"><b>تنبيه مهم:</b> في الجوازات والوثائق الرسمية يجب أن تطابق التهجئة ما هو مكتوب في جواز سفرك أو بطاقتك، فلا تغيّرها. هذه الأداة تساعدك في الاختيار فقط.</p>
    </>
  );
}
