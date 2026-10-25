import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import NumbersTool from "@/components/tools/NumbersTool";

export const metadata: Metadata = {
  title: "تحويل الأرقام العربية إلى إنجليزية والعكس",
  description: "حوّل الأرقام الهندية (١٢٣) إلى الأرقام الغربية (123) أو العكس داخل أي نص بسرعة.",
  alternates: { canonical: "/arabic-numbers" },
};

export default function Page() {
  return (
    <ToolShell
      slug="arabic-numbers"
      title="تحويل الأرقام العربية والهندية"
      intro="حوّل الأرقام داخل نصك بين الشكلين ١٢٣ و 123 مع بقاء بقية النص كما هو."
      faq={[
        { q: "ما الفرق بين الأرقام العربية والهندية؟", a: "الأرقام (١٢٣) تسمى الهندية أو العربية الشرقية، والأرقام (123) تسمى الغربية وتُعرف خطأً بالإنجليزية." },
        { q: "هل تدعم الأرقام الفارسية؟", a: "نعم، عند التحويل إلى 123 تُحوَّل الأرقام الفارسية (۱۲۳) أيضًا." },
      ]}
    >
      <NumbersTool />
    </ToolShell>
  );
}
