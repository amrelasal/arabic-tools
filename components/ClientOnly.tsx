"use client";
import { useEffect, useState, type ReactNode } from "react";

// يعرض المحتوى بعد التحميل في المتصفح (للأدوات التي تعتمد على تاريخ اليوم)
export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : <p className="note">جارٍ التحميل...</p>;
}
