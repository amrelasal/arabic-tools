import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import Base64Tool from "@/components/tools/Base64Tool";

export const metadata: Metadata = {
  title: "ترميز Base64 وتشفير الروابط للنصوص العربية",
  description: "رمّز النصوص العربية إلى Base64 وفك ترميزها، وحوّل الروابط إلى صيغة URL الصحيحة، دون أخطاء في الحروف.",
  alternates: { canonical: "/base64-tool" },
};

export default function Page() {
  return (
    <ToolShell
      slug="base64-tool"
      title="ترميز Base64 وتشفير الروابط"
      intro="اكتب النص (عربيًا أو غيره) لترميزه أو فك ترميزه بصيغة Base64 أو URL."
      faq={[
        {
                "q": "هل Base64 تشفير؟",
                "a": "لا، هو مجرد تمثيل للنص بحروف مخصوصة، ولا يحميه، فلا تعتمد عليه لإخفاء البيانات."
        },
        {
                "q": "لماذا تتحول الحروف العربية إلى رموز في الروابط؟",
                "a": "لأن الروابط تقبل حروفًا محددة، فتُرمَّز بقية الحروف بصيغة %."
        }
]}
    >
      <Base64Tool />
    </ToolShell>
  );
}
