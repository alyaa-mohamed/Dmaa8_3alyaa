/* لوّن الدماغ — ٣٠ صفحة تلوين متنوعة: نجوم إسلامية، جنينة، فراشة، سمك، مدينة بالليل، لحاف،
   صبار، بلالين، فانوس رمضان، أهرامات، خلية نحل، مراكب. كل صفحة بتترسم بالكود من رقمها،
   فالصفحة رقم ٥ دايمًا نفس الرسمة. كل حتة ليها رقم (data-s) والألوان بتتحفظ لكل صفحة لوحدها. */
const COLOR_PAGES = 30;

function cRand(seed) { // mulberry32
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const cf = n => +(+n).toFixed(1);
const cPts = a => a.map(p => cf(p[0]) + " " + cf(p[1])).join(" ");

function cDraw(page) {
  const R = cRand(page * 7919 + 101), pick = a => a[Math.floor(R() * a.length)], rr = (a, b) => a + R() * (b - a);
  let id = 0; const out = [];
  const add = (tag, attrs) => out.push(`<${tag} data-s="c${id++}" ${attrs}/>`);
  const line = d => out.push(`<path d="${d}" fill="none"/>`);
  const rect = (x, y, w, h, rx = 0) => add("rect", `x="${cf(x)}" y="${cf(y)}" width="${cf(w)}" height="${cf(h)}"${rx ? ` rx="${cf(rx)}"` : ""}`);
  const poly = pts => add("polygon", `points="${cPts(pts)}"`);
  const circ = (x, y, r) => add("circle", `cx="${cf(x)}" cy="${cf(y)}" r="${cf(r)}"`);
  const ell = (x, y, a, b, rot = 0) => add("ellipse", `cx="${cf(x)}" cy="${cf(y)}" rx="${cf(a)}" ry="${cf(b)}"${rot ? ` transform="rotate(${cf(rot)} ${cf(x)} ${cf(y)})"` : ""}`);
  const path = d => add("path", `d="${d}"`);
  const star = (x, y, r, k = 5, inner = .45, rot = -90) => poly(Array.from({ length: k * 2 }, (_, i) => { const a = (rot + i * 180 / k) * Math.PI / 180, q = i % 2 ? r * inner : r; return [x + q * Math.cos(a), y + q * Math.sin(a)]; }));
  const leaf = (x1, y1, x2, y2, w) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L * w, ny = dx / L * w;
    path(`M${cf(x1)} ${cf(y1)} Q${cf(mx + nx)} ${cf(my + ny)} ${cf(x2)} ${cf(y2)} Q${cf(mx - nx)} ${cf(my - ny)} ${cf(x1)} ${cf(y1)}Z`); };
  const waves = (y0, y1, n, amp) => { // horizontal wavy bands between y0 and y1
    const h = (y1 - y0) / n, ph = R() * 6, xs = [];
    for (let x = -196; x <= 196; x += 28) xs.push(x); if (xs[xs.length - 1] !== 196) xs.push(196);
    const edge = (i) => xs.map(x => [x, i === 0 ? y0 : i === n ? y1 : y0 + i * h + Math.sin(x / 32 + ph + i) * amp]);
    for (let i = 0; i < n; i++) poly(edge(i).concat(edge(i + 1).reverse()));
  };
  const sun = (x, y, r, rays) => { for (let i = 0; i < rays; i++) { const a = i * 2 * Math.PI / rays, b = a + Math.PI / rays * .5, c = a - Math.PI / rays * .5;
      poly([[x + (r + 4) * Math.cos(c), y + (r + 4) * Math.sin(c)], [x + (r * 1.7) * Math.cos(a), y + (r * 1.7) * Math.sin(a)], [x + (r + 4) * Math.cos(b), y + (r + 4) * Math.sin(b)]]); }
    circ(x, y, r); circ(x, y, r * .55); };
  const cloud = (x, y, s) => { circ(x - s * .9, y + s * .15, s * .55); circ(x + s * .9, y + s * .15, s * .55); circ(x - s * .35, y - s * .2, s * .7); circ(x + s * .35, y - s * .25, s * .75); rect(x - s * .9, y + s * .05, s * 1.8, s * .65, s * .3); };
  const flower = (x, y, r, k) => { for (let i = 0; i < k; i++) ell(x + Math.cos(i * 2 * Math.PI / k) * r * .62, y + Math.sin(i * 2 * Math.PI / k) * r * .62, r * .5, r * .26, i * 360 / k); circ(x, y, r * .34); };

  const kinds = [
    // 1 — Islamic eight-point stars
    () => { const n = pick([4, 5, 6]), s = 392 / n;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const x = -196 + s * (i + .5), y = -196 + s * (j + .5);
        rect(x - s / 2, y - s / 2, s, s); [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([a, b]) => poly([[x + a * s / 2, y + b * s / 2], [x + a * s * .2, y + b * s / 2], [x + a * s / 2, y + b * s * .2]]));
        star(x, y, s * .44, 8, .62, 22.5); poly(Array.from({ length: 8 }, (_, k) => [x + s * .22 * Math.cos(k * Math.PI / 4 + Math.PI / 8), y + s * .22 * Math.sin(k * Math.PI / 4 + Math.PI / 8)])); circ(x, y, s * .08); } },
    // 2 — flower garden
    () => { rect(-196, -196, 392, 300); sun(pick([-130, 130]), -130, 28, 12); cloud(pick([60, -60]), -140, 26);
      rect(-196, 104, 392, 92); for (let x = -190; x < 196; x += 24) poly([[x, 104], [x + 8, rr(78, 92)], [x + 16, 104]]);
      const k = 3 + Math.floor(R() * 2), gap = 360 / k;
      for (let i = 0; i < k; i++) { const x = -180 + gap * (i + .5), top = rr(-60, 0), r = rr(30, 42);
        rect(x - 3, top, 6, 104 - top); leaf(x, rr(40, 70), x + 38, rr(20, 45), 12); leaf(x, rr(55, 85), x - 36, rr(35, 60), 11); flower(x, top, r, pick([6, 8, 10])); } },
    // 3 — butterfly
    () => { rect(-196, -196, 392, 392); for (let i = 0; i < 6; i++) flower(pick([-160, 160]) + rr(-20, 20), -160 + i * 64, 16, 6);
      [-1, 1].forEach(sx => { const W = rr(150, 175);
        path(`M${sx * 6} -20 C${sx * 40} -170 ${sx * W} -175 ${sx * (W - 10)} -70 C${sx * (W - 20)} -30 ${sx * 60} -10 ${sx * 6} 0Z`);
        path(`M${sx * 6} 4 C${sx * 70} 10 ${sx * (W - 30)} 40 ${sx * (W - 45)} 110 C${sx * (W - 60)} 160 ${sx * 40} 150 ${sx * 6} 30Z`);
        circ(sx * W * .55, -100, rr(20, 28)); circ(sx * W * .55, -100, 10); circ(sx * W * .3, -55, 12); ell(sx * W * .48, 70, 24, 16, sx * 25); circ(sx * W * .72, -140, 9); circ(sx * W * .62, 112, 8); });
      ell(0, 5, 12, 72); circ(0, -78, 13); line("M-4 -88 C-20 -120 -30 -130 -40 -140"); line("M4 -88 C20 -120 30 -130 40 -140"); circ(-40, -140, 5); circ(40, -140, 5);
      for (let y = -50; y < 60; y += 18) path(`M-11 ${y} Q0 ${y + 6} 11 ${y} L11 ${y + 9} Q0 ${y + 15} -11 ${y + 9}Z`); },
    // 4 — fish under the sea
    () => { waves(-196, 196, 6, 7);
      for (let i = 0; i < 4; i++) { const x = -150 + 60 * i + rr(-10, 10), h = rr(70, 120); leaf(x, 196, x + rr(-20, 20), 196 - h, 14); }
      const fish = (x, y, s, d) => { path(`M${x - d * s} ${y} Q${x} ${y - s * 1.05} ${x + d * s} ${y} Q${x} ${y + s * 1.05} ${x - d * s} ${y}Z`);
        poly([[x - d * s * .9, y], [x - d * s * 1.45, y - s * .45], [x - d * s * 1.35, y], [x - d * s * 1.45, y + s * .45]]);
        path(`M${x - d * s * .2} ${y - s * .5} Q${x} ${y - s * .9} ${x + d * s * .25} ${y - s * .48}Z`);
        path(`M${x - d * s * .35} ${y - s * .42} Q${x - d * s * .15} ${y} ${x - d * s * .35} ${y + s * .42} Q${x - d * s * .5} ${y} ${x - d * s * .35} ${y - s * .42}Z`);
        path(`M${x + d * s * .05} ${y - s * .5} Q${x + d * s * .25} ${y} ${x + d * s * .05} ${y + s * .5} Q${x - d * s * .1} ${y} ${x + d * s * .05} ${y - s * .5}Z`);
        circ(x + d * s * .6, y - s * .1, s * .1); };
      fish(rr(-70, -30), rr(-120, -90), rr(52, 60), 1); fish(rr(50, 90), rr(-10, 20), rr(58, 68), -1); fish(rr(-90, -50), rr(90, 115), rr(40, 46), 1);
      for (let i = 0; i < 7; i++) circ(rr(-180, 180), rr(-185, 60), rr(5, 11)); },
    // 5 — city at night
    () => { rect(-196, -196, 392, 392); const mx = pick([-120, 120]);
      path(`M${mx} -170 A40 40 0 1 0 ${mx} -90 A52 52 0 0 1 ${mx} -170Z`); for (let i = 0; i < 6; i++) star(rr(-180, 180), rr(-185, -70), rr(6, 10));
      let x = -196; while (x < 196) { const w = Math.min(rr(46, 74), 196 - x), h = rr(110, 250), top = 196 - h; rect(x, top, w, h);
        if (R() < .35) poly([[x, top], [x + w / 2, top - rr(20, 40)], [x + w, top]]);
        for (let wy = top + 14; wy < 180; wy += 26) for (let wx = x + 8; wx + 12 < x + w - 4; wx += 18) rect(wx, wy, 11, 15, 2);
        x += w; } },
    // 6 — quilt
    () => { const n = pick([4, 5]), s = 392 / n;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const x = -196 + s * i, y = -196 + s * j, cx = x + s / 2, cy = y + s / 2, m = pick(["heart", "diamond", "tri", "quarter", "ring"]);
        rect(x, y, s, s);
        if (m === "heart") path(`M${cf(cx)} ${cf(cy + s * .3)} C${cf(cx - s * .45)} ${cf(cy)} ${cf(cx - s * .3)} ${cf(cy - s * .35)} ${cf(cx)} ${cf(cy - s * .12)} C${cf(cx + s * .3)} ${cf(cy - s * .35)} ${cf(cx + s * .45)} ${cf(cy)} ${cf(cx)} ${cf(cy + s * .3)}Z`);
        if (m === "diamond") { poly([[cx, y + 6], [x + s - 6, cy], [cx, y + s - 6], [x + 6, cy]]); poly([[cx, cy - s * .2], [cx + s * .2, cy], [cx, cy + s * .2], [cx - s * .2, cy]]); }
        if (m === "tri") { poly([[x, y], [x + s, y], [x, y + s]]); poly([[x + s * .2, y + s * .2], [x + s * .5, y + s * .2], [x + s * .2, y + s * .5]]); }
        if (m === "quarter") [[x, y, 0], [x + s, y, 90], [x + s, y + s, 180], [x, y + s, 270]].forEach(([qx, qy, a]) => { const r = s * .42, a1 = a * Math.PI / 180, a2 = (a + 90) * Math.PI / 180;
          path(`M${cf(qx)} ${cf(qy)} L${cf(qx + r * Math.cos(a1))} ${cf(qy + r * Math.sin(a1))} A${cf(r)} ${cf(r)} 0 0 1 ${cf(qx + r * Math.cos(a2))} ${cf(qy + r * Math.sin(a2))}Z`); });
        if (m === "ring") { circ(cx, cy, s * .36); circ(cx, cy, s * .22); star(cx, cy, s * .14, 5); } } },
    // 7 — cactus shelf
    () => { rect(-196, -196, 392, 392); rect(-150, -190, 300, 150, 10); line("M0 -190 L0 -40 M-150 -115 L150 -115");
      rect(-196, 150, 392, 46); const xs = [-120, 0, 120];
      xs.forEach(x => { const pw = rr(64, 84), ph = rr(56, 70), py = 150 - ph;
        const bh = rr(80, 130), bw = rr(32, 46), by = py - bh;
        rect(x - bw / 2, by, bw, bh + 10, bw / 2);
        if (R() < .75) { rect(x - bw / 2 - 26, by + bh * .35, 22, bh * .4, 11); rect(x - bw / 2 - 10, by + bh * .55, 14, 14); }
        if (R() < .75) { rect(x + bw / 2 + 4, by + bh * .2, 22, bh * .45, 11); rect(x + bw / 2 - 4, by + bh * .45, 14, 14); }
        flower(x, by + 2, 14, 6);
        poly([[x - pw / 2, py], [x + pw / 2, py], [x + pw / 2 - 9, 150], [x - pw / 2 + 9, 150]]); rect(x - pw / 2 - 5, py - 12, pw + 10, 16, 3);
        poly([[x - pw * .2, py + 14], [x, py + 30], [x + pw * .2, py + 14], [x, py + 48]]); }); },
    // 8 — hot-air balloons
    () => { rect(-196, -196, 392, 392); cloud(-110, 120, 34); cloud(120, 150, 28); cloud(rr(-40, 40), -160, 22);
      [[-100, -60, 62], [70, -100, 50], [100, 50, 38]].forEach(([x, y, r]) => { const g = pick([4, 6]), top = y - r, bot = y + r * 1.25;
        for (let i = 0; i < g; i++) { const a = -r + i * 2 * r / g, b = a + 2 * r / g;
          path(`M${cf(x)} ${cf(top)} C${cf(x + a * 1.35)} ${cf(top + r * .2)} ${cf(x + a * 1.2)} ${cf(y + r * .7)} ${cf(x + a * .3)} ${cf(bot)} L${cf(x + b * .3)} ${cf(bot)} C${cf(x + b * 1.2)} ${cf(y + r * .7)} ${cf(x + b * 1.35)} ${cf(top + r * .2)} ${cf(x)} ${cf(top)}Z`); }
        line(`M${cf(x - r * .28)} ${cf(bot)} L${cf(x - r * .22)} ${cf(bot + r * .35)} M${cf(x + r * .28)} ${cf(bot)} L${cf(x + r * .22)} ${cf(bot + r * .35)}`);
        rect(x - r * .26, bot + r * .35, r * .52, r * .32, 3); }); },
    // 9 — Ramadan lantern
    () => { rect(-196, -196, 392, 392); path("M-150 -150 A44 44 0 1 0 -110 -90 A36 36 0 1 1 -150 -150Z"); for (let i = 0; i < 7; i++) star(rr(-60, 180), rr(-185, 180), rr(7, 12));
      const x = rr(-10, 30); line(`M${x} -196 L${x} -150`); circ(x, -138, 12); poly([[x - 26, -110], [x, -128], [x + 26, -110]]); rect(x - 40, -110, 80, 14, 3);
      poly([[x - 40, -96], [x + 40, -96], [x + 70, -40], [x - 70, -40]]); [-1, 0, 1].forEach(k => path(`M${x + k * 30 - 10} -46 L${x + k * 30 - 10} -70 Q${x + k * 30} -86 ${x + k * 30 + 10} -70 L${x + k * 30 + 10} -46Z`));
      [-52, -17, 18].forEach(o => { rect(x + o, -40, 34, 120); path(`M${x + o + 6} 70 L${x + o + 6} -10 Q${x + o + 17} -30 ${x + o + 28} -10 L${x + o + 28} 70Z`); circ(x + o + 17, 20, 7); });
      rect(x - 66, -40, 14, 120); rect(x + 52, -40, 14, 120);
      poly([[x - 70, 80], [x + 70, 80], [x + 40, 130], [x - 40, 130]]); rect(x - 24, 130, 48, 14, 3); poly([[x - 10, 144], [x + 10, 144], [x, 170]]);
      for (let k = -2; k <= 2; k++) circ(x + k * 26, 105, 6); },
    // 10 — pyramids
    () => { rect(-196, -196, 392, 230); sun(pick([-140, 140]), -140, 24, 10); cloud(0, -160, 20);
      const pyr = (x, base, w, h) => { poly([[x - w / 2, base], [x, base - h], [x, base]]); poly([[x, base - h], [x + w / 2, base], [x, base]]);
        for (let k = 1; k < 4; k++) { const y = base - h * k / 4; line(`M${cf(x - w / 2 * (1 - k / 4))} ${cf(y)} L${cf(x)} ${cf(y)}`); } };
      pyr(-100, 70, 200, 170); pyr(70, 70, 230, 210); pyr(160, 70, 110, 90);
      waves(34, 196, 4, 9);
      const px = pick([-160, 165]); rect(px - 5, 40, 10, 110); for (let k = 0; k < 5; k++) leaf(px, 40, px + Math.cos(Math.PI + k * Math.PI / 4) * 58, 40 + Math.sin(Math.PI + k * Math.PI / 4) * 40 + 20, 10); },
    // 11 — honeycomb and bees
    () => { const r = pick([28, 34]), w = Math.sqrt(3) * r;
      for (let row = -1; row * 1.5 * r < 392 + r; row++) for (let col = -1; col * w < 420; col++) { const x = -196 + col * w + (row % 2 ? w / 2 : 0), y = -196 + row * 1.5 * r;
        poly(Array.from({ length: 6 }, (_, k) => [x + r * Math.cos(Math.PI / 6 + k * Math.PI / 3), y + r * Math.sin(Math.PI / 6 + k * Math.PI / 3)]));
        if (R() < .25) poly(Array.from({ length: 6 }, (_, k) => [x + r * .55 * Math.cos(Math.PI / 6 + k * Math.PI / 3), y + r * .55 * Math.sin(Math.PI / 6 + k * Math.PI / 3)])); }
      [[rr(-90, -40), rr(-80, -30), 1], [rr(40, 100), rr(40, 100), -1]].forEach(([x, y, d]) => { ell(x - d * 6, y - 26, 20, 13, -d * 30); ell(x + d * 14, y - 24, 16, 11, d * 25);
        ell(x, y, 38, 24); for (let k = -1; k <= 1; k++) path(`M${x + k * 14 - 4} ${y - 23} Q${x + k * 14 + 4} ${y} ${x + k * 14 - 4} ${y + 23} L${x + k * 14 + 4} ${y + 23} Q${x + k * 14 + 12} ${y} ${x + k * 14 + 4} ${y - 23}Z`);
        circ(x + d * 40, y - 4, 13); circ(x + d * 44, y - 7, 3); poly([[x - d * 38, y - 5], [x - d * 52, y], [x - d * 38, y + 5]]); }); },
    // 12 — sailboats
    () => { rect(-196, -196, 392, 250); sun(pick([-140, 140]), -140, 26, 12); cloud(pick([-40, 60]), -150, 24); waves(54, 196, 5, 8);
      [[-90, 60, 1.1], [90, 90, .85]].forEach(([x, y, s]) => { poly([[x - 80 * s, y], [x + 80 * s, y], [x + 55 * s, y + 34 * s], [x - 55 * s, y + 34 * s]]); rect(x - 3, y - 170 * s, 6, 170 * s);
        const st = pick([3, 4]), top = y - 165 * s, bot = y - 15 * s, wAt = yy => 90 * s * (yy - top) / (bot - top);
        for (let k = 0; k < st; k++) { const ya = top + (bot - top) * k / st, yb = top + (bot - top) * (k + 1) / st;
          poly([[x + 6, ya], [x + 6 + wAt(ya), ya], [x + 6 + wAt(yb), yb], [x + 6, yb]]); }
        poly([[x - 6, y - 150 * s], [x - 6, y - 25 * s], [x - 70 * s, y - 25 * s]]); poly([[x + 3, y - 170 * s], [x + 30 * s, y - 160 * s], [x + 3, y - 150 * s]]);
        for (let k = -1; k <= 1; k++) circ(x + k * 30 * s, y + 16 * s, 6 * s); });
      line("M-40 -100 q10 -10 20 0 q10 -10 20 0"); line("M20 -70 q8 -8 16 0 q8 -8 16 0"); }
  ];
  kinds[(page - 1) % kinds.length]();
  return out.join("");
}

