import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import QiblaTool from "@/components/tools/QiblaTool";

export const metadata: Metadata = {
  title: "اتجاه القبلة من موقعك",
  description: "اعرف اتجاه القبلة من أي مكان بالدرجات والاتجاه الجغرافي مع المسافة إلى الكعبة المشرفة.",
  alternates: { canonical: "/qibla" },
};

export default function Page() {
  return (
    <ToolShell
      slug="qibla"
      title="اتجاه القبلة"
      intro="اضغط «حدد موقعي» أو أدخل الإحداثيات لتعرف اتجاه القبلة بالدرجات."
      faq={[
        {
                "q": "كيف يُحسب اتجاه القبلة؟",
                "a": "بحساب الاتجاه الدائري الأقصر من موقعك إلى الكعبة المشرفة."
        },
        {
                "q": "هل يُحفظ موقعي؟",
                "a": "لا، يبقى الموقع داخل متصفحك ولا يُرسل إلى أي خادم."
        },
        {
                "q": "هل الاتجاه دقيق؟",
                "a": "الحساب الرياضي دقيق، أما بوصلة جهازك فقد تتأثر بالمعادن القريبة."
        }
]}
    >
      <QiblaTool />
    </ToolShell>
  );
}
