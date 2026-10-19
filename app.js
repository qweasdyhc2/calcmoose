// Shared helpers
const $ = (s) => document.querySelector(s);
const usd = (n) => '$' + (Math.round(n * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nf = (n, dp = 2) => (Math.round(n * 10 ** dp) / 10 ** dp).toLocaleString('en-US', { maximumFractionDigits: dp });
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// 'YYYY-MM-DD' → local-midnight Date (avoids time-zone drift)
function d(s) { const [y, m, dd] = s.split('-').map(Number); return new Date(y, m - 1, dd); }
function iso(x) { return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); }
function fmt(x) { return `${WD[x.getDay()]}, ${MO[x.getMonth()]} ${x.getDate()}, ${x.getFullYear()}`; }
function today() { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
function addDays(x, n) { const r = new Date(x); r.setDate(r.getDate() + n); return r; }
function diffDays(a, b) { return Math.round((b - a) / 86400000); }
function num(el) { return parseFloat(String(el.value).replace(/,/g, '')) || 0; }
function plural(n, w) { return `${nf(n)} ${w}${n === 1 ? '' : 's'}`; }
// Thousands separators in .money inputs
document.addEventListener('input', (e) => {
  if (!e.target.classList.contains('money')) return;
  const [i, f] = e.target.value.replace(/[^\d.]/g, '').split('.');
  e.target.value = i ? Number(i).toLocaleString('en-US') + (f !== undefined ? '.' + f.slice(0, 2) : '') : '';
});
document.querySelectorAll('input[type=date][data-today]').forEach((el) => { el.value = iso(today()); });
// Add months, clamping to the target month's last day (Jan 31 + 1 month = Feb 28/29)
function addMonths(x, n) { const y = x.getFullYear(), m = x.getMonth() + n, last = new Date(y, m + 1, 0).getDate(); return new Date(y, m, Math.min(x.getDate(), last)); }
// Full years, months, days from a to b (a <= b)
function ymd(a, b) {
  let t = (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth();
  if (addMonths(a, t) > b) t--;
  return [Math.floor(t / 12), t % 12, diffDays(addMonths(a, t), b)];
}
