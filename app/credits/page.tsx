import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حقوق وتراخيص",
  description: "المكتبات والنماذج مفتوحة المصدر التي تعتمد عليها أدواتنا وتراخيصها.",
  alternates: { canonical: "/credits" },
};

export default function Page() {
  return (
    <main className="container prose">
      <h1>حقوق وتراخيص</h1>
      <p>تعتمد بعض أدواتنا على مشاريع مفتوحة المصدر، نشكر أصحابها، وهذه قائمتها:</p>
      <ul>
        <li><b>libtashkeel</b> (ترخيص MIT/Apache-2.0) ونماذج <b>Hareef</b> (ترخيص MIT): تعمل عليهما أداة إضافة التشكيل داخل متصفحك. المشروع: github.com/mush42/libtashkeel</li>
        <li><b>Adhan</b> (ترخيص MIT): مكتبة حساب مواقيت الصلاة المستخدمة في أداتي المواقيت والإمساكية. المشروع: github.com/batoulapps/adhan-js</li>
        <li><b>node-qrcode</b> (ترخيص MIT): لتوليد رمز QR في أداة QR.</li>
        <li><b>marked</b> (ترخيص MIT): لعرض نصوص المقالات.</li>
        <li><b>Next.js</b> و<b>React</b> (ترخيص MIT): لبناء الموقع.</li>
      </ul>
      <p>نص ترخيص MIT: يُسمح باستخدام البرمجيات ونسخها وتعديلها ونشرها بشرط إبقاء إشعار حقوق النشر وإشعار الترخيص في النسخ. وتُقدَّم البرمجيات «كما هي» دون أي ضمان.</p>
      <p>خط Cairo من Google Fonts (ترخيص SIL Open Font License).</p>
    </main>
  );
}
