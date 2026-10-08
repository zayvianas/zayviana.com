/* Study Shelf read-aloud player.
   Uses the device's built-in voice (Web Speech API). Reads the page top to bottom,
   highlights the current block, and lets you skip, rewind, change speed, and resume later. */
(function () {
  "use strict";
  var synth = window.speechSynthesis;
  if (!synth || typeof SpeechSynthesisUtterance === "undefined") return;

  var BLOCK_SEL = [
    "h1", "h2", "h3", "h4", "p", "li", "dt", "dd", "summary", "blockquote",
    "tbody tr", ".star b", ".g", ".lead"
  ].join(",");
  var SKIP_SEL = ".tts-skip, aside, nav, footer, button, pre, script, style, .codecol, .render, .gloss-ctl, .count, .shelf-back, #tts-bar, .donebtn, input, select";
  var KEY = "tts-pos:" + location.pathname;

  /* ---------- styles ---------- */
  var css = document.createElement("style");
  css.textContent = [
    ":root{--tts-bg:#1b2333;--tts-fg:#f7f6f2;--tts-hl:rgba(255,227,110,.45);--tts-btn:#2b3550}",
    "@media (prefers-color-scheme:dark){:root{--tts-bg:#e7e9ef;--tts-fg:#12151c;--tts-hl:rgba(143,176,255,.28);--tts-btn:#cdd3df}}",
    ".tts-now{background:var(--tts-hl)!important;border-radius:6px;box-shadow:0 0 0 4px var(--tts-hl);transition:background .2s}",
    "#tts-bar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:50;",
    "display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:999px;background:var(--tts-bg);color:var(--tts-fg);",
    "box-shadow:0 8px 28px rgba(0,0,0,.25);font:600 14px/1 system-ui,-apple-system,sans-serif;max-width:calc(100vw - 24px)}",
    "#tts-bar button,#tts-bar select{font:inherit;color:var(--tts-fg);background:transparent;border:0;border-radius:999px;height:40px;min-width:40px;padding:0 10px;cursor:pointer}",
    "#tts-bar button:hover,#tts-bar button:focus-visible,#tts-bar select:focus-visible{background:var(--tts-btn);color:var(--tts-fg);outline:none}",
    "#tts-bar .tts-play{background:var(--tts-fg);color:var(--tts-bg);min-width:96px}",
    "#tts-bar .tts-play:hover,#tts-bar .tts-play:focus-visible{background:var(--tts-fg);color:var(--tts-bg);opacity:.9}",
    "#tts-bar .tts-prog{font-variant-numeric:tabular-nums;opacity:.75;padding:0 6px;white-space:nowrap}",
    "#tts-bar select{max-width:120px;appearance:none;-webkit-appearance:none;text-overflow:ellipsis}",
    "#tts-bar.tts-idle .tts-extra{display:none}",
    "@media (max-width:480px){#tts-bar .tts-prog{display:none}#tts-bar select{max-width:80px}}",
    "body{padding-bottom:96px!important}"
  ].join("");
  document.head.appendChild(css);

  /* ---------- collect readable blocks ---------- */
  function clean(t) {
    return t
      .replace(/[✓]/g, "")
      .replace(/-+>>?/g, " arrow ")
      .replace(/\s·\s/g, ", ")
      .replace(/→/g, " to ")
      .replace(/×/g, " times ")
      .replace(/÷/g, " divided by ")
      .replace(/–/g, " to ")
      .replace(/\s+/g, " ")
      .replace(/\.\.$/, ".")
      .replace(/([a-z0-9])\.([A-Z])/g, "$1. $2")
      .trim();
  }
  var blocks = [];
  function collect() {
    var all = Array.prototype.slice.call(document.querySelectorAll(BLOCK_SEL));
    var picked = all.filter(function (el) {
      if (el.closest(SKIP_SEL)) return false;
      if (el.closest("thead")) return false;
      return true;
    });
    var set = new Set(picked);
    blocks = picked.filter(function (el) {
      var p = el.parentElement;
      while (p) { if (set.has(p)) return false; p = p.parentElement; }
      return clean(el.textContent).length > 1;
    });
  }

  // Read table rows and word-bank cards as "a. b. c." instead of run-together text.
  function textOf(el) {
    if (el.matches("tr")) {
      return Array.prototype.map.call(el.children, function (c) { return c.textContent.trim(); }).join(". ").replace(/([.!?])\.\s/g, "$1 ") + ".";
    }
    if (el.matches(".g")) {
      var b = el.querySelector("b"), p = el.querySelector("p");
      return (b ? b.textContent : "") + ". " + (p ? p.textContent : "");
    }
    return el.textContent;
  }

  function sentences(text) {
    var parts = text.replace(/([.!?]["')\]]*)\s+/g, "$1\u0001").split("\u0001");
    var out = [], buf = "";
    parts.forEach(function (s) {
      s = s.trim(); if (!s) return;
      if ((buf + " " + s).length > 220 && buf) { out.push(buf); buf = s; }
      else buf = buf ? buf + " " + s : s;
    });
    if (buf) out.push(buf);
    return out;
  }

  /* ---------- voices ---------- */
  var voices = [], voice = null;
  var PREFER = ["Samantha", "Ava", "Allison", "Google US English", "Microsoft Aria", "Microsoft Jenny", "Karen", "Daniel"];
  function loadVoices() {
    voices = synth.getVoices().filter(function (v) { return /^en(-|_|$)/i.test(v.lang); });
    var saved = null;
    try { saved = localStorage.getItem("tts-voice"); } catch (e) {}
    voice = voices.find(function (v) { return v.name === saved; }) || null;
    if (!voice) {
      for (var i = 0; i < PREFER.length && !voice; i++) {
        voice = voices.find(function (v) { return v.name.indexOf(PREFER[i]) === 0; }) || null;
      }
    }
    if (!voice) voice = voices.find(function (v) { return /en-US/i.test(v.lang); }) || voices[0] || null;
    fillVoiceMenu();
  }

  /* ---------- state ---------- */
  var idx = 0, sIdx = 0, playing = false, rate = 1, token = 0;
  var RATES = [0.85, 1, 1.15, 1.3, 1.5];
  try {
    var r = parseFloat(localStorage.getItem("tts-rate")); if (RATES.indexOf(r) > -1) rate = r;
    var savedPos = parseInt(localStorage.getItem(KEY), 10); if (savedPos > 0) idx = savedPos;
  } catch (e) {}

  /* ---------- UI ---------- */
  var bar = document.createElement("div");
  bar.id = "tts-bar"; bar.className = "tts-idle";
  bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Read aloud");
  bar.innerHTML =
    '<button type="button" class="tts-extra tts-prev" aria-label="Previous part">⏮</button>' +
    '<button type="button" class="tts-play" aria-label="Listen">▶ Listen</button>' +
    '<button type="button" class="tts-extra tts-next" aria-label="Next part">⏭</button>' +
    '<button type="button" class="tts-extra tts-rate" aria-label="Speed">1×</button>' +
    '<select class="tts-extra tts-voice" aria-label="Voice" id="tts-voice"></select>' +
    '<span class="tts-extra tts-prog" aria-live="off"></span>' +
    '<button type="button" class="tts-extra tts-stop" aria-label="Stop and close">✕</button>';
  document.body.appendChild(bar);
  var bPlay = bar.querySelector(".tts-play"), bRate = bar.querySelector(".tts-rate"),
      sVoice = bar.querySelector(".tts-voice"), prog = bar.querySelector(".tts-prog");

  function fillVoiceMenu() {
    sVoice.innerHTML = "";
    voices.forEach(function (v) {
      var o = document.createElement("option");
      o.value = v.name; o.textContent = v.name.replace(/\s*\(.*\)/, "");
      if (voice && v.name === voice.name) o.selected = true;
      sVoice.appendChild(o);
    });
    sVoice.hidden = voices.length < 2;
  }
  function paint() {
    bPlay.textContent = playing ? "❚❚ Pause" : (bar.classList.contains("tts-idle") ? "▶ Listen" : "▶ Play");
    bPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
    bRate.textContent = rate + "×";
    prog.textContent = blocks.length ? (Math.min(idx + 1, blocks.length) + " / " + blocks.length) : "";
  }
  function mark() {
    var old = document.querySelector(".tts-now"); if (old) old.classList.remove("tts-now");
    var el = blocks[idx]; if (!el) return;
    var d = el.closest("details"); if (d && !d.open) d.open = true;
    el.classList.add("tts-now");
    var r = el.getBoundingClientRect(), vh = window.innerHeight;
    if (r.top < 70 || r.bottom > vh - 110) {
      var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ block: "center", behavior: smooth ? "smooth" : "auto" });
    }
    try { localStorage.setItem(KEY, String(idx)); } catch (e) {}
  }

  /* ---------- speaking ---------- */
  function speakCurrent() {
    var my = ++token;
    if (idx >= blocks.length) { finish(); return; }
    var el = blocks[idx];
    var text = clean(textOf(el));
    if (el.matches(".star b")) text = text + ".";
    var parts = sentences(text);
    if (sIdx >= parts.length) { idx++; sIdx = 0; mark(); paint(); speakCurrent(); return; }
    var u = new SpeechSynthesisUtterance(parts[sIdx]);
    if (voice) u.voice = voice;
    u.lang = (voice && voice.lang) || "en-US";
    u.rate = rate;
    u.onend = function () {
      if (my !== token || !playing) return;
      sIdx++;
      if (sIdx >= parts.length) { idx++; sIdx = 0; mark(); paint(); }
      speakCurrent();
    };
    u.onerror = function (e) {
      if (my !== token) return;
      if (e.error === "interrupted" || e.error === "canceled") return;
      sIdx++; if (playing) speakCurrent();
    };
    synth.speak(u);
  }
  function start() {
    bar.classList.remove("tts-idle");
    playing = true; synth.cancel(); mark(); paint(); speakCurrent();
  }
  function pause() { playing = false; token++; synth.cancel(); paint(); }
  function finish() {
    playing = false; token++; idx = 0; sIdx = 0;
    var old = document.querySelector(".tts-now"); if (old) old.classList.remove("tts-now");
    try { localStorage.removeItem(KEY); } catch (e) {}
    paint();
  }
  function jump(n) {
    idx = Math.max(0, Math.min(blocks.length - 1, n)); sIdx = 0;
    if (playing) { synth.cancel(); token++; mark(); paint(); speakCurrent(); } else { mark(); paint(); }
  }
  function firstVisible() {
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].getBoundingClientRect().bottom > 80) return i;
    }
    return 0;
  }

  bPlay.addEventListener("click", function () {
    if (playing) { pause(); return; }
    if (!blocks.length) collect();
    if (bar.classList.contains("tts-idle")) {
      // Resume where you left off if that spot is on screen; otherwise start from what you're looking at.
      var vis = firstVisible();
      if (!(idx > 0 && Math.abs(idx - vis) < 40)) idx = (window.scrollY < 120 && idx === 0) ? 0 : vis;
      sIdx = 0;
    }
    start();
  });
  bar.querySelector(".tts-prev").addEventListener("click", function () { jump(sIdx > 0 ? idx : idx - 1); });
  bar.querySelector(".tts-next").addEventListener("click", function () { jump(idx + 1); });
  bRate.addEventListener("click", function () {
    rate = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    try { localStorage.setItem("tts-rate", String(rate)); } catch (e) {}
    paint(); if (playing) { synth.cancel(); token++; speakCurrent(); }
  });
  sVoice.addEventListener("change", function () {
    voice = voices.find(function (v) { return v.name === sVoice.value; }) || voice;
    try { localStorage.setItem("tts-voice", voice.name); } catch (e) {}
    if (playing) { synth.cancel(); token++; speakCurrent(); }
  });
  bar.querySelector(".tts-stop").addEventListener("click", function () {
    pause(); bar.classList.add("tts-idle");
    var old = document.querySelector(".tts-now"); if (old) old.classList.remove("tts-now");
    paint();
  });

  // While the player is open, tap any paragraph to start reading from there.
  document.addEventListener("click", function (e) {
    if (bar.classList.contains("tts-idle")) return;
    if (e.target.closest("a, button, summary, input, select, label, #tts-bar, .copy")) return;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] === e.target || blocks[i].contains(e.target)) {
        idx = i; sIdx = 0;
        if (playing) { synth.cancel(); token++; mark(); paint(); speakCurrent(); } else start();
        return;
      }
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("input, select, textarea")) return;
    if (e.key === "k" || (e.key === " " && !bar.classList.contains("tts-idle") && e.target === document.body)) {
      e.preventDefault(); bPlay.click();
    }
  });
  window.addEventListener("pagehide", function () { synth.cancel(); });

  collect();
  loadVoices();
  if (typeof synth.onvoiceschanged !== "undefined") synth.onvoiceschanged = loadVoices;
  paint();
})();
