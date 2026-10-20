export interface Tool { slug: string; title: string; desc: string }
export interface Category { name: string; tools: Tool[] }

// الأدوات المفعّلة فقط تظهر في الرئيسية والـ sitemap.
export const categories: Category[] = [
  {
    name: "أدوات النصوص",
    tools: [
      { slug: "remove-tashkeel", title: "إزالة التشكيل من النص العربي", desc: "احذف الحركات والتشكيل فورًا" },
      { slug: "add-tashkeel", title: "تشكيل النص العربي آليًا", desc: "أضف الحركات لأي نص عربي" },
      { slug: "keyboard-fix", title: "تصحيح لغة لوحة المفاتيح", desc: "hgsghl ← السلام والعكس" },
      { slug: "name-decorator", title: "زخرفة الأسماء والنصوص", desc: "زخارف جاهزة للنسخ بالعربية والإنجليزية" },
      { slug: "arabic-numbers", title: "تحويل الأرقام العربية والهندية", desc: "١٢٣ ↔ 123" },
      { slug: "word-counter", title: "عداد الكلمات العربي", desc: "كلمات، حروف، جمل، ووقت القراءة" },
      { slug: "text-cleaner", title: "تنظيف النصوص", desc: "إزالة التطويل والمسافات الزائدة" },
      { slug: "abjad-calculator", title: "حاسبة الجُمَّل (أبجد هوز)", desc: "القيمة العددية لأي كلمة" },
    ],
  },
  {
    name: "الحاسبات",
    tools: [
      { slug: "percentage-calculator", title: "حاسبة النسبة المئوية والخصم", desc: "نسبة، خصم، زيادة، وضريبة" },
      { slug: "age-calculator", title: "حاسبة العمر والفرق بين تاريخين", desc: "بالهجري والميلادي" },
      { slug: "gpa", title: "حاسبة المعدل التراكمي GPA", desc: "معدل الفصل والمعدل التراكمي" },
      { slug: "grade-percentage", title: "حاسبة النسبة المئوية للدرجات", desc: "مجموع الدرجات والنسبة والتقدير" },
    ],
  },
  {
    name: "الصحة",
    tools: [
      { slug: "bmi", title: "حاسبة مؤشر كتلة الجسم BMI", desc: "الوزن المناسب لطولك" },
      { slug: "due-date", title: "حاسبة موعد الولادة المتوقع", desc: "وعمر الحمل بالأسابيع" },
    ],
  },
  {
    name: "للمعلمين والمدارس",
    tools: [{ slug: "certificate-maker", title: "مولد شهادات الشكر والتفوق", desc: "شهادة جاهزة للطباعة أو PDF" }],
  },
  {
    name: "أدوات المحاسبين",
    tools: [{ slug: "tafqit", title: "التفقيط: تحويل الأرقام إلى كلمات", desc: "بالجنيه والريال والدرهم والدينار وغيرها" }],
  },
  {
    name: "أدوات إسلامية",
    tools: [
      { slug: "hijri-date", title: "تحويل التاريخ الهجري والميلادي", desc: "حسب تقويم أم القرى" },
      { slug: "zakat", title: "حاسبة الزكاة", desc: "النقد والذهب والفضة وعروض التجارة" },
      { slug: "qibla", title: "اتجاه القبلة", desc: "من موقعك بالدرجات" },
      { slug: "islamic-countdown", title: "العد التنازلي لرمضان والعيد", desc: "مواعيد تتحدث تلقائيًا" },
    ],
  },
];

export const allTools = categories.flatMap((c) => c.tools);
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
export const SITE_NAME = "أدوات عربية";
