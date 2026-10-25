export interface YMD { y: number; m: number; d: number }

export const parseISO = (s: string): YMD | null => {
  const [y, m, d] = s.split("-").map(Number);
  return y && m && d ? { y, m, d } : null;
};

export const dayNumber = (x: YMD) => Math.round(Date.UTC(x.y, x.m - 1, x.d) / 86400000);

export const fromDayNumber = (n: number): YMD => {
  const dt = new Date(n * 86400000);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
};

// الفرق بين تاريخين (a <= b) بالسنوات والأشهر والأيام
export function diffYMD(a: YMD, b: YMD): YMD {
  let y = b.y - a.y, m = b.m - a.m, d = b.d - a.d;
  let pm = b.m, py = b.y;
  while (d < 0) {
    m--;
    pm -= 1;
    if (pm === 0) { pm = 12; py--; }
    d += new Date(Date.UTC(py, pm, 0)).getUTCDate();
  }
  if (m < 0) { y--; m += 12; }
  return { y, m, d };
}

export const todayYMD = (): YMD => {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
};

export const isoOf = (x: YMD) => `${x.y}-${String(x.m).padStart(2, "0")}-${String(x.d).padStart(2, "0")}`;
