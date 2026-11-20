const MODULES = [{"id": 1, "block": "Foundations", "title": "Welcome and task harvest", "minutes": 20, "goal": "Leave with a short list of real jobs from your week, so every later exercise uses your own work.", "paras": ["This course is about the things you already do, at work and at home: messages, forms, plans, paperwork, and the message you have been putting off.", "Before any tools, write down the jobs that eat the week. Specific is better. \"Writing reports\" is thin. \"The Monday safety summary for a crew of 12\" is useful.", "You will come back to this list in almost every module. If the list is real, the practice is real."], "exercise": "List up to 10 tasks that repeat or drag. Then mark your top 3, the ones that would save the most time if a first draft existed.", "check": {"q": "What is the task harvest for?", "options": ["To rank how well you do your job", "To collect real tasks you will practice on", "To pick a paid AI subscription"], "a": 1}}, {"id": 2, "block": "Foundations", "title": "Setting it up for you", "minutes": 20, "goal": "Set up custom instructions and memory in your main app so it knows your job before you ask.", "paras": ["Every main app has a place to tell it about you: ChatGPT has custom instructions and memory, Claude has preferences, Copilot and Gemini have personal settings. Most people never open them.", "Write a few lines: what you do, who you write for, how you like answers (short, plain, Canadian spelling), and what to never do. Leave out anything private.", "Then test it. Ask the same small question you asked before the setup and compare the two answers."], "exercise": "Write your custom instructions in five lines or fewer. Paste them here, then note one difference in the answers after you saved them.", "check": {"q": "What belongs in your custom instructions?", "options": ["Your banking details so it can help with bills", "Your role, your readers and how you like answers", "Nothing, the defaults are always best"], "a": 1}}, {"id": 3, "block": "Foundations", "title": "What AI is and how it gets things wrong", "minutes": 20, "goal": "Explain in plain words why an answer can sound sure and still be wrong.", "paras": ["Start with ELIZA, a chatbot from the 1960s, and ask a modern app the same question. Sixty years of progress in five minutes.", "These apps predict likely words. They are built to sound fluent, and fluency is not the same as being right. Typical misses: a date that was never in the source, a citation that does not exist, a policy summarized as its opposite.", "The fix is a checking habit, not a smarter prompt alone. Small jobs get a quick read. Anything public or official gets a slower check against the source."], "exercise": "Ask for a short fact you already know is easy to get wrong (a date, a rule, a name). Write down whether the answer was right, and how you checked.", "check": {"q": "Why can an AI answer sound sure and still be wrong?", "options": ["Because it looks up one true answer", "Because it predicts fluent words, and fluent is not the same as right", "Because the free plan is broken"], "a": 1}}, {"id": 4, "block": "Foundations", "title": "Your tools, inside and out", "minutes": 20, "goal": "Know what each main app is good at, find the one you already have, and pick a main app and a backup.", "paras": ["You may already pay for AI without knowing it. Copilot sits inside Microsoft 365: Word, Excel, PowerPoint, Outlook and Teams. Gemini sits inside Google Workspace: Gmail, Docs, Sheets and Slides.", "ChatGPT and Claude are strong general writers with Projects for ongoing work. Perplexity is best when you want sources you can click. Free plans cover this course.", "Pick a main app you will open first, and a backup for when the first one is weak at a task. If your workplace has an approved tool, that is your main app."], "exercise": "Name your main app and your backup. Then find AI inside one program you already use every day and try one small task there.", "check": {"q": "Where might you already have AI without a new subscription?", "options": ["Nowhere, it always costs extra", "Inside Microsoft 365 or Google Workspace", "Only on a new phone"], "a": 1}}, {"id": 5, "block": "Foundations", "title": "Projects and context", "minutes": 20, "goal": "Set up one Project, Gem or notebook for a job you do every week.", "paras": ["A chat only remembers so much. Long chats drift, and a new chat starts from nothing. That explains most strange results.", "Projects in ChatGPT and Claude, Gems in Gemini, and notebooks in NotebookLM hold the background for one ongoing job: instructions, examples and reference files. Every chat inside starts already knowing it.", "Start a fresh chat when the job changes. Keep each Project to one job, and leave private files out of public tools."], "exercise": "Create one Project, Gem or notebook for a weekly job. Add short instructions and one example. Note what you put in it.", "check": {"q": "What is a Project or Gem for?", "options": ["Holding the background for one ongoing job", "Storing every private file you own", "Making the app answer faster"], "a": 0}}, {"id": 6, "block": "Prompting", "title": "The four-part prompt", "minutes": 20, "goal": "Write prompts as job, reader, shape, and background, until it is automatic.", "paras": ["A useful prompt has four parts. The job: what to produce. The reader: who it is for. The shape: length, tone, and format. The background: the facts it must use.", "Skip the background and it invents. Skip the reader and the tone is generic. Skip the shape and you get a wall of text.", "Practice on one item from your task harvest until you can write the four parts without looking them up."], "exercise": "Write one four-part prompt for your top task. Label each part: job, reader, shape, background.", "check": {"q": "Which part stops the app from inventing facts?", "options": ["The shape", "The background you provide", "The reader's job title"], "a": 1}}, {"id": 7, "block": "Prompting", "title": "Steering and follow-ups", "minutes": 20, "goal": "Change a draft with short follow-ups instead of starting over.", "paras": ["The first answer is a draft. Tell it what to change: shorter, warmer, one date, cut the second paragraph, end with a question.", "The interview method works when you are not sure what you want yet. Ask the app to ask you five questions before it writes.", "One change at a time is easier to judge than \"make it better.\""], "exercise": "Run your module 6 prompt. Then write two follow-ups you actually sent, and what changed in the draft.", "check": {"q": "What is a follow-up for?", "options": ["To replace the whole prompt with a new topic", "To change one thing in the draft you already have", "To delete the chat history on the vendor's servers"], "a": 1}}, {"id": 8, "block": "Prompting", "title": "Templates, custom GPTs and Gems", "minutes": 20, "goal": "Turn one weekly job into a saved template, custom GPT or Gem.", "paras": ["A role and one good example lift the quality of any draft. Show it what good looks like instead of describing it.", "When a job repeats, save it. The simplest version is a template with blanks you fill in. The next step up is a custom GPT in ChatGPT or a Gem in Gemini: instructions and examples saved as your own little assistant.", "Name it for the job, test it on two real examples, and fix the instructions once instead of fixing every draft."], "exercise": "Pick one weekly job. Save it as a template with blanks, or build a custom GPT or Gem. Test it twice and note one fix.", "check": {"q": "What makes a saved assistant (GPT or Gem) worth building?", "options": ["A job you do every week the same way", "A one-time question", "Anything with private client data"], "a": 0}}, {"id": 9, "block": "Prompting", "title": "Making it sound like you", "minutes": 20, "goal": "Remove the stock phrases that make a draft sound like nobody.", "paras": ["AI drafts lean on the same openers: \"I hope this message finds you well,\" \"delve,\" \"certainly,\" stacked benefits, and a cheerful close that you would never say.", "Give it two or three sentences you actually wrote. Say: match this voice. Cut anything I would not send.", "You still edit the last pass. The point is a draft in your voice, not a draft you can send blind."], "exercise": "Paste a stiff AI paragraph and the rewrite after a voice pass. Circle one phrase you deleted.", "check": {"q": "Who is responsible for the final wording?", "options": ["The AI vendor", "You, after you read it", "Whoever receives the message"], "a": 1}}, {"id": 10, "block": "Real work", "title": "Email, letters and reports", "minutes": 20, "goal": "Draft one real message you have been avoiding and turn one set of messy notes into a clean summary.", "paras": ["Use the four-part prompt on a reply, a follow-up, a polite no, or the message sitting in drafts. Two rounds of edits is usually enough: shorter, then warmer or firmer. You press send.", "For notes, ask for a short summary, decisions, and action items with an owner and a date. If an owner or date was not in your notes, tell it to mark that item as missing instead of inventing one.", "If you have Copilot in Outlook or Gemini in Gmail, try the same job there. Swap real names for Person A and Person B in public tools."], "exercise": "Draft the email you owe someone, and turn one set of notes into minutes. Save the prompts. Do not include private names.", "check": {"q": "If a deadline was not in your notes, the draft should:", "options": ["Invent a reasonable Friday", "Mark the date as missing", "Drop the action item"], "a": 1}}, {"id": 11, "block": "Real work", "title": "Your own files", "minutes": 20, "goal": "Upload one real document and get a summary, every deadline, and answers you can check.", "paras": ["Every main app reads files now: PDFs, Word documents, spreadsheets and photos of paper. Ask for a plain summary, then every date, dollar amount and obligation, with page or section numbers.", "Ask it which parts it is least sure about. Then check two of its claims against the document yourself.", "For several documents at once, NotebookLM keeps its answers tied to your sources. Receipts and photos can become a tidy table. Keep confidential files out of public tools."], "exercise": "Upload one long document. Get every deadline and figure with section numbers, and check two of them yourself.", "check": {"q": "After it summarizes a contract, you should:", "options": ["Send the summary as final", "Check key dates and figures against the document", "Delete the original"], "a": 1}}, {"id": 12, "block": "Real work", "title": "Excel, Sheets and numbers", "minutes": 20, "goal": "Clean one messy list and get one working formula you tested yourself.", "paras": ["Paste a messy list and ask for a clean table: one row per item, consistent dates, no duplicates.", "Ask for the formula you need in plain words, and ask it to explain each part. Copilot in Excel and Gemini in Sheets can do this inside the file.", "Test every formula on two rows where you already know the answer before you trust it on the rest."], "exercise": "Get one formula for a real sheet. Test it on two rows you can check by hand, and note the result.", "check": {"q": "Before trusting a new formula on the whole sheet:", "options": ["Test it on rows you already know the answer to", "Trust it if it looks complicated", "Ask a second app and pick the longer one"], "a": 0}}, {"id": 13, "block": "Real work", "title": "Planning and research", "minutes": 20, "goal": "Plan one real project in steps, and research one question with sources you check.", "paras": ["Give it the goal, the deadline and who is involved, and ask for steps with dates and owners. Then ask what it would cut if time ran short.", "For questions that need facts, use a tool that shows sources: Perplexity, or deep research in ChatGPT and Gemini. Open at least two sources yourself.", "A plan is a draft. You decide the dates. A research summary is a lead, not proof."], "exercise": "Break one real job into steps for the next two weeks. Then research one question and open two of the sources.", "check": {"q": "A research answer with sources should be:", "options": ["Trusted because it has links", "Checked by opening the sources", "Ignored"], "a": 1}}, {"id": 14, "block": "Real work", "title": "Images and presentations", "minutes": 20, "goal": "Make one image and one short presentation from your own material.", "paras": ["Describe an image the way you would brief a designer: subject, style, colours, words that must appear, and the size you need. Ideogram is strong with text in images.", "For presentations, paste your notes or outline into Gamma or Copilot in PowerPoint and ask for a set number of slides. Then fix the wording and swap in your own colours and logo.", "Check every fact on a slide, and only use images you are allowed to use. Do not make pictures of real people without their permission."], "exercise": "Make one image for a real post or notice, and a five-slide deck from your own notes. Note one fix you made by hand.", "check": {"q": "Before using an AI-made slide deck, you should:", "options": ["Present it as is", "Check every fact and put it on your own brand", "Add more slides"], "a": 1}}, {"id": 15, "block": "Level up and lock it in", "title": "Agents for the repeat work", "minutes": 20, "goal": "Hand one repeat task to an agent, and know where a person still has to check.", "paras": ["An agent is an AI that carries out a series of steps for you instead of answering one question: sorting, drafting a weekly summary, filling a table, or doing research on a schedule.", "Pick one task you repeat every week. Write the steps the way you would explain them to a new staff member, including when it should stop and ask you.", "Agents make mistakes too. Keep a person on anything that is sent, paid or published, and never give an agent access you would not give a new hire on day one."], "exercise": "Write the steps for one weekly task and set it up as an agent or a scheduled task in your app. Note where you will check its work.", "check": {"q": "What should an agent never do without a person checking?", "options": ["Draft a summary for you to read", "Send, pay or publish on its own", "Sort your notes into a table"], "a": 1}}, {"id": 16, "block": "Level up and lock it in", "title": "Checking the output", "minutes": 20, "goal": "Use a checking routine that matches how much the mistake would cost.", "paras": ["Quick check for a low-stakes note: names, dates, and one fact you know.", "Slow check for anything public, financial, or about a person: every claim against the source, and a second read for tone.", "If you cannot point at the source, do not send the sentence."], "exercise": "Take one draft from an earlier module. List three things you checked and one change you made.", "check": {"q": "A public or official draft needs:", "options": ["The same glance as a sticky note", "A slower check against the source", "No human reading, if the prompt was detailed"], "a": 1}}, {"id": 17, "block": "Level up and lock it in", "title": "Privacy, rules and ethics", "minutes": 20, "goal": "Know what stays out of public AI tools, how to work safely, and which jobs stay with a person.", "paras": ["Names with addresses, account numbers, health details, staff information and anything confidential stay out of public tools. Swap them for placeholders, get the draft, and put the real details back on your own screen.", "If your workplace has an approved tool or an AI policy, follow it first. If it has none, write three plain rules for your team: what never goes in, which tool to use, and who checks.", "Some work stays with a person: decisions about someone's job, anything you sign, messages that need judgment about a relationship. When AI drafted something a reader would want to know about, say so in one line."], "exercise": "Rewrite one prompt with placeholders. Name one task you will keep doing yourself, and one where you will say that AI helped.", "check": {"q": "A decision about someone's job should be:", "options": ["Left to the app if the prompt is careful", "Made by a person, even if a draft helped you think", "Decided by whichever app answers first"], "a": 1}}, {"id": 18, "block": "Level up and lock it in", "title": "Your 18-day plan", "minutes": 20, "goal": "Start tomorrow with one skill, one tool, and one real job.", "paras": ["A training day fades if you do not use it. For the next 18 days, do one small skill on real work. About 15 minutes.", "Each day in the portal names the skill and the job. Write what you tried. That note is the point.", "Your prompt library is the templates you saved, not a pile of examples from the internet. Day 1 is tomorrow morning."], "exercise": "Write day 1: the skill, the tool, and the real job. Put a time on your calendar.", "check": {"q": "The 18-day challenge is:", "options": ["Eighteen hours of new lessons", "One short practice a day on your own work", "A score that ranks you against other students"], "a": 1}}];
const DAYS = [{"n": 1, "skill": "Four-part prompt", "job": "Write one email with job, reader, shape, and background."}, {"n": 2, "skill": "One follow-up", "job": "Change a single thing in yesterday's draft."}, {"n": 3, "skill": "Set it up", "job": "Write or improve your custom instructions. Compare one answer before and after."}, {"n": 4, "skill": "A Project or Gem", "job": "Put the background for one weekly job into a Project, Gem or notebook."}, {"n": 5, "skill": "A saved assistant", "job": "Save one weekly job as a template, custom GPT or Gem. Test it twice."}, {"n": 6, "skill": "Your voice", "job": "Delete one stock phrase from a draft."}, {"n": 7, "skill": "A hard message", "job": "Draft the email you have been avoiding. You send it."}, {"n": 8, "skill": "Notes to actions", "job": "Turn rough notes into decisions and actions. No invented dates."}, {"n": 9, "skill": "A long document", "job": "Upload one document. Pull every deadline and check two of them."}, {"n": 10, "skill": "A spreadsheet", "job": "Get one formula and test it on two known rows."}, {"n": 11, "skill": "Research with sources", "job": "Research one question and open two of the sources yourself."}, {"n": 12, "skill": "A plan", "job": "Break one job into steps with dates and owners for the next two weeks."}, {"n": 13, "skill": "An image or a deck", "job": "Make one image or a five-slide deck from your own notes. Fix it by hand."}, {"n": 14, "skill": "An agent", "job": "Hand one repeat task to an agent or scheduled task. Decide where you check it."}, {"n": 15, "skill": "A quick check", "job": "Names, dates, and one fact before you send."}, {"n": 16, "skill": "Placeholders", "job": "Rewrite a prompt so private details stay out."}, {"n": 17, "skill": "Leave it out, say so", "job": "Do one task with no AI on purpose, and add one plain line when AI helped another."}, {"n": 18, "skill": "Your library", "job": "Gather the templates, Projects and assistants you will actually reuse next month."}];
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

