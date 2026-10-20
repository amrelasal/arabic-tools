import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import PercentTool from "@/components/tools/PercentTool";

export const metadata: Metadata = {
  title: "حاسبة النسبة المئوية والخصم والزيادة",
  description: "احسب النسبة المئوية، السعر بعد الخصم، نسبة الزيادة والنقصان، وإضافة النسبة أو استخراجها من المبلغ.",
  alternates: { canonical: "/percentage-calculator" },
};

export default function Page() {
  return (
    <ToolShell
      slug="percentage-calculator"
      title="حاسبة النسبة المئوية والخصم"
      intro="ست حاسبات في صفحة واحدة: النسبة، الخصم، التغيير، وإضافة نسبة أو استخراجها."
      faq={[
        {
                "q": "كيف أحسب النسبة المئوية لرقم؟",
                "a": "اقسم الرقم على الإجمالي واضرب في 100."
        },
        {
                "q": "كيف أستخرج المبلغ قبل الضريبة؟",
                "a": "اقسم المبلغ الشامل على (1 + النسبة/100)، وتفعل الأداة ذلك عنك."
        },
        {
                "q": "كيف تُحسب نسبة الزيادة؟",
                "a": "(القيمة الجديدة − القيمة القديمة) ÷ القيمة القديمة × 100."
        }
]}
    >
      <PercentTool />
    </ToolShell>
  );
}
