/* دماغ عليا — site script (shared by every page) */
let lang = "en";
try { lang = localStorage.getItem("alyaa-lang") || "en"; } catch (e) {}
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const t = k => (T[lang] && T[lang][k]) || T.en[k] || k;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const PAGE = document.body.dataset.page;
const pad = n => String(n).padStart(2, "0");
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const coverSrc = p => "assets/img/covers/" + p.id + ".webp";
const imgFallback = `onerror="imgFail(this)"`;
function imgFail(img) {
  if (img.src.includes("/808/")) { img.src = img.src.replace("/808/", "/404/"); return; }
  const box = img.parentNode; if (box) box.classList.add("noimg"); img.remove();
}

/* ---------- shared ---------- */
function applyStatic() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  const lb = $("#lang");
  if (lb) { lb.textContent = lang === "ar" ? "EN" : "ع"; lb.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية"); }
  if ($("#n1")) { $("#n1").textContent = lang === "ar" ? "علياء" : "Alyaa"; $("#n2").innerHTML = (lang === "ar" ? "محمد" : "Mohamed") + '<span class="dot">.</span>'; }
  $$("[data-t]").forEach(el => { const v = t(el.dataset.t); if (el.hasAttribute("data-html")) el.innerHTML = v; else el.textContent = v; });
  $$("[data-tp]").forEach(el => el.setAttribute("placeholder", t(el.dataset.tp)));
  const ttl = document.body.dataset.title;
  document.title = (ttl ? t(ttl) + " — " : "") + (lang === "ar" ? "علياء محمد" : "Alyaa Mohamed");
}
function renderMarquee() {
  if (!$("#track")) return;
  const items = MARQUEE[lang].map(m => `<span>${esc(m)}</span>`).join("");
  $("#track").innerHTML = items.repeat(4);
}
function cardHTML(p, big) {
  const L = p[lang];
  return `<a class="card ${big ? "big" : ""}" href="${esc(p.behance)}" target="_blank" rel="noopener">
    <div class="img" data-ph="${esc(L.t)}"><img class="bgb" src="${coverSrc(p, big)}" alt="" aria-hidden="true" loading="lazy"><img class="fg" src="${coverSrc(p, big)}" alt="${esc(L.t)}" loading="lazy" ${imgFallback}><span class="badge arrow">↗</span></div>
    <div class="meta"><h3 dir="auto">${esc(L.t)}</h3><p>${esc(p.del ? p.del[lang].join(" / ") : t("cat." + p.cat) + " / " + L.sec)}</p></div></a>`;
}

/* ---------- home ---------- */
const FEATURED = ["arena","budgetly","jadayil-gold","hadota","arib","jadayil-profile","saudi-national-day","maad-gate","arib-home-finance"];
function renderHome() {
  if (!$("#featured")) return;
  $("#featured").innerHTML = FEATURED.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean).map(p => cardHTML(p, false)).join("");
  const c = $(".wk-count"); if (c) c.textContent = lang === "ar" ? PROJECTS.length.toLocaleString("ar-EG") : PROJECTS.length;
}
function buildHero() {
  if (!$("#arch") || $(".portrait")) return;
  $("#arch").classList.add("p-bg");
  $("#arch").insertAdjacentHTML("afterend", `<img class="portrait" src="assets/img/alyaa-portrait.webp" alt="Alyaa Mohamed" width="978" height="1150">`);
}

/* ---------- work ---------- */
let filter = "all";
function renderWork() {
  if (!$("#grid")) return;
  const cats = ["all", "identity", "campaign", "social", "print"];
  $("#filters").innerHTML = cats.map(c => {
    const n = c === "all" ? PROJECTS.length : PROJECTS.filter(p => p.cat === c).length;
    return `<button class="chip" data-f="${c}" aria-pressed="${filter === c}">${esc(t("f." + c))}<sup>${n}</sup></button>`;
  }).join("");
  const list = PROJECTS.filter(p => filter === "all" || p.cat === filter);
  $("#grid").innerHTML = list.map((p, i) => cardHTML(p, filter === "all" ? p.big : i < 2)).join("");
}

/* ---------- project ---------- */
function renderProject() {
  if (!$("#csTitle")) return;
  const id = decodeURIComponent(location.hash.slice(1)) || new URLSearchParams(location.search).get("p") || location.pathname.split("/").filter(Boolean).pop();
  const i = PROJECTS.findIndex(p => p.id === id);
  if (i < 0) { location.replace("work.html"); return; }
  if (i < 0) { $("#csTitle").textContent = t("proj.missing"); $("#csGallery").innerHTML = ""; $(".cs-info").hidden = true; $(".cs-next").hidden = true; return; }
  if (PROJECTS[i].behance) { location.replace(PROJECTS[i].behance); return; }   // projects now live on Behance
  const p = PROJECTS[i], L = p[lang], next = PROJECTS[(i + 1) % PROJECTS.length];
  document.title = L.t + " — " + (lang === "ar" ? "علياء محمد" : "Alyaa Mohamed");
  $("#csTitle").textContent = L.t;
  $("#csAlt").textContent = L.alt;
  $("#csDesc").textContent = L.d;
  $("#csCount").textContent = `${pad(i + 1)} / ${pad(PROJECTS.length)}`;
  $("#csDl").innerHTML = (p.client ? `<dt>${t("cs.client")}</dt><dd>${esc(p.client)}</dd>` : "") +
    `<dt>${t("cs.type")}</dt><dd>${esc(t("cat." + p.cat))}</dd><dt>${t("cs.sector")}</dt><dd>${esc(L.sec)}</dd>`;
  $("#csBeh").href = p.behance;
  if (!$("#csGallery").dataset.id || $("#csGallery").dataset.id !== p.id) {
    $("#csGallery").dataset.id = p.id;
    $("#csGallery").innerHTML = `<p class="cs-wait" id="csWait"><span class="die rolling" data-n="3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span data-t="proj.wait">${esc(t("proj.wait"))}</span> <a href="playground.html#play-with" data-t="proj.waitcta">${esc(t("proj.waitcta"))}</a></p>` +
      p.gallery.map((src, k) => `<img src="${src}" alt="${esc(L.t)} — ${k + 1}" loading="${k < 2 ? "eager" : "lazy"}" onload="this.classList.add('ok');galleryTick()" onerror="this.remove();galleryTick()">`).join("");
    galleryLoaded = 0;
  }
  $("#csNext").href = "project.html#" + encodeURIComponent(next.id);
  $("#csNextName").textContent = next[lang].t;
  $("#csNextImg").src = next.cover; $("#csNextImg").onerror = function(){ imgFail(this); };
  window.scrollTo(0, 0);
}

