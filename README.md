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
