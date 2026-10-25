import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ClientOnly from "@/components/ClientOnly";
import TimeDiffTool from "@/components/tools/TimeDiffTool";

export const metadata: Metadata = {
  title: "فرق التوقيت بين المدن: حوّل الوقت بين أي مدينتين",
  description: "اعرف فرق التوقيت بين القاهرة والرياض ودبي ولندن ونيويورك وغيرها، وحوّل أي وقت بين مدينتين مع مراعاة التوقيت الصيفي.",
  alternates: { canonical: "/time-difference" },
};

export default function Page() {
  return (
    <ToolShell
      slug="time-difference"
      title="فرق التوقيت بين المدن"
      intro="اختر مدينتين والوقت في الأولى لتعرف الوقت المقابل في الثانية وفرق الساعات."
      faq={[
        {
                "q": "هل يراعي التوقيت الصيفي؟",
                "a": "نعم، يُحسب لكل مدينة حسب التاريخ الذي تختاره."
        },
        {
                "q": "لماذا يتغير الفرق بين وقت وآخر؟",
                "a": "لأن بعض المدن تطبق التوقيت الصيفي وبعضها لا، فيتغير الفرق في أشهر السنة."
        }
]}
    >
      <ClientOnly><TimeDiffTool /></ClientOnly>
    </ToolShell>
  );
}
