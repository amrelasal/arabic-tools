import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import TracingTool from "@/components/tools/TracingTool";

export const metadata: Metadata = {
  title: "أوراق تتبع الحروف العربية والأسماء للأطفال: اطبع ورقة باسم طفلك",
  description: "اصنع ورقة تتبع للطباعة باسم طفلك أو بالحروف الهجائية، بخط متقطع أو رمادي، بحجم A4 مناسب لتدريب الأطفال على الكتابة.",
  alternates: { canonical: "/tracing-worksheets" },
};

export default function Page() {
  return (
    <ToolShell
      slug="tracing-worksheets"
      title="أوراق تتبع الحروف والأسماء"
      intro="اكتب اسم الطفل أو كلمة، واختر شكل التتبع وعدد الأسطر، ثم اطبع الورقة جاهزة للتدريب."
      faq={[
        {
                "q": "لأي عمر تناسب؟",
                "a": "غالبًا لأطفال الروضة والصفوف الأولى، ويمكنك التحكم في حجم الخط."
        },
        {
                "q": "كيف أطبعها؟",
                "a": "اضغط «طباعة الورقة» واختر A4 رأسي، وأزل الرأس والتذييل."
        },
        {
                "q": "هل أستطيع كتابة جملة؟",
                "a": "الأفضل كلمة أو اسم قصير حتى يبقى الخط كبيرًا واضحًا."
        }
]}
    >
      <TracingTool />
    </ToolShell>
  );
}
