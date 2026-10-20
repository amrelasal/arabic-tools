import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import KeyboardTool from "@/components/tools/KeyboardTool";

export const metadata: Metadata = {
  title: "تحويل لغة الكتابة من الإنجليزية إلى العربية والعكس",
  description: "كتبت بلغة لوحة المفاتيح الخطأ؟ حوّل نصًا مثل hgsghl عليكم إلى العربية الصحيحة، أو العكس، بضغطة واحدة.",
  alternates: { canonical: "/keyboard-fix" },
};

export default function Page() {
  return (
    <ToolShell
      slug="keyboard-fix"
      title="تصحيح النص المكتوب بلغة لوحة المفاتيح الخطأ"
      intro="الصق النص الذي كتبته بالخطأ وسيتحول فورًا إلى اللغة المقصودة."
      faq={[
        {
                "q": "متى أستخدم هذه الأداة؟",
                "a": "حين تكتب جملة كاملة ثم تكتشف أن لوحة المفاتيح كانت على اللغة الخطأ، فبدلًا من إعادة الكتابة تلصقها هنا."
        },
        {
                "q": "هل تدعم الحروف المهموزة؟",
                "a": "نعم، فعّل خيار الحروف الكبيرة (Shift) ليُنتج أ وإ وآ من الحروف H وY وN."
        },
        {
                "q": "هل يُحفظ نصي؟",
                "a": "لا، التحويل يتم داخل متصفحك فقط."
        }
]}
    >
      <KeyboardTool />
    </ToolShell>
  );
}
