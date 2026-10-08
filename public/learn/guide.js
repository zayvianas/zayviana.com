/* Study Shelf guide behavior, shared by every guide:
   - builds the module index from <section class="mod" id="..." data-title="...">
   - "Mark module done" buttons with progress saved on this device
   - quiz + flashcards from <script type="application/json" id="quiz-data">
   - searchable word bank from <script type="application/json" id="words-data">
   - practice checkboxes remembered on this device */
(function () {
  "use strict";
  var PATH = location.pathname;
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function json(id) { var s = document.getElementById(id); if (!s) return null; try { return JSON.parse(s.textContent); } catch (e) { console.warn("Bad JSON in #" + id, e); return null; } }

  /* ---------- module index + done buttons ---------- */
  var mods = Array.prototype.slice.call(document.querySelectorAll("section.mod"));
  var toc = document.getElementById("toc");
  var done = load("done:" + PATH, {});
  mods.forEach(function (m, i) {
    var title = m.getAttribute("data-title") || (m.querySelector("h2") || {}).textContent || ("Module " + i);
    if (toc) {
      var li = el("li"), a = el("a");
      a.href = "#" + m.id;
      a.appendChild(el("span", "n", String(i).padStart(2, "0")));
      a.appendChild(el("span", "", title));
      a.appendChild(el("span", "ck", "✓"));
      li.appendChild(a); toc.appendChild(li);
    }
    var kick = m.querySelector(".modhead .kicker");
    if (kick && !kick.textContent.trim()) kick.textContent = "Module " + String(i).padStart(2, "0");
    if (!m.hasAttribute("data-nodone")) {
      var b = el("button", "btn donebtn tts-skip"); b.type = "button"; b.dataset.done = m.id;
      m.appendChild(b);
    }
  });
  function syncDone() {
    document.querySelectorAll(".donebtn").forEach(function (b) {
      var on = !!done[b.dataset.done];
      b.setAttribute("aria-pressed", on); b.textContent = on ? "Done ✓" : "Mark module done";
      var a = toc && toc.querySelector('a[href="#' + b.dataset.done + '"]'); if (a) a.classList.toggle("done", on);
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".donebtn"); if (!b) return;
    done[b.dataset.done] = !done[b.dataset.done]; save("done:" + PATH, done); syncDone();
  });
  syncDone();

  /* ---------- practice checkboxes ---------- */
  var checks = load("checks:" + PATH, {});
  document.querySelectorAll(".drills input[type=checkbox]").forEach(function (c, i) {
    var key = c.id || ("c" + i); c.checked = !!checks[key];
    c.addEventListener("change", function () { checks[key] = c.checked; save("checks:" + PATH, checks); });
  });

  /* ---------- quiz + flashcards ---------- */
  var qdata = json("quiz-data"), qroot = document.getElementById("quiz");
  if (qdata && qdata.length && qroot) {
    qroot.classList.add("tts-skip");
    var mode = "quiz", qi = 0, score = 0, answered = false, fi = 0;
    var bar = el("div", "wb-ctl");
    var bQuiz = el("button", "chip", "Quiz"), bFlash = el("button", "chip", "Flashcards");
    bQuiz.type = bFlash.type = "button";
    bar.appendChild(bQuiz); bar.appendChild(bFlash);
    var stage = el("div");
    qroot.appendChild(bar); qroot.appendChild(stage);
    function setMode(m) { mode = m; bQuiz.setAttribute("aria-pressed", m === "quiz"); bFlash.setAttribute("aria-pressed", m === "flash"); render(); }
    bQuiz.onclick = function () { setMode("quiz"); }; bFlash.onclick = function () { setMode("flash"); };
    function render() { stage.innerHTML = ""; mode === "quiz" ? renderQuiz() : renderFlash(); }
    function renderQuiz() {
      var box = el("div", "quiz");
      if (qi >= qdata.length) {
        box.appendChild(el("div", "q", "You got " + score + " of " + qdata.length + "."));
        box.appendChild(el("p", "", score === qdata.length ? "Perfect. You've got this." : "Go back to the modules for the ones you missed, then try again."));
        var again = el("button", "btn primary", "Try again"); again.type = "button";
        again.onclick = function () { qi = 0; score = 0; answered = false; render(); };
        box.appendChild(again); stage.appendChild(box); return;
      }
      var item = qdata[qi];
      var top = el("div", "qtop"); top.appendChild(el("span", "meta", "Question " + (qi + 1) + " of " + qdata.length)); top.appendChild(el("span", "meta", "Score " + score));
      box.appendChild(top);
      box.appendChild(el("div", "q", item.q));
      var opts = el("div", "opts"), why = el("div", "why"); why.hidden = true;
      item.options.forEach(function (o, oi) {
        var b = el("button", "opt", o); b.type = "button";
        b.onclick = function () {
          if (answered) return; answered = true;
          if (oi === item.answer) { score++; b.classList.add("right"); why.textContent = "Right. " + (item.why || ""); }
          else { b.classList.add("wrong"); opts.children[item.answer].classList.add("right"); why.textContent = "Not quite. " + (item.why || ""); }
          why.hidden = false; next.hidden = false;
        };
        opts.appendChild(b);
      });
      box.appendChild(opts); box.appendChild(why);
      var nav = el("div", "nav"), next = el("button", "btn primary", qi === qdata.length - 1 ? "See score" : "Next question");
      next.type = "button"; next.hidden = true; next.onclick = function () { qi++; answered = false; render(); };
      nav.appendChild(next); box.appendChild(nav); stage.appendChild(box);
    }
    function renderFlash() {
      var item = qdata[fi];
      var card = el("div", "flash"); card.tabIndex = 0; card.setAttribute("role", "button"); card.setAttribute("aria-label", "Flip card");
      var inner = el("div", "inner"), front = el("div", "face"), back = el("div", "face back");
      front.appendChild(el("span", "meta", "Card " + (fi + 1) + " of " + qdata.length + " · tap to flip"));
      front.appendChild(el("b", "", item.q));
      back.appendChild(el("b", "", item.options[item.answer]));
      if (item.why) back.appendChild(el("p", "", item.why));
      inner.appendChild(front); inner.appendChild(back); card.appendChild(inner);
      function flip() { card.classList.toggle("flipped"); }
      card.onclick = flip; card.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } };
      var nav = el("div", "nav quiz"); nav.style.cssText = "background:none;border:0;padding:12px 0 0";
      var prev = el("button", "btn", "← Prev"), nxt = el("button", "btn primary", "Next →");
      prev.type = nxt.type = "button";
      prev.onclick = function () { fi = (fi - 1 + qdata.length) % qdata.length; render(); };
      nxt.onclick = function () { fi = (fi + 1) % qdata.length; render(); };
      var navRow = el("div", "nav"); navRow.appendChild(prev); navRow.appendChild(nxt);
      stage.appendChild(card); stage.appendChild(navRow);
    }
    setMode("quiz");
  }

  /* ---------- word bank ---------- */
  var words = json("words-data"), wroot = document.getElementById("wordbank");
  if (words && words.length && wroot) {
    var cats = ["All"]; words.forEach(function (w) { if (w[2] && cats.indexOf(w[2]) < 0) cats.push(w[2]); });
    var cur = "All", q = "", blur = false;
    var ctl = el("div", "wb-ctl tts-skip"), input = el("input");
    input.type = "search"; input.placeholder = "Search a word"; input.setAttribute("aria-label", "Search the word bank"); input.id = "wb-search";
    ctl.appendChild(input);
    var chips = [];
    if (cats.length > 2) cats.forEach(function (c) {
      var b = el("button", "chip", c); b.type = "button"; b.onclick = function () { cur = c; draw(); }; chips.push(b); ctl.appendChild(b);
    });
    var qb = el("button", "chip", "Quiz mode"); qb.type = "button"; qb.onclick = function () { blur = !blur; draw(); }; ctl.appendChild(qb);
    var count = el("p", "meta tts-skip"), grid = el("div", "wb");
    wroot.appendChild(ctl); wroot.appendChild(count); wroot.appendChild(grid);
    input.addEventListener("input", function () { q = input.value.toLowerCase().trim(); draw(); });
    function draw() {
      chips.forEach(function (b) { b.setAttribute("aria-pressed", b.textContent === cur); });
      qb.setAttribute("aria-pressed", blur);
      var list = words.filter(function (w) { return (cur === "All" || w[2] === cur) && (!q || (w[0] + " " + w[1]).toLowerCase().indexOf(q) > -1); });
      count.textContent = list.length + " terms"; grid.innerHTML = "";
      list.forEach(function (w) {
        var d = el("div", "g"); d.appendChild(el("b", "", w[0]));
        var p = el("p", "", w[1]);
        if (blur) {
          p.style.filter = "blur(5px)"; p.style.cursor = "pointer"; p.tabIndex = 0; p.title = "Tap to reveal";
          var rv = function () { p.style.filter = "none"; }; p.onclick = rv; p.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") rv(); };
        }
        d.appendChild(p); grid.appendChild(d);
      });
    }
    draw();
  }
})();
