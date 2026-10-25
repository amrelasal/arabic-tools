"use client";
import { useState } from "react";

const n = (s: string) => (parseFloat(s.replace(",", ".")) > 0 ? parseFloat(s.replace(",", ".")) : 0);
const fmt = (x: number) => x.toLocaleString("en-US", { maximumFractionDigits: 2 });

export default function ZakatTool() {
  const [cash, setCash] = useState("");
  const [trade, setTrade] = useState("");
  const [debts, setDebts] = useState("");
  const [goldG, setGoldG] = useState("");
  const [karat, setKarat] = useState(21);
  const [goldP, setGoldP] = useState("");
  const [silverG, setSilverG] = useState("");
  const [silverP, setSilverP] = useState("");
  const [basis, setBasis] = useState<"gold" | "silver">("gold");

  const pureGold = n(goldG) * (karat / 24);
  const goldValue = pureGold * n(goldP);
  const silverValue = n(silverG) * n(silverP);
  const total = n(cash) + n(trade) + goldValue + silverValue - n(debts);
  const nisab = basis === "gold" ? 85 * n(goldP) : 595 * n(silverP);
  const ready = nisab > 0;
  const due = ready && total >= nisab;

  const Field = ({ label, v, set, ph }: { label: string; v: string; set: (s: string) => void; ph?: string }) => (
    <div><label>{label}</label><input type="text" inputMode="decimal" value={v} onChange={(e) => set(e.target.value)} placeholder={ph} /></div>
  );

  return (
    <>
      <div className="row">
        <Field label="النقد والمدخرات" v={cash} set={setCash} />
        <Field label="عروض التجارة (قيمتها السوقية)" v={trade} set={setTrade} />
        <Field label="ديون حالّة عليك" v={debts} set={setDebts} />
      </div>
      <h2>الذهب</h2>
      <div className="row">
        <Field label="وزن الذهب (جرام)" v={goldG} set={setGoldG} />
        <div>
          <label>العيار</label>
          <select value={karat} onChange={(e) => setKarat(+e.target.value)}>
            <option value={24}>24</option><option value={21}>21</option><option value={18}>18</option>
          </select>
        </div>
        <Field label="سعر جرام الذهب عيار 24 اليوم" v={goldP} set={setGoldP} />
      </div>
      <h2>الفضة</h2>
      <div className="row">
        <Field label="وزن الفضة (جرام)" v={silverG} set={setSilverG} />
        <Field label="سعر جرام الفضة اليوم" v={silverP} set={setSilverP} />
      </div>
      <h2>أساس النصاب</h2>
      <div className="opts">
        <label><input type="radio" checked={basis === "gold"} onChange={() => setBasis("gold")} /> الذهب (85 جرامًا عيار 24)</label>
        <label><input type="radio" checked={basis === "silver"} onChange={() => setBasis("silver")} /> الفضة (595 جرامًا)</label>
      </div>
      <div className="result" style={{ marginTop: 14 }}>
        {!ready ? (
          <>أدخل سعر جرام {basis === "gold" ? "الذهب" : "الفضة"} لحساب النصاب.</>
        ) : (
          <>
            <div>إجمالي الأموال الزكوية: <b>{fmt(total)}</b></div>
            <div>قيمة النصاب: <b>{fmt(nisab)}</b></div>
            {due ? (
              <div style={{ marginTop: 6 }}>مقدار الزكاة الواجبة (2.5%): <b>{fmt(total * 0.025)}</b></div>
            ) : (
              <div style={{ marginTop: 6 }}>لم يبلغ مالك النصاب، فلا زكاة واجبة عليك الآن.</div>
            )}
          </>
        )}
      </div>
      <p className="note">تجب الزكاة إذا بلغ المال النصاب ومرّ عليه عام هجري كامل. العلماء يختلفون في أساس النصاب والديون، فاسأل جهة الفتوى المعتمدة عندك إن كانت حالتك خاصة.</p>
    </>
  );
}
