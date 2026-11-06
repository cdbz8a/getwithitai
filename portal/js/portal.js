const MODULES = [{"id": 1, "block": "Foundations", "title": "Welcome and task harvest", "minutes": 20, "goal": "Leave with a short list of real jobs from your week, so every later exercise uses your own work.", "paras": ["This course is about the work you already do: emails, minutes, reports, forms, and the message you have been putting off.", "Before any tools, write down the jobs that eat the week. Specific is better. \"Writing reports\" is thin. \"The Monday safety summary for a crew of 12\" is useful.", "You will come back to this list in almost every module. If the list is real, the practice is real."], "exercise": "List up to 10 tasks that repeat or drag. Then mark your top 3, the ones that would save the most time if a first draft existed.", "check": {"q": "What is the task harvest for?", "options": ["To rank how well you do your job", "To collect real tasks you will practice on", "To pick a paid AI subscription"], "a": 1}}, {"id": 2, "block": "Foundations", "title": "The wake-up call", "minutes": 20, "goal": "See the gap between a 1960s chatbot and a current AI app, using the same questions.", "paras": ["In 1966, ELIZA held a simple conversation by matching keywords. People thought it understood them. It did not.", "A current app such as ChatGPT, Claude, Gemini, or Copilot predicts a useful next answer from a huge amount of text. It still does not know your workplace. It only has what you give it in the chat.", "Try the same plain question in an old pattern-matcher if you have one, then in a modern app. Notice what changed, and what is still just a confident draft."], "exercise": "Ask one work question two ways: vague, then specific. Paste both answers here and note one difference.", "check": {"q": "What changed between ELIZA and a modern AI app?", "options": ["Modern apps look up a stored answer and stop", "Modern apps write a new draft from patterns in text", "Modern apps are always correct"], "a": 1}}, {"id": 3, "block": "Foundations", "title": "What AI is and how it gets things wrong", "minutes": 20, "goal": "Explain in plain words why an answer can sound sure and still be wrong.", "paras": ["These apps predict likely words. They are built to sound fluent. Fluency is not the same as being right.", "Typical misses: a date that was never in the source, a citation that does not exist, a number that was rounded into fiction, and a policy summarized as the opposite of what it says.", "The fix is a checking habit, not a smarter prompt alone. Small jobs get a quick read. Anything public or official gets a slower check against the source."], "exercise": "Ask for a short fact you already know is easy to get wrong (a date, a rule, a name). Write down whether the answer was right, and how you checked.", "check": {"q": "Why can an AI answer sound sure and still be wrong?", "options": ["Because it is trained to sound fluent, not to guarantee facts", "Because it only works offline", "Because short prompts are always safer"], "a": 0}}, {"id": 4, "block": "Foundations", "title": "Choosing your tools", "minutes": 20, "goal": "Pick one main app and one backup that fit your work.", "paras": ["You do not need five subscriptions. Free plans cover this course.", "ChatGPT, Claude, Gemini, and Copilot are general writers. Perplexity is stronger when you want sources you can click. Copilot and Gemini sit inside Microsoft and Google tools you may already have.", "Pick a main app you will open first, and a backup for when the first one is down or weak at a task. Write the names down."], "exercise": "Name your main app and your backup. One sentence each: what you will use it for this month.", "check": {"q": "What does this module ask you to leave with?", "options": ["A paid plan for every brand", "One main app and one backup", "A custom model you trained yourself"], "a": 1}}, {"id": 5, "block": "Foundations", "title": "Memory and context", "minutes": 20, "goal": "Know when a chat has gone stale and it is time to start a new one.", "paras": ["The app only sees the current conversation, plus whatever you paste. It does not remember last Tuesday unless that text is still in this chat or you put it in a saved instruction.", "Long chats get muddy. The app starts mixing an old draft with the new ask. That is the usual reason a later answer feels strange.", "When the job changes, start a fresh chat. Paste only what this job needs: the task, the reader, and the source."], "exercise": "Find one chat that drifted. Write the first request and what it is doing now. Then write the one-line brief you would paste into a fresh chat.", "check": {"q": "When should you start a new chat?", "options": ["Only when the app crashes", "When the job changes or the thread is mixing old instructions", "After every single sentence"], "a": 1}}, {"id": 6, "block": "Prompting", "title": "The four-part prompt", "minutes": 20, "goal": "Write prompts as job, reader, shape, and background, until it is automatic.", "paras": ["A useful prompt has four parts. The job: what to produce. The reader: who it is for. The shape: length, tone, and format. The background: the facts it must use.", "Skip the background and it invents. Skip the reader and the tone is generic. Skip the shape and you get a wall of text.", "Practice on one item from your task harvest until you can write the four parts without looking them up."], "exercise": "Write one four-part prompt for your top task. Label each part: job, reader, shape, background.", "check": {"q": "Which part stops the app from inventing facts?", "options": ["The shape", "The background you provide", "The reader's job title"], "a": 1}}, {"id": 7, "block": "Prompting", "title": "Steering and follow-ups", "minutes": 20, "goal": "Change a draft with short follow-ups instead of starting over.", "paras": ["The first answer is a draft. Tell it what to change: shorter, warmer, one date, cut the second paragraph, end with a question.", "The interview method works when you are not sure what you want yet. Ask the app to ask you five questions before it writes.", "One change at a time is easier to judge than \"make it better.\""], "exercise": "Run your module 6 prompt. Then write two follow-ups you actually sent, and what changed in the draft.", "check": {"q": "What is a follow-up for?", "options": ["To replace the whole prompt with a new topic", "To change one thing in the draft you already have", "To delete the chat history on the vendor's servers"], "a": 1}}, {"id": 8, "block": "Prompting", "title": "Roles, examples, and templates", "minutes": 20, "goal": "Save one reusable template for a job you do every week.", "paras": ["A role is a short brief: \"You write the Monday update for a small crew. Plain language. No slogans.\"", "An example teaches faster than adjectives. Paste one message you were happy with and say \"match this shape, not these facts.\"", "Turn the prompt you will reuse into a template with blanks: [reader], [deadline], [facts]. Keep it somewhere you will find on Monday."], "exercise": "Save one template with blanks for a weekly job. Paste it here.", "check": {"q": "Why paste an example of your own writing?", "options": ["So the app copies your private facts into other chats", "So it can match the shape and tone of work you already like", "So you can skip checking the result"], "a": 1}}, {"id": 9, "block": "Prompting", "title": "Making it sound like you", "minutes": 20, "goal": "Remove the stock phrases that make a draft sound like nobody.", "paras": ["AI drafts lean on the same openers: \"I hope this message finds you well,\" \"delve,\" \"certainly,\" stacked benefits, and a cheerful close that you would never say.", "Give it two or three sentences you actually wrote. Say: match this voice. Cut anything I would not send.", "You still edit the last pass. The point is a draft in your voice, not a draft you can send blind."], "exercise": "Paste a stiff AI paragraph and the rewrite after a voice pass. Circle one phrase you deleted.", "check": {"q": "Who is responsible for the final wording?", "options": ["The AI vendor", "You, after you read it", "Whoever receives the message"], "a": 1}}, {"id": 10, "block": "Real work", "title": "Email and hard messages", "minutes": 20, "goal": "Draft one real email you have been avoiding, then edit it yourself.", "paras": ["Use the four-part prompt on a reply, a follow-up, a polite no, or the message sitting in drafts.", "Replace real names and account numbers with Person A and Person B before you paste. Put the real names back only on your own screen, after the draft is right.", "Two rounds of edits is usually enough: shorter, then warmer or firmer. You press send."], "exercise": "Draft the email you owe someone. Save the prompt and your final version here. Do not include private names.", "check": {"q": "What do you do with real names before pasting into a public AI tool?", "options": ["Leave them in so the draft is accurate", "Swap them for placeholders, then put them back yourself", "Email the whole inbox export"], "a": 1}}, {"id": 11, "block": "Real work", "title": "Minutes, reports, and documents", "minutes": 20, "goal": "Turn messy notes into a clean summary with owners and dates.", "paras": ["Paste rough notes and ask for: a short summary, decisions, and action items with an owner and a date.", "If an owner or date was not in your notes, tell it to mark that item as missing instead of inventing one.", "A briefing note or the start of a report uses the same shape: purpose, facts, decision needed."], "exercise": "Turn one set of messy notes into minutes. List any item the app tried to invent.", "check": {"q": "If a deadline was not in your notes, the draft should:", "options": ["Invent a reasonable Friday", "Mark the date as missing", "Drop the action item"], "a": 1}}, {"id": 12, "block": "Real work", "title": "Reading long documents", "minutes": 20, "goal": "Pull a plain summary and every deadline out of a long document.", "paras": ["Paste a policy, a report, or a long email thread. Ask for five bullets, every date or deadline, and questions you should ask a person.", "Then ask two follow-ups about a section you care about. If the answer is not in the text, it should say so.", "Do not paste documents you are not allowed to share. Use a public sample or a redacted copy."], "exercise": "Summarize one long document. Copy out the deadlines it found, and mark any you could not see in the source.", "check": {"q": "A good follow-up after a summary is:", "options": ["\"Is this legal advice I can rely on?\"", "\"Which paragraph mentions the deadline, and quote it.\"", "\"Rewrite this as a poem.\""], "a": 1}}, {"id": 13, "block": "Real work", "title": "Spreadsheets and numbers", "minutes": 20, "goal": "Clean a messy list or get one formula you can check.", "paras": ["Paste a small sample, not a whole private workbook. Ask it to describe the mess, then propose steps or a formula.", "You check the formula on two rows you already know the answer to. If those fail, the formula is wrong.", "Use this for cleanup, labels, and formulas you forget. Do not use it as the only check on a budget that will be published."], "exercise": "Describe one spreadsheet job. Paste the formula or the cleanup steps, and how you tested them.", "check": {"q": "How do you test a formula the app suggested?", "options": ["Trust it if the explanation sounds right", "Run it on rows where you already know the answer", "Apply it to the full private workbook first"], "a": 1}}, {"id": 14, "block": "Real work", "title": "Meetings and planning", "minutes": 20, "goal": "Leave with an agenda or a project broken into steps, owners, and dates.", "paras": ["An agenda needs a purpose, a length, and the decision you need before people stand up.", "A plan needs steps a person can do this week, not a slogan. Ask for owner, date, and what done looks like.", "If you do not know the owner yet, leave the blank. Do not let the draft assign a person who was never in the meeting."], "exercise": "Build either a timed agenda or the first two weeks of a project from your task list. Keep the blanks honest.", "check": {"q": "A useful agenda ends with:", "options": ["A motivational quote", "A decision, owners, and a time limit", "Every topic anyone might raise"], "a": 1}}, {"id": 15, "block": "Safe and sticky", "title": "Checking the output", "minutes": 20, "goal": "Use a checking routine that matches how much the mistake would cost.", "paras": ["Quick check for a low-stakes note: names, dates, and one fact you know.", "Slow check for anything public, financial, or about a person: every claim against the source, and a second read for tone.", "If you cannot point at the source, do not send the sentence."], "exercise": "Take one draft from an earlier module. List three things you checked and one change you made.", "check": {"q": "A public or official draft needs:", "options": ["The same glance as a sticky note", "A slower check against the source", "No human reading, if the prompt was detailed"], "a": 1}}, {"id": 16, "block": "Safe and sticky", "title": "Privacy and workplace rules", "minutes": 20, "goal": "Know what never goes into a public AI tool, and how placeholders work.", "paras": ["Do not paste passwords, health details, child information, government ID, banking data, or anything your workplace marks confidential.", "The placeholder method: Person A, Account 1, Site B. You keep the real key on your machine.", "If your organization has an AI rule, follow it. If it does not, use the strict version until someone writes one: no secrets, no private files, you check the output."], "exercise": "Rewrite one risky prompt so the private details are placeholders. Note what you removed.", "check": {"q": "Which of these is fine to paste into a public AI chat?", "options": ["A client's full medical note", "A redacted agenda with Person A and a public deadline", "A spreadsheet of bank account numbers"], "a": 1}}, {"id": 17, "block": "Safe and sticky", "title": "Ethics and when to leave AI out", "minutes": 20, "goal": "Decide which jobs you will not hand to an app, and when you tell people AI helped.", "paras": ["Some work should stay with a person from start to finish: a decision about someone's job, a finding you will sign, a message that needs your judgment about a relationship.", "If AI drafted it and a reader would reasonably want to know, say so in plain words. You do not need a speech. One line is enough.", "Do not present generated text as research you did, or as a quote from a person who did not say it."], "exercise": "Name one task you will keep doing yourself, and one task where you will say that AI helped with the draft.", "check": {"q": "A decision about someone's job should be:", "options": ["Left to the app if the prompt is careful", "Made by a person, even if a draft helped you think", "Posted publicly so the model can learn"], "a": 1}}, {"id": 18, "block": "Safe and sticky", "title": "Your 18-day plan", "minutes": 20, "goal": "Start tomorrow with one skill, one tool, and one real job.", "paras": ["A training day fades if you do not use it. For the next 18 days, do one small skill on real work. About 15 minutes.", "Each day in the portal names the skill and the job. Write what you tried. That note is the point.", "Your prompt library is the templates you saved, not a pile of examples from the internet. Day 1 is tomorrow morning."], "exercise": "Write day 1: the skill, the tool, and the real job. Put a time on your calendar.", "check": {"q": "The 18-day challenge is:", "options": ["Eighteen hours of new lessons", "One short practice a day on your own work", "A score that ranks you against other students"], "a": 1}}];
const DAYS = [{"n": 1, "skill": "Four-part prompt", "job": "Write one email with job, reader, shape, and background."}, {"n": 2, "skill": "One follow-up", "job": "Change a single thing in yesterday's draft."}, {"n": 3, "skill": "Fresh chat", "job": "Start a new chat when the job changes. Paste only what this job needs."}, {"n": 4, "skill": "Your tools", "job": "Do the same small task in your main app. Note one limit."}, {"n": 5, "skill": "A template", "job": "Save one weekly job as a template with blanks."}, {"n": 6, "skill": "Your voice", "job": "Delete one stock phrase from a draft."}, {"n": 7, "skill": "A hard message", "job": "Draft the email you have been avoiding. You send it."}, {"n": 8, "skill": "Minutes", "job": "Turn rough notes into decisions and actions. No invented dates."}, {"n": 9, "skill": "A long document", "job": "Pull five bullets and every deadline. Check one quote."}, {"n": 10, "skill": "A spreadsheet", "job": "Get one formula and test it on two known rows."}, {"n": 11, "skill": "An agenda", "job": "Write a timed agenda that ends with a decision."}, {"n": 12, "skill": "A project slice", "job": "Break one job into steps for the next two weeks."}, {"n": 13, "skill": "A quick check", "job": "Names, dates, and one fact before you send."}, {"n": 14, "skill": "A slow check", "job": "Match every claim in one draft to a source."}, {"n": 15, "skill": "Placeholders", "job": "Rewrite a prompt so private details stay out."}, {"n": 16, "skill": "Leave it out", "job": "Do one task with no AI, on purpose."}, {"n": 17, "skill": "Say so", "job": "Add one plain line when AI helped with a draft."}, {"n": 18, "skill": "Your library", "job": "Gather the templates you will actually reuse next month."}];
const PROMPTS = [{"cat": "Email", "title": "Follow-up", "text": "I am a [role]. I sent [CLIENT] a [quote or note] [X] days ago and have not heard back. Write a follow-up under 100 words. Warm, specific, no \"just following up.\" Facts I can use: [facts]."}, {"cat": "Email", "title": "A hard note", "text": "I need to say [decision] to [role, not a private name]. Tone: firm and respectful. Outcome: [outcome]. What I already tried: [attempts]. Under 200 words. Do not invent details."}, {"cat": "Email", "title": "After a meeting", "text": "Rough notes: [notes]. Write a short summary, then action items with owner and date. If an owner or date is not in the notes, write MISSING. Then a follow-up email under 150 words."}, {"cat": "Documents", "title": "Weekly update", "text": "Point form from this week: [points]. Write a short update for [reader]: wins, status, blockers, next week. Short paragraphs."}, {"cat": "Documents", "title": "Cover note for a quote", "text": "I do [service] in [place]. The job: [project]. Why us: [three facts]. Write a one-page cover note. No generic claims."}, {"cat": "Documents", "title": "A procedure", "text": "Procedure: [name]. Steps I actually follow: [steps]. Reader: a new person. Include overview, what you need, steps, common mistakes, and a checklist."}, {"cat": "Research", "title": "Read this", "text": "I will paste a document. Give five bullets, every deadline with a quote, and anything I must decide. If it is not in the text, say so."}, {"cat": "Research", "title": "A choice", "text": "I am choosing between [A] and [B]. Context: [facts]. Give pros and cons, the one factor that matters most, and a recommendation. Be direct."}, {"cat": "Planning", "title": "Two weeks", "text": "Project: [what]. Done looks like: [outcome]. Deadline: [date]. People and limits: [resources]. Give steps for the next two weeks with owner or BLANK, and a date."}, {"cat": "Planning", "title": "Agenda", "text": "Meeting: [type]. [N] people. [X] minutes. Decision needed: [decision]. Build a timed agenda that ends with owners."}];
const USERS = {
  "demo@getwithitai.com": { password: "DemoHero123", name: "Demo Student" }
};
const CODES = ["GETHERO2026", "AIHERO2026", "GWIACADEMY"];
const KEY = "gwi2";

