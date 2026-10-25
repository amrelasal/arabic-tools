export interface Tool { slug: string; title: string; desc: string }
export interface Category { slug: string; name: string; icon: string; intro: string; tools: Tool[] }

// الأدوات المفعّلة فقط تظهر في الرئيسية والأقسام والـ sitemap.
export const categories: Category[] = [
  {
    slug: "text", name: "أدوات النصوص", icon: "text",
    intro: "أدوات تساعدك على معالجة النصوص العربية: إضافة التشكيل وحذفه، وتصحيح لغة الكتابة، وتنظيف النصوص وعدّ كلماتها، وكتابة الأسماء بالإنجليزية وغيرها. تعمل كلها داخل متصفحك دون تسجيل.",
    tools: [
      { slug: "remove-tashkeel", title: "إزالة التشكيل من النص العربي", desc: "احذف الحركات والتشكيل فورًا" },
      { slug: "add-tashkeel", title: "تشكيل النص العربي آليًا", desc: "أضف الحركات لأي نص عربي" },
      { slug: "keyboard-fix", title: "تصحيح لغة لوحة المفاتيح", desc: "hgsghl ← السلام والعكس" },
      { slug: "name-decorator", title: "زخرفة الأسماء والنصوص", desc: "زخارف جاهزة للنسخ بالعربية والإنجليزية" },
      { slug: "name-english", title: "كتابة الاسم العربي بالإنجليزية", desc: "كيف يُكتب اسمك بحروف لاتينية" },
      { slug: "arabic-numbers", title: "تحويل الأرقام العربية والهندية", desc: "١٢٣ ↔ 123" },
      { slug: "word-counter", title: "عداد الكلمات العربي", desc: "كلمات، حروف، جمل، ووقت القراءة" },
      { slug: "letter-frequency", title: "تكرار الحروف والكلمات في النص", desc: "الأكثر تكرارًا في أي نص عربي" },
      { slug: "text-cleaner", title: "تنظيف النصوص", desc: "إزالة التطويل والمسافات الزائدة" },
      { slug: "dedupe-sort", title: "حذف الأسطر المكررة والترتيب الأبجدي", desc: "نظّف القوائم ورتّبها بالعربية" },
      { slug: "abjad-calculator", title: "حاسبة الجُمَّل (أبجد هوز)", desc: "القيمة العددية لأي كلمة" },
    ],
  },
  {
    slug: "calculators", name: "الحاسبات", icon: "calc",
    intro: "حاسبات سريعة لأشهر الحسابات اليومية والدراسية: النسب المئوية والخصومات، والعمر والفرق بين تاريخين، والمعدل التراكمي، ونسبة الدرجات.",
    tools: [
      { slug: "percentage-calculator", title: "حاسبة النسبة المئوية والخصم", desc: "نسبة، خصم، زيادة، وضريبة" },
      { slug: "age-calculator", title: "حاسبة العمر والفرق بين تاريخين", desc: "بالهجري والميلادي" },
      { slug: "gpa", title: "حاسبة المعدل التراكمي GPA", desc: "معدل الفصل والمعدل التراكمي" },
      { slug: "grade-percentage", title: "حاسبة النسبة المئوية للدرجات", desc: "مجموع الدرجات والنسبة والتقدير" },
    ],
  },
  {
    slug: "health", name: "الصحة", icon: "heart",
    intro: "حاسبات صحية عامة تعطيك تقديرًا أوليًا فقط، ولا تغني عن استشارة الطبيب.",
    tools: [
      { slug: "bmi", title: "حاسبة مؤشر كتلة الجسم BMI", desc: "الوزن المناسب لطولك" },
      { slug: "due-date", title: "حاسبة موعد الولادة المتوقع", desc: "وعمر الحمل بالأسابيع" },
    ],
  },
  {
    slug: "education", name: "للمعلمين والمدارس", icon: "cap",
    intro: "أدوات تخدم الصف والمدرسة: شهادات جاهزة للطباعة، وأوراق تتبع الحروف والأسماء للأطفال، وقرعة وتقسيم للمجموعات.",
    tools: [
      { slug: "certificate-maker", title: "مولد شهادات الشكر والتفوق", desc: "شهادة جاهزة للطباعة أو PDF" },
      { slug: "tracing-worksheets", title: "أوراق تتبع الحروف والأسماء", desc: "للطباعة وتدريب الأطفال على الكتابة" },
      { slug: "random-picker", title: "القرعة وتقسيم المجموعات", desc: "اختر اسمًا أو قسّم الفصل" },
    ],
  },
  {
    slug: "accountants", name: "أدوات المحاسبين", icon: "receipt",
    intro: "أدوات لكتابة المبالغ المالية بالحروف على الشيكات والعقود والفواتير.",
    tools: [{ slug: "tafqit", title: "التفقيط: تحويل الأرقام إلى كلمات", desc: "بالجنيه والريال والدرهم والدينار وغيرها" }],
  },
  {
    slug: "islamic", name: "أدوات إسلامية", icon: "moon",
    intro: "مواقيت الصلاة وإمساكية رمضان واتجاه القبلة، وتحويل التاريخ الهجري، وحاسبة الزكاة، والعدّ التنازلي للمناسبات. تنبّه: النتائج حسابية وقد تختلف قليلًا عن إعلانات الجهات الرسمية في بلدك.",
    tools: [
      { slug: "prayer-times", title: "مواقيت الصلاة", desc: "لمدينتك بالتوقيت المحلي" },
      { slug: "ramadan-imsakia", title: "إمساكية رمضان", desc: "جدول الإمساك والإفطار" },
      { slug: "hijri-date", title: "تحويل التاريخ الهجري والميلادي", desc: "حسب تقويم أم القرى" },
      { slug: "zakat", title: "حاسبة الزكاة", desc: "النقد والذهب والفضة وعروض التجارة" },
      { slug: "qibla", title: "اتجاه القبلة", desc: "من موقعك بالدرجات" },
      { slug: "islamic-countdown", title: "العد التنازلي لرمضان والعيد", desc: "مواعيد تتحدث تلقائيًا" },
    ],
  },
  {
    slug: "utilities", name: "أدوات يومية وتقنية", icon: "gear",
    intro: "أدوات عملية لكل يوم: رمز QR، وكلمات مرور قوية، وفرق التوقيت بين المدن، وترميز Base64.",
    tools: [
      { slug: "qr-code", title: "مولّد رمز QR", desc: "رابط أو واي فاي أو واتساب" },
      { slug: "password-generator", title: "مولّد كلمات المرور", desc: "كلمات قوية وعشوائية وآمنة" },
      { slug: "time-difference", title: "فرق التوقيت بين المدن", desc: "حوّل الوقت بين أي مدينتين" },
      { slug: "base64-tool", title: "ترميز Base64 وتشفير الروابط", desc: "للنصوص العربية بدون أخطاء" },
    ],
  },
];

