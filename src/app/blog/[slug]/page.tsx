import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/content";
import { allTools, SITE_NAME, SITE_URL } from "@/lib/tools";

export const dynamicParams = false;
export function generateStaticParams() { return getArticles().map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title, description: a.description, alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.date, modifiedTime: a.updated },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const tools = a.tools.map((s) => allTools.find((t) => t.slug === s)).filter(Boolean) as typeof allTools;
  const others = getArticles().filter((x) => x.slug !== a.slug).sort((x, y) => y.date.localeCompare(x.date)).slice(0, 3);
  const ld = {
    "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, inLanguage: "ar",
    datePublished: a.date, dateModified: a.updated, mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    author: { "@type": "Organization", name: SITE_NAME }, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
  return (
    <main className="container">
      <nav className="crumbs"><Link href="/">الرئيسية</Link> › <Link href="/blog">المدونة</Link></nav>
      <article>
        <h1>{a.title}</h1>
        <p className="note">نُشر في {a.date}{a.updated !== a.date ? ` — آخر تحديث ${a.updated}` : ""}</p>
        <div className="article" dangerouslySetInnerHTML={{ __html: a.html }} />
      </article>
      {tools.length > 0 && (
        <section className="related-box">
          <h2>الأدوات المرتبطة بالمقال</h2>
          <div className="grid">
            {tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="tool"><b>{t.title}</b><span>{t.desc}</span></Link>))}
          </div>
        </section>
      )}
      {others.length > 0 && (
        <section className="related">
          <h2>مقالات أخرى</h2>
          {others.map((o) => <Link key={o.slug} href={`/blog/${o.slug}`}>{o.title}</Link>)}
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </main>
  );
}
