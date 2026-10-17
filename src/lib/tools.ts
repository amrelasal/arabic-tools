export interface Tool { slug: string; title: string; desc: string }
export interface Category { name: string; tools: Tool[] }

// الأدوات المفعّلة فقط تظهر في الرئيسية والـ sitemap.
// عند إنهاء أداة جديدة أضفها هنا.
export const categories: Category[] = [
  {
    name: "أدوات النصوص",
    tools: [
      { slug: "remove-tashkeel", title: "إزالة التشكيل من النص العربي", desc: "احذف الحركات والتشكيل فورًا" },
      { slug: "arabic-numbers", title: "تحويل الأرقام العربية والهندية", desc: "١٢٣ ↔ 123" },
      { slug: "word-counter", title: "عداد الكلمات العربي", desc: "كلمات، حروف، جمل، ووقت القراءة" },
      { slug: "text-cleaner", title: "تنظيف النصوص", desc: "إزالة التطويل والمسافات الزائدة" },
    ],
  },
];

export const allTools = categories.flatMap((c) => c.tools);
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
export const SITE_NAME = "أدوات عربية";
