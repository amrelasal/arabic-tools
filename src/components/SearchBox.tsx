"use client";
import Link from "next/link";
import { useState } from "react";
import { normalizeSearch } from "@/lib/arabic";
import Icon from "./Icon";

export interface Item { slug: string; title: string; desc: string; cat: string }

export default function SearchBox({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  const n = normalizeSearch(q);
  const res = n ? items.filter((i) => normalizeSearch(`${i.title} ${i.desc} ${i.cat}`).includes(n)).slice(0, 8) : [];
  return (
    <div className="search">
      <div className="search-in">
        <Icon name="search" size={20} />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن أداة... (مثال: تفقيط، قبلة، QR)" aria-label="ابحث عن أداة" />
      </div>
      {n && (
        <div className="search-res">
          {res.length === 0 && <div className="note" style={{ padding: 10 }}>لا توجد أداة بهذا الاسم. جرّب كلمة أخرى.</div>}
          {res.map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} className="search-item">
              <b>{r.title}</b><span>{r.cat} — {r.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
