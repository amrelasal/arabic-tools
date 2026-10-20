import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import TafqitTool from "@/components/tools/TafqitTool";

export const metadata: Metadata = {
  title: "التفقيط: تحويل الأرقام إلى كلمات بالعربي",
  description: "حوّل أي مبلغ إلى كتابة بالحروف (تفقيط) بالجنيه والريال والدرهم والدينار والدولار واليورو، جاهز للشيكات والفواتير.",
  alternates: { canonical: "/tafqit" },
};

export default function Page() {
  return (
    <ToolShell
      slug="tafqit"
      title="التفقيط: تحويل الأرقام إلى كلمات"
      intro="اكتب المبلغ واختر العملة لتحصل على الصيغة المكتوبة بالحروف."
      faq={[
        { q: "ما هو التفقيط؟", a: "هو كتابة المبلغ بالحروف بدل الأرقام، ويُستخدم في الشيكات والعقود والفواتير لمنع التلاعب." },
        { q: "ما العملات المدعومة؟", a: "الجنيه المصري، الريال السعودي، الدرهم الإماراتي، الدينار الكويتي، الريال القطري، الدولار الأمريكي، واليورو." },
        { q: "كيف تُعامل الكسور؟", a: "تُكتب الكسور بوحدة العملة الفرعية (قرش، هللة، فلس، سنت) ويُقرَّب الرقم لأقرب خانة مدعومة." },
      ]}
    >
      <TafqitTool />
    </ToolShell>
  );
}
