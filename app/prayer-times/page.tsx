import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ClientOnly from "@/components/ClientOnly";
import PrayerTool from "@/components/tools/PrayerTool";

export const metadata: Metadata = {
  title: "مواقيت الصلاة اليوم في مدينتك: الفجر والظهر والعصر والمغرب والعشاء",
  description: "مواقيت الصلاة اليوم لمدن مصر والسعودية والإمارات والكويت وقطر والأردن والمغرب وغيرها، مع الصلاة القادمة والعد التنازلي وجدول الشهر القابل للطباعة.",
  alternates: { canonical: "/prayer-times" },
};

export default function Page() {
  return (
    <ToolShell
      slug="prayer-times"
      title="مواقيت الصلاة"
      intro="اختر مدينتك لتعرف مواقيت الصلاة اليوم بالتوقيت المحلي، مع عدّاد للصلاة القادمة وجدول الشهر."
      faq={[
        {
                "q": "كيف تُحسب مواقيت الصلاة؟",
                "a": "تُحسب فلكيًا من موقع الشمس في السماء، وتختلف طرق الحساب بزاوية الفجر والعشاء، ولذلك تختار كل دولة طريقة معتمدة."
        },
        {
                "q": "لماذا تختلف عن مسجدي أو تطبيق آخر؟",
                "a": "لاختلاف طريقة الحساب أو الاحتياط بدقائق، وبعض الدول تعتمد جداول رسمية خاصة. اعتمد ما تعلنه الجهة الدينية في بلدك."
        },
        {
                "q": "هل يُحفظ موقعي؟",
                "a": "لا، يُحسب الموقع داخل متصفحك فقط ولا يُرسل إلى أي خادم."
        }
]}
    >
      <ClientOnly><PrayerTool /></ClientOnly>
    </ToolShell>
  );
}
