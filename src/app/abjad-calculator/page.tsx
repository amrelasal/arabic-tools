import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import AbjadTool from "@/components/tools/AbjadTool";

export const metadata: Metadata = {
  title: "حساب الجُمَّل: قيمة الاسم بالأبجدية العددية",
  description: "احسب قيمة أي كلمة أو اسم بحساب الجُمَّل (أبجد هوز) مع تفصيل قيمة كل حرف.",
  alternates: { canonical: "/abjad-calculator" },
};

export default function Page() {
  return (
    <ToolShell
      slug="abjad-calculator"
      title="حاسبة الجُمَّل (أبجد هوز)"
      intro="اكتب كلمة أو اسمًا لتعرف قيمته العددية وفق حساب الجُمَّل."
      faq={[
        {
                "q": "ما هو حساب الجُمَّل؟",
                "a": "نظام قديم يعطي كل حرف عربي قيمة عددية على ترتيب «أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ»."
        },
        {
                "q": "هل له أساس ديني أو يُتنبأ به بالحظ؟",
                "a": "لا، هو نظام ترميز عددي عُرف تاريخيًا في التأريخ والشعر، ولا يدل على حظ أو مستقبل."
        },
        {
                "q": "ما اختلاف الترتيب المشرقي والمغربي؟",
                "a": "تختلف قيم بعض الحروف بين الترتيبين، وهذه الأداة تعتمد المشرقي."
        }
]}
    >
      <AbjadTool />
    </ToolShell>
  );
}
