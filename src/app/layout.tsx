import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/tools";

const ADSENSE = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: "PDjcnwJmp4sFnAz4kz-f0kERH37ktShCRdI-JfWhv_I" },
  title: { default: `${SITE_NAME} | مركز أدوات النصوص والحاسبات`, template: `%s | ${SITE_NAME}` },
  description: "أدوات عربية مجانية: إزالة التشكيل، تحويل الأرقام، عداد الكلمات، تنظيف النصوص وغيرها.",
  openGraph: { locale: "ar_AR", type: "website", siteName: SITE_NAME },
  other: ADSENSE ? { "google-adsense-account": ADSENSE } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap" rel="stylesheet" />
        {ADSENSE && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}`} crossOrigin="anonymous" />
        )}
      </head>
      <body>
        <header className="header">
          <div className="container">
            <Link href="/" className="logo">{SITE_NAME}</Link>
            <Link href="/">كل الأدوات</Link>
          </div>
        </header>
        {children}
        <footer className="footer">
          <nav className="footer-links">
            <Link href="/about">من نحن</Link>
            <Link href="/privacy-policy">سياسة الخصوصية</Link>
            <Link href="/contact">اتصل بنا</Link>
          </nav>
          <div>معظم الأدوات تعمل داخل متصفحك دون رفع نصوصك. التفاصيل في سياسة الخصوصية.</div>
        </footer>
      </body>
    </html>
  );
}