const state = {
  user: null,
  done: [],
  days: [],
  notes: {},
  page: "home"
};

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    state.done = raw.done || [];
    state.days = raw.days || [];
    state.notes = raw.notes || {};
    state.user = raw.user || null;
  } catch (e) {
    state.done = [];
  }
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      user: state.user, done: state.done, days: state.days, notes: state.notes
    }));
  } catch (e) {}
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
}
function $(id) { return document.getElementById(id); }

function setError(msg) { $("login-error").textContent = msg || ""; }

function bootLogin() {
  $("login-form").onsubmit = (e) => {
    e.preventDefault();
    if (document.activeElement === $("code") && $("code").value.trim()) {
      openWithCode();
      return;
    }
    const email = $("email").value.trim().toLowerCase();
    const pass = $("pass").value.trim();
    const user = USERS[email];
    if (!user || user.password !== pass) {
      setError("That email and password do not match. The demo account is filled in, or use the access code below.");
      return;
    }
    enter({ name: user.name, email });
  };
  $("code-btn").onclick = openWithCode;
}
function openWithCode() {
  const code = $("code").value.trim().toUpperCase().replace(/\s+/g, "");
  if (!CODES.includes(code)) {
    setError("That code is not recognized. Use the code from your instructor, with no extra spaces.");
    return;
  }
  enter({ name: "Student", email: "code@" + code.toLowerCase() });
}

