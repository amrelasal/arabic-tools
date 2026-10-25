import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import QrTool from "@/components/tools/QrTool";

export const metadata: Metadata = {
  title: "مولّد رمز QR مجاني: رابط أو واي فاي أو واتساب بدون تسجيل",
  description: "أنشئ رمز QR لرابط أو نص أو شبكة واي فاي أو رقم واتساب، وحمّله PNG أو SVG بألوان وحجم تختارهما، دون تسجيل.",
  alternates: { canonical: "/qr-code" },
};

export default function Page() {
  return (
    <ToolShell
      slug="qr-code"
      title="مولّد رمز QR"
      intro="اختر نوع البيانات، وسيظهر رمز QR فورًا، ثم نزّله بصيغة PNG أو SVG."
      faq={[
        {
                "q": "هل الرمز دائم؟",
                "a": "نعم، الرمز يحمل بياناتك نفسها ولا ينتهي، وليس مرتبطًا بخدمة تُلغى."
        },
        {
                "q": "ما الفرق بين PNG وSVG؟",
                "a": "PNG صورة جاهزة للاستخدام السريع، وSVG ملف متجهي يكبر دون فقدان الجودة وهو الأفضل للطباعة."
        },
        {
                "q": "هل تُحفظ بياناتي؟",
                "a": "لا، يُنشأ الرمز داخل متصفحك ولا تُرسل بياناتك."
        }
]}
    >
      <QrTool />
    </ToolShell>
  );
}
