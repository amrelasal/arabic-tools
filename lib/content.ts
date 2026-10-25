import fs from "fs";
import path from "path";
import { marked } from "marked";

const root = path.join(process.cwd(), "src", "content");

export interface Article {
  slug: string; title: string; description: string; date: string; updated: string;
  tools: string[]; html: string; order?: number;
}

function parse(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (m) for (const line of m[1].split("\n")) { const i = line.indexOf(":"); if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  return { meta, body: m ? m[2] : raw };
}

export function getArticles(): Article[] {
  const dir = path.join(root, "articles");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const { meta, body } = parse(fs.readFileSync(path.join(dir, f), "utf-8"));
    return {
      slug: meta.slug ?? f.replace(/\.md$/, ""), title: meta.title ?? "", description: meta.description ?? "",
      date: meta.date ?? "", updated: meta.updated ?? meta.date ?? "",
      order: Number(meta.order ?? 0),
      tools: (meta.tools ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      html: marked.parse(body, { async: false }) as string,
    };
  }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export const getArticle = (slug: string) => getArticles().find((a) => a.slug === slug);

export function getToolArticleHtml(slug: string): string | null {
  const file = path.join(root, "tools", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return marked.parse(parse(fs.readFileSync(file, "utf-8")).body, { async: false }) as string;
}
