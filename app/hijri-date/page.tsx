import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import HijriTool from "@/components/tools/HijriTool";

export const metadata: Metadata = {
  title: "تحويل التاريخ الهجري إلى ميلادي والعكس",
  description: "حوّل التاريخ بين الهجري والميلادي بدقة حسب تقويم أم القرى، مع اسم اليوم وتاريخ اليوم الحالي.",
  alternates: { canonical: "/hijri-date" },
};

export default function Page() {
  return (
    <ToolShell
      slug="hijri-date"
      title="تحويل التاريخ الهجري والميلادي"
      intro="اختر تاريخًا لتحويله فورًا بين الهجري والميلادي، مع معرفة اليوم."
      faq={[
        { q: "على أي تقويم يعتمد التحويل؟", a: "على تقويم أم القرى المعتمد في المملكة العربية السعودية." },
        { q: "لماذا قد يختلف التاريخ يومًا عن بلدي؟", a: "تعتمد بعض الدول على رؤية الهلال المحلية، فقد يبدأ الشهر قبل يوم أو بعده." },
      ]}
    >
      <HijriTool />
    </ToolShell>
  );
}