let galleryLoaded = 0;
function galleryTick() { if (++galleryLoaded >= 2) { const w = $("#csWait"); if (w) w.classList.add("done"); } }

/* ---------- services ---------- */
function renderServices() {
  if ($("#svc")) $("#svc").innerHTML = PILLARS.map((s, i) => { const [h, d, items] = s[lang]; return `<div class="pillar"><span class="pl-n">${pad(i + 1)}</span><div class="pl-h"><h3>${esc(h)}</h3><p>${esc(d)}</p></div><ul class="pl-chips">${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`; }).join("");
  if ($("#extra")) $("#extra").innerHTML = "";
  if ($("#sectors")) $("#sectors").innerHTML = `<h4>${esc(t("sectors"))}</h4>` + SECTORS[lang].map(s => `<span class="sector">${esc(s)}</span>`).join("");
  if ($("#steps")) $("#steps").innerHTML = STEPS.map(x => `<li><h3>${esc(x[lang][0])}</h3><p>${esc(x[lang][1])}</p></li>`).join("");
  if ($("#diff")) $("#diff").innerHTML = `<div class="h">${esc(t("diff.m"))}</div><div class="h">${esc(t("diff.b"))}</div>` + DIFF[lang].map(r => `<div class="m">${esc(r[0])}</div><div class="b">${esc(r[1])}</div>`).join("");
}

/* ---------- brain ---------- */
function renderBrain() {
  if ($("#notes")) $("#notes").innerHTML = NOTES.map(n => `<article class="note ${n.cls || ""}"><h3>${esc(n[lang][0])}</h3>${n[lang][1].map(l => `<p>${esc(l)}</p>`).join("")}${n.flags ? `<div class="flags">${n.flags.map(f => `<img src="assets/img/flags/${f[0]}.webp" alt="${esc(lang === "ar" ? f[2] : f[1])}" title="${esc(lang === "ar" ? f[2] : f[1])}" width="42" height="31" loading="lazy">`).join("")}</div>` : ""}</article>`).join("");
  const FL = ["eg", "sa", "ae", "ye", "jo", "qa"];
  if ($("#markets")) $("#markets").innerHTML = MARKETS[lang].map((m, i) => `<span><img src="assets/img/flags/${FL[i]}.webp" alt="" width="22" height="16">${esc(m)}</span>`).join("");
}

/* ---------- cv ---------- */
function renderCV() {
  if ($("#jobs")) $("#jobs").innerHTML = JOBS.map((j, i) => {
    const L = j[lang]; const when = j.now ? `${L[2]} — ${t("xp.now")}` : L[2];
    return `<div class="job ${j.now ? "now" : ""}"><span class="n">${pad(i + 1)}</span>
      <div><h3>${esc(j.c)}</h3><p>${esc(L[0])} · ${esc(L[1])}</p>${L[3] ? `<p class="tagline">${esc(L[3])}</p>` : ""}<ul>${L[4].map(b => `<li>${esc(b)}</li>`).join("")}</ul></div><time>${esc(when)}</time></div>`;
  }).join("");
  if ($("#brandWall")) $("#brandWall").innerHTML = TEAMS.map(x => `<span class="team">${esc(x)}</span>`).join("") + BRANDS[lang].map(x => `<span>${esc(x)}</span>`).join("");
  if ($("#learn")) $("#learn").innerHTML = COURSES.map(c => `<div class="course ${c.dip ? "dip" : ""} ${c.edu ? "edu" : ""}"><h3>${esc(c[lang])}</h3><p>${esc(c.by)}</p></div>`).join("");
  if ($("#tools1")) $("#tools1").innerHTML = TOOLS.map(x => `<span>${esc(x)}</span>`).join("");
  if ($("#tools2")) $("#tools2").innerHTML = AI.map(x => `<span>${esc(x)}</span>`).join("");
}

/* ---------- card game (home + playground) ---------- */
let deckId = "brain", deckOrder = [], deckPos = -1, busy = false;
const deck = () => (typeof DECKS !== "undefined" ? DECKS.find(d => d.id === deckId).cards : CARDS);
function shuffle() { deckOrder = deck().map((_, i) => i).sort(() => Math.random() - .5); deckPos = -1; }
function showCard() {
  const cards = deck(), c = cards[deckOrder[deckPos]];
  $("#qText").textContent = c[lang];
  $("#qNum").textContent = pad(deckPos + 1) + " / " + pad(cards.length);
  const msg = (lang === "ar" ? "سؤال من دماغ عليا: " : "From your card game: ") + c[lang] + "\n" + (lang === "ar" ? "إجابتي: " : "My answer: ");
  const a = $("#answer"); a.href = "https://wa.me/201093592555?text=" + encodeURIComponent(msg); a.hidden = false;
  const left = cards.length - deckPos - 1;
  $("#gameCount").textContent = left ? `${left} ${t("game.left")}` : t("game.done");
  $("#draw span").textContent = left ? t("game.next") : t("game.draw");
}
function draw() {
  if (busy) return;
  const card = $("#topCard");
  if (deckPos >= deck().length - 1) shuffle();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!card.classList.contains("turned") || reduce) { deckPos++; showCard(); card.classList.add("turned"); return; }
  busy = true; card.classList.add("out");
  setTimeout(() => {
    card.style.transition = "none"; card.classList.remove("out", "turned"); void card.offsetWidth; card.style.transition = "";
    deckPos++; showCard(); requestAnimationFrame(() => { card.classList.add("turned"); busy = false; });
  }, 460);
}
function renderGame() {
  if (!$("#topCard")) return;
  if ($("#decks") && typeof DECKS !== "undefined")
    $("#decks").innerHTML = DECKS.map(d => `<button class="chip" data-deck="${d.id}" aria-pressed="${d.id === deckId}">${esc(d[lang])}</button>`).join("");
  if (deckPos >= 0) showCard(); else $("#gameCount").textContent = "";
}

