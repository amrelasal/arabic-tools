"use client";
import { useMemo, useState } from "react";
import { currencies, tafqit } from "@/lib/tafqit";
import CopyButton from "../CopyButton";

export default function TafqitTool() {
  const [value, setValue] = useState("");
  const [cur, setCur] = useState("EGP");
  const [prefix, setPrefix] = useState(true);
  const [suffix, setSuffix] = useState(true);
  const r = useMemo(() => tafqit(value, cur === "none" ? null : cur, { prefix, suffix }), [value, cur, prefix, suffix]);
  return (
    <>
      <div className="row">
        <div>
          <label>المبلغ</label>
          <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder="مثال: 1250.75" />
        </div>
        <div>
          <label>العملة</label>
          <select value={cur} onChange={(e) => setCur(e.target.value)}>
            {currencies.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            <option value="none">بدون عملة (رقم فقط)</option>
          </select>
        </div>
      </div>
      <div className="opts">
        <label><input type="checkbox" checked={prefix} onChange={(e) => setPrefix(e.target.checked)} /> إضافة «فقط» في البداية</label>
        <label><input type="checkbox" checked={suffix} onChange={(e) => setSuffix(e.target.checked)} /> إضافة «لا غير» في النهاية</label>
      </div>
      <div className={r.ok ? "result" : "note"}>{r.text || "اكتب المبلغ لتظهر الصيغة المكتوبة هنا."}</div>
      {r.ok && <CopyButton text={r.text} />}
      <p className="note">راجع الصيغة قبل اعتمادها في الشيكات والعقود الرسمية.</p>
    </>
  );
}
