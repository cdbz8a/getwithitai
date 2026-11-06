/* AI Hero Academy player.
   Two ways to run:
   - Classroom (PHP): window.CLASSROOM = { role, csrf } and the course comes from data.php.
     Students can follow the instructor; the instructor can broadcast their position.
   - Self-paced download: window.COURSE_DATA holds the whole course, no network needed.
   Everything is rendered with textContent so nothing in the data is run as HTML. */
(function () {
  "use strict";

  var CLS = window.CLASSROOM || null;
  var isInstructor = !!(CLS && CLS.role === "instructor");
  var STORE = "aha-progress-v1";
  var course = null;
  var mi = 0, pi = 0;
  var done = loadDone();
  var follow = false, broadcast = false, pollTimer = null, lastStateT = 0;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function $(id) { return document.getElementById(id); }

  // progress survives a refresh when the browser allows storage
  function loadDone() {
    try { return JSON.parse(localStorage.getItem(STORE) || "[]"); } catch (e) { return []; }
  }
  function saveDone() {
    try { localStorage.setItem(STORE, JSON.stringify(done)); } catch (e) { /* private mode */ }
  }
  function savePos() {
    try { localStorage.setItem(STORE + "-pos", JSON.stringify([mi, pi])); } catch (e) {}
  }
  function loadPos() {
    try { var p = JSON.parse(localStorage.getItem(STORE + "-pos") || "null"); if (p) { mi = p[0] || 0; pi = p[1] || 0; } } catch (e) {}
  }

  // "- " lines become a bullet list, blank lines split paragraphs
  function renderBody(text, into) {
    text.split("\n\n").forEach(function (block) {
      var ul = null;
      block.split("\n").forEach(function (ln) {
        if (ln.indexOf("- ") === 0) {
          if (!ul) { ul = el("ul"); into.appendChild(ul); }
          ul.appendChild(el("li", null, ln.slice(2)));
        } else {
          ul = null;
          if (ln.trim()) into.appendChild(el("p", null, ln));
        }
      });
    });
  }

  function promptBlock(prompt, into) {
    into.appendChild(el("pre", "prompt", prompt));
    var acts = el("div", "acts");
    var copy = el("button", "act primary", "Copy prompt");
    copy.type = "button";
    copy.onclick = function () {
      var ok = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy prompt"; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(prompt).then(ok, fallback);
      else fallback();
      function fallback() {
        var t = el("textarea"); t.value = prompt; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); ok(); } catch (e) {}
        document.body.removeChild(t);
      }
    };
    acts.appendChild(copy);
    var q = encodeURIComponent(prompt);
    [["ChatGPT", "https://chatgpt.com/?q=" + q], ["Claude", "https://claude.ai/new?q=" + q], ["Gemini", "https://gemini.google.com/app"], ["Grok", "https://grok.com/"]].forEach(function (l) {
      var a = el("a", "act", l[0] + " ↗");
      a.href = l[1]; a.target = "_blank"; a.rel = "noopener noreferrer";
      acts.appendChild(a);
    });
    into.appendChild(acts);
  }

  function totalPanels() { return course.modules.reduce(function (s, m) { return s + m.panels.length; }, 0); }
  function position() {
    var n = 0;
    for (var i = 0; i < mi; i++) n += course.modules[i].panels.length;
    return n + pi + 1;
  }

  function renderSide() {
    var side = $("side");
    side.textContent = "";
    course.parts.forEach(function (part) {
      side.appendChild(el("div", "part", "Part " + part.num + ": " + part.title));
      course.modules.forEach(function (m, i) {
        if (part.modules.indexOf(m.num) === -1) return;
        var b = el("button", "mod" + (i === mi ? " cur" : "") + (done.indexOf(m.num) > -1 ? " done" : ""));
        b.type = "button";
        b.appendChild(el("span", "n", done.indexOf(m.num) > -1 ? "✓" : String(m.num).padStart(2, "0")));
        b.appendChild(el("span", null, m.title));
        b.onclick = function () { go(i, 0, true); side.classList.remove("open"); };
        side.appendChild(b);
      });
    });
  }

  function render() {
    var m = course.modules[mi];
    var p = m.panels[pi];
    var main = $("main");
    main.textContent = "";
    main.appendChild(el("p", "meta", "Module " + m.num + " of " + course.modules.length + " · " + m.minutes + " min · panel " + (pi + 1) + " of " + m.panels.length));
    main.appendChild(el("h1", "mtitle", m.title));
    if (pi === 0) main.appendChild(el("p", "goal", "Goal: " + m.goal));
    else main.appendChild(el("div", null, "")).style.height = "1.5rem";

    var tag = { "try": "Try this", "do": "Do this", "check": "Quick check" }[p.t];
    if (tag) main.appendChild(el("p", "tag", tag));
    main.appendChild(el("h2", "ph", p.h));
    var pb = el("div", "pb");
    if (p.b) renderBody(p.b, pb);
    main.appendChild(pb);
    if (p.p) promptBlock(p.p, main);
    if (p.t === "check" && p.a) {
      var show = el("button", "act", "Show answer");
      show.type = "button";
      show.onclick = function () { show.replaceWith(el("div", "answer", p.a)); };
      main.appendChild(show);
    }
    if (isInstructor && p.n) {
      var note = el("div", "note");
      note.appendChild(el("b", null, "Instructor note"));
      note.appendChild(document.createTextNode(p.n));
      main.appendChild(note);
    }

    var lastPanel = pi === m.panels.length - 1;
    var lastMod = mi === course.modules.length - 1;
    $("prev").disabled = mi === 0 && pi === 0;
    $("next").textContent = lastPanel ? (lastMod ? "Finish" : "Next module →") : "Next →";
    $("pos").textContent = position() + " / " + totalPanels();
    $("barfill").style.width = (position() / totalPanels() * 100) + "%";
    renderSide();
  }

  function go(m, p, manual) {
    mi = Math.max(0, Math.min(course.modules.length - 1, m));
    pi = Math.max(0, Math.min(course.modules[mi].panels.length - 1, p));
    // a student who moves on their own stops following
    if (manual && follow && !isInstructor) setFollow(false);
    savePos();
    render();
    window.scrollTo(0, 0);
    if (broadcast) push();
  }

  function next() {
    var m = course.modules[mi];
    if (pi < m.panels.length - 1) return go(mi, pi + 1, true);
    if (done.indexOf(m.num) === -1) { done.push(m.num); saveDone(); }
    if (mi < course.modules.length - 1) go(mi + 1, 0, true);
    else render();
  }
  function prev() {
    if (pi > 0) return go(mi, pi - 1, true);
    if (mi > 0) go(mi - 1, course.modules[mi - 1].panels.length - 1, true);
  }

  // ---- classroom sync ----
  function setStatus(text, live) {
    var s = $("status");
    if (!s) return;
    s.textContent = text;
    s.className = "status" + (live ? " live" : "");
  }
  function setFollow(on) {
    follow = on;
    var b = $("follow");
    if (b) { b.classList.toggle("on", on); b.textContent = on ? "Following instructor" : "Follow instructor"; }
    setStatus(on ? "Following the instructor" : "", false);
    if (on) poll();
  }
  function poll() {
    if (!follow) return;
    fetch("sync.php", { credentials: "same-origin", cache: "no-store" })
      .then(function (r) { if (r.status === 401) location.reload(); return r.json(); })
      .then(function (s) {
        if (!follow || !s || typeof s.m !== "number") return;
        if (s.t && s.t === lastStateT) return;
        lastStateT = s.t || 0;
        if (s.m !== mi || s.p !== pi) { mi = s.m; pi = s.p; render(); window.scrollTo(0, 0); }
      })
      .catch(function () { setStatus("Can't reach the classroom, retrying", false); });
  }
  function push() {
    var body = new URLSearchParams({ m: String(mi), p: String(pi), csrf: CLS.csrf });
    fetch("sync.php", { method: "POST", credentials: "same-origin", body: body })
      .then(function (r) { setStatus(r.ok ? "Live: class is following you" : "Broadcast failed", r.ok); })
      .catch(function () { setStatus("Broadcast failed, check connection", false); });
  }
  function setBroadcast(on) {
    broadcast = on;
    var b = $("broadcast");
    b.classList.toggle("on", on);
    b.textContent = on ? "Live" : "Go live";
    setStatus(on ? "Live: class is following you" : "", on);
    if (on) push();
  }

  function start(data) {
    course = data;
    if (!CLS) loadPos();
    if (mi >= course.modules.length) { mi = 0; pi = 0; }
    $("prev").onclick = prev;
    $("next").onclick = next;
    $("menu").onclick = function () { $("side").classList.toggle("open"); };
    document.addEventListener("keydown", function (e) {
      var t = e.target && e.target.tagName;
      if (t === "INPUT" || t === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") next();
      if (e.key === "ArrowLeft" || e.key === "PageUp") prev();
    });
    // swipe on phones
    var sx = null;
    document.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 70) { if (dx < 0) next(); else prev(); }
      sx = null;
    }, { passive: true });

    if (CLS && !isInstructor) {
      $("follow").onclick = function () { setFollow(!follow); };
      pollTimer = setInterval(poll, 3000);
      setFollow(true);
    }
    if (isInstructor) $("broadcast").onclick = function () { setBroadcast(!broadcast); };
    render();
  }

  if (window.COURSE_DATA) start(window.COURSE_DATA);
  else {
    fetch("data.php", { credentials: "same-origin", cache: "no-store" })
      .then(function (r) { if (r.status === 401) { location.reload(); throw new Error("signed out"); } return r.json(); })
      .then(start)
      .catch(function () { $("main").textContent = "Couldn't load the course. Refresh the page or ask the instructor."; });
  }
})();
