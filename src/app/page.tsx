import Link from "next/link";
import { categories } from "@/lib/tools";

export default function Home() {
  return (
    <main className="container">
      <h1>مركز الأدوات العربية المجانية</h1>
      <p className="lead">أدوات سريعة وبسيطة للنصوص العربية، بدون تسجيل وبدون رفع بياناتك.</p>
      {categories.map((c) => (
        <section key={c.name}>
          <h2>{c.name}</h2>
          <div className="grid">
            {c.tools.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="tool">
                <b>{t.title}</b>
                <span>{t.desc}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
