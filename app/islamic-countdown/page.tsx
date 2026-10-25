import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ClientOnly from "@/components/ClientOnly";
import CountdownTool from "@/components/tools/CountdownTool";

export const metadata: Metadata = {
  title: "العد التنازلي لرمضان والعيد وعرفة",
  description: "كم يوم باقٍ على رمضان وعيد الفطر وعرفة وعيد الأضحى ورأس السنة الهجرية؟ مواعيد محدّثة تلقائيًا.",
  alternates: { canonical: "/islamic-countdown" },
};

export default function Page() {
  return (
    <ToolShell
      slug="islamic-countdown"
      title="كم باقٍ على رمضان والعيد؟"
      intro="عداد تلقائي للمناسبات الإسلامية القادمة بالتاريخين الهجري والميلادي."
      faq={[
        {
                "q": "هل المواعيد مؤكدة؟",
                "a": "هي حسب تقويم أم القرى، وتُعلن كل دولة الموعد الرسمي برؤية الهلال، فقد يختلف يومًا."
        },
        {
                "q": "هل تتحدث المواعيد وحدها؟",
                "a": "نعم، تُحسب من تاريخ اليوم تلقائيًا ولا تحتاج تعديلًا يدويًا."
        }
]}
    >
      <ClientOnly><CountdownTool /></ClientOnly>
    </ToolShell>
  );
}