function enter(user) {
  state.user = user;
  save();
  $("login").classList.add("hidden");
  $("app").classList.remove("hidden");
  $("who").textContent = user.name;
  $("who-mail").textContent = user.email;
  renderNav();
  show("home");
}

function renderNav() {
  const nav = $("nav");
  nav.textContent = "";
  const addLabel = (text) => {
    const p = document.createElement("div");
    p.className = "nav-label";
    p.textContent = text;
    nav.appendChild(p);
  };
  const addBtn = (id, label, done) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.page = id;
    b.textContent = label;
    if (done) b.classList.add("done");
    b.onclick = () => { show(id); $("side").classList.remove("open"); };
    nav.appendChild(b);
  };
  addLabel("Course");
  addBtn("home", "Overview");
  MODULES.forEach(m => addBtn("m" + m.id, m.id + ". " + m.title, state.done.includes(m.id)));
  addLabel("Practice");
  addBtn("days", "18-day challenge");
  addBtn("prompts", "Prompt library");
  addBtn("certificate", "Certificate");
  addBtn("help", "Help");
  const pct = Math.round(state.done.length / MODULES.length * 100);
  $("prog-label").textContent = state.done.length + " of " + MODULES.length;
  $("prog-bar").style.width = pct + "%";
  nav.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.page === state.page));
}

