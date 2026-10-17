import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import TashkeelTool from "@/components/tools/TashkeelTool";

export const metadata: Metadata = {
  title: "إزالة التشكيل من النص العربي أونلاين",
  description: "أداة مجانية لحذف التشكيل والحركات (الفتحة والضمة والكسرة والسكون والشدة) من أي نص عربي بضغطة واحدة.",
  alternates: { canonical: "/remove-tashkeel" },
};

export default function Page() {
  return (
    <ToolShell
      slug="remove-tashkeel"
      title="إزالة التشكيل من النص العربي"
      intro="الصق نصك المشكول وسيظهر لك فورًا بدون حركات، ثم انسخه."
      faq={[
        { q: "ما الذي تحذفه الأداة؟", a: "تحذف الفتحة والضمة والكسرة والتنوين والسكون والشدة والألف الخنجرية وعلامات الضبط الصغيرة." },
        { q: "هل يتم حفظ نصي؟", a: "لا. المعالجة تتم داخل متصفحك فقط ولا يُرسل النص إلى أي خادم." },
        { q: "هل تغيّر الأداة الحروف نفسها؟", a: "لا، تُحذف علامات التشكيل فقط وتبقى الحروف كما هي." },
      ]}
    >
      <TashkeelTool />
    </ToolShell>
  );
}
