import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import BmiTool from "@/components/tools/BmiTool";

export const metadata: Metadata = {
  title: "حاسبة مؤشر كتلة الجسم BMI",
  description: "احسب مؤشر كتلة جسمك من الوزن والطول، واعرف المدى الطبيعي للوزن بالنسبة لطولك.",
  alternates: { canonical: "/bmi" },
};

export default function Page() {
  return (
    <ToolShell
      slug="bmi"
      title="حاسبة مؤشر كتلة الجسم"
      intro="أدخل وزنك وطولك لتعرف مؤشر كتلة الجسم وتصنيفه."
      faq={[
        {
                "q": "كيف يُحسب المؤشر؟",
                "a": "الوزن بالكيلوجرام ÷ مربع الطول بالمتر."
        },
        {
                "q": "ما التصنيفات؟",
                "a": "أقل من 18.5 دون الطبيعي، 18.5 إلى 24.9 طبيعي، 25 إلى 29.9 زيادة، و30 فأكثر سمنة."
        },
        {
                "q": "هل المؤشر دقيق للجميع؟",
                "a": "لا، فهو لا يفرّق بين العضلات والدهون ولا ينطبق على الأطفال، فاستشر طبيبك."
        }
]}
    >
      <BmiTool />
    </ToolShell>
  );
}