function show(page) {
  state.page = page;
  renderNav();
  const view = $("view");
  const names = {
    home: "Overview", days: "18-day challenge", prompts: "Prompt library",
    certificate: "Certificate", help: "Help"
  };
  if (page.startsWith("m")) {
    const m = MODULES.find(x => "m" + x.id === page);
    $("crumb").textContent = "Module " + m.id;
    view.innerHTML = moduleView(m);
    bindModule(m);
  } else {
    $("crumb").textContent = names[page] || "Course";
    view.innerHTML = ({
      home: homeView, days: daysView, prompts: promptsView,
      certificate: certView, help: helpView
    }[page])();
    if (page === "days") bindDays();
    if (page === "prompts") bindCopy();
  }
  try { window.scrollTo(0, 0); } catch (e) {}
}

function homeView() {
  const next = MODULES.find(m => !state.done.includes(m.id)) || MODULES[0];
  const blocks = [];
  MODULES.forEach(m => {
    if (!blocks.length || blocks[blocks.length - 1].name !== m.block) blocks.push({ name: m.block, items: [] });
    blocks[blocks.length - 1].items.push(m);
  });
  const list = blocks.map(b => {
    const cards = b.items.map(m => {
      const done = state.done.includes(m.id) ? " done" : "";
      return `<button type="button" class="mod${done}" data-go="m${m.id}"><span class="num">${m.id}</span><span><strong>${esc(m.title)}</strong><br><span class="muted">${m.minutes} min</span></span></button>`;
    }).join("");
    return `<h3 class="block-h">${esc(b.name)}</h3>${cards}`;
  }).join("");
  return `
    <p class="kicker">AI Hero Academy</p>
    <h1>Learn to use AI on the work you already do.</h1>
    <p class="muted">Same 18 modules as getwithitai.com. About 20 minutes each. Mark a module done when you have finished the exercise.</p>
    <div class="grid">
      <div class="stat"><strong>${state.done.length} / 18</strong><span>Modules done</span></div>
      <div class="stat"><strong>${state.days.length} / 18</strong><span>Practice days</span></div>
      <div class="stat"><strong>${next.id}</strong><span>Up next</span></div>
    </div>
    <div class="card">
      <h2>${esc(next.title)}</h2>
      <p>${esc(next.goal)}</p>
      <button class="btn inline" type="button" id="go-next">Open module ${next.id}</button>
    </div>
    ${list}
  `;
}

