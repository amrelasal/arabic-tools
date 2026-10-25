import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import CleanerTool from "@/components/tools/CleanerTool";

export const metadata: Metadata = {
  title: "تنظيف النصوص العربية وإزالة التطويل",
  description: "نظّف نصك العربي: أزل التطويل والمسافات الزائدة والأسطر الفارغة والتشكيل بخيارات قابلة للتخصيص.",
  alternates: { canonical: "/text-cleaner" },
};

export default function Page() {
  return (
    <ToolShell
      slug="text-cleaner"
      title="تنظيف النصوص"
      intro="اختر ما تريد حذفه من نصك: التطويل، المسافات الزائدة، الأسطر الفارغة، أو التشكيل."
      faq={[
        { q: "ما هو التطويل؟", a: "هو الحرف (ـ) الذي يمدّ الكلمة شكليًا مثل: الســـلام. تحذفه الأداة فيعود النص إلى: السلام." },
        { q: "هل النص آمن؟", a: "نعم، كل المعالجة داخل متصفحك." },
      ]}
    >
      <CleanerTool />
    </ToolShell>
  );
}
