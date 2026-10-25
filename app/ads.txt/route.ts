// ملف ads.txt يُنتج تلقائيًا من متغير NEXT_PUBLIC_ADSENSE_CLIENT (مثال: ca-pub-1234567890123456)
export const dynamic = "force-static";

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const body = client
    ? `google.com, ${client.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`
    : "# no ads configured\n";
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
