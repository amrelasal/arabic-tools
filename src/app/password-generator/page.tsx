import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import PasswordTool from "@/components/tools/PasswordTool";

export const metadata: Metadata = {
  title: "مولّد كلمات المرور القوية والعشوائية الآمنة",
  description: "ولّد كلمة مرور قوية وعشوائية بالطول والرموز التي تحددها، مع مؤشر لقوتها، وبدون إرسالها لأي خادم.",
  alternates: { canonical: "/password-generator" },
};

export default function Page() {
  return (
    <ToolShell
      slug="password-generator"
      title="مولّد كلمات المرور"
      intro="اختر الطول ونوع الرموز لتحصل على كلمة مرور عشوائية قوية فورًا."
      faq={[
        {
                "q": "ما الطول المناسب؟",
                "a": "12 خانة حدّ أدنى معقول، و16 فأكثر للحسابات المهمة كالبريد والبنوك."
        },
        {
                "q": "هل تُحفظ كلمات المرور؟",
                "a": "لا، تُولَّد داخل متصفحك ولا تُرسل ولا تُخزَّن."
        },
        {
                "q": "كيف أحفظ كلمات كثيرة؟",
                "a": "استخدم مدير كلمات مرور موثوقًا بدل تكرار الكلمة نفسها."
        }
]}
    >
      <PasswordTool />
    </ToolShell>
  );
}
