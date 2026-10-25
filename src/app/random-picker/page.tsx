import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import RandomPickerTool from "@/components/tools/RandomPickerTool";

export const metadata: Metadata = {
  title: "القرعة العشوائية وتقسيم الطلاب إلى مجموعات",
  description: "اختر اسمًا أو عدة أسماء بالقرعة العشوائية العادلة، أو قسّم الفصل إلى مجموعات متساوية بضغطة واحدة.",
  alternates: { canonical: "/random-picker" },
};

export default function Page() {
  return (
    <ToolShell
      slug="random-picker"
      title="القرعة وتقسيم المجموعات"
      intro="اكتب الأسماء، ثم اختر عشوائيًا أو قسّمها إلى مجموعات."
      faq={[
        {
                "q": "هل الاختيار عادل؟",
                "a": "نعم، يعتمد مولّد أرقام عشوائية آمن في المتصفح."
        },
        {
                "q": "هل تُحفظ الأسماء؟",
                "a": "لا، تبقى في صفحتك فقط وتُمسح عند إغلاقها."
        }
]}
    >
      <RandomPickerTool />
    </ToolShell>
  );
}
