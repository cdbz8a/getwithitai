// Contact address used by every form on the site
var GWI_MAIL = "getwithitai@protonmail.com";

// Copy buttons on chat demos: copies the "you" bubble text
document.querySelectorAll(".chat").forEach(function (chat) {
  var btn = chat.querySelector("button.copy");
  var you = chat.querySelector(".bubble.you .text");
  if (!btn || !you) return;
  btn.addEventListener("click", function () {
    var text = you.innerText;
    var done = function () {
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = "Copy this prompt"; }, 1600);
    };
    // Clipboard API needs https; fall back to a hidden textarea
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else {
      fallback(text);
      done();
    }
  });
});

function fallback(text) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}

// Mobile nav
(function () {
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
})();

// Free lesson progress, saved in this browser only
(function () {
  var buttons = document.querySelectorAll(".done-btn");
  if (!buttons.length) return;
  var key = "gwi-28-done";
  var total = buttons.length;
  var box = document.getElementById("progress");
  var label = document.getElementById("progress-text");
  var fill = document.getElementById("progress-fill");
  var reset = document.getElementById("progress-reset");

  function load() {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) {}
  }
  function render() {
    var list = load();
    buttons.forEach(function (b) {
      var n = b.getAttribute("data-lesson");
      var on = list.indexOf(n) !== -1;
      b.classList.toggle("is-done", on);
      b.textContent = on ? "Lesson " + n + " done" : "Mark lesson " + n + " done";
      var card = document.getElementById("lesson-" + n);
      if (card) card.classList.toggle("is-done", on);
    });
    if (box) {
      box.hidden = false;
      label.textContent = list.length + " of " + total + " lessons done" +
        (list.length === total ? ". That's your 28 minutes." : "");
      fill.style.width = Math.round(list.length / total * 100) + "%";
    }
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var n = b.getAttribute("data-lesson");
      var list = load();
      var i = list.indexOf(n);
      if (i === -1) list.push(n); else list.splice(i, 1);
      save(list);
      render();
    });
  });
  if (reset) reset.addEventListener("click", function () { save([]); render(); });
  render();
})();

// Forms open a pre-filled email (static site, no server)
function openMail(subject, body) {
  window.location.href = "mailto:" + GWI_MAIL + "?subject=" +
    encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

(function () {
  var reg = document.getElementById("regform");
  if (reg) {
    reg.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var news = document.getElementById("news");
      var body = "Name: " + v("name") + "\nEmail: " + v("email") + "\nOption: " + v("option") +
        "\nNewsletter: " + (news && news.checked ? "Yes" : "No") +
        (v("notes") ? "\nNotes: " + v("notes") : "");
      openMail("Registration: " + v("option"), body);
    });
  }
  var nf = document.getElementById("newsform");
  if (nf) {
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("news-name").value.trim();
      var email = document.getElementById("news-email").value.trim();
      openMail("Newsletter signup", "Please add me to the GetWithItAI newsletter.\n\nName: " + name + "\nEmail: " + email);
    });
  }
})();
