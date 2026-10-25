import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ClientOnly from "@/components/ClientOnly";
import ImsakiaTool from "@/components/tools/ImsakiaTool";

export const metadata: Metadata = {
  title: "إمساكية رمضان: جدول الإمساك والإفطار لمدينتك",
  description: "إمساكية رمضان لمدن عربية: مواعيد الإمساك والفجر والمغرب (الإفطار) والعشاء لكل يوم، جاهزة للطباعة، مع تعديل بداية الشهر حسب إعلان بلدك.",
  alternates: { canonical: "/ramadan-imsakia" },
};

export default function Page() {
  return (
    <ToolShell
      slug="ramadan-imsakia"
      title="إمساكية رمضان"
      intro="اختر مدينتك وسنة رمضان لتحصل على جدول الإمساك والإفطار لثلاثين يومًا، وجاهز للطباعة."
      faq={[
        {
                "q": "متى يبدأ رمضان؟",
                "a": "تحسبه الأداة بتقويم أم القرى، وتعلن كل دولة بدايته الرسمية برؤية الهلال، فاستخدم خيار «بداية رمضان» ليوافق إعلان بلدك."
        },
        {
                "q": "ما هو وقت الإمساك؟",
                "a": "هو احتياط قبل أذان الفجر بدقائق، ويمكنك تعديل عدد الدقائق من الخانة المخصصة."
        },
        {
                "q": "هل أطبعها؟",
                "a": "نعم، اضغط «طباعة الإمساكية» واختر الحفظ كملف PDF أو الطابعة."
        }
]}
    >
      <ClientOnly><ImsakiaTool /></ClientOnly>
    </ToolShell>
  );
}