/* ---------- playground ---------- */
let sIdx = Math.floor(Math.random() * 3);
function renderSudoku() {
  const box = $("#sudoku"); if (!box) return;
  const P = SUDOKU[sIdx].puzzle;
  box.innerHTML = P.map((v, i) => v
    ? `<span class="sq given" data-i="${i}">${v}</span>`
    : `<input class="sq" data-i="${i}" inputmode="numeric" maxlength="1" aria-label="${i + 1}" value="">`).join("");
  $("#sudokuMsg").textContent = "";
}
function sudokuValues() { return $$("#sudoku .sq").map(el => +(el.value || el.textContent) || 0); }
function sudokuOK(g) {
  if (g.includes(0)) return false;
  const ok = a => new Set(a).size === 4;
  for (let i = 0; i < 4; i++) { if (!ok(g.slice(i * 4, i * 4 + 4)) || !ok([0,1,2,3].map(r => g[r * 4 + i]))) return false; }
  for (const [r, c] of [[0,0],[0,2],[2,0],[2,2]]) { if (!ok([g[r*4+c], g[r*4+c+1], g[(r+1)*4+c], g[(r+1)*4+c+1]])) return false; }
  return true;
}

let paint = "#fe6bc7";
const PAINTS = ["#fe6bc7","#ffb3df","#9e82fe","#c6b5fe","#fe7919","#ffc28f","#ffe27a","#3fbf9b","#a8e6cf","#7cc4ff","#fae8dc","#1a1917","#fbf9f6"];
function renderColor() {
  if (!$("#palette")) return;
  $("#palette").innerHTML = PAINTS.map(c => `<button class="swatch" data-c="${c}" style="--c:${c}" aria-label="${c}" aria-pressed="${c === paint}"></button>`).join("");

}
function renderDesignNotes() {
  if (!$("#dnotes")) return;
  $("#dnotes").innerHTML = DESIGN_NOTES.map((n, i) => `<button class="dn" aria-pressed="false"><span class="dn-in"><span class="dn-f"><small>${pad(i + 1)}</small><b>${esc(n.k)}</b></span><span class="dn-b" dir="auto">${esc(n[lang])}</span></span></button>`).join("");
}
let listId = "places";
function recWaLink() {
  const r = RECS.find(l => l.id === listId), txt = ($("#listText") || {}).value || "", nm = ($("#recName") || {}).value || "";
  return "https://wa.me/201093592555?text=" + encodeURIComponent(`${t("rec.msg")}\n${r[lang]}:\n${txt}${nm ? "\n— " + nm : ""}`);
}
function renderLists() {
  if (!$("#listTabs")) return;
  const r = RECS.find(l => l.id === listId);
  $("#listTabs").innerHTML = RECS.map(l => `<button class="chip" type="button" data-list="${l.id}" aria-pressed="${l.id === listId}">${esc(l[lang])}</button>`).join("");
  $("#recQ").textContent = lang === "ar" ? "رشّحلي " + r.ar : "Recommend me " + r.en.charAt(0).toLowerCase() + r.en.slice(1);
  $("#recTopic").value = r.en;
  const ta = $("#listText"); ta.value = store.get("alyaa-rec-" + listId, ""); ta.placeholder = t("rec.ph");
  $("#recName").placeholder = t("rec.name");
  const picks = picksFor(listId);
  $("#myPicks").innerHTML = `<p class="mp-h">${esc(t("rec.mine"))}</p>` + (listId === "happy" && dailyList().length
    ? `<a class="mp-go" href="#picksShelf">${esc(t("rec.go"))}</a>` : picks.length
    ? `<a class="mp-go" href="#picksShelf">${picks.length} ${esc(t("rec.count"))}</a>` : `<p class="mp-soon">${esc(t("rec.soon"))}</p>`);
  renderShelf();
}
let pickGroup = "";
// places only show when they have photos
function picksFor(id) {
  const all = (typeof PICKS !== "undefined" && PICKS[id]) || [];
  return id === "places" ? all.filter(p => p.img && p.img.length) : all;
}
function dailyList() { return typeof DAILY !== "undefined" ? DAILY : []; }
let dailyPick = -1;
function renderDaily(box) {
  const d = dailyList(), now = new Date();
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 864e5);
  const idx = dailyPick >= 0 ? dailyPick : day % d.length;
  const date = now.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { weekday: "long", day: "numeric", month: "long" });
  box.innerHTML = `<div class="daily"><p class="daily-h">${esc(t("rec.today"))} <span>${esc(date)}</span></p>
    <blockquote class="daily-q" dir="rtl">${esc(d[idx])}</blockquote>
    <div class="daily-f"><button class="btn btn-ghost" type="button" id="dailyMore">${esc(t("rec.another"))}</button><small>${esc(t("rec.tomorrow"))}</small></div></div>`;
}
function renderShelf() {
  const box = $("#picksShelf"); if (!box) return;
  if (listId === "happy" && dailyList().length) { renderDaily(box); return; }
  const picks = picksFor(listId);
  const watch = (typeof WATCHLIST !== "undefined" && WATCHLIST[listId]) || [];
  if (!picks.length) { box.innerHTML = ""; return; }
  const flat = listId === "places";
  const groups = flat ? [] : [...new Set(picks.map(p => p.g))];
  if (pickGroup && !groups.includes(pickGroup)) pickGroup = "";
  let shown = pickGroup ? picks.filter(p => p.g === pickGroup) : picks;
  if (flat) shown = [...shown].sort((a, b) => (b.img || []).length - (a.img || []).length);
  box.dataset.g = pickGroup ? "1" : "";
  box.innerHTML = `<div class="shelf-head"><h3>${esc(t("rec.mine"))} <span>${picks.length}</span></h3>
    ${flat ? "" : `<div class="filters">${["", ...groups].map(g => `<button class="chip" type="button" data-pg="${esc(g)}" aria-pressed="${g === pickGroup}">${esc(g || t("rec.all"))}</button>`).join("")}</div>`}</div>
    <div class="pk-grid" dir="rtl">${shown.map(p => `<details class="pk"><summary>${p.img && p.img.length ? `<div class="pk-gal"${p.img.length > 1 ? ` data-n="📸 ${p.img.length}"` : ""}>${p.img.slice(0,6).map(u => `<img src="${esc(u)}" alt="${esc(p.t)}" loading="lazy">`).join("")}</div>` : ""}<b>${esc(p.t)}</b>${p.by && !flat ? `<small>${esc(p.by)}</small>` : ""}${flat ? "" : `<i class="pk-g">${esc(p.g)}</i>`}</summary><p>${esc(p.s)}</p>${p.i ? `<p class="pk-i">💡 ${esc(p.i)}</p>` : ""}${listId === "music" ? `<a class="pk-yt" target="_blank" rel="noopener" href="${esc(p.yt ? "https://www.youtube.com/watch?v=" + p.yt : "https://www.youtube.com/results?search_query=" + encodeURIComponent(p.t + " " + p.by))}">▶ ${esc(t("rec.listen"))}</a>` : ""}</details>`).join("")}</div>
    ${watch.length ? `<div class="watch"><p class="mp-h">${esc(t("rec.watch"))}</p><div class="watch-row">${watch.map(w => `<span>${esc(w)}</span>`).join("")}</div></div>` : ""}`;
}
function sendRec(e) {
  e.preventDefault();
  const msg = $("#listSaved");
  if (!$("#listText").value.trim()) { msg.textContent = t("rec.empty"); $("#listText").focus(); return; }
  window.open(recWaLink(), "_blank", "noopener");
  msg.textContent = t("rec.sent"); store.set("alyaa-rec-" + listId, "");
}

