import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import WordCounterTool from "@/components/tools/WordCounterTool";

export const metadata: Metadata = {
  title: "عداد الكلمات والحروف العربي",
  description: "احسب عدد الكلمات والحروف والجمل والفقرات ووقت القراءة لأي نص عربي مباشرة.",
  alternates: { canonical: "/word-counter" },
};

export default function Page() {
  return (
    <ToolShell
      slug="word-counter"
      title="عداد الكلمات العربي"
      intro="اكتب أو الصق نصك لتعرف عدد الكلمات والحروف والجمل ووقت القراءة."
      faq={[
        { q: "كيف يُحسب وقت القراءة؟", a: "بمتوسط تقريبي قدره 180 كلمة في الدقيقة للنص العربي." },
        { q: "هل تُحسب علامات الترقيم كلمات؟", a: "لا، تُحسب الكلمات والأرقام فقط." },
      ]}
    >
      <WordCounterTool />
    </ToolShell>
  );
}
