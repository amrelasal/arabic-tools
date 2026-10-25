import { normalizeSearch } from "./arabic";

export type Style = "egypt" | "gulf" | "formal";
type V = [string, string, string];

const RAW: Record<string, V> = {
  محمد: ["Mohamed", "Mohammed", "Muhammad"], أحمد: ["Ahmed", "Ahmed", "Ahmad"], علي: ["Ali", "Ali", "Ali"],
  عمر: ["Omar", "Omar", "Umar"], عثمان: ["Osman", "Othman", "Uthman"], حسن: ["Hassan", "Hassan", "Hasan"],
  حسين: ["Hussein", "Hussain", "Husayn"], محمود: ["Mahmoud", "Mahmoud", "Mahmud"], مصطفى: ["Mostafa", "Mustafa", "Mustafa"],
  إبراهيم: ["Ibrahim", "Ibrahim", "Ibrahim"], إسماعيل: ["Ismail", "Ismail", "Ismail"], يوسف: ["Youssef", "Yousef", "Yusuf"],
  يحيى: ["Yehia", "Yahya", "Yahya"], زكريا: ["Zakaria", "Zakariya", "Zakariya"], خالد: ["Khaled", "Khalid", "Khalid"],
  طارق: ["Tarek", "Tareq", "Tariq"], عمرو: ["Amr", "Amro", "Amr"], كريم: ["Karim", "Kareem", "Karim"],
  سامي: ["Sami", "Sami", "Sami"], سمير: ["Samir", "Samir", "Samir"], ماجد: ["Maged", "Majed", "Majid"],
  ماهر: ["Maher", "Maher", "Mahir"], وليد: ["Walid", "Waleed", "Walid"], هشام: ["Hesham", "Hisham", "Hisham"],
  حازم: ["Hazem", "Hazem", "Hazim"], أمير: ["Amir", "Ameer", "Amir"], باسم: ["Bassem", "Basim", "Basim"],
  رامي: ["Rami", "Rami", "Rami"], رضا: ["Reda", "Reda", "Rida"], صلاح: ["Salah", "Salah", "Salah"],
  صالح: ["Saleh", "Saleh", "Salih"], سعيد: ["Said", "Saeed", "Said"], سليمان: ["Soliman", "Sulaiman", "Sulayman"],
  فهد: ["Fahd", "Fahad", "Fahd"], سلمان: ["Salman", "Salman", "Salman"], ناصر: ["Nasser", "Nasser", "Nasir"],
  فيصل: ["Faisal", "Faisal", "Faysal"], بدر: ["Badr", "Badr", "Badr"], راشد: ["Rashed", "Rashid", "Rashid"],
  سلطان: ["Sultan", "Sultan", "Sultan"], منصور: ["Mansour", "Mansour", "Mansur"], جمال: ["Gamal", "Jamal", "Jamal"],
  كمال: ["Kamal", "Kamal", "Kamal"], نبيل: ["Nabil", "Nabil", "Nabil"], عادل: ["Adel", "Adel", "Adil"],
  شريف: ["Sherif", "Sharif", "Sharif"], أيمن: ["Ayman", "Ayman", "Ayman"], أسامة: ["Osama", "Osama", "Usama"],
  إسلام: ["Islam", "Islam", "Islam"], هيثم: ["Haitham", "Haitham", "Haytham"], ياسر: ["Yasser", "Yasser", "Yasir"],
  حمزة: ["Hamza", "Hamza", "Hamza"], بلال: ["Bilal", "Bilal", "Bilal"], آدم: ["Adam", "Adam", "Adam"],
  زياد: ["Ziad", "Ziyad", "Ziyad"], مروان: ["Marwan", "Marwan", "Marwan"], مازن: ["Mazen", "Mazen", "Mazin"],
  أنس: ["Anas", "Anas", "Anas"], سيف: ["Seif", "Saif", "Sayf"], فارس: ["Fares", "Fares", "Faris"],
  فاطمة: ["Fatma", "Fatima", "Fatimah"], عائشة: ["Aisha", "Aisha", "Aishah"], عايشة: ["Aisha", "Aisha", "Aishah"],
  مريم: ["Mariam", "Mariam", "Maryam"], سارة: ["Sara", "Sarah", "Sarah"], نور: ["Nour", "Noor", "Nur"],
  هدى: ["Hoda", "Huda", "Huda"], منى: ["Mona", "Muna", "Muna"], ريم: ["Reem", "Reem", "Rim"], رنا: ["Rana", "Rana", "Rana"],
  دينا: ["Dina", "Dina", "Dina"], ندى: ["Nada", "Nada", "Nada"], سلمى: ["Salma", "Salma", "Salma"],
  ليلى: ["Laila", "Layla", "Layla"], نادية: ["Nadia", "Nadia", "Nadiyah"], أمل: ["Amal", "Amal", "Amal"],
  آية: ["Aya", "Aya", "Aya"], إيمان: ["Eman", "Iman", "Iman"], هبة: ["Heba", "Heba", "Hibah"], هند: ["Hend", "Hind", "Hind"],
  أسماء: ["Asmaa", "Asma", "Asma"], خديجة: ["Khadiga", "Khadija", "Khadijah"], زينب: ["Zeinab", "Zainab", "Zaynab"],
  رقية: ["Roqaya", "Ruqaya", "Ruqayyah"], سمر: ["Samar", "Samar", "Samar"], لينا: ["Lina", "Lina", "Lina"],
  جميلة: ["Gamila", "Jamila", "Jamilah"], رحمة: ["Rahma", "Rahma", "Rahmah"], شيماء: ["Shaimaa", "Shaima", "Shaymaa"],
  علياء: ["Alia", "Alia", "Aliyah"], غادة: ["Ghada", "Ghada", "Ghadah"], وفاء: ["Wafaa", "Wafa", "Wafa"],
  سعاد: ["Souad", "Suad", "Suad"], هاجر: ["Hagar", "Hajar", "Hajar"], حبيبة: ["Habiba", "Habiba", "Habibah"],
  جنى: ["Jana", "Jana", "Jana"], ملك: ["Malak", "Malak", "Malak"], يارا: ["Yara", "Yara", "Yara"],
  لمى: ["Lama", "Lama", "Lama"], رغد: ["Raghad", "Raghad", "Raghad"],
};
const ATTR_RAW: Record<string, V> = {
  الله: ["allah", "ullah", "allah"], الرحمن: ["Rahman", "Rahman", "Rahman"], العزيز: ["Aziz", "Aziz", "Aziz"],
  اللطيف: ["Latif", "Latif", "Latif"], الكريم: ["Karim", "Kareem", "Karim"], الحميد: ["Hamid", "Hameed", "Hamid"],
  السلام: ["Salam", "Salam", "Salam"], الرحيم: ["Rahim", "Raheem", "Rahim"], الفتاح: ["Fattah", "Fattah", "Fattah"],
  الناصر: ["Nasser", "Nasser", "Nasir"], الهادي: ["Hadi", "Hadi", "Hadi"], المجيد: ["Maguid", "Majid", "Majid"],
  الوهاب: ["Wahab", "Wahab", "Wahhab"], الجواد: ["Gawad", "Jawad", "Jawad"], المنعم: ["Moneim", "Munim", "Munim"],
  الحليم: ["Halim", "Haleem", "Halim"], الرازق: ["Razek", "Razzaq", "Razzaq"], الغني: ["Ghani", "Ghani", "Ghani"],
  القادر: ["Kader", "Qader", "Qadir"], الباسط: ["Basset", "Basit", "Basit"], الستار: ["Sattar", "Sattar", "Sattar"],
  الرؤوف: ["Raouf", "Raouf", "Rauf"], الحكيم: ["Hakim", "Hakeem", "Hakim"],
};
const norm = (s: string) => normalizeSearch(s);
const DICT = new Map(Object.entries(RAW).map(([k, v]) => [norm(k), v]));
const ATTR = new Map(Object.entries(ATTR_RAW).map(([k, v]) => [norm(k), v]));
const IDX: Record<Style, number> = { egypt: 0, gulf: 1, formal: 2 };

