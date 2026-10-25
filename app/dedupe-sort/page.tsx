import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import DedupeSortTool from "@/components/tools/DedupeSortTool";

export const metadata: Metadata = {
  title: "حذف الأسطر المكررة والترتيب الأبجدي العربي للقوائم",
  description: "احذف الأسطر المكررة من أي قائمة ورتّبها أبجديًا بالعربية، مع تجاهل التشكيل واختلاف الهمزات عند المقارنة.",
  alternates: { canonical: "/dedupe-sort" },
};

export default function Page() {
  return (
    <ToolShell
      slug="dedupe-sort"
      title="حذف الأسطر المكررة والترتيب الأبجدي"
      intro="الصق قائمتك لتنظيفها من المكرر وترتيبها بالعربية أو حسب الطول."
      faq={[
        {
                "q": "هل يميز بين «أحمد» و«احمد»؟",
                "a": "اختياريًا: فعّل تجاهل التشكيل واختلاف الهمزات لتُعدّ الكلمتان متطابقتين."
        },
        {
                "q": "كيف يُرتَّب أبجديًا؟",
                "a": "بحسب قواعد ترتيب الحروف العربية في المتصفح من الألف إلى الياء."
        }
]}
    >
      <DedupeSortTool />
    </ToolShell>
  );
}
