import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import CertificateTool from "@/components/tools/CertificateTool";

export const metadata: Metadata = {
  title: "مولد شهادات الشكر والتقدير والتفوق بصيغة PDF",
  description: "صمم شهادة شكر وتقدير أو تفوق أو حضور جاهزة للطباعة أو الحفظ PDF بالعربية في ثوانٍ.",
  alternates: { canonical: "/certificate-maker" },
};

export default function Page() {
  return (
    <ToolShell
      slug="certificate-maker"
      title="مولد الشهادات العربية"
      intro="املأ البيانات وشاهد الشهادة مباشرة، ثم اطبعها أو احفظها كملف PDF."
      faq={[
        {
                "q": "كيف أحفظ الشهادة PDF؟",
                "a": "اضغط زر الطباعة ثم اختر «حفظ كملف PDF» كطابعة."
        },
        {
                "q": "هل أستطيع تغيير ألوان الشهادة؟",
                "a": "نعم، اختر لونًا من القائمة قبل الطباعة."
        },
        {
                "q": "لماذا تظهر عناصر زائدة في الطباعة؟",
                "a": "أزل خيار «الرأس والتذييل» من إعدادات الطباعة."
        }
]}
    >
      <CertificateTool />
    </ToolShell>
  );
}
