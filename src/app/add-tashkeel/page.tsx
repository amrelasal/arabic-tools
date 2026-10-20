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
        { q: "هل التشكيل الآلي دقيق؟", a: "دقته جيدة في النصوص العامة، لكنه قد يخطئ في المواضع المحتملة لأكثر من وجه، فراجع النتيجة قبل النشر." },
        { q: "هل تتغير كلمات نصي؟", a: "لا، تتحقق الأداة من أن الحروف والكلمات لم تتغير، وتضيف الحركات فقط." },
        { q: "ما الحد الأقصى للنص؟", a: "1500 حرف في المرة الواحدة. قسّم النصوص الطويلة إلى أجزاء." },
      ]}
    >
      <TashkeelTool initial="add" />
    </ToolShell>
  );
}
