import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import NameEnglishTool from "@/components/tools/NameEnglishTool";

export const metadata: Metadata = {
  title: "كتابة الاسم العربي بالإنجليزية: محمد Mohamed أم Mohammed أم Muhammad؟",
  description: "اكتب اسمك العربي بالإنجليزية بثلاث صيغ شائعة: مصرية وخليجية وأكاديمية، لأشهر الأسماء، مع تنبيه لمطابقة جواز السفر.",
  alternates: { canonical: "/name-english" },
};

export default function Page() {
  return (
    <ToolShell
      slug="name-english"
      title="كتابة الاسم العربي بالإنجليزية"
      intro="اكتب اسمك بالعربية لتعرف كيف يُكتب بالحروف اللاتينية بالصيغ الأكثر شيوعًا."
      faq={[
        {
                "q": "لماذا يُكتب محمد بأكثر من طريقة؟",
                "a": "لأن العربية فيها حروف وحركات لا مقابل لها في الإنجليزية، فاختلفت الأعراف بين البلدان."
        },
        {
                "q": "أي تهجئة أستخدم في الجواز؟",
                "a": "التي كُتبت في جوازك أو بطاقتك الحالية. التغيير يحتاج إجراءً رسميًا."
        },
        {
                "q": "ماذا عن الأسماء غير الموجودة في القاموس؟",
                "a": "تُحوَّل تقريبيًا، وتظهر لك قائمة بالكلمات التي تحتاج مراجعتك."
        }
]}
    >
      <NameEnglishTool />
    </ToolShell>
  );
}