export const allTools = categories.flatMap((c) => c.tools);
export const categoryOf = (slug: string) => categories.find((c) => c.tools.some((t) => t.slug === slug));

// روابط «قد يهمك أيضًا» المختارة يدويًا
export const relatedMap: Record<string, string[]> = {
  "remove-tashkeel": ["add-tashkeel", "text-cleaner", "word-counter"],
  "add-tashkeel": ["remove-tashkeel", "keyboard-fix"],
  "keyboard-fix": ["text-cleaner", "name-decorator"],
  "name-decorator": ["name-english", "text-cleaner"],
  "name-english": ["name-decorator", "abjad-calculator"],
  "arabic-numbers": ["tafqit", "text-cleaner"],
  "word-counter": ["letter-frequency", "dedupe-sort"],
  "letter-frequency": ["word-counter", "dedupe-sort"],
  "text-cleaner": ["remove-tashkeel", "dedupe-sort"],
  "dedupe-sort": ["text-cleaner", "letter-frequency", "random-picker"],
  "abjad-calculator": ["name-decorator", "name-english"],
  "percentage-calculator": ["grade-percentage", "gpa"],
  "age-calculator": ["hijri-date", "islamic-countdown", "due-date"],
  gpa: ["grade-percentage", "percentage-calculator"],
  "grade-percentage": ["gpa", "percentage-calculator"],
  bmi: ["age-calculator", "percentage-calculator"],
  "due-date": ["age-calculator", "bmi"],
  "certificate-maker": ["tracing-worksheets", "random-picker", "grade-percentage"],
  "tracing-worksheets": ["certificate-maker", "random-picker"],
  "random-picker": ["certificate-maker", "dedupe-sort"],
  tafqit: ["arabic-numbers", "percentage-calculator"],
  "prayer-times": ["ramadan-imsakia", "qibla", "hijri-date"],
  "ramadan-imsakia": ["prayer-times", "islamic-countdown", "zakat"],
  "hijri-date": ["age-calculator", "islamic-countdown", "zakat"],
  zakat: ["hijri-date", "percentage-calculator", "ramadan-imsakia"],
  qibla: ["prayer-times", "hijri-date"],
  "islamic-countdown": ["ramadan-imsakia", "hijri-date", "prayer-times"],
  "qr-code": ["password-generator", "base64-tool"],
  "password-generator": ["qr-code", "base64-tool"],
  "time-difference": ["prayer-times", "age-calculator"],
  "base64-tool": ["qr-code", "password-generator"],
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
export const SITE_NAME = "أدوات عربية";
