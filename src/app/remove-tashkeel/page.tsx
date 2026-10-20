import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import TashkeelTool from "@/components/tools/TashkeelTool";

export const metadata: Metadata = {
  title: "إزالة التشكيل من النص العربي وإضافته أونلاين",
  description: "أداة مجانية لحذف التشكيل والحركات من أي نص عربي بضغطة واحدة، مع إمكانية إضافة التشكيل للنصوص.",
  alternates: { canonical: "/remove-tashkeel" },
};

export default function Page() {
  return (
    <ToolShell
      slug="remove-tashkeel"
      title="إزالة التشكيل من النص العربي"
      intro="الصق نصك المشكول وسيظهر فورًا بدون حركات، أو انتقل إلى تبويب إضافة التشكيل لتشكيل نص غير مشكول."
      faq={[
        { q: "ما الذي تحذفه الأداة؟", a: "تحذف الفتحة والضمة والكسرة والتنوين والسكون والشدة والألف الخنجرية وعلامات الضبط الصغيرة." },
        { q: "هل يتم حفظ نصي؟", a: "إزالة التشكيل تتم داخل متصفحك فقط. أما إضافة التشكيل فيُرسل النص مؤقتًا للمعالجة ولا يُحفظ." },
        { q: "هل تغيّر الأداة الحروف نفسها؟", a: "لا، تُحذف علامات التشكيل فقط وتبقى الحروف كما هي." },
      ]}
    >
      <TashkeelTool initial="remove" />
    </ToolShell>
  );
}
