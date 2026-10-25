import Link from "next/link";
import { categories } from "@/lib/tools";
import { getArticles } from "@/lib/content";
import SearchBox from "@/components/SearchBox";
import Icon from "@/components/Icon";

export default function Home() {
  const items = categories.flatMap((c) => c.tools.map((t) => ({ ...t, cat: c.name })));
  const latest = getArticles().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <main className="container">
      <section className="hero">
        <h1>مركز الأدوات العربية المجانية للنصوص والحاسبات</h1>
        <p className="lead">{items.length} أداة سريعة وبسيطة للنصوص العربية والحسابات اليومية والأدوات الإسلامية، بدون تسجيل وبدون تعقيد.</p>
        <div className="badge"><Icon name="shield" size={18} /> خصوصيتك أولًا: أدواتنا تعمل داخل متصفحك، ولا يُرفع نصك إلى أي خادم.</div>
        <SearchBox items={items} />
      </section>

      {categories.map((c) => (
        <section key={c.slug} id={c.slug}>
          <h2 className="cat-h"><Icon name={c.icon} size={22} /> <Link href={`/category/${c.slug}`}>{c.name}</Link></h2>
          <div className="grid">
            {c.tools.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="tool"><b>{t.title}</b><span>{t.desc}</span></Link>
            ))}
          </div>
        </section>
      ))}

      {latest.length > 0 && (
        <section>
          <h2 className="cat-h"><Icon name="book" size={22} /> <Link href="/blog">أحدث المقالات</Link></h2>
          <div className="grid">
            {latest.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="tool"><b>{a.title}</b><span>{a.description}</span></Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