const CONS: Record<string, string> = {
  ب: "b", ت: "t", ث: "th", ج: "g", ح: "h", خ: "kh", د: "d", ذ: "dh", ر: "r", ز: "z", س: "s", ش: "sh", ص: "s", ض: "d",
  ط: "t", ظ: "z", ع: "a", غ: "gh", ف: "f", ق: "q", ك: "k", ل: "l", م: "m", ن: "n", ه: "h",
};
const isVowelLetter = (c: string) => "اوي".includes(c);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// تحويل تقريبي لأسماء غير موجودة في القاموس
function approx(word: string, style: Style): string {
  const w = norm(word).replace(/[^\u0621-\u064A]/g, "");
  let pre = "";
  let body = w;
  if (body.startsWith("ال") && body.length > 3) { pre = style === "gulf" ? "Al-" : style === "egypt" ? "El-" : "al-"; body = body.slice(2); }
  const ch = Array.from(body);
  let out = "";
  for (let i = 0; i < ch.length; i++) {
    const c = ch[i], prevCons = i > 0 && !isVowelLetter(ch[i - 1]);
    if (c === "ا") out += "a";
    else if (c === "و") out += i === 0 || (i + 1 < ch.length && isVowelLetter(ch[i + 1])) ? "w" : "u";
    else if (c === "ي") out += i === 0 || (i + 1 < ch.length && isVowelLetter(ch[i + 1])) ? "y" : "i";
    else if (c === "ه" && i === ch.length - 1) out += "a";
    else if (c === "ء") out += "";
    else if (CONS[c]) {
      let piece = CONS[c];
      if (c === "ج" && style !== "egypt") piece = "j";
      out += piece;
      const nextCons = i + 1 < ch.length && !isVowelLetter(ch[i + 1]) && ch[i + 1] !== "ء";
      if (!prevCons && nextCons && i + 2 <= ch.length - 1 + 1) out += "a"; // أول حرف في تجمع صامتين
    }
  }
  return pre + cap(out);
}

function abdForm(attrKey: string, style: Style): string {
  const v = ATTR.get(attrKey)!;
  const a = v[IDX[style]];
  if (attrKey === norm("الله")) return style === "formal" ? "Abdullah" : style === "gulf" ? "Abdullah" : "Abdallah";
  return style === "formal" ? `Abd al-${a}` : style === "gulf" ? `Abdul${a.toLowerCase()}` : `Abdel${a.toLowerCase()}`;
}

export interface TranslitResult { text: string; unknown: string[] }

export function transliterate(name: string, style: Style): TranslitResult {
  const tokens = name.trim().split(/\s+/).filter(Boolean);
  const out: string[] = [], unknown: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const nt = norm(tokens[i]);
    const next = tokens[i + 1] ? norm(tokens[i + 1]) : "";
    if (nt === "عبد" && next && (ATTR.has(next) || ATTR.has("ال" + next))) {
      out.push(abdForm(ATTR.has(next) ? next : "ال" + next, style)); i++; continue;
    }
    if (nt.startsWith("عبد") && nt.length > 3 && ATTR.has(nt.slice(3))) { out.push(abdForm(nt.slice(3), style)); continue; }
    const hit = DICT.get(nt);
    if (hit) { out.push(hit[IDX[style]]); continue; }
    unknown.push(tokens[i]);
    out.push(approx(tokens[i], style));
  }
  return { text: out.join(" "), unknown };
}
