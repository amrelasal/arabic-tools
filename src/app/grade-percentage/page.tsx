import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import GradePercentTool from "@/components/tools/GradePercentTool";

export const metadata: Metadata = {
  title: "حاسبة النسبة المئوية للدرجات والمجموع",
  description: "أدخل درجاتك في المواد لتعرف المجموع والنسبة المئوية والتقدير بسهولة.",
  alternates: { canonical: "/grade-percentage" },
};

export default function Page() {
  return (
    <ToolShell
      slug="grade-percentage"
      title="حاسبة النسبة المئوية للدرجات"
      intro="أضف موادك ودرجاتها والدرجة النهائية لكل مادة لتعرف نسبتك المئوية."
      faq={[
        {
                "q": "كيف تُحسب النسبة؟",
                "a": "مجموع درجاتك ÷ مجموع الدرجات النهائية × 100."
        },
        {
                "q": "هل التقدير ثابت؟",
                "a": "لا، يختلف بين المدارس والدول، والمعروض تقدير شائع فقط."
        }
]}
    >
      <GradePercentTool />
    </ToolShell>
  );
}