/* stickers: drawn on canvas with the site fonts, exported as transparent PNGs */
const STK_SIZE = 600;
const stkCache = [];
let stkCat = "all";
function stkPath(shape) {
  const p = new Path2D(), S = STK_SIZE, c = S / 2;
  if (shape === "circle") p.arc(c, c, 255, 0, Math.PI * 2);
  else if (shape === "square") p.roundRect(55, 55, 490, 490, 90);
  else if (shape === "pill") p.roundRect(30, 165, 540, 270, 135);
  else if (shape === "arch") { p.moveTo(75, 515); p.quadraticCurveTo(75, 555, 115, 555); p.lineTo(485, 555); p.quadraticCurveTo(525, 555, 525, 515); p.lineTo(525, 300); p.arc(300, 300, 225, 0, Math.PI, true); p.closePath(); }
  else if (shape === "bubble") { p.roundRect(50, 60, 500, 370, 110); p.moveTo(140, 400); p.lineTo(105, 545); p.lineTo(250, 420); p.closePath(); }
  else if (shape === "ticket") { p.moveTo(80, 150); p.lineTo(520, 150); p.quadraticCurveTo(560, 150, 560, 190); p.lineTo(560, 255); p.arc(560, 300, 45, -Math.PI / 2, Math.PI / 2, true); p.lineTo(560, 410); p.quadraticCurveTo(560, 450, 520, 450); p.lineTo(80, 450); p.quadraticCurveTo(40, 450, 40, 410); p.lineTo(40, 345); p.arc(40, 300, 45, Math.PI / 2, -Math.PI / 2, true); p.lineTo(40, 190); p.quadraticCurveTo(40, 150, 80, 150); p.closePath(); }
  else if (shape === "star") { for (let i = 0; i <= 32; i++) { const a = -Math.PI / 2 + i * Math.PI / 16, r = i % 2 ? 228 : 268; const x = c + r * Math.cos(a), y = c + r * Math.sin(a); i ? p.lineTo(x, y) : p.moveTo(x, y); } p.closePath(); }
  else if (shape === "heart") { p.moveTo(300, 540); p.bezierCurveTo(130, 430, 40, 330, 50, 210); p.bezierCurveTo(60, 100, 160, 55, 230, 75); p.bezierCurveTo(265, 85, 290, 110, 300, 135); p.bezierCurveTo(310, 110, 335, 85, 370, 75); p.bezierCurveTo(440, 55, 540, 100, 550, 210); p.bezierCurveTo(560, 330, 470, 430, 300, 540); p.closePath(); }
  else { for (let i = 0; i <= 360; i++) { const a = i * Math.PI / 180, r = 228 + 34 * Math.cos(8 * a); const x = c + r * Math.cos(a - Math.PI / 2), y = c + r * Math.sin(a - Math.PI / 2); i ? p.lineTo(x, y) : p.moveTo(x, y); } p.closePath(); }
  return p;
}
function spark(x, cx, cy, r, col) {
  x.save(); x.fillStyle = col; x.beginPath();
  x.moveTo(cx, cy - r); x.quadraticCurveTo(cx, cy, cx + r, cy); x.quadraticCurveTo(cx, cy, cx, cy + r); x.quadraticCurveTo(cx, cy, cx - r, cy); x.quadraticCurveTo(cx, cy, cx, cy - r);
  x.fill(); x.restore();
}
function drawIcon(x, name, cx, cy, s, fg, ac) {
  x.save(); x.lineCap = "round"; x.lineJoin = "round"; x.strokeStyle = fg; x.fillStyle = fg; x.lineWidth = s * .09;
  const h = s / 2;
  if (name === "xo") {
    x.beginPath(); [-1, 1].forEach(k => { x.moveTo(cx + k * s / 6, cy - h); x.lineTo(cx + k * s / 6, cy + h); x.moveTo(cx - h, cy + k * s / 6); x.lineTo(cx + h, cy + k * s / 6); }); x.stroke();
    x.strokeStyle = ac; x.lineWidth = s * .1; const q = s / 3, m = q * .28;
    x.beginPath(); x.moveTo(cx - q - m, cy - q - m); x.lineTo(cx - q + m, cy - q + m); x.moveTo(cx - q + m, cy - q - m); x.lineTo(cx - q - m, cy - q + m); x.stroke();
    x.beginPath(); x.arc(cx, cy, m * 1.05, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.moveTo(cx + q - m, cy + q - m); x.lineTo(cx + q + m, cy + q + m); x.moveTo(cx + q + m, cy + q - m); x.lineTo(cx + q - m, cy + q + m); x.stroke();
  } else if (name === "dice") {
    x.fillStyle = "#fbf9f6"; x.beginPath(); x.roundRect(cx - h, cy - h, s, s, s * .2); x.fill(); x.lineWidth = s * .07; x.stroke();
    x.fillStyle = fg; [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]].forEach(([a, b]) => { x.beginPath(); x.arc(cx + a * s * .25, cy + b * s * .25, s * .085, 0, Math.PI * 2); x.fill(); });
  } else if (name === "heart") {
    x.fillStyle = ac; x.beginPath(); x.moveTo(cx, cy + h * .9); x.bezierCurveTo(cx - s * .9, cy + h * .1, cx - s * .45, cy - h * 1.2, cx, cy - h * .35); x.bezierCurveTo(cx + s * .45, cy - h * 1.2, cx + s * .9, cy + h * .1, cx, cy + h * .9); x.fill();
  } else if (name === "sun") {
    x.fillStyle = "#fbf9f6"; x.beginPath(); x.arc(cx, cy, s * .26, 0, Math.PI * 2); x.fill(); x.lineWidth = s * .06; x.stroke();
    x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; x.moveTo(cx + Math.cos(a) * s * .36, cy + Math.sin(a) * s * .36); x.lineTo(cx + Math.cos(a) * s * .5, cy + Math.sin(a) * s * .5); } x.stroke();
  } else if (name === "smile") {
    x.lineWidth = s * .07; x.beginPath(); x.arc(cx, cy, h * .9, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.arc(cx - s * .16, cy - s * .1, s * .05, 0, Math.PI * 2); x.arc(cx + s * .16, cy - s * .1, s * .05, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(cx, cy + s * .02, s * .22, .15 * Math.PI, .85 * Math.PI); x.stroke();
  } else if (name === "cursor") {
    x.fillStyle = "#fbf9f6"; x.beginPath(); x.moveTo(cx - h * .6, cy - h); x.lineTo(cx + h * .7, cy + h * .25); x.lineTo(cx + h * .05, cy + h * .3); x.lineTo(cx + h * .45, cy + h); x.lineTo(cx + h * .2, cy + h * 1.08); x.lineTo(cx - h * .18, cy + h * .4); x.lineTo(cx - h * .6, cy + h * .75); x.closePath(); x.fill(); x.lineWidth = s * .06; x.stroke();
  } else if (name === "cards") {
    [[-.18, -10, ac], [.16, 8, "#fbf9f6"]].forEach(([dx, deg, col]) => { x.save(); x.translate(cx + dx * s, cy); x.rotate(deg * Math.PI / 180); x.fillStyle = col; x.beginPath(); x.roundRect(-s * .27, -h * .9, s * .54, s * .9, s * .08); x.fill(); x.lineWidth = s * .05; x.stroke(); x.restore(); });
    x.font = `800 ${s * .35}px "Bricolage Grotesque", sans-serif`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = fg; x.save(); x.translate(cx + .16 * s, cy); x.rotate(8 * Math.PI / 180); x.fillText("?", 0, 0); x.restore();
  } else if (name === "bulb") {
    x.fillStyle = ac; x.beginPath(); x.arc(cx, cy - s * .1, s * .3, Math.PI * .8, Math.PI * 2.2); x.lineTo(cx + s * .13, cy + s * .3); x.lineTo(cx - s * .13, cy + s * .3); x.closePath(); x.fill(); x.lineWidth = s * .06; x.stroke();
    x.beginPath(); x.moveTo(cx - s * .12, cy + s * .42); x.lineTo(cx + s * .12, cy + s * .42); x.stroke();
  } else if (name === "pencil") {
    x.save(); x.translate(cx, cy); x.rotate(-Math.PI / 4); x.fillStyle = ac; x.beginPath(); x.roundRect(-s * .12, -h, s * .24, s * .78, 4); x.fill(); x.lineWidth = s * .06; x.stroke();
    x.fillStyle = "#fbf9f6"; x.beginPath(); x.moveTo(-s * .12, h * .56); x.lineTo(s * .12, h * .56); x.lineTo(0, h); x.closePath(); x.fill(); x.stroke(); x.restore();
  } else if (name === "star") {
    x.fillStyle = ac; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? s * .22 : s * .5, a = -Math.PI / 2 + i * Math.PI / 5; x.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a)); } x.closePath(); x.fill(); x.lineWidth = s * .05; x.stroke();
  } else if (name === "spark") { spark(x, cx, cy, h, ac); spark(x, cx + s * .45, cy - s * .35, h * .35, ac); }
  x.restore();
}
function drawSticker(st) {
  const cv = document.createElement("canvas"); cv.width = cv.height = STK_SIZE;
  const x = cv.getContext("2d"), path = stkPath(st.shape), ac = st.ac || "#fbf9f6";
  x.save(); x.shadowColor = "rgba(0,0,0,.28)"; x.shadowBlur = 20; x.shadowOffsetY = 9;
  x.lineJoin = "round"; x.lineWidth = 36; x.strokeStyle = "#ffffff"; x.stroke(path); x.restore();
  x.lineJoin = "round"; x.lineWidth = 36; x.strokeStyle = "#ffffff"; x.stroke(path);
  x.fillStyle = st.bg; x.fill(path);
  // soft shine
  x.save(); x.clip(path); const g = x.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, "rgba(255,255,255,.18)"); g.addColorStop(.5, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, 600, 600); x.restore();
  if (/^#f[0-9a-f]{5}$/i.test(st.bg)) { x.lineWidth = 4; x.strokeStyle = "#1a1917"; x.stroke(path); }
  if (st.ring) { x.save(); x.translate(300, 300); x.scale(.88, .88); x.translate(-300, -300); x.setLineDash([2, 22]); x.lineCap = "round"; x.lineWidth = 11; x.strokeStyle = ac; x.stroke(path); x.restore(); }
  const lines = st.t.split("\n");
  let box = {circle:[390,300], square:[400,330], arch:[380,250], star:[380,290], flower:[370,290], bubble:[420,250], pill:[450,200], ticket:[440,220], heart:[330,230]}[st.shape] || [380,280];
  let cy = st.shape === "bubble" ? 245 : st.shape === "arch" ? 385 : st.shape === "heart" ? 285 : 300;
  if (st.icon) {
    const wide = st.shape === "pill" || st.shape === "ticket";
    if (wide) { drawIcon(x, st.icon, 120, 300, 110, st.fg, ac); box = [box[0] - 150, box[1]]; }
    else { const is = st.shape === "arch" ? 80 : 88; const iy = st.shape === "arch" ? 215 : st.shape === "bubble" ? 140 : cy - 118; drawIcon(x, st.icon, 300, iy, is, st.fg, ac); cy = st.shape === "arch" ? 410 : st.shape === "bubble" ? 290 : cy + 50; box = [box[0], box[1] * .68]; }
  }
  const isAr = l => /[؀-ۿ]/.test(l);
  const fontFor = (l, px) => isAr(l) ? `700 ${px}px Marhey, sans-serif` : `800 ${px}px "Bricolage Grotesque", sans-serif`;
  const cap = Math.min(190, box[1] / lines.length / 1.08);
  const sizes = lines.map(l => { let px = cap; for (; px > 18; px -= 2) { x.font = fontFor(l, px); if (x.measureText(l).width <= box[0]) break; } return px; });
  const total = sizes.reduce((a, b) => a + b * 1.08, 0);
  const cx = st.icon && (st.shape === "pill" || st.shape === "ticket") ? 360 : 300;
  let y = cy - total / 2;
  x.fillStyle = st.fg; x.textAlign = "center"; x.textBaseline = "middle";
  lines.forEach((l, i) => { const h = sizes[i] * 1.08; x.font = fontFor(l, sizes[i]); x.direction = isAr(l) ? "rtl" : "ltr"; x.fillText(l, cx, y + h / 2 + (isAr(l) ? sizes[i] * .06 : 0)); y += h; });
  // little sparkles for joy
  if (!st.icon && !st.ring) { spark(x, 470, 150, 22, ac); spark(x, 135, 455, 15, ac); }
  return cv;
}
const stkName = i => `damagh-alya-sticker-${pad(i + 1)}.png`;
function downloadBlob(blob, name) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
async function renderAdStickers() {
  const box = $("#adStk"); if (!box || box.dataset.done) return; box.dataset.done = 1;
  try { await Promise.race([Promise.all([document.fonts.load('700 60px Marhey', 'دماغ'), document.fonts.load('800 60px "Bricolage Grotesque"', 'idea')]), new Promise(r => setTimeout(r, 2500))]); } catch (e) {}
  const pickT = ["زهقت؟\nالعب", "دورك!", "game on"];
  box.innerHTML = pickT.map(tt => STICKERS.find(st => st.t === tt)).filter(Boolean).map(st => `<img src="${drawSticker(st).toDataURL("image/png")}" alt="" width="200" height="200">`).join("");
}
async function renderStickers() {
  const box = $("#stickers"); if (!box) return;
  if ($("#stkCats")) $("#stkCats").innerHTML = STICKER_CATS.map(c => { const n = c.id === "all" ? STICKERS.length : STICKERS.filter(s => s.cat === c.id).length; return `<button class="chip" data-stkcat="${c.id}" aria-pressed="${c.id === stkCat}">${esc(c[lang])}<sup>${n}</sup></button>`; }).join("");
  if (!stkCache.length) {
    try { await Promise.race([Promise.all([document.fonts.load('700 60px Marhey', 'دماغ'), document.fonts.load('800 60px "Bricolage Grotesque"', 'idea')]), new Promise(r => setTimeout(r, 2500))]); } catch (e) {}
    STICKERS.forEach(st => stkCache.push(drawSticker(st)));
  }
  box.innerHTML = stkCache.map((cv, i) => STICKERS[i].cat === stkCat || stkCat === "all" ? `<figure class="stk"><img src="${cv.toDataURL("image/png")}" alt="${esc(STICKERS[i].t.replace(/\n/g, " "))}" width="300" height="300"><button class="dl-one" data-stk="${i}" aria-label="${esc(t("play.dl"))} ${i + 1}">↓</button></figure>` : "").join("");
}
async function downloadSticker(i) { stkCache[i].toBlob(b => downloadBlob(b, stkName(i)), "image/png"); }
async function downloadAllStickers(btn) {
  btn.disabled = true;
  const blobs = await Promise.all(stkCache.map(cv => new Promise(r => cv.toBlob(r, "image/png"))));
  if (window.JSZip) {
    const zip = new JSZip(); blobs.forEach((b, i) => zip.file(stkName(i), b));
    downloadBlob(await zip.generateAsync({ type: "blob" }), "damagh-alya-stickers.zip");
  } else { for (let i = 0; i < blobs.length; i++) { downloadBlob(blobs[i], stkName(i)); await new Promise(r => setTimeout(r, 350)); } }
  btn.disabled = false;
}

