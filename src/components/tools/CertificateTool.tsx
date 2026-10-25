"use client";
import { useState } from "react";
import { GREG_MONTHS } from "@/lib/hijri";
import { parseISO } from "@/lib/dates";
import { printPage } from "@/lib/print";

const TYPES: Record<string, { title: string; lead: string; reason: string }> = {
  thanks: { title: "شهادة شكر وتقدير", lead: "تتقدم {org} بخالص الشكر والتقدير إلى", reason: "وذلك تقديرًا لجهوده المتميزة وعطائه المخلص" },
  excellence: { title: "شهادة تفوق", lead: "تمنح {org} هذه الشهادة إلى", reason: "وذلك لتفوقه وتميزه ونيله مراتب النجاح" },
  attendance: { title: "شهادة حضور", lead: "تشهد {org} بأن", reason: "قد حضر الفعالية بانتظام والتزام" },
  completion: { title: "شهادة إتمام دورة", lead: "تشهد {org} بأن", reason: "قد أتمّ الدورة التدريبية بنجاح" },
};
const COLORS: Record<string, string> = { "#0f766e": "أخضر", "#1d4ed8": "أزرق", "#9a3412": "برتقالي داكن", "#6d28d9": "بنفسجي" };

export default function CertificateTool() {
  const [type, setType] = useState("thanks");
  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [signer, setSigner] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("#0f766e");
  const t = TYPES[type];
  const d = parseISO(date);
  const dateText = d ? `${d.d} ${GREG_MONTHS[d.m - 1]} ${d.y}` : "";

  return (
    <>
      <div className="row">
        <div>
          <label>نوع الشهادة</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(TYPES).map(([k, v]) => <option key={k} value={k}>{v.title}</option>)}
          </select>
        </div>
        <div>
          <label>اللون</label>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            {Object.entries(COLORS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>
      <div className="row">
        <div><label>اسم المدرسة أو الجهة</label><input type="text" value={org} onChange={(e) => setOrg(e.target.value)} /></div>
        <div><label>اسم المستلم</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
      </div>
      <label>نص الشهادة (اختياري)</label>
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder={t.reason} />
      <div className="row" style={{ marginTop: 10 }}>
        <div><label>اسم الموقّع</label><input type="text" value={signer} onChange={(e) => setSigner(e.target.value)} /></div>
        <div><label>صفته</label><input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="مثال: مدير المدرسة" /></div>
        <div><label>التاريخ</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
      </div>

      <h2>المعاينة</h2>
      <div className="cert-wrap">
        <div className="cert-print" style={{ borderColor: color }}>
          <div className="cert-inner" style={{ borderColor: color }}>
            <div className="cert-org">{org || "اسم الجهة"}</div>
            <div className="cert-title" style={{ color }}>{t.title}</div>
            <div className="cert-lead">{t.lead.replace("{org}", org || "الجهة")}</div>
            <div className="cert-name" style={{ color }}>{name || "اسم المستلم"}</div>
            <div className="cert-reason">{reason || t.reason}</div>
            <div className="cert-foot">
              <div>{dateText && <>التاريخ: {dateText}</>}</div>
              <div className="cert-sign">
                <div>{signer}</div>
                <div className="cert-role">{role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn" onClick={() => printPage("landscape")}>طباعة / حفظ كملف PDF</button>
      <p className="note">من نافذة الطباعة اختر «حفظ كملف PDF» واجعل الاتجاه أفقيًا، ثم أزل خيار «الرأس والتذييل» إن ظهر.</p>
    </>
  );
}