function moduleView(m) {
  const note = state.notes[m.id] || "";
  const opts = m.check.options.map((o, i) =>
    `<label class="opt"><input type="radio" name="q" value="${i}"><span>${esc(o)}</span></label>`
  ).join("");
  const done = state.done.includes(m.id);
  return `
    <p class="kicker">Module ${m.id} · ${esc(m.block)} · ${m.minutes} min</p>
    <h1>${esc(m.title)}</h1>
    <p>${esc(m.goal)}</p>
    <div class="lesson">${m.paras.map(p => `<p>${esc(p)}</p>`).join("")}</div>
    <div class="card">
      <h2>Your turn</h2>
      <p>${esc(m.exercise)}</p>
      <textarea id="note" placeholder="Write the work here. It stays in this browser.">${esc(note)}</textarea>
    </div>
    <div class="card" id="check">
      <h2>Quick check</h2>
      <p>${esc(m.check.q)}</p>
      ${opts}
      <p id="feedback" class="hint"></p>
      <button class="ghost" type="button" id="check-btn">Check answer</button>
    </div>
    <div class="row">
      ${m.id > 1 ? `<button class="ghost" type="button" data-go="m${m.id - 1}">Back</button>` : ""}
      <button class="btn inline" type="button" id="complete">${done ? "Completed" : "Mark module done"}</button>
      ${m.id < 18 ? `<button class="ghost" type="button" data-go="m${m.id + 1}">Next</button>` : `<button class="ghost" type="button" data-go="days">18-day challenge</button>`}
    </div>
  `;
}

