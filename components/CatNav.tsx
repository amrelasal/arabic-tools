"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, categoryOf } from "@/lib/tools";
import Icon from "./Icon";

export default function CatNav() {
  const p = usePathname() ?? "/";
  const slug = p.split("/").filter(Boolean);
  const activeCat = p.startsWith("/category/") ? slug[1] : categoryOf(slug[0] ?? "")?.slug;
  return (
    <nav className="catnav" aria-label="أقسام الموقع">
      <div className="container catnav-in">
        <Link href="/" className={p === "/" ? "on" : ""}><Icon name="grid" size={16} /> كل الأدوات</Link>
        {categories.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className={activeCat === c.slug ? "on" : ""}>
            <Icon name={c.icon} size={16} /> {c.name}
          </Link>
        ))}
        <Link href="/blog" className={p.startsWith("/blog") ? "on" : ""}><Icon name="book" size={16} /> المدونة</Link>
      </div>
    </nav>
  );
}