let mPage = 1;
try { mPage = Math.min(COLOR_PAGES, Math.max(1, +localStorage.getItem("alyaa-color-page") || 1)); } catch (e) {}
const mKey = () => "alyaa-colorv2-p" + mPage;
function renderMandala() {
  const svg = $("#colorArt"); if (!svg) return;
  svg.setAttribute("viewBox", "-196 -196 392 392");
  svg.setAttribute("stroke-width", "1.6");
  svg.innerHTML = cDraw(mPage) + `<rect x="-195" y="-195" width="390" height="390" rx="18" fill="none" stroke-width="2.4"/>`;
  let saved = {}; try { saved = JSON.parse(localStorage.getItem(mKey()) || "{}"); } catch (e) {}
  svg.querySelectorAll("[data-s]").forEach(el => el.setAttribute("fill", saved[el.dataset.s] || "#fbf9f6"));
  const lbl = $("#mPageLbl"); if (lbl) lbl.textContent = (lang === "ar" ? `صفحة ${mPage} من ${COLOR_PAGES}` : `Page ${mPage} of ${COLOR_PAGES}`);
  try { localStorage.setItem("alyaa-color-page", mPage); } catch (e) {}
}
function mandalaPaint(el, color) {
  el.setAttribute("fill", color);
  let s = {}; try { s = JSON.parse(localStorage.getItem(mKey()) || "{}"); } catch (e) {}
  s[el.dataset.s] = color; try { localStorage.setItem(mKey(), JSON.stringify(s)); } catch (e) {}
}
function mandalaReset() { try { localStorage.removeItem(mKey()); } catch (e) {} renderMandala(); }
document.addEventListener("click", e => {
  if (e.target.closest("#mPrev")) { mPage = mPage <= 1 ? COLOR_PAGES : mPage - 1; renderMandala(); return; }
  if (e.target.closest("#mNext")) { mPage = mPage >= COLOR_PAGES ? 1 : mPage + 1; renderMandala(); return; }
});
if ($("#lang")) $("#lang").addEventListener("click", () => setTimeout(renderMandala, 0));
renderMandala();