function bindModule(m) {
  const note = $("note");
  note.addEventListener("input", () => {
    state.notes[m.id] = note.value;
    save();
  });
  $("check-btn").onclick = () => {
    const picked = document.querySelector('input[name="q"]:checked');
    const fb = $("feedback");
    if (!picked) { fb.textContent = "Pick an answer."; return; }
    const ok = Number(picked.value) === m.check.a;
    fb.textContent = ok ? "That's the one." : "Not that one. The useful answer is: " + m.check.options[m.check.a];
  };
  $("complete").onclick = () => {
    if (!state.done.includes(m.id)) state.done.push(m.id);
    state.done.sort((a, b) => a - b);
    save();
    show(m.id < 18 ? "m" + (m.id + 1) : "days");
  };
  document.querySelectorAll("[data-go]").forEach(el => {
    if (el.id === "go-next") return;
    el.onclick = () => show(el.dataset.go);
  });
}

function daysView() {
  const cards = DAYS.map(d => {
    const on = state.days.includes(d.n) ? " on" : "";
    return `<label class="day${on}"><input type="checkbox" data-day="${d.n}" ${on ? "checked" : ""}><span><strong>Day ${d.n} · ${esc(d.skill)}</strong><br><span class="muted">${esc(d.job)}</span></span></label>`;
  }).join("");
  return `
    <p class="kicker">After the modules</p>
    <h1>18 days, one skill a day.</h1>
    <p class="muted">About 15 minutes on a real job. Check the day when you have done it and written a note for yourself.</p>
    <div class="days">${cards}</div>
  `;
}
function bindDays() {
  document.querySelectorAll("[data-day]").forEach(box => {
    box.onchange = () => {
      const n = Number(box.dataset.day);
      if (box.checked) { if (!state.days.includes(n)) state.days.push(n); }
      else state.days = state.days.filter(x => x !== n);
      state.days.sort((a, b) => a - b);
      save();
      show("days");
    };
  });
}

