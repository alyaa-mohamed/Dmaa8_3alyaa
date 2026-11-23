/* دماغ عليا — XO & Ludo, played against "Alyaa" */
const $$g = s => [...document.querySelectorAll(s)];
const GAME_TXT = {
  en: {
    xoStart: ["Your turn — you're X.", "Go on, you start. I'm O 😉"],
    xoThink: ["Hmm… let me think 🤔", "One sec…"],
    xoYou: ["You beat me! 🎉 Fine… next round is mine.", "Whoa, nice move 👏 again?"],
    xoMe: ["Got you 😜 again?", "Sorry, not sorry 😎 rematch?"],
    xoDraw: ["Draw — two good brains 🤝", "Tie! Neither of us gives up 😄"],
    you: "You", me: "Alyaa", draw: "Draw",
    ldStart: "Roll a 6 to bring a token out. Get all 4 home first to win.",
    ldYouRoll: n => `You rolled ${n}.`, ldMeRoll: n => `I rolled ${n}.`,
    ldPick: "Pick a token to move 👆", ldNoMove: "No move this time.",
    ldAgain: "A six! Roll again 🎲", ldMyTurn: "My turn…", ldYourTurn: "Your turn — roll 🎲",
    ldCaptureYou: "Gotcha! Back home you go 😜", ldCaptureMe: "Ouch! You sent me home 😅",
    ldYouWin: "All four home — you won! 🏆", ldMeWin: "All mine are home 😎 rematch?"
  },
  ar: {
    xoStart: ["دورك! انت X 😄", "يلا ابدأ انت… أنا O 😉"],
    xoThink: ["استنى… بفكّر 🤔", "ثانية واحدة…"],
    xoYou: ["كسبتني! 🎉 ماشي… الجولة الجاية بتاعتي", "يا سلام! حركة حلوة 👏 تاني؟"],
    xoMe: ["هاها كسبتك 😜 تاني؟", "معلش… الزهر معايا النهارده 😎"],
    xoDraw: ["تعادل… دماغين عليا 🤝", "تعادل! ولا حد فينا بيستسلم 😄"],
    you: "انت", me: "عليا", draw: "تعادل",
    ldStart: "ارمي 6 علشان تطلّع قرش من البيت. اللي يدخّل الأربعة الأول يكسب.",
    ldYouRoll: n => `جبت ${n}.`, ldMeRoll: n => `أنا جبت ${n}.`,
    ldPick: "اختار القرش اللي هتحركه 👆", ldNoMove: "مفيش حركة المرة دي.",
    ldAgain: "6! ارمي تاني 🎲", ldMyTurn: "دوري…", ldYourTurn: "دورك… ارمي 🎲",
    ldCaptureYou: "اتمسكت! ارجع البيت 😜", ldCaptureMe: "آه! رجّعتني البيت 😅",
    ldYouWin: "دخّلت الأربعة… كسبت! 🏆", ldMeWin: "دخّلت الأربعة قبلك 😎 تاني؟"
  }
};
const G = k => GAME_TXT[lang][k];
const pick = a => a[Math.floor(Math.random() * a.length)];
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------------- XO ---------------- */
const XO_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let xo = Array(9).fill(""), xoOver = false, xoBusy = false, xoMsgKey = "xoStart";
let xoScore = { you: 0, me: 0, draw: 0 };
try { xoScore = JSON.parse(localStorage.getItem("alyaa-xo") || "") || xoScore; } catch (e) {}
const xoWinner = b => { for (const [a, c, d] of XO_LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return { p: b[a], line: [a, c, d] }; return b.every(Boolean) ? { p: "draw" } : null; };
function xoBotMove() {
  const free = xo.map((v, i) => v ? null : i).filter(i => i !== null);
  const tryFor = s => { for (const i of free) { const b = xo.slice(); b[i] = s; if (xoWinner(b)?.p === s) return i; } return null; };
  if (Math.random() < .2) return pick(free);            // a little human
  return tryFor("O") ?? tryFor("X") ?? (xo[4] ? null : 4) ?? pick(free.filter(i => [0,2,6,8].includes(i))) ?? pick(free);
}
function xoRender(line) {
  const g = $("#xoGrid"); if (!g) return;
  g.innerHTML = xo.map((v, i) => `<button class="xo-c ${v ? "on " + v.toLowerCase() : ""} ${line && line.includes(i) ? "win" : ""}" data-xo="${i}" aria-label="${i + 1}" ${v || xoOver ? "disabled" : ""}>${v}</button>`).join("");
  $("#xoScore").innerHTML = `<span><b>${xoScore.you}</b> ${G("you")}</span><span><b>${xoScore.me}</b> ${G("me")}</span><span><b>${xoScore.draw}</b> ${G("draw")}</span>`;
}
function xoSay(k) { xoMsgKey = k; $("#xoMsg").textContent = pick(G(k)); }
function xoEnd(w) {
  xoOver = true;
  if (w.p === "X") { xoScore.you++; xoSay("xoYou"); setTimeout(() => window.showOffer && showOffer(), 700); } else if (w.p === "O") { xoScore.me++; xoSay("xoMe"); } else { xoScore.draw++; xoSay("xoDraw"); }
  try { localStorage.setItem("alyaa-xo", JSON.stringify(xoScore)); } catch (e) {}
  xoRender(w.line);
}
async function xoPlay(i) {
  if (xoOver || xoBusy || xo[i]) return;
  xo[i] = "X"; let w = xoWinner(xo); xoRender(); if (w) return xoEnd(w);
  xoBusy = true; xoSay("xoThink"); await wait(550);
  xo[xoBotMove()] = "O"; xoBusy = false; w = xoWinner(xo); xoRender(); if (w) return xoEnd(w);
  xoSay("xoStart");
}
function xoReset() { xo = Array(9).fill(""); xoOver = false; xoBusy = false; xoRender(); xoSay("xoStart"); }

/* ---------------- Ludo (classic board) ---------------- */
// 52-cell track on a 15×15 board, starting from the left arm, clockwise
const LD_TRACK = [[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]];
const LD_SAFE = [0, 8, 13, 21, 26, 34, 39, 47];
// four corners; you play bottom-left, Alyaa plays top-right
const LD_SIDES = {
  tl: { start: 0,  home: [[7,1],[7,2],[7,3],[7,4],[7,5]],     base: [0,0], col: "#fe7919" },
  tr: { start: 13, home: [[1,7],[2,7],[3,7],[4,7],[5,7]],     base: [0,9], col: "#9e82fe" },
  br: { start: 26, home: [[7,13],[7,12],[7,11],[7,10],[7,9]], base: [9,9], col: "#3fbf9b" },
  bl: { start: 39, home: [[13,7],[12,7],[11,7],[10,7],[9,7]], base: [9,0], col: "#fe6bc7" }
};
const LD_P = { you: "bl", me: "tr" }, LD_END = 56; // rel 0..50 track, 51..55 home column, 56 finished
let ld;
const ldCell = (who, rel) => { const s = LD_SIDES[LD_P[who]]; return rel <= 50 ? LD_TRACK[(s.start + rel) % 52] : rel < LD_END ? s.home[rel - 51] : [7, 7]; };
const ldAbs = (who, rel) => rel >= 0 && rel <= 50 ? (LD_SIDES[LD_P[who]].start + rel) % 52 : -1;
function ldLegal(who, n) {
  return ld[who].map((p, i) => (p < 0 ? (n === 6 ? i : -1) : (p < LD_END && p + n <= LD_END ? i : -1))).filter(i => i >= 0);
}
function ldBoardHTML() {
  let h = "";
  const trackIdx = {}; LD_TRACK.forEach(([r, c], i) => trackIdx[r + "," + c] = i);
  const homeCol = {}; Object.values(LD_SIDES).forEach(s => s.home.forEach(([r, c]) => homeCol[r + "," + c] = s.col));
  const startCol = {}; Object.values(LD_SIDES).forEach(s => { const [r, c] = LD_TRACK[s.start]; startCol[r + "," + c] = s.col; });
  for (let r = 0; r < 15; r++) for (let c = 0; c < 15; c++) {
    const k = r + "," + c;
    if (k in trackIdx || k in homeCol) {
      const col = homeCol[k] || startCol[k];
      const star = LD_SAFE.includes(trackIdx[k]) && !startCol[k];
      h += `<span class="lc${col ? " col" : ""}" style="grid-row:${r + 1};grid-column:${c + 1}${col ? ";--c:" + col : ""}">${star ? "★" : ""}</span>`;
    }
  }
  for (const [key, s] of Object.entries(LD_SIDES)) {
    const who = Object.keys(LD_P).find(w => LD_P[w] === key);
    const slots = [0, 1, 2, 3].map(i => `<span class="slot">${who && ld[who][i] < 0 ? `<button class="lt ${who}" data-lt="${i}" style="--c:${s.col}" aria-label="${G(who)} ${i + 1}" ${who !== "you" ? "disabled" : ""}></button>` : ""}</span>`).join("");
    h += `<span class="lbase" style="grid-row:${s.base[0] + 1}/span 6;grid-column:${s.base[1] + 1}/span 6;--c:${s.col}"><span class="lyard">${slots}</span>${who ? `<small>${G(who)}</small>` : ""}</span>`;
  }
  h += `<span class="lmid" style="grid-row:7/span 3;grid-column:7/span 3"></span>`;
  // tokens on the board
  const stack = {};
  for (const who of ["you", "me"]) ld[who].forEach((p, i) => {
    if (p < 0) return;
    const [r, c] = ldCell(who, p), k = r + "," + c, n = stack[k] = (stack[k] || 0) + 1;
    const off = [[0, 0], [22, -22], [-22, 22], [22, 22], [-22, -22], [0, 26], [0, -26], [26, 0]][n - 1] || [0, 0];
    h += `<button class="lt ${who}${p === LD_END ? " done" : ""}" data-lt="${i}" style="grid-row:${r + 1};grid-column:${c + 1};--c:${LD_SIDES[LD_P[who]].col};transform:translate(${off[0]}%,${off[1]}%)" aria-label="${G(who)} ${i + 1}" ${who !== "you" ? "disabled" : ""}></button>`;
  });
  return h;
}
function ldRender() {
  const b = $("#ldBoard"); if (!b) return;
  b.innerHTML = ldBoardHTML();
  if (ld.pick) ld.pick.forEach(i => $$g(`#ldBoard .lt.you[data-lt="${i}"]`).forEach(t => t.classList.add("can")));
  $("#ldHome").innerHTML = `<span class="hm"><i class="tok you"></i><b>${ld.you.filter(p => p === LD_END).length}/4</b></span><span class="hm"><i class="tok me"></i><b>${ld.me.filter(p => p === LD_END).length}/4</b></span>`;
  $("#ldDie").dataset.n = ld.dice;
  $("#ldRoll").disabled = ld.busy || ld.over || ld.turn !== "you" || !!ld.pick;
}
/* The player's die is kind: a 6 comes more often while all your pieces are still home,
   and never more than two rolls in a row without one. */
function ldFace(who) {
  if (who !== "you") return 1 + Math.floor(Math.random() * 6);
  const allHome = ld.you.every(p => p < 0 || p === LD_END);
  let n;
  if ((ld.dry || 0) >= 2) n = 6;
  else if (Math.random() < (allHome ? .4 : .22)) n = 6;
  else n = 1 + Math.floor(Math.random() * 5);
  ld.dry = n === 6 ? 0 : (ld.dry || 0) + 1;
  return n;
}
async function ldRollDie(who) {
  const d = $("#ldDie"); d.classList.add("rolling");
  for (let i = 0; i < 7; i++) { d.dataset.n = 1 + Math.floor(Math.random() * 6); await wait(70); }
  d.classList.remove("rolling"); ld.dice = ldFace(who); return ld.dice;
}
function ldApply(who, i, n) {
  const other = who === "you" ? "me" : "you";
  let p = ld[who][i]; p = p < 0 ? 0 : p + n; ld[who][i] = p;
  const a = ldAbs(who, p); let note = "";
  if (a >= 0 && !LD_SAFE.includes(a)) ld[other].forEach((q, j) => { if (ldAbs(other, q) === a) { ld[other][j] = -1; note = who === "me" ? G("ldCaptureYou") : G("ldCaptureMe"); } });
  return note;
}
function ldBotPick(opts, n) {
  const other = "you", score = i => {
    const p = ld.me[i], np = p < 0 ? 0 : p + n, a = ldAbs("me", np);
    let s = np;                                                      // further is better
    if (a >= 0 && !LD_SAFE.includes(a) && ld[other].some(q => ldAbs(other, q) === a)) s += 200;   // capture
    if (np === LD_END) s += 120; if (p < 0) s += 90; if (a >= 0 && LD_SAFE.includes(a)) s += 30;
    return s + Math.random() * 10;
  };
  return opts.sort((x, y) => score(y) - score(x))[0];
}
const ldWon = who => ld[who].every(p => p === LD_END);
async function ldFinishMove(who, i, n, msg) {
  const note = ldApply(who, i, n); ld.pick = null; ldRender();
  msg += note ? " " + note : "";
  if (ldWon(who)) { ld.over = true; ld.busy = false; $("#ldMsg").textContent = who === "you" ? G("ldYouWin") : G("ldMeWin"); ldRender(); if (who === "you") setTimeout(() => window.showOffer && showOffer(), 700); return; }
  return ldNext(who, n, msg);
}
async function ldNext(who, n, msg) {
  if (n === 6) { $("#ldMsg").textContent = msg + " " + G("ldAgain"); if (who === "me") { await wait(900); return ldTurn("me"); } ld.busy = false; ldRender(); return; }
  if (who === "you") { ld.turn = "me"; $("#ldMsg").textContent = msg; ldRender(); await wait(900); $("#ldMsg").textContent = G("ldMyTurn"); await wait(400); return ldTurn("me"); }
  ld.turn = "you"; ld.busy = false; $("#ldMsg").textContent = msg + " " + G("ldYourTurn"); ldRender();
}
async function ldTurn(who) {
  ld.busy = true; ldRender();
  const n = await ldRollDie(who), opts = ldLegal(who, n);
  let msg = (who === "you" ? G("ldYouRoll") : G("ldMeRoll"))(n);
  if (!opts.length) { ldRender(); return ldNext(who, n === 6 ? 0 : n, msg + " " + G("ldNoMove")); }
  if (who === "me") { await wait(450); return ldFinishMove("me", ldBotPick(opts, n), n, msg); }
  const same = new Set(opts.map(i => ld.you[i]));
  if (opts.length === 1 || same.size === 1) { await wait(250); return ldFinishMove("you", opts[0], n, msg); }
  ld.pick = opts; ld.busy = false; ld.pickMsg = msg; $("#ldMsg").textContent = msg + " " + G("ldPick"); ldRender();
}
function ldReset() { ld = { you: [-1, -1, -1, -1], me: [-1, -1, -1, -1], turn: "you", busy: false, over: false, dice: 1, pick: null }; if ($("#ldMsg")) $("#ldMsg").textContent = G("ldStart"); ldRender(); }
ld = { you: [-1, -1, -1, -1], me: [-1, -1, -1, -1], turn: "you", busy: false, over: false, dice: 1, pick: null };

/* ---------------- wire up ---------------- */
function renderGames() {
  if ($("#xoGrid")) { xoRender(); $("#xoMsg").textContent = pick(G(xoMsgKey)); }
  if ($("#ldBoard")) {
    ldRender();
    if (ld.over) $("#ldMsg").textContent = ldWon("you") ? G("ldYouWin") : G("ldMeWin");
    else if (ld.pick) $("#ldMsg").textContent = G("ldPick");
    else if (!ld.busy) $("#ldMsg").textContent = ld.you.every(p => p < 0) && ld.me.every(p => p < 0) ? G("ldStart") : G("ldYourTurn");
  }
}
document.addEventListener("click", e => {
  const c = e.target.closest("[data-xo]"); if (c) { xoPlay(+c.dataset.xo); return; }
  if (e.target.closest("#xoReset")) { xoReset(); return; }
  if (e.target.closest("#ldRoll")) { if (!ld.busy && !ld.over && ld.turn === "you") ldTurn("you"); return; }
  if (e.target.closest("#ldReset")) { ldReset(); return; }
  const lt = e.target.closest("#ldBoard .lt.you.can"); if (lt && ld.pick) { const i = +lt.dataset.lt; const msg = ld.pickMsg; ld.busy = true; ldFinishMove("you", i, ld.dice, msg); return; }
});
if ($("#lang")) $("#lang").addEventListener("click", () => setTimeout(renderGames, 0));
renderGames();
