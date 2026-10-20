import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/tools";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: `تواصل مع فريق ${SITE_NAME} لإرسال ملاحظاتك أو الإبلاغ عن خطأ أو اقتراح أداة جديدة.`,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <main className="container prose">
      <h1>اتصل بنا</h1>
      <p>يسعدنا أن نسمع منك. يمكنك مراسلتنا لأي من الأسباب التالية:</p>
      <ul>
        <li>الإبلاغ عن خطأ في إحدى الأدوات.</li>
        <li>اقتراح أداة جديدة أو تحسين على أداة موجودة.</li>
        <li>الاستفسارات العامة عن الموقع.</li>
      </ul>
      {email ? (
        <p>البريد الإلكتروني: <a href={`mailto:${email}`}>{email}</a></p>
      ) : (
        <p>سيُضاف البريد الإلكتروني للتواصل في هذه الصفحة قريبًا.</p>
      )}
      <p>عند الإبلاغ عن خطأ، اذكر اسم الأداة والنص أو الأرقام التي جرّبتها ونوع جهازك ومتصفحك، لنتمكن من إصلاحه بسرعة.</p>
    </main>
  );
}
