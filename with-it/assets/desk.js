/* With It daily page. Same site all day, new one tomorrow. */
(function () {
  var sites = [
    { name: "ChatGPT", url: "https://chatgpt.com", why: "The default desk for a first draft. Free tier is enough for the four-part prompt." },
    { name: "Claude", url: "https://claude.ai", why: "Strong when the job is a long policy, a report, or a careful reply. Paste the document, then ask for deadlines only." },
    { name: "Gemini", url: "https://gemini.google.com", why: "Useful if your work already lives in Google Docs, Gmail, or Drive. Still check every date." },
    { name: "Microsoft Copilot", url: "https://copilot.microsoft.com", why: "The one to try if your office lives in Word, Outlook, and Teams. Ask your admin which version you are allowed to use." },
    { name: "Perplexity", url: "https://www.perplexity.ai", why: "It answers with links. Open one link before you trust the sentence. That is the whole trick." },
    { name: "NotebookLM", url: "https://notebooklm.google.com", why: "You give it your own files and it stays inside them. Good for a handbook you already have. Bad files in, bad answers out." },
    { name: "Gamma", url: "https://gamma.app", why: "Turns notes into a slide deck fast. You still delete the slides that say nothing." },
    { name: "Canva Magic Studio", url: "https://www.canva.com/magic-studio/", why: "A poster or a social card from a sentence. Read every word it draws. Picture text goes wrong more often than body text." },
    { name: "Adobe Firefly", url: "https://www.adobe.com/products/firefly.html", why: "Image generation with Adobe's commercial-use story. Read the current license on their site before you print it for a client." },
    { name: "ElevenLabs", url: "https://elevenlabs.io", why: "Turns a notice into audio. Read the script first. A wrong date sounds confident out loud." },
    { name: "Otter", url: "https://otter.ai", why: "Meeting audio into notes. You still fix names, and you still decide what was actually agreed." },
    { name: "Consensus", url: "https://consensus.app", why: "Searches research papers and skips the open web. Useful when someone says 'studies show.' Open the paper." },
    { name: "Elicit", url: "https://elicit.com", why: "Another paper desk. Ask a narrow question. Skim the table. Do not paste the summary into a board report unchecked." },
    { name: "Microsoft Designer", url: "https://designer.microsoft.com", why: "Quick visuals if you already have a Microsoft account. Same rule as Canva: read the words in the picture." },
    { name: "Ideogram", url: "https://ideogram.ai", why: "Better than most at putting short text inside an image. Still proof the spelling before you post it." },
    { name: "Grok", url: "https://grok.com", why: "A different model, a different habit of answer. Run the same four-part prompt you used yesterday and compare the draft, not the personality." },
    { name: "There's An AI For That", url: "https://theresanaiforthat.com", why: "A directory of AI tools. Use it when you are stuck on a job and want to see what exists. Then come back and try one, not twelve." },
    { name: "Artificial Analysis", url: "https://artificialanalysis.ai", why: "Independent model comparisons. Look when a headline says a new model 'wins.' Then go do your own task." },
    { name: "LM Studio", url: "https://lmstudio.ai", why: "Runs a model on your own computer. Slower to set up. The private draft never leaves the machine. Worth knowing it exists." },
    { name: "Descript", url: "https://www.descript.com", why: "Edit talking video by editing the transcript. You still watch the cut before you send it." },
    { name: "Poe", url: "https://poe.com", why: "One login, several models. Handy on the day you want a second opinion without making another account." }
  ];

  var challenges = [
    {
      title: "The email you have been avoiding",
      minutes: 15,
      tool: "Your usual chat app",
      module: "Module 10, email and hard messages",
      steps: [
        "Pick one real email you owe someone. Strip names and account numbers first. Use Role A and Role B.",
        "Run the four-part prompt: the job, who it is for, the shape, the background.",
        "Then steer it: shorter, warmer, one clear next step.",
        "You send it. The tool does not."
      ],
      prompt: "Write a reply to this email. Professional and calm, two short paragraphs. Thank them, explain the delay without blaming anyone, and end with one next step and a date. Here is the email, with names removed: [paste]"
    },
    {
      title: "Messy notes into decisions",
      minutes: 15,
      tool: "Claude or ChatGPT",
      module: "Module 11, minutes and reports",
      steps: [
        "Paste notes from a meeting you were in. Remove anything confidential.",
        "Ask for decisions, open questions, and an action table with owner and date.",
        "Check every name and every date against your own memory.",
        "If you were not sure of an owner in the room, the tool is not sure either."
      ],
      prompt: "Turn these notes into minutes. Who it is for: the people who were in the room and one person who missed it. Shape: a short summary, then a table with decision, owner, and due date. Mark anything unclear as 'check'. Background: [paste notes]"
    },
    {
      title: "Deadlines only",
      minutes: 12,
      tool: "NotebookLM, Claude, or Gemini",
      module: "Module 12, reading long documents",
      steps: [
        "Use a policy or handbook you are allowed to upload.",
        "Ask only for dates, deadlines, and who has to act.",
        "Open the original and confirm three of them.",
        "If one is wrong, do not use the list."
      ],
      prompt: "Read this document. Job: pull every deadline and who has to do something. Who it is for: me, so I do not miss a date. Shape: a table with page or section, the date, and the action. If a date is not explicit, say 'not stated'. Background is the attached file."
    },
    {
      title: "The 80-word notice",
      minutes: 10,
      tool: "Any chat app",
      module: "Free lesson 3, the four-part prompt",
      steps: [
        "Write a notice your community, office, or customers would actually see.",
        "Cap it at 80 words. Warm. No form language.",
        "Read it out loud. Cut one sentence.",
        "Post it only if you would say it at the door."
      ],
      prompt: "Write a notice for [who] about [what is changing]. Shape: under 80 words, warm and plain, no government-form language. Background: [the facts, dates, and what stays open]."
    },
    {
      title: "Same prompt, second tool",
      minutes: 15,
      tool: "Your main app, then the site of the day",
      module: "Module 4, choosing your tools",
      steps: [
        "Run one real job in the app you already use.",
        "Paste the same prompt into today's site.",
        "Keep the better opening paragraph. Throw the rest away.",
        "Write down which tool you trust for this kind of job. That note is a tiny tool map."
      ],
      prompt: "Use the exact prompt you already wrote. Do not 'improve' it for the second tool. The point is the comparison."
    },
    {
      title: "Clean up a list without a customer file",
      minutes: 15,
      tool: "ChatGPT, Copilot, or Claude",
      module: "Module 13, spreadsheets, and Module 16, privacy",
      steps: [
        "Take 10 rows of a messy list. Replace real names with Role A, Role B.",
        "Ask for a clean table and one formula idea.",
        "Test the formula on one row before you touch the sheet.",
        "Customer addresses stay in your own file."
      ],
      prompt: "Clean this list into a table with columns I can sort. Who it is for: me, working in a spreadsheet. Shape: the table, then one formula in plain English, then the formula itself. Do not invent missing numbers. Background: [paste the fake-name list]"
    },
    {
      title: "The polite no",
      minutes: 12,
      tool: "Any chat app",
      module: "Module 10",
      steps: [
        "Think of a request you need to decline.",
        "Ask for warm, short, and one alternative if you have one.",
        "Delete any apology that is longer than the decision.",
        "Send your words, not the tool's enthusiasm."
      ],
      prompt: "Write a short no. Who it is for: [a colleague, a customer, a committee]. Shape: under 90 words, warm, direct, no corporate filler. Include one alternative only if I gave you one. Background: [what they asked, and the real reason, with names removed]"
    },
    {
      title: "Monday agenda",
      minutes: 12,
      tool: "Any chat app",
      module: "Module 14, meetings and planning",
      steps: [
        "Paste the thread or the sticky notes. Strip private details.",
        "Ask for a 30-minute agenda with times.",
        "Cut anything that doesn't need a decision.",
        "You still run the meeting."
      ],
      prompt: "Build a 30-minute agenda. Who it is for: four busy people. Shape: time, topic, and the decision we need, six lines maximum. Background: [paste]"
    },
    {
      title: "Catch the invented source",
      minutes: 15,
      tool: "Perplexity, then any chat app",
      module: "Module 15, checking the output",
      steps: [
        "Ask a factual question you half know.",
        "Demand three sources with links.",
        "Open one link. See if the page says what the draft claims.",
        "If the link is dead or off-topic, the draft does not go anywhere."
      ],
      prompt: "Answer this in five sentences for a non-expert: [question]. Shape: the answer, then three sources with links. If you are not sure, say so. I will open one link."
    },
    {
      title: "Sound like you",
      minutes: 15,
      tool: "Any chat app",
      module: "Module 9, making it sound like you",
      steps: [
        "Paste five sentences you actually wrote. Nothing confidential.",
        "Ask for one new paragraph in that voice, on a real job.",
        "Circle any word you would never say.",
        "Save the prompt if the voice landed. That is the start of a library."
      ],
      prompt: "Match the voice of the sample below. Job: [the paragraph you need]. Who it is for: [audience]. Shape: one short paragraph. Do not add cheer or slogans. Sample of my writing: [paste five sentences]"
    },
    {
      title: "Let it interview you",
      minutes: 15,
      tool: "Any chat app",
      module: "Module 7, steering and follow-ups",
      steps: [
        "Do not paste the whole brief yet.",
        "Tell it to ask you five questions before it writes.",
        "Answer in short lines.",
        "Then let it draft. Use this whenever the first draft comes out generic."
      ],
      prompt: "I need [the job] for [who]. Before you write anything, ask me five questions that would change the draft. Wait for my answers."
    },
    {
      title: "Strip the private details",
      minutes: 10,
      tool: "A notes app first, then the chat",
      module: "Module 16, privacy and workplace rules",
      steps: [
        "Take a prompt you were about to paste.",
        "Replace names, addresses, member numbers, and dollar amounts that identify someone.",
        "Run it.",
        "Put the real details back on your own machine, after the draft."
      ],
      prompt: "Rewrite my prompt so a stranger could not tell who it is about. Keep the job, the audience, the shape, and the situation. Swap names for roles and exact figures for ranges."
    },
    {
      title: "Stump it on purpose",
      minutes: 10,
      tool: "Any chat app",
      module: "Module 3, what AI is and how it fails",
      steps: [
        "Ask something oddly specific that you know is true, from your own street or job.",
        "Watch it answer with confidence.",
        "Mark what it invented.",
        "That feeling is why you check public writing harder than a lunch email."
      ],
      prompt: "Answer as if you know. If you do not know, say 'I don't know' and stop. Question: [your oddly specific fact]"
    },
    {
      title: "One formula, one row",
      minutes: 15,
      tool: "Copilot, ChatGPT, or Claude",
      module: "Module 13, spreadsheets",
      steps: [
        "Describe the result you want in plain language.",
        "Name the app: Excel or Google Sheets.",
        "Put the formula in one test cell.",
        "If the test cell is wrong, do not fill down."
      ],
      prompt: "Write one formula. Who it is for: me, in [Excel or Google Sheets]. Shape: the formula, then one sentence on what it does, then what I should see on a test row. Background: column A is the date, column B is hours, I want hours over 8 flagged."
    }
  ];

  var nudges = [
    "A new model today won't help as much as finishing one job.",
    "Nobody is born good at this. People get good by practicing on their own work, and you can start with one email.",
    "If the draft sounds very sure of itself, slow down and check it.",
    "A second tool gives you a second opinion on the same job.",
    "The four parts fit in a text message. Job, who it's for, shape, background.",
    "Keep private details on your own computer. The draft is just as useful without them.",
    "Fifteen minutes counts. A saved prompt counts twice."
  ];

  function dayIndex() {
    return Math.floor(Date.now() / 86400000);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderDesk(root) {
    if (!root) return;
    var day = dayIndex();
    var site = sites[day % sites.length];
    var challenge = challenges[(day + 5) % challenges.length];
    var nudge = nudges[day % nudges.length];
    var when = new Date();
    var label = when.toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    root.innerHTML =
      '<p class="eyebrow">Today on the desk · ' + esc(label) + "</p>" +
      '<div class="grid-2 mt-1">' +
      '<article class="card">' +
      "<h3>AI site of the day</h3>" +
      "<p><strong>" + esc(site.name) + "</strong></p>" +
      "<p class=\"muted\">" + esc(site.why) + "</p>" +
      '<p><a href="' + esc(site.url) + '" target="_blank" rel="noopener">Open ' + esc(site.name) + "</a></p>" +
      "<p class=\"muted\">This site stays the same until midnight and changes tomorrow. In Module 4 of the course you pick a main app and a backup, and trying one new site a day is a good way to get there.</p>" +
      "</article>" +
      '<article class="card">' +
      "<h3>Tool challenge · " + esc(String(challenge.minutes)) + " min</h3>" +
      "<p><strong>" + esc(challenge.title) + "</strong></p>" +
      "<p class=\"muted\">Use " + esc(challenge.tool) + ". Builds on " + esc(challenge.module) + ".</p>" +
      "<ol class=\"bait-steps\">" +
      challenge.steps.map(function (step) { return "<li>" + esc(step) + "</li>"; }).join("") +
      "</ol>" +
      '<div class="prompt"><pre>' + esc(challenge.prompt) + "</pre></div>" +
      '<p class="nudge">' + esc(nudge) + "</p>" +
      "</article>" +
      "</div>";
  }

  function wireCopy(scope) {
    (scope || document).querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-copy");
        var node = document.getElementById(id);
        if (!node) return;
        var text = node.innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            var old = btn.textContent;
            btn.textContent = "Copied";
            setTimeout(function () { btn.textContent = old; }, 1400);
          });
        }
      });
    });
  }

  function wireSubscribe(form) {
    if (!form) return;
    var note = form.querySelector("[data-sub-note]");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("input[type=email]");
      var email = (input.value || "").trim();
      if (!email || email.indexOf("@") < 1) {
        if (note) note.textContent = "That doesn't look like an email address.";
        return;
      }
      if (note) note.textContent = "Your email app should open now. Send the message to finish signing up.";
      window.location.href = "mailto:getwithitai@protonmail.com?subject=" +
        encodeURIComponent("Newsletter signup") + "&body=" +
        encodeURIComponent("Please add me to the With It newsletter.\n\nEmail: " + email);
    });
  }

  document.querySelectorAll("[data-desk]").forEach(renderDesk);
  wireCopy(document);
  wireSubscribe(document.querySelector("[data-subscribe]"));

  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
