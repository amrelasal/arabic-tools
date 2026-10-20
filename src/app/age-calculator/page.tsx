import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ClientOnly from "@/components/ClientOnly";
import AgeTool from "@/components/tools/AgeTool";

export const metadata: Metadata = {
  title: "حاسبة العمر بالهجري والميلادي والفرق بين تاريخين",
  description: "احسب عمرك بالسنوات والأشهر والأيام بالميلادي والهجري، وموعد عيد ميلادك القادم، والفرق بين أي تاريخين.",
  alternates: { canonical: "/age-calculator" },
};

export default function Page() {
  return (
    <ToolShell
      slug="age-calculator"
      title="حاسبة العمر والفرق بين تاريخين"
      intro="أدخل تاريخ ميلادك لتعرف عمرك بدقة بالتقويمين، أو احسب الفرق بين أي تاريخين."
      faq={[
        {
                "q": "هل العمر الهجري دقيق؟",
                "a": "هو تقريبي في عدد الأيام لأن الأشهر الهجرية تتفاوت بين 29 و30 يومًا."
        },
        {
                "q": "لماذا يختلف العمر الهجري عن الميلادي؟",
                "a": "لأن السنة الهجرية أقصر بنحو 11 يومًا من الميلادية."
        },
        {
                "q": "كيف يُحسب الفرق بين تاريخين؟",
                "a": "بطرح السنوات ثم الأشهر ثم الأيام مع الاستلاف من الشهر السابق عند الحاجة."
        }
]}
    >
      <ClientOnly><AgeTool /></ClientOnly>
    </ToolShell>
  );
}
