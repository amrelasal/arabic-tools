import Link from "next/link";
import { categories } from "@/lib/tools";
import { guides } from "@/lib/guides";

export interface Faq { q: string; a: string }

export default function ToolShell({
  slug, title, intro, children, faq = [], article,
}: {
  slug: string; title: string; intro: string; children: React.ReactNode;
  faq?: Faq[]; article?: React.ReactNode;
}) {
  const mine = categories.find((c) => c.tools.some((t) => t.slug === slug));
  const others = categories.flatMap((c) => c.tools).filter((t) => t.slug !== slug);
  const same = mine ? mine.tools.filter((t) => t.slug !== slug) : [];
  const related = [...same, ...others.filter((t) => !same.includes(t))].slice(0, 8);
  const jsonLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;
  return (
    <main className="container">
      <h1>{title}</h1>
      <p className="lead">{intro}</p>
      <section className="card">{children}</section>
      {guides[slug] && (
        <section className="guide">
          <h2>كيف تستخدم الأداة</h2>
          <ol>{guides[slug].steps.map((st) => <li key={st}>{st}</li>)}</ol>
          {guides[slug].example && <p><b>مثال:</b> {guides[slug].example}</p>}
        </section>
      )}
      {article && <section>{article}</section>}
      {faq.length > 0 && (
        <section>
          <h2>أسئلة شائعة</h2>
          {faq.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </section>
      )}
      {related.length > 0 && (
        <section className="related">
          <h2>أدوات أخرى</h2>
          {related.map((t) => <Link key={t.slug} href={`/${t.slug}`}>{t.title}</Link>)}
        </section>
      )}
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </main>
  );
}
