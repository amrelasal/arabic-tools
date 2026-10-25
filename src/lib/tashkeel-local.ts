// تشكيل النصوص داخل المتصفح بنموذج libtashkeel (WebAssembly) دون إرسال أي نص إلى خادم
import * as glue from "./libtashkeel-glue.js";

const WASM_URL = "/tashkeel/libtashkeel_wasm_bg.wasm";
let compiled: WebAssembly.Module | null = null;
let ready: Promise<void> | null = null;

async function instantiate() {
  if (!compiled) {
    try { compiled = await WebAssembly.compileStreaming(fetch(WASM_URL)); }
    catch { compiled = await WebAssembly.compile(await (await fetch(WASM_URL)).arrayBuffer()); }
  }
  const imports: WebAssembly.Imports = {};
  for (const i of WebAssembly.Module.imports(compiled)) {
    (imports[i.module] ??= {})[i.name] = (glue as unknown as Record<string, WebAssembly.ImportValue>)[i.name];
  }
  const inst = await WebAssembly.instantiate(compiled, imports);
  (glue as unknown as { __wbg_set_wasm: (e: unknown) => void }).__wbg_set_wasm(inst.exports);
}

export function loadTashkeel() {
  return (ready ??= instantiate().catch((e) => { ready = null; throw e; }));
}

const DIAC = /[\u064B-\u065F\u0670]/g;
const isAr = (s: string) => /[\u0621-\u064A]/.test(s);
const sameLetters = (a: string, b: string) => a.replace(DIAC, "").replace(/\s+/g, " ").trim() === b.replace(DIAC, "").replace(/\s+/g, " ").trim();

// هاء الضمير بعد كسرة تأخذ كسرة (بَرَكَاتِه ← بَرَكَاتِهِ)
const fixPronounHa = (w: string) => (/\u0650ه$/.test(w) ? w + "\u0650" : w);

// تشكيل جزئي: حذف حركة آخر الكلمة (الإعراب) مع إبقاء السكون وتنوين الفتح والشدة
function stripEnding(w: string) {
  const ch = Array.from(w);
  let i = ch.length - 1;
  const tail: string[] = [];
  while (i > 0 && /[\u064B-\u065F\u0670]/.test(ch[i])) { tail.unshift(ch[i]); i--; }
  const keep = tail.filter((c) => c === "\u0651" || c === "\u0652" || c === "\u064B");
  return ch.slice(0, i + 1).join("") + keep.join("");
}

function postProcess(s: string, partial: boolean) {
  return s.split(/(\s+)/).map((tok) => {
    if (!isAr(tok)) return tok;
    // نفصل علامات الترقيم الملتصقة بآخر الكلمة قبل تطبيق القواعد
    const m = tok.match(/^([\s\S]*[\u0621-\u064A][\u064B-\u065F\u0670]*)([^\u0621-\u064A\u064B-\u065F\u0670]*)$/);
    if (!m) return tok;
    const x = fixPronounHa(m[1]);
    return (partial ? stripEnding(x) : x) + m[2];
  }).join("");
}

// تقسيم السطر الطويل إلى قطع قصيرة عند علامات الترقيم أو المسافات
function split(line: string, max = 350): string[] {
  const out: string[] = [];
  let rest = line;
  while (rest.length > max) {
    const win = rest.slice(0, max);
    let cut = Math.max(win.lastIndexOf("."), win.lastIndexOf("؟"), win.lastIndexOf("!"), win.lastIndexOf("،"), win.lastIndexOf("؛"), win.lastIndexOf(":"));
    if (cut < max * 0.4) cut = win.lastIndexOf(" ");
    if (cut <= 0) cut = max - 1;
    out.push(rest.slice(0, cut + 1));
    rest = rest.slice(cut + 1);
  }
  if (rest) out.push(rest);
  return out;
}

export async function addTashkeel(text: string, partial: boolean, onProgress?: (done: number, total: number) => void): Promise<string> {
  await loadTashkeel();
  const lines = text.split("\n");
  const jobs = lines.map((l) => (isAr(l) ? split(l) : [l]));
  const total = jobs.reduce((n, j) => n + j.filter(isAr).length, 0);
  let done = 0;
  const result: string[] = [];
  for (const parts of jobs) {
    let line = "";
    for (const part of parts) {
      if (!isAr(part)) { line += part; continue; }
      const lead = part.match(/^\s*/)![0], trail = part.match(/\s*$/)![0];
      const core = part.trim();
      let out = core;
      try {
        const r = (glue as unknown as { do_tashkeel: (t: string) => string }).do_tashkeel(core);
        if (sameLetters(r, core)) out = postProcess(r, partial);
      } catch {
        ready = null; // قد يتعطل النموذج بعد خطأ، فنعيد تهيئته للقطعة التالية
        await loadTashkeel();
      }
      line += lead + out + trail;
      done++; onProgress?.(done, total);
      if (done % 3 === 0) await new Promise((r) => setTimeout(r, 0));
    }
    result.push(line);
  }
  return result.join("\n");
}
