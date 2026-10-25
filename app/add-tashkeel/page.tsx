import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import TashkeelTool from "@/components/tools/TashkeelTool";

export const metadata: Metadata = {
  title: "تشكيل النص العربي آليًا وإضافة الحركات أونلاين",
  description: "شكّل أي نص عربي تلقائيًا بإضافة الفتحة والضمة والكسرة والسكون والشدة والتنوين بضغطة واحدة.",
  alternates: { canonical: "/add-tashkeel" },
};

export default function Page() {
  return (
    <ToolShell
      slug="add-tashkeel"
      title="تشكيل النص العربي آليًا"
      intro="اكتب نصك العربي واضغط «شكّل النص» ليظهر لك مشكولًا كاملًا."
      faq={[
        { q: "هل التشكيل الآلي دقيق؟", a: "دقته معقولة في النصوص العامة، لكنه قد يخطئ في حركات الإعراب والأسماء والجموع، فراجع النتيجة قبل النشر." },
        { q: "هل تتغير كلمات نصي؟", a: "لا، تتحقق الأداة من أن الحروف لم تتغير، وتضيف الحركات فقط، وإن لم تتأكد من قطعة تركتها كما هي." },
        { q: "ما الحد الأقصى للنص؟", a: "5000 حرف في المرة الواحدة. قسّم النصوص الأطول إلى أجزاء." },
      ]}
    >
      <TashkeelTool initial="add" />
    </ToolShell>
  );
}
