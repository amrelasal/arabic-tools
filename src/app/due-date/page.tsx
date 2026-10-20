import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ClientOnly from "@/components/ClientOnly";
import DueDateTool from "@/components/tools/DueDateTool";

export const metadata: Metadata = {
  title: "حاسبة موعد الولادة المتوقع وعمر الحمل",
  description: "احسب موعد الولادة المتوقع وعمر الحمل بالأسابيع من تاريخ أول يوم في آخر دورة شهرية.",
  alternates: { canonical: "/due-date" },
};

export default function Page() {
  return (
    <ToolShell
      slug="due-date"
      title="حاسبة موعد الولادة المتوقع"
      intro="أدخلي أول يوم في آخر دورة شهرية لتعرفي الموعد المتوقع وعمر الحمل اليوم."
      faq={[
        {
                "q": "كيف يُحسب الموعد؟",
                "a": "بإضافة 280 يومًا (40 أسبوعًا) إلى أول يوم في آخر دورة، مع تعديل بسيط إذا اختلف طول دورتك عن 28 يومًا."
        },
        {
                "q": "هل الموعد مؤكد؟",
                "a": "لا، هو تقدير، وتحدده طبيبتك بدقة بفحص الموجات فوق الصوتية."
        }
]}
    >
      <ClientOnly><DueDateTool /></ClientOnly>
    </ToolShell>
  );
}