function promptsView() {
  const blocks = PROMPTS.map((p, i) => `
    <div class="card">
      <p class="kicker">${esc(p.cat)}</p>
      <h2>${esc(p.title)}</h2>
      <div class="prompt" id="pr${i}">${esc(p.text)}</div>
      <button class="ghost" type="button" data-copy="pr${i}">Copy</button>
    </div>
  `).join("");
  return `<p class="kicker">Copy and fill the blanks</p><h1>Prompt library</h1><p class="muted">Replace the brackets with this week's facts. Take private names out first.</p>${blocks}`;
}
function bindCopy() {
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.onclick = async () => {
      const text = $(btn.dataset.copy).textContent;
      try { await navigator.clipboard.writeText(text); btn.textContent = "Copied"; }
      catch (e) { btn.textContent = "Select and copy"; }
    };
  });
}

function certView() {
  const ready = state.done.length === 18;
  if (!ready) {
    return `<p class="kicker">Certificate</p><h1>Finish the 18 modules first.</h1><p>You have ${state.done.length} of 18 marked done. The certificate is a record that you worked through the course in this browser. It is not a licence or a grade.</p>`;
  }
  const name = esc(state.user.name || "Student");
  const when = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  return `
    <p class="kicker no-print">Ready to print</p>
    <div class="cert" id="cert">
      <p class="kicker">GetWithItAI</p>
      <h2>AI Hero Academy</h2>
      <p>This records that</p>
      <h1>${name}</h1>
      <p>worked through the 18 modules on using AI for everyday work.</p>
      <p class="muted">${when}</p>
    </div>
    <div class="row no-print"><button class="btn inline" type="button" onclick="window.print()">Print</button></div>
  `;
}

function helpView() {
  return `
    <p class="kicker">Help</p>
    <h1>How to use this portal</h1>
    <div class="card"><h2>Work in order</h2><p>Start at module 1. The exercise box saves as you type, in this browser only.</p></div>
    <div class="card"><h2>Same course as the website</h2><p>These are the 18 modules on <a href="https://getwithitai.com/course.html">getwithitai.com/course.html</a>. The free 28-minute lesson is there too.</p></div>
    <div class="card"><h2>Privacy</h2><p>Do not paste passwords, health information, or confidential files. Use placeholders. Progress is stored on this device, not on a GetWithItAI server.</p></div>
    <div class="card"><h2>Contact</h2><p><a href="mailto:getwithitai@protonmail.com">getwithitai@protonmail.com</a></p></div>
  `;
}

function start() {
  load();
  bootLogin();
  $("logout").onclick = () => {
    state.user = null;
    save();
    location.reload();
  };
  $("menu").onclick = () => $("side").classList.toggle("open");
  document.body.addEventListener("click", (e) => {
    if (e.target.closest("input, textarea, a")) return;
    if (e.target.id === "go-next" || e.target.closest("#go-next")) {
      const next = MODULES.find(m => !state.done.includes(m.id)) || MODULES[0];
      show("m" + next.id);
      return;
    }
    const go = e.target.closest("[data-go]");
    if (go && $("app") && !$("app").classList.contains("hidden")) show(go.dataset.go);
  });
  if (state.user) enter(state.user);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
