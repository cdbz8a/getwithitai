/**
 * GetWithItAI prompt generator
 * Plain English in → structured, model-tuned prompt out.
 * Uses Grok (SpaceXAI / xAI) when /api/generate is available; otherwise
 * a local engineer that still produces a complete 5-element prompt.
 */
(function () {
  const MODELS = [
    { id: "chatgpt", name: "ChatGPT" },
    { id: "claude", name: "Claude" },
    { id: "gemini", name: "Gemini" },
    { id: "grok", name: "Grok" },
    { id: "copilot", name: "Copilot" },
    { id: "perplexity", name: "Perplexity" },
    { id: "deepseek", name: "DeepSeek" },
    { id: "llama", name: "Llama" },
  ];

  const TEMPLATES = [
    { cat: "Email", title: "Reply to a messy email", desc: "Draft a short, human reply with a clear next step.", seed: "Write a polite reply to a customer who is unhappy that their order is late. Keep it under 120 words, own the delay, and offer two options." },
    { cat: "Email", title: "Cold outreach that isn't slimy", desc: "A first email that sounds like a person.", seed: "Write a cold email to a local restaurant owner offering a simple website refresh. Friendly, 90 words max, one specific observation, one ask." },
    { cat: "Meetings", title: "Notes → decisions + owners", desc: "Turn ramble into a table you can send.", seed: "Convert messy meeting notes into: 5-bullet summary, decisions, and an action table with owner, due date, and priority. Do not invent owners or dates." },
    { cat: "Meetings", title: "45-minute agenda", desc: "Outcomes, timing, owners.", seed: "Build a 45-minute meeting agenda for a weekly operations huddle. Include desired outcomes, timing per section, and an owner for each item." },
    { cat: "Trades", title: "Estimate from job notes", desc: "Quote language a customer will actually read.", seed: "Turn these job notes into a customer-facing estimate: kitchen faucet swap, extra hour if shutoff is seized, parts plus labour, two options. Plain language, no jargon, no fake prices." },
    { cat: "Trades", title: "Job update text", desc: "SMS the customer without sounding robotic.", seed: "Write a short SMS to a homeowner: we are 40 minutes out, need driveway access, and will protect floors. Sound like a real tradesperson, not a call centre." },
    { cat: "Writing", title: "Blog post from scraps", desc: "Outline, then draft, in your voice.", seed: "Turn bullet notes into a 700-word blog post for small-business owners about using AI for admin. Warm, practical, no hype, H2s, end with 3 actions." },
    { cat: "Writing", title: "Rewrite in my voice", desc: "Strip the generic AI sheen.", seed: "Rewrite this draft in a plain, direct Canadian voice. Short sentences. No 'delve', 'landscape', or 'leverage'. Keep the meaning." },
    { cat: "Analysis", title: "Compare three options", desc: "Pros, cons, risks, recommendation.", seed: "Compare three tools for meeting notes. Give a table of pros/cons/cost/risk and a recommendation for a 12-person office that already pays for Microsoft 365." },
    { cat: "Analysis", title: "Research with labels", desc: "Facts vs guesses vs check-this.", seed: "Summarize the current practical uses of AI for trades businesses. Separate known facts, likely but unverified, and what a human should verify. No fake citations." },
    { cat: "Teaching", title: "Lesson in 20 minutes", desc: "Teach one skill, no fluff.", seed: "Design a 20-minute mini-lesson for complete beginners on what a prompt is. Include a hook, one demo, one practice, and a 3-question check." },
    { cat: "Teaching", title: "Quiz from a handout", desc: "Check understanding, not trivia.", seed: "Write 8 quiz questions from a one-page handout on AI privacy at work. Mix short answer and scenario. Include an answer key." },
    { cat: "Code", title: "Code review", desc: "Bugs, tests, and what to change.", seed: "Review this function as a senior engineer. Flag bugs, missing tests, and one simpler rewrite. Be specific. Do not invent APIs." },
    { cat: "Code", title: "Explain this code", desc: "Plain English, then edge cases.", seed: "Explain this script to a junior developer: what it does, how data flows, and three edge cases. No condescension." },
    { cat: "Sales", title: "Follow-up sequence", desc: "Three touches, still human.", seed: "Write a 3-email follow-up sequence after a quote was sent but not signed. Day 2, day 6, day 12. Short, useful, no guilt." },
    { cat: "Ops", title: "SOP from a walkthrough", desc: "Steps a new hire can follow.", seed: "Turn a rambling voice-note transcript into a one-page SOP for closing the shop. Numbered steps, tools needed, and what to do if something's missing." },
    { cat: "Creative", title: "Social caption set", desc: "Five posts, one voice.", seed: "Write 5 Instagram captions for a bakery's Friday special. Warm, local, no hashtag spam, each under 40 words, one call to come in before 11." },
    { cat: "Creative", title: "Image prompt", desc: "Subject, light, lens, mood.", seed: "Write an image prompt for a hero shot of a stainless steel water bottle on white, soft studio light, 50mm, no fake logos, photoreal." },
    { cat: "Career", title: "Work update for your boss", desc: "Impact first, tools second.", seed: "Draft a 6-bullet weekly update for my manager. Lead with outcomes and hours saved. Mention AI only as the method, not the headline." },
    { cat: "Safety", title: "Hallucination hunt", desc: "Label Safe / Verify / Escalate.", seed: "Review this AI output for invented facts, fake sources, and risky advice. Label each issue Safe, Verify, or Escalate. Do not add new claims." },
    { cat: "Email", title: "Apology that owns it", desc: "No weasel words. One fix.", seed: "Write an apology email because we missed a Tuesday install window. Own it, no excuses, offer Thursday 8–10 or Friday 1–3, under 100 words, human." },
    { cat: "Trades", title: "Scope in plain language", desc: "What is and isn’t included.", seed: "Turn these notes into a one-page scope for a bathroom fan swap: include fan, switch, patch drywall; exclude paint. Customer is a first-time homeowner. No fake prices." },
    { cat: "Trades", title: "Weather delay notice", desc: "Clear, calm, next date.", seed: "Write a customer SMS: rain tomorrow, exterior stain delayed, next window Thursday if dry. 2 sentences, no corporate tone." },
    { cat: "Meetings", title: "Decision log", desc: "What we decided, what we didn’t.", seed: "From these notes, make a decision log: Decision / Date / Owner / Open questions. Do not invent decisions." },
    { cat: "Writing", title: "One-page brief", desc: "Situation, options, ask.", seed: "Turn these bullets into a one-page brief for a director: situation, 3 options, recommendation, ask. 400 words max, no buzzwords." },
    { cat: "Writing", title: "Kill the brochure", desc: "Strip AI filler from a draft.", seed: "Edit this draft. Delete delve, landscape, leverage, tapestry, robust, seamless. Shorten 30%. Keep meaning." },
    { cat: "Analysis", title: "Risk list", desc: "Likelihood, impact, owner.", seed: "From this project description, list the top 8 risks as a table: Risk / Likelihood / Impact / Mitigation / Owner. Mark invented owners as TBD." },
    { cat: "Teaching", title: "Explain like I’m new", desc: "One idea, no jargon, a check.", seed: "Explain invoices vs estimates to a new apprentice in 200 words. Then 4 true/false questions with answers." },
    { cat: "Teaching", title: "Role-play the customer", desc: "Practice a hard conversation.", seed: "Role-play an upset customer whose job ran two days late. You are the customer first, then switch to coach and score my reply." },
    { cat: "Code", title: "Write tests first", desc: "Cases, not a lecture.", seed: "Given this function, list test cases: happy path, empty input, bad types, one regression. Do not rewrite the function unless a test proves a bug." },
    { cat: "Sales", title: "Quote cover note", desc: "What they’re buying, in English.", seed: "Write a 120-word cover note for a $4,800 deck-stain quote. What’s included, timeline, and how to say yes. No pressure close." },
    { cat: "Ops", title: "Handoff for a sick day", desc: "Someone else can run the list.", seed: "Turn my messy to-do list into a one-day handoff for a coworker: must today, can wait, passwords not included, who to call." },
    { cat: "Ops", title: "Inbox triage labels", desc: "Act / wait / file / delete.", seed: "Triage these 12 subject lines into Act today, Waiting, File, Delete. One-line why. Don’t invent emails I didn’t list." },
    { cat: "Creative", title: "Name options with a filter", desc: "Ten names, then kill five.", seed: "Give 10 name options for a mobile welding business in northern Alberta. Then strike the 5 that sound like every other shop and say why." },
    { cat: "Creative", title: "Video shot list", desc: "Five seconds, one move.", seed: "Write a 5-second product video prompt: slow push-in on a finished stain sample board, morning light, no people, no on-screen text." },
    { cat: "Career", title: "Interview story", desc: "Situation, action, result.", seed: "Turn this messy work story into a 90-second interview answer: situation, what I did, result with a number if I provided one. Don’t invent metrics." },
    { cat: "Career", title: "LinkedIn without cringe", desc: "What you did, not what AI is.", seed: "Write a LinkedIn post about finishing a 30-day AI habit at work. 80 words, no hashtags, no ‘game-changer’, one concrete result." },
    { cat: "Safety", title: "Redact before paste", desc: "Role A, Client B, ranges.", seed: "Rewrite this text for pasting into a public AI tool. Replace people with Role A/B, companies with Client A/B, money with ranges. List what you removed." },
    { cat: "Safety", title: "Policy in one page", desc: "Never-paste rules a team will read.", seed: "Write a one-page AI use policy for a 10-person shop: approved tools, never-paste list, Safe/Verify/Escalate, who to ask. Plain language." },
  ];

  const INTENTS = [
    { re: /email|reply|inbox|outreach|cold email/i, type: "email", role: "a concise professional communications specialist who writes like a real person" },
    { re: /sms|text message|job update/i, type: "sms", role: "a field coordinator who writes short, clear customer texts" },
    { re: /estimate|quote|invoice|trades|job notes/i, type: "trades", role: "an operations writer for trades businesses who keeps language plain and numbers honest" },
    { re: /meeting|agenda|notes|huddle/i, type: "meeting", role: "an executive assistant who turns messy talk into decisions and owners" },
    { re: /blog|article|post|newsletter/i, type: "writing", role: "a practical editor who writes in a human voice and hates filler" },
    { re: /caption|instagram|social|tiktok/i, type: "social", role: "a social writer for small businesses who keeps posts short and local" },
    { re: /code review|function|script|debug|refactor/i, type: "code", role: "a senior software engineer doing a careful review" },
    { re: /lesson|teach|quiz|handout|curriculum/i, type: "teach", role: "an adult-education instructor who teaches one skill at a time" },
    { re: /sop|runbook|process|standard operating/i, type: "sop", role: "an operations analyst who writes procedures a new hire can follow" },
    { re: /compare|pros and cons|recommend|options/i, type: "compare", role: "a neutral evaluator who separates evidence from opinion" },
    { re: /research|summarize|sources|literature/i, type: "research", role: "a research assistant who labels facts, guesses, and things to verify" },
    { re: /image prompt|midjourney|product shot|veo|sora/i, type: "image", role: "an art director writing image and video prompts with camera language" },
    { re: /follow-up|sales|lead|sequence/i, type: "sales", role: "a sales writer who is useful, not pushy" },
    { re: /rewrite|voice|tone|my style/i, type: "voice", role: "an editor who matches a provided voice sample and strips generic AI phrasing" },
    { re: /hallucin|fact.check|verify|safe \/ verify/i, type: "safety", role: "a fact-check assistant who never adds new claims" },
  ];

  const MODEL_HINTS = {
    chatgpt: "Use clear markdown headings and numbered steps. Put the deliverable first.",
    claude: "Use XML-style sections such as <role>, <context>, <task>, <constraints>, <output>. Be explicit and thorough.",
    gemini: "Use short labeled sections and bullets. State format up front. Keep instructions scannable.",
    grok: "Be direct. No corporate fluff. Put the job in the first two lines, then constraints, then output shape.",
    copilot: "Assume the user is inside Microsoft 365. Prefer tables, Outlook-ready wording, and steps a coworker can paste.",
    perplexity: "Ask for sources, dates, and a split between confirmed and unverified. Ban invented citations.",
    deepseek: "Prefer precise, technical structure. Ask for step-by-step reasoning on analysis or code tasks.",
    llama: "Keep the prompt self-contained. Repeat the output format at the end. Avoid relying on hidden system style.",
  };

  const els = {};
  let currentModel = "chatgpt";
  let lastPrompt = "";
  let lastDesc = "";
  let history = [];
  let typing = false;
  let grokReady = false;

  function $(id) {
    return document.getElementById(id);
  }

  function detect(text) {
    for (let i = 0; i < INTENTS.length; i++) {
      if (INTENTS[i].re.test(text)) return INTENTS[i];
    }
    return { type: "general", role: "a sharp, practical assistant who follows instructions exactly and never invents facts" };
  }

  function pick(text, re, fallback) {
    const m = text.match(re);
    return m ? m[1].trim() : fallback;
  }

  function engineer(description, model, refine) {
    const d = (description || "").trim();
    const intent = detect(d);
    const audience = pick(d, /(?:for|audience[: ]+)([^.,\n]{3,60})/i, "the person who asked");
    const length = pick(d, /(\d+\s*(?:words?|minutes?|bullets?|pages?))/i, "");
    const tone = pick(d, /(friendly|formal|direct|warm|blunt|professional|casual|plain)/i, "plain and human");
    const formatHint =
      /table/i.test(d) ? "table" :
      /bullets|list/i.test(d) ? "bullets" :
      /email/i.test(d) ? "email" :
      /sms|text/i.test(d) ? "SMS under 240 characters" :
      /json/i.test(d) ? "JSON" :
      "the shape implied by the task";

    const extra = refine ? refine.trim() : "";
    const modelHint = MODEL_HINTS[model] || MODEL_HINTS.chatgpt;

    const claude = model === "claude";
    const wrap = function (tag, body) {
      if (claude) return "<" + tag + ">\n" + body + "\n</" + tag + ">";
      return tag.toUpperCase() + "\n" + body;
    };

    const role = wrap(
      "role",
      "You are " + intent.role + ".\nWrite for " + audience + ".\nVoice: " + tone + ". No generic AI phrasing (avoid delve, landscape, leverage, tapestry)."
    );

    const context = wrap(
      "context",
      "The user asked, in their own words:\n\"" + d + "\"\n" +
      "Assume a working adult, not a researcher. If details are missing, state your assumptions in a short list at the end. Do not silently invent names, prices, dates, or sources."
    );

    const task = wrap(
      "task",
      "Produce the deliverable they asked for. Do the job, don't narrate how you would do it.\n" +
      (length ? "Length target: " + length + ".\n" : "") +
      "If the request is too vague to ship, ask up to 3 clarifying questions AND still give a strong first draft using labeled assumptions."
    );

    const constraints = wrap(
      "constraints",
      [
        "- Follow the user's must/avoid rules if they named any.",
        "- Never invent citations, quotes, statistics, or URLs.",
        "- Never include private data the user did not provide.",
        "- If numbers, legal, medical, HR, or safety are involved, flag what a human must check.",
        "- Keep the output ready to paste.",
        extra ? "- Extra direction from the user: " + extra : "",
      ].filter(Boolean).join("\n")
    );

    const output = wrap(
      "output_format",
      "Use this shape: " + formatHint + ".\n" + modelHint + "\nEnd with:\n1) Assumptions I made\n2) What you should verify before sending"
    );

    return [role, context, task, constraints, output].join("\n\n");
  }

  function scoreOf(prompt) {
    const p = (prompt || "").toLowerCase();
    let complete = 0;
    if (/role/.test(p)) complete += 8;
    if (/task|deliverable/.test(p)) complete += 8;
    if (/context|audience|user asked/.test(p)) complete += 7;
    if (/format|output/.test(p)) complete += 6;
    if (/constraint|must|avoid|never/.test(p)) complete += 6;
    complete = Math.min(35, complete);

    let spec = 0;
    if (/\d+/.test(p)) spec += 8;
    if (/audience|for /.test(p)) spec += 6;
    if (p.length > 500) spec += 6;
    if (!/\b(stuff|things|nice|good)\b/.test(p)) spec += 5;
    spec = Math.min(25, spec);

    let struct = 0;
    if (/tone|voice/.test(p)) struct += 7;
    if (/table|bullets|email|json|sms|markdown|xml/.test(p)) struct += 7;
    if (/avoid|never|do not|don't/.test(p)) struct += 6;
    struct = Math.min(20, struct);

    let enh = 0;
    if (/example|sample/.test(p)) enh += 7;
    if (/verify|assumption/.test(p)) enh += 7;
    if (/step-by-step|reasoning/.test(p)) enh += 6;
    enh = Math.min(20, enh);

    const total = complete + spec + struct + enh;
    return { total: total, complete: complete, spec: spec, struct: struct, enh: enh };
  }

  function setScore(s) {
    if (!els.scoreRing) return;
    els.scoreRing.style.setProperty("--pct", s.total + "%");
    els.scoreNum.textContent = String(s.total);
    els.scoreCats.innerHTML =
      "<strong>Completeness</strong> " + s.complete + "/35 · " +
      "<strong>Specificity</strong> " + s.spec + "/25 · " +
      "<strong>Structure</strong> " + s.struct + "/20 · " +
      "<strong>Enhancement</strong> " + s.enh + "/20";
  }

  function renderChips() {
    els.models.innerHTML = "";
    MODELS.forEach(function (m) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "model-chip" + (m.id === currentModel ? " on" : "");
      b.textContent = m.name;
      b.addEventListener("click", function () {
        currentModel = m.id;
        renderChips();
      });
      els.models.appendChild(b);
    });
  }

  function renderTemplates() {
    els.templates.innerHTML = "";
    TEMPLATES.forEach(function (t) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "card tpl-card";
      b.innerHTML = '<p class="section-label" style="margin:0 0 .35rem">' + t.cat + "</p><h3>" + t.title + '</h3><p class="muted">' + t.desc + "</p>";
      b.addEventListener("click", function () {
        els.input.value = t.seed;
        els.input.focus();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      els.templates.appendChild(b);
    });
  }

  function typeOut(text) {
    typing = true;
    els.out.textContent = "";
    const caret = document.createElement("span");
    caret.className = "caret";
    els.out.appendChild(caret);
    let i = 0;
    const step = Math.max(2, Math.floor(text.length / 180));
    return new Promise(function (resolve) {
      function tick() {
        if (!typing) return;
        i = Math.min(text.length, i + step);
        els.out.textContent = text.slice(0, i);
        els.out.appendChild(caret);
        if (i >= text.length) {
          typing = false;
          caret.remove();
          resolve();
          return;
        }
        setTimeout(tick, 12);
      }
      tick();
    });
  }

  async function pingGrok() {
    try {
      const r = await fetch("/api/health", { cache: "no-store" });
      if (!r.ok) return false;
      const j = await r.json();
      grokReady = !!j.ai;
      if (els.engineNote) {
        els.engineNote.textContent = grokReady
          ? "Live Grok engineer is on. Your description is expanded by the model, then formatted for the tool you picked."
          : "Running the on-page engineer (no server key). Same 5-element structure. Start the local API server to use live Grok.";
      }
      return grokReady;
    } catch (e) {
      grokReady = false;
      if (els.engineNote) {
        els.engineNote.textContent = "On-page engineer is ready. No signup. Copy into any model.";
      }
      return false;
    }
  }

  async function generateFromServer(description, model, refine) {
    const r = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: description,
        targetModel: model,
        refine: refine || "",
        history: history.slice(-6),
      }),
    });
    if (!r.ok) throw new Error("generate failed");
    const j = await r.json();
    if (!j.prompt) throw new Error("empty");
    return j.prompt;
  }

  async function run(refine) {
    const description = (els.input.value || "").trim();
    if (!description) {
      els.input.focus();
      return;
    }
    lastDesc = description;
    els.go.disabled = true;
    els.go.textContent = "Engineering…";
    let prompt = "";
    try {
      if (grokReady) {
        try {
          prompt = await generateFromServer(description, currentModel, refine);
        } catch (e) {
          prompt = engineer(description, currentModel, refine);
        }
      } else {
        prompt = engineer(description, currentModel, refine);
      }
      lastPrompt = prompt;
      history.push({ role: "user", content: description + (refine ? "\nRefine: " + refine : "") });
      history.push({ role: "assistant", content: prompt });
      await typeOut(prompt);
      setScore(scoreOf(prompt));
    } finally {
      els.go.disabled = false;
      els.go.textContent = "Generate expert prompt";
    }
  }

  function copyOut() {
    if (!lastPrompt) return;
    navigator.clipboard.writeText(lastPrompt).then(function () {
      els.copy.textContent = "Copied";
      setTimeout(function () { els.copy.textContent = "Copy prompt"; }, 1400);
    });
  }

  function init() {
    els.input = $("gen-input");
    els.out = $("gen-out");
    els.models = $("gen-models");
    els.go = $("gen-go");
    els.copy = $("gen-copy");
    els.refine = $("gen-refine");
    els.refineGo = $("gen-refine-go");
    els.scoreRing = $("gen-score-ring");
    els.scoreNum = $("gen-score-num");
    els.scoreCats = $("gen-score-cats");
    els.templates = $("gen-templates");
    els.engineNote = $("gen-engine-note");
    if (!els.input) return;
    renderChips();
    renderTemplates();
    setScore({ total: 0, complete: 0, spec: 0, struct: 0, enh: 0 });
    pingGrok();
    els.go.addEventListener("click", function () { run(""); });
    els.copy.addEventListener("click", copyOut);
    els.refineGo.addEventListener("click", function () {
      const note = (els.refine.value || "").trim();
      if (!lastPrompt && !(els.input.value || "").trim()) return;
      run(note);
    });
    els.input.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") run("");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
