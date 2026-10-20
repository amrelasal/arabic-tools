import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/tools";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  <meta name="google-site-verification" content="PDjcnwJmp4sFnAz4kz-f0kERH37ktShCRdI-JfWhv_I" />
  title: { default: `${SITE_NAME} | مركز أدوات النصوص والحاسبات`, template: `%s | ${SITE_NAME}` },
  description: "أدوات عربية مجانية: إزالة التشكيل، تحويل الأرقام، عداد الكلمات، تنظيف النصوص وغيرها.",
  openGraph: { locale: "ar_AR", type: "website", siteName: SITE_NAME },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="header">
          <div className="container">
            <Link href="/" className="logo">{SITE_NAME}</Link>
            <Link href="/">كل الأدوات</Link>
          </div>
        </header>
        {children}
        <footer className="footer">جميع الأدوات تعمل داخل متصفحك ولا يتم رفع نصوصك لأي خادم.</footer>
      </body>
    </html>
  );
}
