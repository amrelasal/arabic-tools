import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/content";
import { SITE_NAME } from "@/lib/tools";

export const metadata: Metadata = {
  title: "المدونة",
  description: `مقالات عربية مبسطة عن التشكيل والتفقيط والتقويم الهجري والمعدل التراكمي وغيرها، من ${SITE_NAME}.`,
  alternates: { canonical: "/blog" },
};

export default function Page() {
  const list = getArticles().sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main className="container">
      <h1>المدونة</h1>
      <p className="lead">مقالات مبسطة تشرح الأفكار وراء أدواتنا، وتساعدك على الاستفادة منها.</p>
      <div className="grid">
        {list.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="tool">
            <b>{a.title}</b><span>{a.description}</span>
            <span className="note">{a.date}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
