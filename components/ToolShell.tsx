import Link from "next/link";
import { allTools, categoryOf, relatedMap, SITE_NAME, SITE_URL } from "@/lib/tools";
import { guides } from "@/lib/guides";
import { getToolArticleHtml } from "@/lib/content";

export interface Faq { q: string; a: string }

export default function ToolShell({
  slug, title, intro, children, faq = [],
}: {
  slug: string; title: string; intro: string; children: React.ReactNode; faq?: Faq[];
}) {
  const cat = categoryOf(slug);
  const curatedSlugs = relatedMap[slug] ?? [];
  const curated = curatedSlugs.map((s) => allTools.find((t) => t.slug === s)).filter(Boolean) as typeof allTools;
  const same = (cat?.tools ?? []).filter((t) => t.slug !== slug && !curatedSlugs.includes(t.slug));
  const more = [...same, ...allTools.filter((t) => t.slug !== slug && !curatedSlugs.includes(t.slug) && !same.includes(t))].slice(0, 6);
  const articleHtml = getToolArticleHtml(slug);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org", "@type": "WebApplication", name: title, description: intro,
      url: `${SITE_URL}/${slug}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
      inLanguage: "ar", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  ];
  if (faq.length) {
    jsonLd.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  const g = guides[slug];
  return (
    <main className="container">
      <nav className="crumbs" aria-label="مسار التنقل">
        <Link href="/">الرئيسية</Link>
        {cat && <> › <Link href={`/category/${cat.slug}`}>{cat.name}</Link></>}
      </nav>
      <h1>{title}</h1>
      <p className="lead">{intro}</p>
      <section className="card">{children}</section>
      {g && (
        <section className="guide">
          <h2>كيف تستخدم الأداة</h2>
          <ol>{g.steps.map((st) => <li key={st}>{st}</li>)}</ol>
          {g.example && <p><b>مثال:</b> {g.example}</p>}
        </section>
      )}
      {articleHtml && <section className="article" dangerouslySetInnerHTML={{ __html: articleHtml }} />}
      {faq.length > 0 && (
        <section>
          <h2>أسئلة شائعة</h2>
          {faq.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
        </section>
      )}
      {curated.length > 0 && (
        <section className="related-box">
          <h2>قد يهمك أيضًا</h2>
          <div className="grid">
            {curated.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="tool"><b>{t.title}</b><span>{t.desc}</span></Link>))}
          </div>
        </section>
      )}
      {more.length > 0 && (
        <section className="related">
          <h2>أدوات أخرى</h2>
          {more.map((t) => <Link key={t.slug} href={`/${t.slug}`}>{t.title}</Link>)}
        </section>
      )}
      {jsonLd.map((j, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />))}
    </main>
  );
}
