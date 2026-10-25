import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/lib/tools";
import Icon from "@/components/Icon";

export const dynamicParams = false;
export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: c.name, description: c.intro, alternates: { canonical: `/category/${c.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <main className="container">
      <nav className="crumbs"><Link href="/">الرئيسية</Link> › {c.name}</nav>
      <h1 className="cat-h"><Icon name={c.icon} size={26} /> {c.name}</h1>
      <p className="lead">{c.intro}</p>
      <div className="grid">
        {c.tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="tool"><b>{t.title}</b><span>{t.desc}</span></Link>))}
      </div>
    </main>
  );
}
