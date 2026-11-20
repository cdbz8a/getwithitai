/**
 * Knowledge Keeper Station
 * Local-first. Open JSON. No GetWithItAI server.
 * Restricted records never enter a network pack.
 */
(function () {
  var DB_NAME = "gwi-keeper-v2";
  var STORE = "entries";
  var REPL = "replicas";
  var META = "meta";
  var dbp = null;

  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (resolve, reject) {
      var req = indexedDB.open(DB_NAME, 2);
      req.onupgradeneeded = function () {
        var d = req.result;
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: "id" });
        if (!d.objectStoreNames.contains(REPL)) d.createObjectStore(REPL, { keyPath: "id" });
        if (!d.objectStoreNames.contains(META)) d.createObjectStore(META, { keyPath: "key" });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
    return dbp;
  }

  function txDone(tx) {
    return new Promise(function (resolve, reject) {
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  }

  function getAll(store) {
    return db().then(function (d) {
      return new Promise(function (resolve, reject) {
        var tx = d.transaction(store, "readonly");
        var req = tx.objectStore(store).getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function put(store, obj) {
    return db().then(function (d) {
      var tx = d.transaction(store, "readwrite");
      tx.objectStore(store).put(obj);
      return txDone(tx);
    });
  }

  function del(store, id) {
    return db().then(function (d) {
      var tx = d.transaction(store, "readwrite");
      tx.objectStore(store).delete(id);
      return txDone(tx);
    });
  }

  function getMeta(key) {
    return db().then(function (d) {
      return new Promise(function (resolve) {
        var tx = d.transaction(META, "readonly");
        var req = tx.objectStore(META).get(key);
        req.onsuccess = function () { resolve(req.result && req.result.value); };
        req.onerror = function () { resolve(undefined); };
      });
    });
  }

  function setMeta(key, value) {
    return put(META, { key: key, value: value });
  }

  function uid(prefix) {
    return (prefix || "k") + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function $(id) { return document.getElementById(id); }

  function bytesToHex(buf) {
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  function b64(buf) {
    var bin = "";
    var u = new Uint8Array(buf);
    for (var i = 0; i < u.length; i++) bin += String.fromCharCode(u[i]);
    return btoa(bin);
  }

  function unb64(s) {
    var bin = atob(s);
    var u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }

  async function sha256Hex(text) {
    var enc = new TextEncoder().encode(text);
    var digest = await crypto.subtle.digest("SHA-256", enc);
    return bytesToHex(digest);
  }

  function canonical(e) {
    return JSON.stringify({
      title: e.title || "",
      holder: e.holder || "",
      topic: e.topic || "",
      language: e.language || "",
      dateRecorded: e.dateRecorded || "",
      source: e.source || "oral",
      access: e.access || "protocol",
      share: e.share || "private",
      neverAi: e.neverAi !== false,
      body: e.body || "",
      paper: e.paper || "",
      protocol: e.protocol || "",
    });
  }

  async function withHash(e) {
    e.hash = await sha256Hex(canonical(e));
    e.updated = Date.now();
    return e;
  }

  var currentId = null;

  function blank() {
    return {
      id: uid("k"),
      title: "",
      holder: "",
      topic: "",
      language: "",
      dateRecorded: "",
      source: "oral",
      access: "protocol",
      share: "private",
      neverAi: true,
      body: "",
      paper: "",
      protocol: "",
      origin: "",
      hash: "",
      updated: Date.now(),
    };
  }

  function formToEntry() {
    var access = $("k-access").value;
    var share = $("k-share").value;
    if (access === "restricted" || access === "family") share = "private";
    if (share === "public" && (access === "restricted" || access === "family")) share = "private";
    return {
      id: currentId || uid("k"),
      title: $("k-title").value.trim(),
      holder: $("k-holder").value.trim(),
      topic: $("k-topic").value.trim(),
      language: $("k-lang").value.trim(),
      dateRecorded: $("k-date").value,
      source: $("k-source").value,
      access: access,
      share: share,
      neverAi: $("k-never").checked,
      body: $("k-body").value,
      paper: $("k-paper").value,
      protocol: $("k-protocol").value,
      origin: $("k-origin") ? $("k-origin").value : "",
    };
  }

  function entryToForm(e) {
    currentId = e.id;
    $("k-title").value = e.title || "";
    $("k-holder").value = e.holder || "";
    $("k-topic").value = e.topic || "";
    $("k-lang").value = e.language || "";
    $("k-date").value = e.dateRecorded || "";
    $("k-source").value = e.source || "oral";
    $("k-access").value = e.access || "protocol";
    $("k-share").value = e.share || "private";
    $("k-never").checked = e.neverAi !== false;
    $("k-body").value = e.body || "";
    $("k-paper").value = e.paper || "";
    $("k-protocol").value = e.protocol || "";
    if ($("k-hash")) $("k-hash").textContent = e.hash ? e.hash.slice(0, 16) + "…" : "Save to fingerprint";
  }

  function toast(msg) {
    var el = $("k-status");
    if (el) el.textContent = msg;
  }

  async function renderList() {
    var rows = await getAll(STORE);
    rows.sort(function (a, b) { return (b.updated || 0) - (a.updated || 0); });
    var box = $("k-list");
    var q = (($("k-search") && $("k-search").value) || "").toLowerCase();
    box.innerHTML = "";
    var n = 0;
    var net = 0;
    rows.forEach(function (e) {
      var blob = [e.title, e.holder, e.topic, e.language, e.body].join(" ").toLowerCase();
      if (q && blob.indexOf(q) === -1) return;
      n++;
      if (e.share === "network") net++;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "keeper-item" + (e.id === currentId ? " on" : "");
      var flag = "";
      if (e.access === "restricted") flag = '<span class="restricted-flag">Restricted</span>';
      else if (e.share === "network") flag = '<span class="restricted-flag" style="color:var(--teal);border-color:var(--teal-border)">Network</span>';
      b.innerHTML = "<strong>" + (e.title || "Untitled") + flag + "</strong><span>" +
        [e.holder, e.topic, e.share].filter(Boolean).join(" · ") + "</span>";
      b.addEventListener("click", function () {
        entryToForm(e);
        renderList();
      });
      box.appendChild(b);
    });
    if ($("k-count")) $("k-count").textContent = n + " on this computer · " + net + " marked to share with other communities";
    await renderHealth(rows);
    await renderReplicas();
  }

  async function renderHealth(rows) {
    if (!$("k-health")) return;
    var last = await getMeta("lastFullExport");
    var lastNet = await getMeta("lastNetworkExport");
    var reps = await getAll(REPL);
    var copies = 1 + reps.length;
    var fire = copies >= 3 ? "A fire in this building would not be the only copy." : "Not enough copies yet. You need three places.";
    $("k-health").innerHTML =
      "<p><strong>" + copies + "</strong> known locations (this computer + " + reps.length + " replica" + (reps.length === 1 ? "" : "s") + ")</p>" +
      "<p>Last full backup: " + (last ? new Date(last).toLocaleString() : "never. Export today") + "</p>" +
      "<p>Last network pack: " + (lastNet ? new Date(lastNet).toLocaleString() : "never") + "</p>" +
      "<p>" + fire + "</p>";
  }

  async function renderReplicas() {
    if (!$("k-replicas")) return;
    var reps = await getAll(REPL);
    $("k-replicas").innerHTML = "";
    reps.forEach(function (r) {
      var div = document.createElement("div");
      div.className = "card";
      div.style.padding = "0.7rem 0.85rem";
      div.innerHTML = "<strong>" + r.name + "</strong> <span class='muted'>· " + r.kind + "</span>" +
        "<p class='muted' style='margin:0.3rem 0 0'>" + (r.notes || "") + (r.verified ? " · checked " + r.verified : "") + "</p>";
      var rm = document.createElement("button");
      rm.type = "button";
      rm.className = "btn btn-ghost btn-sm";
      rm.textContent = "Remove";
      rm.style.marginTop = "0.4rem";
      rm.addEventListener("click", async function () {
        await del(REPL, r.id);
        await renderList();
      });
      div.appendChild(rm);
      $("k-replicas").appendChild(div);
    });
  }

  async function onSave() {
    var e = formToEntry();
    if (!e.title) {
      toast("Give this record a title the community will recognize.");
      $("k-title").focus();
      return;
    }
    e = await withHash(e);
    currentId = e.id;
    await put(STORE, e);
    toast("Saved on this computer. Fingerprint " + e.hash.slice(0, 12) + "… Export a copy to another building.");
    entryToForm(e);
    await renderList();
  }

  async function onNew() {
    var e = blank();
    currentId = e.id;
    entryToForm(e);
    $("k-title").focus();
    toast("New record. Hit Save when you are ready.");
    await renderList();
  }

  async function onDelete() {
    if (!currentId) return;
    if (!confirm("Remove from this computer? Copies on other drives stay where they are.")) return;
    await del(STORE, currentId);
    var e = blank();
    currentId = e.id;
    entryToForm(e);
    toast("Removed from this browser.");
    await renderList();
  }

  function download(filename, text, type) {
    var blob = new Blob([text], { type: type || "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function stationMeta() {
    return {
      community: (await getMeta("community")) || "",
      station: (await getMeta("station")) || "",
    };
  }

  function packWrapper(kind, entries, extra) {
    return Object.assign({
      format: "getwithitai-keeper-archive",
      version: 2,
      kind: kind,
      exported: new Date().toISOString(),
      note: "Open JSON. Not owned by GetWithItAI. Possession of this file is possession of the records it contains. Restricted teachings must not be copied onto a public network.",
      entries: entries,
    }, extra || {});
  }

  async function onExportFull() {
    var rows = await getAll(STORE);
    var ident = await stationMeta();
    download(
      "keeper-full-" + new Date().toISOString().slice(0, 10) + ".json",
      JSON.stringify(packWrapper("full-station", rows, ident), null, 2)
    );
    await setMeta("lastFullExport", Date.now());
    toast("Full archive downloaded. Put one copy on a USB in another building.");
    await renderList();
  }

  async function onExportNetwork() {
    var rows = await getAll(STORE);
    var share = rows.filter(function (e) {
      return e.share === "network" && e.access !== "restricted" && e.access !== "family";
    });
    if (!share.length) {
      toast("No records are marked for other communities. Restricted and family records stay in the office.");
      return;
    }
    var ident = await stationMeta();
    download(
      "keeper-network-" + new Date().toISOString().slice(0, 10) + ".json",
      JSON.stringify(packWrapper("network-share", share, ident), null, 2)
    );
    await setMeta("lastNetworkExport", Date.now());
    toast(share.length + " record(s) ready to send to a community you have an agreement with.");
    await renderList();
  }

  async function onExportPublic() {
    var rows = await getAll(STORE);
    var share = rows.filter(function (e) {
      return e.share === "public" && e.access !== "restricted" && e.access !== "family";
    });
    if (!share.length) {
      toast("No records are marked public. Mark a record public when the community wants it on a notice board or website.");
      return;
    }
    var ident = await stationMeta();
    download(
      "keeper-public-" + new Date().toISOString().slice(0, 10) + ".json",
      JSON.stringify(packWrapper("public-share", share, ident), null, 2)
    );
    toast(share.length + " public record(s). This file is for a website or poster.");
  }

  async function deriveKey(pass, salt) {
    var enc = new TextEncoder();
    var base = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: salt, iterations: 150000, hash: "SHA-256" },
      base,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async function onExportEncrypted() {
    var pass = $("k-pass").value;
    if (!pass || pass.length < 8) {
      toast("Use a passphrase of at least 8 characters. We do not store it. Keep it somewhere you can find later.");
      return;
    }
    var rows = await getAll(STORE);
    var ident = await stationMeta();
    var plain = JSON.stringify(packWrapper("full-station-encrypted-payload", rows, ident));
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var key = await deriveKey(pass, salt);
    var ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, new TextEncoder().encode(plain));
    download(
      "keeper-encrypted-" + new Date().toISOString().slice(0, 10) + ".json",
      JSON.stringify({
        format: "getwithitai-keeper-encrypted",
        version: 2,
        kdf: "PBKDF2-SHA-256-150000",
        alg: "AES-GCM",
        salt: b64(salt),
        iv: b64(iv),
        ciphertext: b64(ct),
      }, null, 2)
    );
    await setMeta("lastFullExport", Date.now());
    toast("Encrypted backup downloaded. You need the passphrase to open it.");
    await renderList();
  }

  async function ingestPack(obj) {
    var rows = obj.entries || [];
    if (!Array.isArray(rows)) throw new Error("Not a Keeper archive");
    if (obj.kind === "network-share") {
      rows = rows.filter(function (e) {
        return e.share === "network" && e.access !== "restricted" && e.access !== "family";
      });
    }
    if (obj.kind === "public-share") {
      rows = rows.filter(function (e) {
        return e.share === "public" && e.access !== "restricted" && e.access !== "family";
      });
    }
    var added = 0;
    var skipped = 0;
    var existing = await getAll(STORE);
    var hashes = {};
    existing.forEach(function (e) { if (e.hash) hashes[e.hash] = true; });
    for (var i = 0; i < rows.length; i++) {
      var e = rows[i];
      e = await withHash(e);
      if (hashes[e.hash]) { skipped++; continue; }
      if (!e.id) e.id = uid("k");
      if (obj.kind === "network-share") e.origin = e.origin || obj.community || "network";
      await put(STORE, e);
      hashes[e.hash] = true;
      added++;
    }
    return { added: added, skipped: skipped };
  }

  async function decryptPack(obj, pass) {
    var salt = unb64(obj.salt);
    var iv = unb64(obj.iv);
    var key = await deriveKey(pass, salt);
    var pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(iv) }, key, unb64(obj.ciphertext));
    return JSON.parse(new TextDecoder().decode(pt));
  }

  async function onImport(file) {
    var text = await file.text();
    var obj = JSON.parse(text);
    if (obj.format === "getwithitai-keeper-encrypted") {
      var pass = $("k-pass").value;
      if (!pass) throw new Error("Enter the community passphrase to open an encrypted backup");
      obj = await decryptPack(obj, pass);
    }
    var r = await ingestPack(obj);
    toast("Imported " + r.added + " new record(s). " + r.skipped + " already here (same fingerprint).");
    await renderList();
  }

  async function onAddReplica() {
    var name = $("r-name").value.trim();
    if (!name) { toast("Name the other place: health centre USB, second office, sister Nation…"); return; }
    await put(REPL, {
      id: uid("r"),
      name: name,
      kind: $("r-kind").value,
      notes: $("r-notes").value.trim(),
      verified: new Date().toISOString().slice(0, 10),
    });
    $("r-name").value = "";
    $("r-notes").value = "";
    toast("Replica noted. The files still have to actually be copied there.");
    await renderList();
  }

  async function saveIdent() {
    await setMeta("community", $("k-community").value.trim());
    await setMeta("station", $("k-station").value.trim());
    toast("Office name saved on this computer.");
  }

  function onPrint() {
    var e = formToEntry();
    var w = window.open("", "_blank");
    w.document.write(
      "<!doctype html><title>" + (e.title || "Record") + "</title>" +
      "<style>body{font:16px/1.5 Georgia,serif;max-width:40rem;margin:2rem auto;padding:0 1rem}pre{white-space:pre-wrap}</style>" +
      "<h1>" + (e.title || "Untitled") + "</h1>" +
      "<p>Share: " + e.share + " · Access: " + e.access + (e.neverAi ? " · Never public AI" : "") + "</p>" +
      "<p>Knowledge holder: " + (e.holder || " - ") + "<br>Topic: " + (e.topic || " - ") + "<br>Language: " + (e.language || " - ") + "</p>" +
      "<h3>Spoken / typed</h3><pre>" + (e.body || " - ") + "</pre>" +
      "<h3>Paper original</h3><pre>" + (e.paper || " - ") + "</pre>" +
      "<h3>Protocol</h3><pre>" + (e.protocol || " - ") + "</pre>" +
      "<p>Printed from a Knowledge Keeper station. The community owns this information. GetWithItAI does not hold a copy.</p>"
    );
    w.document.close();
    w.print();
  }

  async function onFireCard() {
    var ident = await stationMeta();
    var reps = await getAll(REPL);
    var rows = await getAll(STORE);
    var w = window.open("", "_blank");
    w.document.write(
      "<!doctype html><title>Fire card</title>" +
      "<style>body{font:16px/1.5 Georgia,serif;max-width:40rem;margin:2rem auto}li{margin:.4rem 0}</style>" +
      "<h1>If this building burns</h1>" +
      "<p>" + (ident.community || "This community") + " · station: " + (ident.station || "unnamed") + "</p>" +
      "<p>Records on this computer: " + rows.length + "</p>" +
      "<h2>Other copies</h2><ul>" +
      (reps.length ? reps.map(function (r) {
        return "<li><strong>" + r.name + "</strong> (" + r.kind + ") " + (r.notes || "") + "</li>";
      }).join("") : "<li>None listed. Make a USB copy today.</li>") +
      "</ul><p>This card is useless unless the files were actually copied to those places. Open format: keeper JSON. No company login required to read it.</p>"
    );
    w.document.close();
    w.print();
  }

  function showGate(on) {
    var g = $("k-gate");
    var s = $("k-station-wrap");
    if (g) g.style.display = on ? "flex" : "none";
    if (s) s.style.display = on ? "none" : "block";
  }

  async function pinHash(pin) {
    return sha256Hex("gwi-office-door:" + pin);
  }

  async function isLocked() {
    var hash = await getMeta("officePin");
    if (!hash) return false;
    return sessionStorage.getItem("gwi-keeper-open") !== hash;
  }

  async function unlock() {
    var pin = $("k-door-in").value;
    var hash = await getMeta("officePin");
    if (!hash) { showGate(false); return; }
    if ((await pinHash(pin)) === hash) {
      sessionStorage.setItem("gwi-keeper-open", hash);
      showGate(false);
      toast("Archive open. Anyone at this desk can use it until this tab is closed or you lock it.");
    } else {
      toast("That code does not match.");
    }
  }

  async function setDoor() {
    var pin = $("k-door-set").value;
    if (!pin) {
      await setMeta("officePin", "");
      sessionStorage.removeItem("gwi-keeper-open");
      toast("Shared code cleared. Anyone at this computer can open the archive.");
      return;
    }
    if (pin.length < 4) { toast("Use at least 4 characters. Staff share this one code."); return; }
    var h = await pinHash(pin);
    await setMeta("officePin", h);
    sessionStorage.setItem("gwi-keeper-open", h);
    $("k-door-set").value = "";
    toast("Shared code set. Lock at the end of the day. During the day, whoever is at this desk can sit down and work.");
  }

  async function lockNow() {
    sessionStorage.removeItem("gwi-keeper-open");
    if (await getMeta("officePin")) showGate(true);
    else toast("No shared code is set. Anyone at this computer can use the archive.");
  }

  async function init() {
    if (!$("k-list")) return;
    if (await isLocked()) showGate(true);
    else showGate(false);
    var e = blank();
    currentId = e.id;
    entryToForm(e);
    $("k-community").value = (await getMeta("community")) || "";
    $("k-station").value = (await getMeta("station")) || "";
    await renderList();
    $("k-save").onclick = function () { onSave().catch(function (err) { toast(String(err)); }); };
    $("k-new").onclick = function () { onNew().catch(function (err) { toast(String(err)); }); };
    $("k-delete").onclick = function () { onDelete().catch(function (err) { toast(String(err)); }); };
    $("k-export").onclick = function () { onExportFull().catch(function (err) { toast(String(err)); }); };
    $("k-export-net").onclick = function () { onExportNetwork().catch(function (err) { toast(String(err)); }); };
    if ($("k-export-pub")) $("k-export-pub").onclick = function () { onExportPublic().catch(function (err) { toast(String(err)); }); };
    $("k-export-enc").onclick = function () { onExportEncrypted().catch(function (err) { toast(String(err)); }); };
    if ($("k-unlock")) $("k-unlock").onclick = function () { unlock().catch(function (err) { toast(String(err)); }); };
    if ($("k-door-save")) $("k-door-save").onclick = function () { setDoor().catch(function (err) { toast(String(err)); }); };
    if ($("k-lock")) $("k-lock").onclick = function () { lockNow().catch(function (err) { toast(String(err)); }); };
    $("k-print").onclick = onPrint;
    $("k-fire").onclick = function () { onFireCard().catch(function (err) { toast(String(err)); }); };
    $("k-ident").onclick = function () { saveIdent().catch(function (err) { toast(String(err)); }); };
    $("r-add").onclick = function () { onAddReplica().catch(function (err) { toast(String(err)); }); };
    $("k-search").oninput = function () { renderList(); };
    $("k-import").onchange = function () {
      var f = $("k-import").files[0];
      if (!f) return;
      onImport(f).catch(function (err) { toast("Could not import: " + err.message); });
      $("k-import").value = "";
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
