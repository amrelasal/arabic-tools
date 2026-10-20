import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import DecoratorTool from "@/components/tools/DecoratorTool";

export const metadata: Metadata = {
  title: "زخرفة الأسماء والنصوص العربية والإنجليزية",
  description: "زخرف اسمك أو نبذتك بتطويل وأطر ورموز وخطوط مزخرفة، وانسخها لألعابك وحساباتك بضغطة واحدة.",
  alternates: { canonical: "/name-decorator" },
};

export default function Page() {
  return (
    <ToolShell
      slug="name-decorator"
      title="زخرفة الأسماء والنصوص"
      intro="اكتب اسمك بالعربية أو الإنجليزية لتحصل على عشرات الزخارف الجاهزة للنسخ."
      faq={[
        {
                "q": "أين أستخدم الزخارف؟",
                "a": "في أسماء الألعاب، ونبذات إنستغرام وتيك توك، وأسماء الحسابات."
        },
        {
                "q": "لماذا تظهر بعض الرموز مربعات؟",
                "a": "بعض الأجهزة والتطبيقات لا تدعم كل رموز يونيكود، فجرّب زخرفة أخرى."
        },
        {
                "q": "هل تعمل مع الأسماء العربية؟",
                "a": "نعم، يُطبَّق التطويل بين الحروف المتصلة فقط، وتُضاف الأطر والرموز."
        }
]}
    >
      <DecoratorTool />
    </ToolShell>
  );
}