function showEl(el, on) {
  if (!el) return;
  el.classList.toggle("hidden", !on);
  el.hidden = !on;
}

function signIn() {
  const code = ($("code").value || "").trim();
  const emailBox = ($("email").value || "").trim();
  if (document.activeElement === $("code") && code) {
    openWithCode();
    return;
  }
  const email = emailBox || "demo@getwithitai.com";
  let name = "Student";
  if (email.toLowerCase() === "demo@getwithitai.com") name = "Demo Student";
  else {
    name = email.split("@")[0].replace(/[._-]+/g, " ").trim() || "Student";
  }
  enter({ name: name, email: email });
}
function bootLogin() {
  $("login-form").onsubmit = (e) => {
    e.preventDefault();
    signIn();
    return false;
  };
  $("signin").onclick = (e) => {
    e.preventDefault();
    signIn();
  };
  $("code-btn").onclick = (e) => {
    e.preventDefault();
    openWithCode();
  };
}
function openWithCode() {
  const code = ($("code").value || "").trim().replace(/\s+/g, "");
  if (!code) {
    setError("Type the code from your instructor, or press Enter the course.");
    $("code").focus();
    return;
  }
  const known = CODES.includes(code.toUpperCase());
  enter({ name: known ? "Student" : "Student", email: "code@" + code.toLowerCase() });
}

function enter(user) {
  state.user = user;
  save();
  showEl($("login"), false);
  showEl($("app"), true);
  $("who").textContent = user.name;
  $("who-mail").textContent = user.email;
  try { history.replaceState(null, "", "#course"); } catch (e) {}
  document.title = "Course · GetWithItAI";
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
window.GWI = { signIn: signIn, openWithCode: openWithCode, enter: enter };
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
