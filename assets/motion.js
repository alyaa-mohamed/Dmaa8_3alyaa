/* دماغ عليا — الحركة: كارت بيسافر مع السكرول، شغل بيتحرك في 3D، عناصر بتطلع، وأرقام بتعد.
   لو الجهاز عامل "تقليل الحركة" كل ده بيتقفل والموقع بيفضل ثابت ونضيف. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const isRTL = () => document.documentElement.dir === "rtl";
  document.documentElement.classList.toggle("motion", !reduce);
  if (reduce) return;

  /* ---------- 1. reveal on scroll ---------- */
  const RV = ".head, #work-grid .card, .grid:not(.sc-track) .card, .note, .pillar, .job, .course, .steps > li, .diff-grid > *, .panel, .pk, .stat, .trick p, .big-quote, .about-p, .about-q, .markets, .daily, .k-guide-wrap, .cs-gallery img, .cs-gallery figure";
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
  function markReveal() {
    document.querySelectorAll(RV).forEach(el => {
      if (el.dataset.rv || el.closest(".sc-track") || el.closest(".hero")) return;
      el.dataset.rv = "1"; el.classList.add("rv");
      const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty("--rvd", (sib % 6) * 70 + "ms");
      io.observe(el);
    });
  }

  /* ---------- 2. counters ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, m = el.textContent.match(/^(\D*)(\d+)(\D*)$/); if (!m) return;
    const [, pre, num, post] = m, end = +num, t0 = performance.now(), dur = 1300;
    const step = now => { const k = clamp((now - t0) / dur, 0, 1); el.textContent = pre + Math.round(end * ease(k)) + post; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .6 });
  function markCounters() { document.querySelectorAll(".stat b").forEach(b => { if (!b.dataset.cnt) { b.dataset.cnt = "1"; cio.observe(b); } }); }

  /* ---------- 3. tilt on work cards ---------- */
  if (fine) {
    document.addEventListener("pointermove", e => {
      const c = e.target.closest && e.target.closest(".card"); if (!c || c.closest(".sc-track")) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg"); c.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
    });
    document.addEventListener("pointerout", e => { const c = e.target.closest && e.target.closest(".card"); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } });
  }

  /* ---------- 4. pinned work showcase (home) ---------- */
  const sc = document.querySelector(".sc"), track = sc && sc.querySelector(".sc-track"), big = sc && sc.querySelector(".sc-big");
  let scShift = 0;
  const scOff = () => innerWidth < 760;                     // phones: plain cards, one tap opens a project
  function scLayout() {
    if (!sc || !track) return;
    sc.classList.toggle("sc-off", scOff());
    if (scOff()) { sc.style.height = ""; track.style.transform = ""; return; }
    const vw = innerWidth, vh = innerHeight;
    scShift = Math.max(0, track.scrollWidth - vw + Math.min(120, vw * .08));
    sc.style.height = (vh + scShift * .8) + "px";
  }
  function scFrame() {
    if (!sc || !track || scOff()) return;
    const r = sc.getBoundingClientRect(), total = sc.offsetHeight - innerHeight;
    const p = clamp(-r.top / Math.max(1, total), 0, 1), dir = isRTL() ? 1 : -1;
    track.style.transform = `translate3d(${(dir * scShift * p).toFixed(1)}px,0,0)`;
    if (big) big.style.transform = `translate3d(${(-dir * innerWidth * .35 * p).toFixed(1)}px,-50%,0)`;
    const mid = innerWidth / 2;
    track.querySelectorAll(".card").forEach(c => {
      const cr = c.getBoundingClientRect(), d = clamp(((cr.left + cr.width / 2) - mid) / innerWidth, -1, 1), ad = Math.abs(d);
      c.style.setProperty("--sc-ry", (-d * 32).toFixed(2) + "deg");
      c.style.setProperty("--sc-s", (1.06 - ad * .22).toFixed(3));
      c.style.setProperty("--sc-z", (-ad * 160).toFixed(0) + "px");
      c.style.setProperty("--sc-o", (1 - ad * .45).toFixed(3));
    });
    sc.style.setProperty("--sc-p", p.toFixed(3));
  }

  /* ---------- 5. the travelling card ---------- */
  const hero = document.querySelector(".hero"), arch = document.querySelector(".arch-wrap"), nameEl = document.querySelector(".name");
  let tc = null, mx = 0, my = 0, tmx = 0, tmy = 0;
  const tgt = sc || document.querySelector("#work");
  if (hero && arch && tgt) {
    tc = document.createElement("div"); tc.className = "tcard"; tc.setAttribute("aria-hidden", "true");
    tc.innerHTML = `<div class="tc-in"><div class="tc-f"><span class="tc-c">JOKER<i>★</i></span><b>ورقة الحظ</b><small>جوكر دماغ عليا</small><span class="tc-star">★</span><span class="tc-c br">JOKER<i>★</i></span></div><div class="tc-b"><span class="tc-tape"></span><b>دماغ عليا</b><span class="tc-suits"><i>♥</i><i>♦</i><i>♣</i><i>♠</i></span></div></div>`;
    document.body.appendChild(tc);
    if (fine) addEventListener("pointermove", e => { tmx = e.clientX / innerWidth - .5; tmy = e.clientY / innerHeight - .5; });
  }
  function tcFrame() {
    if (!tc) return;
    mx = lerp(mx, tmx, .08); my = lerp(my, tmy, .08);
    const vw = innerWidth, vh = innerHeight, sy = scrollY, small = vw < 760;
    const w = small ? 92 : 150, h = w * 1.4;
    const ar = arch.getBoundingClientRect();
    // start: hanging off the photo arch on desktop; next to the name on phones (so it's on the first screen)
    let ax, ay;
    if (small && nameEl) {
      const nr = nameEl.getBoundingClientRect();
      ax = isRTL() ? Math.max(14, nr.left - w - 8) : Math.min(vw - w - 14, nr.right + 8);
      ay = nr.top + sy + 6;
    } else { ax = isRTL() ? ar.right - w * .55 : ar.left - w * .45; ay = ar.bottom + sy - h * .75; }
    // end: centre of the screen, when the work section is pinned
    const st = tgt.getBoundingClientRect().top + sy;
    const bx = vw / 2 - w / 2, by = st + vh * .5 - h / 2;
    const p = clamp(sy / Math.max(1, st), 0, 1), e = ease(p);
    const total = sc ? sc.offsetHeight - vh : vh * .7, p2 = clamp((sy - st) / Math.max(1, total), 0, 1);
    let x = lerp(ax, bx, e) + Math.sin(p * Math.PI) * (isRTL() ? -1 : 1) * vw * .12;
    let y = lerp(ay, by, p);                                            // linear so it stays on screen the whole way
    if (sy > st && sc) y = st + vh * .5 - h / 2 + (sy - st);
    else if (sy > st) y = st + vh * .5 - h / 2 + (sy - st) * .55;  // ride along while pinned (desktop)
    const s = lerp(1, small ? 1.35 : 1.5, e) * (1 - p2 * .6);
    const tt = performance.now() / 1000, idle = 1 - e;                 // gentle float while it waits in the hero
    y += Math.sin(tt * 1.6) * 7 * idle;
    const ry = p * 540 + mx * 26 + p2 * 180 + Math.sin(tt * .9) * 16 * idle, rx = -my * 18 + Math.sin(p * Math.PI) * 14 + Math.cos(tt * 1.2) * 6 * idle, rz = lerp(-10, 0, e) + mx * 4 + Math.sin(tt * .7) * 3 * idle;
    const o = 1 - clamp((p2 - .08) / .22, 0, 1);
    tc.style.width = w + "px"; tc.style.height = h + "px";
    tc.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(3)})`;
    tc.firstChild.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
    tc.style.opacity = o.toFixed(3); tc.style.visibility = o <= 0 ? "hidden" : "visible";
  }

  /* ---------- 6. photo parallax in the hero ---------- */
  const archImgBox = document.querySelector(".arch");
  function heroFrame() { if (!archImgBox) return; const y = Math.min(scrollY, innerHeight); archImgBox.style.transform = `translate3d(0,${(y * .08).toFixed(1)}px,0) scale(${(1 + y / innerHeight * .04).toFixed(3)})`; }

  /* ---------- loop ---------- */
  let ticking = false;
  function frame() { scFrame(); tcFrame(); heroFrame(); ticking = false; }
  function loop() { tcFrame(); requestAnimationFrame(loop); }            // smooth mouse follow for the card
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener("resize", () => { scLayout(); frame(); });
  function boot() { markReveal(); markCounters(); scLayout(); frame(); }
  new MutationObserver(() => { clearTimeout(boot.t); boot.t = setTimeout(() => { markReveal(); markCounters(); scLayout(); scFrame(); }, 60); }).observe(document.body, { childList: true, subtree: true });
  if (document.readyState === "complete") boot(); else addEventListener("load", boot);
  setTimeout(boot, 50);
  if (tc) requestAnimationFrame(loop);

  /* Home work panels: the one underneath eases back as the next slides over it */
  let wkTick = false;
  const wkStack = () => {
    wkTick = false;
    const wks = document.querySelectorAll(".wk"); if (!wks.length || innerWidth <= 900) return;
    wks.forEach((el, i) => {
      const nx = wks[i + 1]; if (!nx) return;
      const a = el.getBoundingClientRect(), b = nx.getBoundingClientRect();
      const p = clamp(1 - (b.top - a.top) / a.height, 0, 1);
      el.style.setProperty("--wk-s", (1 - p * .06).toFixed(4));
      el.style.setProperty("--wk-b", (1 - p * .45).toFixed(3));
    });
  };
  addEventListener("scroll", () => { if (!wkTick) { wkTick = true; requestAnimationFrame(wkStack); } }, { passive: true });
  addEventListener("resize", wkStack);

  /* ---------- 7. playful extras: floating suits, magnetic buttons, marker underline, card-confetti ---------- */
  const SUITS = ["♠", "♥", "♦", "♣", "★", "?"];
  const COLS = ["var(--pink)", "var(--orange)", "var(--lilac)", "var(--purple)"];
  document.querySelectorAll(".hero, .page-head").forEach(h => {
    if (h.querySelector(".suits")) return;
    const box = document.createElement("div"); box.className = "suits"; box.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 7; i++) {
      const s = document.createElement("span"); s.textContent = SUITS[i % SUITS.length];
      s.style.cssText = `--l:${(8 + i * 13 + Math.random() * 6).toFixed(1)}%;--t:${(14 + Math.random() * 70).toFixed(1)}%;--s:${(18 + Math.random() * 26).toFixed(0)}px;--d:${(7 + Math.random() * 6).toFixed(1)}s;--dl:${(-Math.random() * 8).toFixed(1)}s;--c:${COLS[i % 4]};--z:${(.4 + Math.random() * .8).toFixed(2)}`;
      box.appendChild(s);
    }
    h.prepend(box);
  });
  if (fine) {
    let mx = 0, my = 0, suitTick = false;
    addEventListener("pointermove", e => {
      mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
      if (!suitTick) { suitTick = true; requestAnimationFrame(() => { document.documentElement.style.setProperty("--mx", mx.toFixed(3)); document.documentElement.style.setProperty("--my", my.toFixed(3)); suitTick = false; }); }
    }, { passive: true });
    document.addEventListener("pointermove", e => {
      const b = e.target.closest && e.target.closest(".btn"); if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.translate = `${((e.clientX - r.left) / r.width - .5) * 10}px ${((e.clientY - r.top) / r.height - .5) * 8}px`;
    });
    document.addEventListener("pointerout", e => { const b = e.target.closest && e.target.closest(".btn"); if (b && !b.contains(e.relatedTarget)) b.style.translate = ""; });
  }
  const hio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("drawn"); hio.unobserve(e.target); } }), { threshold: .6 });
  document.querySelectorAll("main .h2").forEach(h => { h.classList.add("mk"); hio.observe(h); });
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest(".btn-hot, #topCard, .kstage, .stk");
    if (!t) return;
    for (let i = 0; i < 9; i++) {
      const p = document.createElement("span"); p.className = "confetto"; p.textContent = SUITS[i % 5];
      const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 70;
      p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${(Math.cos(a) * d).toFixed(0)}px;--dy:${(Math.sin(a) * d - 30).toFixed(0)}px;--rot:${(Math.random() * 360 - 180).toFixed(0)}deg;color:${COLS[i % 4]}`;
      document.body.appendChild(p); setTimeout(() => p.remove(), 900);
    }
  });
})();
