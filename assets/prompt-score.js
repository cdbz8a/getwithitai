/**
 * Deterministic prompt quality score. Same prompt → same number.
 * Runs in the browser. Nothing is sent anywhere.
 *
 * 100 points:
 *  Length & detail 20 · Role 15 · Specificity 15 · Structure 15
 *  Output format 10 · Constraints 10 · Context 10 · Examples 5
 */
(function (root) {
  var VAGUE = /\b(good|nice|great|awesome|things|stuff|amazing|engaging|professional|asap|etc|something|somehow)\b/gi;
  var ROLE = /\b(you are|act as|as a |role:|persona)\b/i;
  var FORMAT = /\b(table|json|markdown|bullets?|bullet list|numbered|csv|xml|email|sms|word count|under \d+|max(imum)? \d+)\b/i;
  var CONSTRAINT = /\b(do not|don't|avoid|never|must not|must include|limit to|no more than|without|ban)\b/i;
  var CONTEXT = /\b(audience|context|for a |background|situation|we are|i run|my (team|customer|boss|class))\b/i;
  var EXAMPLE = /\b(example|e\.g\.|for instance|sample|like this|match this)\b/i;
  var STRUCTURE = /(^|\n)\s*([-*]|\d+\.|#{1,3}\s|role:|task:|context:|<role>|<task>)/im;

  function words(t) {
    return (t.trim().match(/\S+/g) || []).length;
  }

  function lengthScore(t) {
    var n = words(t);
    if (n < 8) return 2;
    if (n < 20) return 8;
    if (n < 40) return 14;
    if (n < 220) return 20;
    if (n < 400) return 16;
    return 12;
  }

  function specificityScore(t) {
    var n = words(t);
    var nums = (t.match(/\d+/g) || []).length;
    var vague = (t.match(VAGUE) || []).length;
    var proper = (t.match(/\b[A-Z][a-z]{3,}\b/g) || []).length;
    var s = 4;
    if (nums) s += Math.min(6, nums * 2);
    if (proper >= 2) s += 3;
    if (n >= 30) s += 2;
    s -= Math.min(6, vague * 2);
    return Math.max(0, Math.min(15, s));
  }

  function score(text) {
    var t = String(text || "");
    var cats = {
      length: lengthScore(t),
      role: ROLE.test(t) ? 15 : 0,
      spec: specificityScore(t),
      structure: STRUCTURE.test(t) ? 15 : (t.split(/\n/).length >= 4 ? 8 : 3),
      format: FORMAT.test(t) ? 10 : 0,
      constraints: CONSTRAINT.test(t) ? 10 : 0,
      context: CONTEXT.test(t) ? 10 : 0,
      examples: EXAMPLE.test(t) || /```/.test(t) ? 5 : 0,
    };
    var total = cats.length + cats.role + cats.spec + cats.structure + cats.format + cats.constraints + cats.context + cats.examples;
    var fixes = [];
    if (cats.role < 15) fixes.push("Open with who the model should act as.");
    if (cats.format < 10) fixes.push("Name the output shape: table, email, bullets, JSON, or a word cap.");
    if (cats.constraints < 10) fixes.push("Add a constraint: what to avoid, a limit, or a must-include.");
    if (cats.context < 10) fixes.push("Say who it's for and why, in one sentence.");
    if (cats.examples < 5) fixes.push("Paste one short example of the result you want.");
    if (cats.spec < 10) fixes.push("Swap vague words for numbers, names, or a concrete audience.");
    if (cats.length < 14) fixes.push("Add enough detail that a stranger could do the job.");
    return { total: total, cats: cats, words: words(t), fixes: fixes.slice(0, 4) };
  }

  function improve(text) {
    var t = String(text || "").trim();
    var s = score(t);
    var bits = [];
    if (s.cats.role < 15) bits.push("You are a precise specialist in this exact job. Do not generic-corporate the voice.");
    bits.push(t);
    if (s.cats.context < 10) bits.push("Context: the reader is a working adult. Assume no extra background unless stated.");
    if (s.cats.format < 10) bits.push("Output format: use labeled sections. If a table fits, use a table. Cap the draft at 250 words unless the user set a length.");
    if (s.cats.constraints < 10) bits.push("Constraints: do not invent facts, quotes, citations, prices, or names. Do not use the words delve, landscape, or leverage.");
    if (s.cats.examples < 5) bits.push("Example of tone: short sentences. Concrete nouns. No pep.");
    bits.push("Before you finish, list assumptions you made.");
    return bits.join("\n\n");
  }

  function band(n) {
    if (n >= 80) return "Excellent";
    if (n >= 60) return "Good";
    if (n >= 40) return "Fair";
    return "Needs work";
  }

  root.GWIScore = { score: score, improve: improve, band: band };
})(window);
