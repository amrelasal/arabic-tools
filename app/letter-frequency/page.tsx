import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import LetterFreqTool from "@/components/tools/LetterFreqTool";

export const metadata: Metadata = {
  title: "تكرار الحروف والكلمات في النص العربي",
  description: "احسب تكرار كل حرف وكل كلمة في أي نص عربي، مع النسب والرسم البياني، وتجاهل التشكيل واختلاف الهمزات.",
  alternates: { canonical: "/letter-frequency" },
};

export default function Page() {
  return (
    <ToolShell
      slug="letter-frequency"
      title="تكرار الحروف والكلمات في النص"
      intro="الصق نصك لتعرف أكثر الحروف والكلمات تكرارًا فيه."
      faq={[
        {
                "q": "لماذا أستخدم هذه الأداة؟",
                "a": "للتعليم والبحث اللغوي وتحليل الأسلوب واكتشاف الكلمات المتكررة في الكتابة."
        },
        {
                "q": "هل يُحتسب التشكيل؟",
                "a": "لا، يُتجاهل التشكيل ويُحصى الحرف الأصلي فقط."
        }
]}
    >
      <LetterFreqTool />
    </ToolShell>
  );
}
