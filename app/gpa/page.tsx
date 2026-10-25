import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import GpaTool from "@/components/tools/GpaTool";

export const metadata: Metadata = {
  title: "حاسبة المعدل التراكمي GPA للجامعة",
  description: "احسب معدل الفصل والمعدل التراكمي GPA من الساعات المعتمدة والتقديرات بسهولة.",
  alternates: { canonical: "/gpa" },
};

export default function Page() {
  return (
    <ToolShell
      slug="gpa"
      title="حاسبة المعدل التراكمي GPA"
      intro="أضف موادك وساعاتها وتقديراتها لتعرف معدل الفصل والمعدل التراكمي."
      faq={[
        { q: "كيف يُحسب المعدل؟", a: "بجمع حاصل ضرب نقاط كل مادة في ساعاتها، ثم قسمة المجموع على إجمالي الساعات." },
        { q: "جامعتي تستخدم جدول نقاط مختلفًا", a: "اكتب نقاط جامعتك مباشرة في خانة النقاط وسيُحسب المعدل على أساسها." },
      ]}
    >
      <GpaTool />
    </ToolShell>
  );
}
