"use client";
import { useState, type ReactNode } from "react";

const fmt = (x: number) => x.toLocaleString("en-US", { maximumFractionDigits: 2 });
const num = (s: string) => (s.trim() === "" ? NaN : parseFloat(s.replace(",", ".")));

function Box({ title, labels, fn }: { title: string; labels: [string, string]; fn: (a: number, b: number) => ReactNode }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const x = num(a), y = num(b);
  const res = !isNaN(x) && !isNaN(y) ? fn(x, y) : null;
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <b>{title}</b>
      <div className="row" style={{ marginTop: 8 }}>
        <div><label>{labels[0]}</label><input type="text" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} /></div>
        <div><label>{labels[1]}</label><input type="text" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} /></div>
      </div>
      {res && <div className="result">{res}</div>}
    </div>
  );
}

export default function PercentTool() {
  return (
    <>
      <Box title="كم يساوي X% من Y؟" labels={["النسبة %", "العدد"]} fn={(p, n) => <>النتيجة: <b>{fmt((p * n) / 100)}</b></>} />
      <Box title="X يمثل كم % من Y؟" labels={["الرقم", "من الإجمالي"]} fn={(p, n) => n === 0 ? "لا يمكن القسمة على صفر" : <>النسبة: <b>{fmt((p / n) * 100)}%</b></>} />
      <Box title="نسبة الزيادة أو النقصان" labels={["القيمة القديمة", "القيمة الجديدة"]} fn={(o, n) => {
        if (o === 0) return "القيمة القديمة لا يمكن أن تكون صفرًا";
        const c = ((n - o) / o) * 100;
        return <>{c >= 0 ? "زيادة" : "نقصان"} بنسبة <b>{fmt(Math.abs(c))}%</b></>;
      }} />
      <Box title="السعر بعد الخصم" labels={["السعر الأصلي", "نسبة الخصم %"]} fn={(p, d) => <>السعر بعد الخصم: <b>{fmt(p * (1 - d / 100))}</b> (وفّرت {fmt((p * d) / 100)})</>} />
      <Box title="إضافة نسبة إلى مبلغ (مثل الضريبة)" labels={["المبلغ", "النسبة %"]} fn={(m, r) => <>قيمة النسبة: <b>{fmt((m * r) / 100)}</b> — الإجمالي: <b>{fmt(m * (1 + r / 100))}</b></>} />
      <Box title="استخراج المبلغ قبل النسبة" labels={["المبلغ شامل النسبة", "النسبة %"]} fn={(t, r) => {
        const base = t / (1 + r / 100);
        return <>المبلغ الأصلي: <b>{fmt(base)}</b> — قيمة النسبة: <b>{fmt(t - base)}</b></>;
      }} />
      <p className="note">نسبة الضريبة تختلف من بلد لآخر، فأدخل النسبة المعتمدة في بلدك.</p>
    </>
  );
}
