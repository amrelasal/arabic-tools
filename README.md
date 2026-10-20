# أدوات عربية

```bash
npm install
npm run dev      # http://localhost:3000
```

## النشر على Vercel
1. ارفع المشروع إلى GitHub.
2. من vercel.com اختر Import Project ثم المستودع.
3. أضف متغير البيئة `NEXT_PUBLIC_SITE_URL` بنطاقك (مثال: https://example.com).
4. Deploy.

## إضافة أداة جديدة
1. أضفها في `src/lib/tools.ts`.
2. أنشئ `src/app/<slug>/page.tsx` (انسخ صفحة موجودة).
3. تظهر تلقائيًا في الرئيسية والـ sitemap.

## ميزة إضافة التشكيل
تعمل عبر `/api/tashkeel` وتحتاج مفتاح Anthropic API:
1. أنشئ مفتاحًا من console.anthropic.com (حساب منفصل عن اشتراك Claude).
2. في Vercel: Settings ← Environment Variables ← أضف `ANTHROPIC_API_KEY` ثم Redeploy.
3. حدّد سقف إنفاق شهريًا من لوحة Anthropic لحماية نفسك من الاستخدام الزائد.

بدون المفتاح تعمل بقية الأدوات، وتظهر رسالة "غير مفعّلة" في تبويب إضافة التشكيل.