/* ---------- 🎉 win: "we win together" ---------- */
function showOffer() {
  if (typeof WIN === "undefined") return;
  const O = WIN[lang];
  const wa = "https://wa.me/" + WIN.whatsapp + "?text=" + encodeURIComponent(O.msg);
  let m = $("#offerModal");
  if (!m) { m = document.createElement("div"); m.id = "offerModal"; m.className = "offer-modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); document.body.appendChild(m); }
  m.innerHTML = `<div class="offer-card"><span class="spk s1">✦</span><span class="spk s2">✦</span><span class="spk s3">✦</span>
    <p class="offer-title">${esc(O.title)}</p><p class="offer-body">${esc(O.body)}</p>
    <div class="offer-btns"><a class="btn btn-hot" href="${wa}" target="_blank" rel="noopener">${esc(t("win.cta"))} <span class="arrow">↗</span></a>
    <button class="btn btn-ghost" id="offerClose">${esc(t("win.again"))}</button></div>
    <button class="offer-x" id="offerX" aria-label="✕">✕</button></div>`;
  requestAnimationFrame(() => m.classList.add("open"));
}
function closeOffer() { const m = $("#offerModal"); if (m) { m.classList.remove("open"); setTimeout(() => m.remove(), 350); } }

/* ---------- nav ---------- */
function setupNav() {
  $$(".nav-links a").forEach(a => { if (a.dataset.nav === PAGE) a.setAttribute("aria-current", "page"); });
  const btn = $("#menuBtn"), nav = $(".nav");
  if (btn) btn.addEventListener("click", () => { const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
}

/* ---------- render all ---------- */
function renderAll() {
  applyStatic(); renderMarquee(); renderHome(); renderClients(); renderMotion(); renderWork(); renderProject(); renderServices();
  renderBrain(); renderCV(); renderGame(); renderSudoku(); renderColor(); renderDesignNotes(); renderLists(); renderStickers(); renderAdStickers();
  if ($("#archName")) { $("#archName").textContent = t("hero.badge"); $("#archTop").textContent = t("hero.badgeTop"); }
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const f = e.target.closest("[data-f]"); if (f) { filter = f.dataset.f; renderWork(); return; }
  const d = e.target.closest("[data-deck]"); if (d) { deckId = d.dataset.deck; shuffle(); const c = $("#topCard"); c.classList.remove("turned"); $("#answer").hidden = true; $("#draw span").textContent = t("game.draw"); renderGame(); return; }
  if (e.target.closest("#draw") || e.target.closest("#topCard")) { draw(); return; }
  const sw = e.target.closest(".swatch"); if (sw) { paint = sw.dataset.c; renderColor(); return; }
  const sh = e.target.closest("#colorArt [data-s]"); if (sh) { mandalaPaint(sh, paint); return; }
  if (e.target.closest("#colorReset")) { mandalaReset(); return; }
  if (e.target.closest("#colorSave")) {
    const svg = new XMLSerializer().serializeToString($("#colorArt"));
    const a = document.createElement("a"); a.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); a.download = "damagh-alya-coloring-" + (typeof mPage !== "undefined" ? mPage : 1) + ".svg"; document.body.appendChild(a); a.click(); a.remove(); return;
  }
  const dn = e.target.closest(".dn"); if (dn) { dn.setAttribute("aria-pressed", dn.getAttribute("aria-pressed") !== "true"); return; }
  const li = e.target.closest("[data-list]"); if (li) { listId = li.dataset.list; pickGroup = ""; renderLists(); return; }
  if (e.target.closest("#dailyMore")) { const n = dailyList().length, cur = $(".daily-q") ? dailyList().indexOf($(".daily-q").textContent) : -1; let k; do { k = Math.floor(Math.random() * n); } while (n > 1 && k === cur); dailyPick = k; renderShelf(); return; }
  const pg = e.target.closest("[data-pg]"); if (pg) { pickGroup = pg.dataset.pg; renderShelf(); return; }
  if (e.target.closest("#sudokuCheck")) { const ok = sudokuOK(sudokuValues()); $("#sudokuMsg").textContent = ok ? t("play.ok") : t("play.no"); if (ok) showOffer(); return; }
  if (e.target.closest("#offerClose") || e.target.closest("#offerX") || e.target.id === "offerModal") { closeOffer(); return; }
  const sc = e.target.closest("[data-stkcat]"); if (sc) { stkCat = sc.dataset.stkcat; renderStickers(); return; }
  const sk = e.target.closest("[data-stk]"); if (sk) { downloadSticker(+sk.dataset.stk); return; }
  const sa = e.target.closest("#stkAll"); if (sa) { downloadAllStickers(sa); return; }
  if (e.target.closest("#sudokuNew")) { sIdx = (sIdx + 1) % SUDOKU.length; renderSudoku(); return; }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeOffer(); });
document.addEventListener("input", e => {
  if (e.target.matches("#sudoku input")) {
    e.target.value = e.target.value.replace(/[^1-4]/g, "").slice(0, 1);
    $("#sudokuMsg").textContent = "";
    const v = sudokuValues(); if (!v.includes(0)) { const ok = sudokuOK(v); $("#sudokuMsg").textContent = ok ? t("play.ok") : t("play.no"); if (ok) showOffer(); }
  }
  if (e.target.matches("#listText") || e.target.matches("#recName")) { store.set("alyaa-rec-" + listId, $("#listText").value); $("#listSaved").textContent = ""; }
});
const lb = $("#lang");
if (lb) lb.addEventListener("click", () => { lang = lang === "en" ? "ar" : "en"; store.set("alyaa-lang", lang); renderAll(); });

window.addEventListener("hashchange", () => { if (PAGE === "project") renderProject(); });

/* ---------- joyful loader (first page of a visit) ---------- */
(function loader() {
  let seen = "1"; try { seen = sessionStorage.getItem("alyaa-seen"); } catch (e) {}
  if (seen === "1" || typeof LOADER_QUOTES === "undefined") return;
  const q = LOADER_QUOTES[Math.floor(Math.random() * LOADER_QUOTES.length)][lang];
  const el = document.createElement("div");
  el.className = "loader"; el.setAttribute("role", "status");
  el.innerHTML = `<div class="ld-card"><div class="die rolling" data-n="${1 + Math.floor(Math.random() * 6)}"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><p dir="auto">${esc(q)}</p><span class="ld-mark">دماغ عليا</span></div>`;
  document.body.appendChild(el);
  const t0 = Date.now(); let n = 0;
  const spin = setInterval(() => { const d = el.querySelector(".die"); d.dataset.n = 1 + (n++ % 6); }, 110);
  const done = () => { const left = Math.max(0, 900 - (Date.now() - t0)); setTimeout(() => { clearInterval(spin); el.classList.add("out"); setTimeout(() => el.remove(), 500); }, left); };
  if (document.readyState === "complete") done(); else { window.addEventListener("load", done, { once: true }); setTimeout(done, 2200); }
  try { sessionStorage.setItem("alyaa-seen", "1"); } catch (e) {}
})();

if ($("#recForm")) $("#recForm").addEventListener("submit", sendRec);
setupNav();
buildHero();
shuffle();
if ($("#yr")) $("#yr").textContent = new Date().getFullYear();
renderAll();
requestAnimationFrame(() => setTimeout(() => document.body.classList.add("loaded"), 60));

/* Clients belt: two rows sliding opposite ways; each row repeats once for a seamless loop */
function renderClients(){
  const box = $("#clients-rows"); if (!box || typeof CLIENTS === "undefined") return;
  const tilt = [-3,2,-1.5,3,-2,1.5];
  const tile = (c,k) => `<span class="cl" style="--b:${c.bg};--r:${tilt[k%tilt.length]}deg" title="${esc(c[lang])}"><img src="assets/img/clients/${c.id}.webp" alt="${esc(c[lang])}" loading="lazy" decoding="async"></span>`;
  const half = Math.ceil(CLIENTS.length/2);
  const rows = [CLIENTS.slice(0,half), CLIENTS.slice(half)];
  box.innerHTML = rows.map((r,n) => {
    const set = r.map((c,k)=>tile(c,k+n)).join("");
    return `<div class="cl-row${n?" rev":""}" style="--dur:${r.length*2.4}s"><div class="cl-set" role="list">${set}</div><div class="cl-set" aria-hidden="true">${set}</div></div>`;
  }).join("");
  const lede = $("#clients .lede"); if (lede) lede.textContent = lede.textContent.replace("%s", lang==="ar" ? CLIENTS.length.toLocaleString("ar-EG") : CLIENTS.length);
  clientsBelt(box);
}

/* The belt: two rows sliding in opposite directions. Scrolling speeds them up,
   scrolling back up flips them, hovering a row slows it right down. */
function clientsBelt(box){
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  box.classList.add("live");
  const rows = [...box.querySelectorAll(".cl-row")].map((el,n) => ({el, x:0, dir:n ? 1 : -1, w:0, hover:0, slow:1}));
  const measure = () => rows.forEach(r => { r.w = r.el.firstElementChild.getBoundingClientRect().width; if (r.dir > 0 && !r.x) r.x = -r.w; });
  measure(); addEventListener("resize", measure);
  rows.forEach(r => { r.el.addEventListener("pointerenter", () => r.hover = 1); r.el.addEventListener("pointerleave", () => r.hover = 0); });
  if (window.__belt) cancelAnimationFrame(window.__belt.raf);
  const st = window.__belt = {raf:0, boost:0, sign:1, lastY:scrollY, t:performance.now(), on:true};
  addEventListener("scroll", () => { const dy = scrollY - st.lastY; st.lastY = scrollY; if (dy) { st.sign = dy > 0 ? 1 : -1; st.boost = Math.min(st.boost + Math.abs(dy) * 6, 900); } }, {passive:true});
  new IntersectionObserver(es => st.on = es[0].isIntersecting).observe(box);
  const base = innerWidth < 700 ? 38 : 55;               // px per second
  const tick = now => {
    const dt = Math.min(.05, (now - st.t) / 1000); st.t = now;
    st.boost *= Math.pow(.04, dt);                          // boost fades out in about a second
    if (st.on) rows.forEach(r => {
      if (!r.w) return;
      r.slow += ((r.hover ? .12 : 1) - r.slow) * Math.min(1, dt * 6);
      r.x += r.dir * st.sign * (base + st.boost) * r.slow * dt;
      if (r.x <= -r.w) r.x += r.w; if (r.x > 0) r.x -= r.w;
      r.el.style.transform = `translate3d(${r.x}px,0,0)`;
    });
    st.raf = requestAnimationFrame(tick);
  };
  st.raf = requestAnimationFrame(tick);
}

/* Motion stills — each opens its video on Vimeo */
function renderMotion(){
  const box = $("#motion-grid"); if (!box || typeof MOTION === "undefined") return;
  box.innerHTML = MOTION.map(m => `<a class="mo" href="https://vimeo.com/${m.id}" target="_blank" rel="noopener" aria-label="${esc(m[lang])} — ${esc(t("mo.play"))}">
    <img src="assets/img/motion/${m.id}.webp" alt="" loading="lazy" decoding="async"><span class="play" aria-hidden="true"></span>
    <span class="meta"><span>${esc(m[lang])}</span><small>${m.d}</small></span></a>`).join("");
}
