import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ZakatTool from "@/components/tools/ZakatTool";

export const metadata: Metadata = {
  title: "حاسبة الزكاة: زكاة المال والذهب والفضة",
  description: "احسب زكاة مالك من النقد والذهب والفضة وعروض التجارة بعد خصم الديون، مع معرفة بلوغ النصاب.",
  alternates: { canonical: "/zakat" },
};

export default function Page() {
  return (
    <ToolShell
      slug="zakat"
      title="حاسبة الزكاة"
      intro="أدخل أموالك وأسعار الذهب والفضة اليوم لتعرف هل بلغت النصاب وكم الزكاة الواجبة."
      faq={[
        { q: "ما مقدار الزكاة؟", a: "2.5% من المال الذي بلغ النصاب ومرّ عليه عام هجري." },
        { q: "ما النصاب؟", a: "85 جرامًا من الذهب عيار 24، أو 595 جرامًا من الفضة. وقد اختلف العلماء في الأساس الأنسب اليوم." },
        { q: "هل تُخصم الديون؟", a: "تُخصم الديون الحالّة المستحقة عليك في الحساب عند جمهور العلماء." },
      ]}
    >
      <ZakatTool />
    </ToolShell>
  );
}
