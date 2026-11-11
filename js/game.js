/* =====================================================================
   IRONVEIL — game engine
   Terminal, dialogue, clock, trace meter, nodes, boss fight, endings,
   report and teacher menu. The texts live in content.js.
   ===================================================================== */
(function () {
  "use strict";

  const C = window.CONTENT, CFG = window.CONFIG, PZ = window.Puzzles;
  const SFX = window.SFX, Voice = window.Voice, Portraits = window.Portraits;
  const esc = PZ.esc, norm = PZ.norm;
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  const BOSS = C.rooms.length;

  let S = null;                       // the saved state of the current run
  let prefs = { sfx: true, music: true, auto: false, easy: false };
  let minutes = CFG.defaultMinutes;
  let cwd = [], hist = [], histPos = 0;
  let tickTimer = null, lastTick = 0, paused = false, token = 0;
  let puzzle = null, goalsDone = {}, bossFace = null, hackedFace = null;
  let teacherOK = false, glitchTimer = null, p2 = null;

  /* ------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------ */
  function L(v) {
    return (v && typeof v === "object" && !Array.isArray(v) && S && ("rookie" in v)) ? v[S.level] : v;
  }
  function fill(t) {
    return String(t)
      .replace(/\{crew\}/g, function () { return S ? S.crew : "runner"; })
      .replace(/\{minutes\}/g, function () { return S ? Math.round(S.duration / 60) : minutes; });
  }
  function mmss(sec) {
    sec = Math.max(0, Math.round(sec));
    const m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }
  function roomDef() { return S.room >= BOSS ? C.boss : C.rooms[S.room]; }
  function pdata() { const p = roomDef().puzzle; return Object.assign({}, p, p[S.level]); }

  /* ---- glossary: turn known words into clickable words ---- */
  let glossRe = null;
  function buildGloss() {
    const keys = Object.keys(C.glossary).sort(function (a, b) { return b.length - a.length; })
      .map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
    glossRe = new RegExp("\\b(" + keys.join("|") + ")(s|es|d|ed|ing)?\\b", "gi");
  }
  function glossify(escaped) {
    return escaped.replace(glossRe, function (m, k) {
      return '<span class="gl" tabindex="0" data-k="' + k.toLowerCase() + '">' + m + "</span>";
    });
  }
  /* text -> HTML: `commands`, line breaks and glossary words */
  function rich(text, noGloss) {
    return String(text).split("`").map(function (seg, i) {
      if (i % 2) return "<code>" + esc(seg) + "</code>";
      return noGloss ? esc(seg) : glossify(esc(seg));
    }).join("").replace(/\n/g, "<br>");
  }
  function sayBtn(text, who, label) {
    return '<button type="button" class="spk" data-who="' + (who || "narrator") + '" data-say="' + esc(text) +
      '" title="Read aloud" aria-label="Read aloud">🔊' + (label ? " " + label : "") + "</button>";
  }

  /* ------------------------------------------------------------------
     Saving
     ------------------------------------------------------------------ */
  function save() {
    if (!S) return;
    try { localStorage.setItem(CFG.saveKey, JSON.stringify(S)); } catch (e) {}
  }
  function loadSave() {
    try {
      const s = JSON.parse(localStorage.getItem(CFG.saveKey) || "null");
      return s && s.v === 1 && s.rooms && s.rooms.length === BOSS + 1 ? s : null;
    } catch (e) { return null; }
  }
  function clearSave() { try { localStorage.removeItem(CFG.saveKey); } catch (e) {} }
  function loadPrefs() {
    try {
      const p = JSON.parse(localStorage.getItem(CFG.prefsKey) || "null");
      if (p) { prefs = Object.assign(prefs, p.prefs || {}); if (p.minutes) minutes = p.minutes; }
    } catch (e) {}
  }
  function savePrefs() {
    try { localStorage.setItem(CFG.prefsKey, JSON.stringify({ prefs: prefs, minutes: minutes })); } catch (e) {}
  }
  function applyPrefs() {
    SFX.setSfx(prefs.sfx); SFX.setMusic(prefs.music);
    Voice.auto = prefs.auto && Voice.supported;
    document.body.classList.toggle("easy", !!prefs.easy);
    document.body.classList.toggle("no-voice", !Voice.supported);
    $("#opt-sfx").checked = prefs.sfx; $("#opt-music").checked = prefs.music;
    $("#opt-auto").checked = prefs.auto; $("#opt-easy").checked = prefs.easy;
    $("#btn-sfx").setAttribute("aria-pressed", prefs.sfx);
    $("#btn-music").setAttribute("aria-pressed", prefs.music);
    $("#btn-auto").setAttribute("aria-pressed", Voice.auto);
    $("#btn-easy").setAttribute("aria-pressed", prefs.easy);
    $("#mins").textContent = minutes;
    savePrefs();
  }

  function newState(crew, level) {
    const rooms = [];
    for (let i = 0; i <= BOSS; i++) rooms.push({ wrong: 0, hint: 0, hintB: 0, paid: 0, time: 0, missed: {}, done: false, skipped: false });
    return {
      v: 1, crew: crew, level: level, duration: minutes * 60, remaining: minutes * 60,
      room: -1, phase: "intro", trace: 0, traces: 0, frags: [], rooms: rooms, lookups: [],
      finished: null, bossStep: 0, bossP2: false, warned: {}, result: null, date: new Date().toISOString().slice(0, 10)
    };
  }

  function show(id) {
    ["start", "game", "end"].forEach(function (s) { $("#" + s).hidden = s !== id; });
    document.body.classList.toggle("on-start", id === "start");
    document.body.classList.toggle("on-game", id === "game");
    document.body.classList.toggle("on-end", id === "end");
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------
     Terminal
     ------------------------------------------------------------------ */
  const logEl = $("#log"), cmdEl = $("#cmd-input");

  function tprint(html, cls) {
    const d = document.createElement("div");
    d.className = "ln " + (cls || "");
    d.innerHTML = html;
    logEl.appendChild(d);
    while (logEl.children.length > 400) logEl.removeChild(logEl.firstChild);
    logEl.scrollTop = logEl.scrollHeight;
    return d;
  }
  function tlines(lines, done, gap) {
    const my = token;
    let i = 0;
    (function step() {
      if (my !== token) return;
      if (i >= lines.length) { if (done) done(); return; }
      tprint(rich(fill(lines[i++]), true), "sys");
      SFX.type();
      setTimeout(step, gap || 280);
    })();
  }
  function promptText() {
    const slug = (S ? S.crew : "guest").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "crew";
    return slug + "@ironveil:/" + cwd.join("/") + "$";
  }
  function setPrompt() { $("#prompt").textContent = promptText(); }

  /* ---- the little file system of each node ---- */
  function fsRoot() {
    if (!S || S.room < 0) return {};
    if (S.room >= BOSS) return C.boss.files;
    return L(C.rooms[S.room].files) || {};
  }
  function fsNode(path) {
    let n = fsRoot();
    for (let i = 0; i < path.length; i++) {
      if (n && typeof n === "object" && Object.prototype.hasOwnProperty.call(n, path[i])) n = n[path[i]];
      else return undefined;
    }
    return n;
  }
  function findKey(obj, name) {
    const want = name.toLowerCase().replace(/\/$/, "");
    return Object.keys(obj).filter(function (k) { return k.toLowerCase() === want; })[0];
  }
  const KINDS = {
    jpg: ["IMAGE", "A text terminal cannot show pictures.", "It shows"],
    png: ["IMAGE", "A text terminal cannot show pictures.", "It shows"],
    gif: ["IMAGE", "A text terminal cannot show pictures.", "It shows"],
    mp3: ["AUDIO", "A text terminal cannot play sound.", "It sounds like"],
    wav: ["AUDIO", "A text terminal cannot play sound.", "It sounds like"],
    zip: ["COMPRESSED", "It must be unpacked before you can read it.", "It contains"],
    exe: ["PROGRAM", "Never run a program that you do not trust.", "It is"]
  };

  function markGoal(id) {
    if (!puzzle || !puzzle.update || goalsDone[id]) return;
    goalsDone[id] = true;
    puzzle.update();
  }

  function runCmd(raw) {
    const line = raw.trim();
    if (!line) return;
    tprint('<span class="pr">' + esc(promptText()) + "</span> " + esc(line), "echo");
    hist.push(line); histPos = hist.length;
    const first = line.split(/\s+/)[0];
    const cmd = first.toLowerCase();
    const arg = line.slice(first.length).trim();
    if (!S || S.finished) { tprint("No active connection.", "warn"); return; }
    SFX.click();

    switch (cmd) {
      case "help": {
        const rows = [
          ["help", "show this list"],
          ["ls", "list the files and folders here"],
          ["open <file>", "read a file, for example: open readme.txt"],
          ["cd <folder>", "go into a folder  (cd .. goes back out)"],
          ["status", "show time, trace and progress"],
          ["clear", "clean the screen"]
        ];
        if (S.room >= BOSS) rows.push(["shutdown <word>", "run the kill word"]);
        else if (S.room >= 0) { const pd = pdata(); if (pd.type === "terminal") rows.push([pd.usage, "finish this node"]); }
        tprint("AVAILABLE COMMANDS", "hd");
        rows.forEach(function (r) { tprint('<span class="c1">' + esc(r[0]) + "</span>" + esc(r[1]), "help"); });
        tprint("Tip: press Tab to complete a file name, and ↑ to repeat a command.", "dim");
        markGoal("help");
        break;
      }
      case "ls": case "dir": {
        const n = fsNode(cwd);
        const keys = Object.keys(n || {});
        if (!keys.length) { tprint("(empty)", "dim"); break; }
        tprint(keys.map(function (k) {
          return typeof n[k] === "object" ? '<span class="dir">' + esc(k) + "/</span>" : '<span class="file">' + esc(k) + "</span>";
        }).join("   "), "ls");
        markGoal("ls");
        break;
      }
      case "pwd": tprint("/" + esc(cwd.join("/"))); break;
      case "cd": {
        if (!arg || arg === "/" || arg === "~") { cwd = []; setPrompt(); break; }
        if (arg === ".." || arg === "../") {
          if (!cwd.length) { tprint("You are already at the top folder.", "warn"); break; }
          cwd.pop(); setPrompt(); markGoal("back"); break;
        }
        const here = fsNode(cwd), k = findKey(here, arg);
        if (k && typeof here[k] === "object") { cwd.push(k); setPrompt(); markGoal("cd"); }
        else if (k) tprint(esc(k) + " is a file, not a folder. Use: open " + esc(k), "warn");
        else tprint("No folder called '" + esc(arg) + "'. Type ls to see what is here.", "warn");
        break;
      }
      case "open": case "cat": case "read": {
        if (!arg) { tprint("Open what? Example: open readme.txt", "warn"); break; }
        const here = fsNode(cwd), k = findKey(here, arg);
        if (!k) { tprint("No file called '" + esc(arg) + "' here. Type ls to see the files.", "warn"); break; }
        if (typeof here[k] === "object") { tprint(esc(k) + " is a folder. Use: cd " + esc(k), "warn"); break; }
        const ext = (k.split(".").pop() || "").toLowerCase(), kind = KINDS[ext];
        if (kind) {
          tprint("⚠ " + esc(k) + " is " + (kind[0] === "IMAGE" || kind[0] === "AUDIO" ? "an " : "a ") + kind[0] + " file (." + ext + "). " + kind[1], "warn");
          tprint("[ " + kind[2] + ": " + esc(here[k]) + " ]", "dim");
        } else {
          tprint("── " + esc(k) + " ──", "hd");
          tprint(esc(here[k]).replace(/\n/g, "<br>") + " " + sayBtn(here[k], "narrator"), "filetext");
        }
        markGoal("open");
        break;
      }
      case "clear": case "cls": logEl.innerHTML = ""; break;
      case "status":
        tprint("CREW: " + esc(S.crew) + "  |  LEVEL: " + C.levels[S.level].name, "sys");
        tprint("NODE: " + (S.room >= BOSS ? "CORE" : Math.max(1, S.room + 1) + " of " + BOSS) + "  |  TIME LEFT: " + mmss(S.remaining) + "  |  TRACE: " + S.trace + "%", "sys");
        tprint("KILL WORD LETTERS: " + (S.frags.filter(Boolean).join(" ") || "none yet"), "sys");
        break;
      case "whoami": tprint(esc(S.crew) + " — netrunner crew, hired by Mags."); break;
      case "hint": tprint("Ask your crew: use the COMMS panel on the right.", "sys"); break;
      case "sudo": tprint("Nice try, runner.", "warn"); break;
      case "vanta": tprint("... it heard you.", "vanta"); SFX.glitch(); break;
      case "login": case "unlock": case "decrypt": case "shutdown": solveCmd(cmd, arg); break;
      default:
        tprint("Command not found: " + esc(first) + ". Type help to see the commands.", "warn");
    }
  }

  function solveCmd(cmd, arg) {
    if (S.phase !== "play") { tprint("The node is not ready yet.", "warn"); return; }
    if (S.room >= BOSS) {
      if (cmd !== "shutdown") { tprint("There is nothing to " + cmd + " here.", "warn"); return; }
      if (!arg) { tprint("Usage: shutdown <word>", "warn"); return; }
      bossShutdown(arg);
      return;
    }
    const pd = pdata();
    if (pd.type !== "terminal" || pd.cmd !== cmd) { tprint("There is nothing to " + cmd + " in this node.", "warn"); return; }
    if (!arg) { tprint("Usage: " + esc(pd.usage), "warn"); return; }
    if (pd.answers.map(norm).indexOf(norm(arg)) >= 0) {
      markGoal("solve");
      tprint("ACCESS GRANTED", "ok");
      roomSolved();
    } else {
      tprint("ACCESS DENIED", "err");
      roomWrong({ missed: [{ id: "cmd", tag: roomDef().skills[0], show: esc(pd.reveal), why: "" }], msg: "That is not the right answer." });
    }
  }

  function complete() {
    const v = cmdEl.value;
    const parts = v.split(/\s+/);
    const last = parts[parts.length - 1].toLowerCase();
    let pool;
    if (parts.length === 1) pool = ["help", "ls", "open", "cd", "status", "clear", "login", "unlock", "decrypt", "shutdown"];
    else pool = Object.keys(fsNode(cwd) || {});
    const hits = pool.filter(function (k) { return k.toLowerCase().indexOf(last) === 0; });
    if (hits.length === 1) { parts[parts.length - 1] = hits[0]; cmdEl.value = parts.join(" "); }
    else if (hits.length > 1) tprint(hits.map(esc).join("   "), "dim");
  }

  /* ------------------------------------------------------------------
     Dialogue: the characters pop up and speak
     ------------------------------------------------------------------ */
  const Dlg = {
    lines: [], i: 0, done: null, timer: null, open: false, who: null, face: null,
    start(lines, done) {
      if (!lines || !lines.length) { if (done) done(); return; }
      if (this.open) {                         // already talking: queue behind
        this.lines = this.lines.concat(lines);
        const prev = this.done;
        this.done = function () { if (prev) prev(); if (done) done(); };
        return;
      }
      this.lines = lines; this.i = 0; this.done = done; this.open = true; this.who = null;
      $("#dialogue").hidden = false;
      document.body.classList.add("dlg-open");
      this.show();
    },
    show() {
      const ln = this.lines[this.i], ch = C.characters[ln.who] || C.characters.narrator;
      const text = fill(ln.text);
      const box = $("#dialogue");
      box.style.setProperty("--who", ch.color);
      if (this.who !== ln.who) {
        this.who = ln.who;
        const pt = $("#dlg-portrait");
        if (this.face) { this.face.stop(); this.face = null; }
        if (ln.who === "vanta") {
          pt.innerHTML = "<canvas></canvas>";
          this.face = new window.VantaFace(pt.firstChild, { cell: 7 }).start();
        } else pt.innerHTML = Portraits.svg(ln.who);
        pt.classList.remove("pop"); void pt.offsetWidth; pt.classList.add("pop");
        SFX.glitch();
      }
      $("#dlg-name").textContent = ch.name;
      $("#dlg-role").textContent = ch.role;
      $("#dlg-count").textContent = this.lines.length > 1 ? (this.i + 1) + " / " + this.lines.length : "";
      $("#dlg-next").textContent = this.i === this.lines.length - 1 ? "OK ▶" : "NEXT ▶";
      const speak = $("#dlg-speak");
      speak.dataset.say = text; speak.dataset.who = ln.who;
      tprint('<b style="color:' + ch.color + '">[' + ch.name + "]</b> " + rich(text) + " " + sayBtn(text, ln.who), "talk");
      // typewriter
      const out = $("#dlg-text"), plain = text.replace(/`/g, "");
      let n = 0;
      const self = this;
      clearInterval(this.timer);
      out.textContent = "";
      this.timer = setInterval(function () {
        n += 2;
        out.textContent = plain.slice(0, n);
        if (n % 6 === 0) SFX.type();
        if (n >= plain.length) self.finish();
      }, CFG.typeSpeed * 2);
      this._full = text;
      if (Voice.auto) Voice.speak(text, ln.who);
      $("#dlg-next").focus({ preventScroll: true });
    },
    finish() {
      if (!this.timer) return;
      clearInterval(this.timer); this.timer = null;
      $("#dlg-text").innerHTML = rich(this._full);
    },
    next() {
      if (!this.open) return;
      if (this.timer) { this.finish(); return; }
      Voice.stop();
      SFX.click();
      this.i += 1;
      if (this.i >= this.lines.length) this.close(true); else this.show();
    },
    close(runDone) {
      clearInterval(this.timer); this.timer = null;
      if (this.face) { this.face.stop(); this.face = null; }
      this.open = false; this.who = null;
      $("#dialogue").hidden = true;
      document.body.classList.remove("dlg-open");
      const d = this.done; this.done = null; this.lines = [];
      if (runDone && d) d();
    }
  };
  function say(lines, done) { Dlg.start(lines, done); }

  /* small pop-up message with a face (does not stop the game) */
  function toast(who, text) {
    const ch = C.characters[who];
    const t = document.createElement("div");
    t.className = "toast";
    t.style.setProperty("--who", ch.color);
    t.innerHTML = '<div class="mini">' + Portraits.svg(who) + "</div><div><b>" + ch.name + "</b><p>" + rich(fill(text)) + "</p></div>";
    $("#toasts").appendChild(t);
    tprint('<b style="color:' + ch.color + '">[' + ch.name + "]</b> " + rich(fill(text)), "talk");
    if (Voice.auto && !Dlg.open) Voice.speak(fill(text), who);
    setTimeout(function () { t.classList.add("out"); setTimeout(function () { t.remove(); }, 500); }, 6500);
  }

  let flashId = 0;
  function flash(text, cls, ms) {
    const f = $("#fx-flash"), my = ++flashId;
    $("#fx-flash-text").textContent = text || "";
    f.className = "show " + (cls || "");
    setTimeout(function () { if (my === flashId) f.className = ""; }, ms || 1600);
  }
  function shake(el) { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }

  /* ------------------------------------------------------------------
     HUD, clock and trace meter
     ------------------------------------------------------------------ */
  function hud() {
    if (!S) return;
    $("#clock").textContent = mmss(S.remaining);
    const low = S.remaining <= 300, crit = S.remaining <= 60;
    document.body.classList.toggle("tense", low && !S.finished);
    document.body.classList.toggle("critical", crit && !S.finished);
    SFX.setTense(low);
    $("#trace-bar").style.width = Math.min(100, S.trace) + "%";
    $("#trace-pct").textContent = S.trace + "%";
    $(".hud-block.trace").classList.toggle("hot", S.trace >= 70);
    let p = "";
    for (let i = 0; i <= BOSS; i++) {
      const st = S.rooms[i];
      p += '<i class="' + (i === BOSS ? "boss " : "") + (st.done ? "done" : i === S.room ? "now" : "") + '" title="' +
        (i === BOSS ? "The core" : "Node " + (i + 1)) + '"></i>';
    }
    $("#pips").innerHTML = p;
    let f = "";
    for (let i = 0; i < BOSS; i++) f += "<span" + (S.frags[i] ? ' class="got"' : "") + ">" + (S.frags[i] || "·") + "</span>";
    $("#frags").innerHTML = f;
  }

  function startClock() {
    stopClock();
    lastTick = Date.now();
    tickTimer = setInterval(tick, 250);
    if (!glitchTimer) glitchTimer = setInterval(randomGlitch, 4000);
  }
  function stopClock() {
    if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
    if (glitchTimer) { clearInterval(glitchTimer); glitchTimer = null; }
  }
  function tick() {
    if (!S || S.finished) return;
    const now = Date.now();
    if (paused) { lastTick = now; return; }
    const gone = now - lastTick;
    if (gone < 1000) return;
    const secs = Math.min(2, Math.floor(gone / 1000));   // a sleeping laptop does not eat the clock
    lastTick = gone > 3000 ? now : lastTick + secs * 1000;
    S.remaining -= secs;
    if (S.room >= 0) S.rooms[S.room].time += secs;
    const W = C.warnings;
    // one warning at a time: the most urgent one wins
    const w = S.warned;
    if (!w.one && S.remaining <= 60) { w.one = w.five = w.ten = w.half = 1; toast(W.one.who, W.one.text); SFX.alarm(); }
    else if (!w.five && S.remaining <= 300) { w.five = w.ten = w.half = 1; toast(W.five.who, W.five.text); SFX.alarm(); }
    else if (!w.ten && S.remaining <= 600 && S.duration > 1500) { w.ten = w.half = 1; toast(W.ten.who, W.ten.text); SFX.glitch(); }
    else if (!w.half && S.remaining <= S.duration / 2) { w.half = 1; toast(W.half.who, W.half.text); }
    if (S.remaining <= 0) { S.remaining = 0; hud(); fail(); return; }
    hud();
    if (S.remaining % 5 === 0) save();
  }
  function randomGlitch() {
    if (!S || S.finished || prefs.easy) return;
    const p = S.remaining <= 60 ? 0.8 : S.remaining <= 300 ? 0.4 : 0.12 + S.trace / 400;
    if (Math.random() > p) return;
    const g = $("#game");
    g.classList.add("glitching");
    if (S.remaining <= 300) SFX.glitch();
    setTimeout(function () { g.classList.remove("glitching"); }, 380);
  }

  function addTrace(n) {
    S.trace += n;
    if (S.trace >= 100) {
      S.trace = 0; S.traces += 1;
      S.remaining = Math.max(1, S.remaining - CFG.trace.penaltySeconds);
      SFX.alarm();
      flash("TRACED BY VANTA  −" + mmss(CFG.trace.penaltySeconds), "red", 2200);
      tprint("!! TRACED BY VANTA — " + mmss(CFG.trace.penaltySeconds) + " LOST !!", "err");
      toast("vanta", C.warnings.traced.text);
    }
    hud();
  }

  /* ------------------------------------------------------------------
     Nodes
     ------------------------------------------------------------------ */
  function setTask(title, html) {
    $("#task-title").textContent = title;
    $("#task-body").innerHTML = html || "";
    $("#comms").innerHTML = "";
    $("#task-scroll").scrollTop = 0;
  }
  function setNote(text, cls) {
    const n = $("#pz-note");
    if (!n) return;
    n.className = cls || "";
    n.textContent = text || "";
  }

  function intro() {
    token += 1;
    show("game"); hud(); setPrompt();
    logEl.innerHTML = "";
    setTask("INCOMING CALL", '<div class="standby"><div class="ring"></div><p>ENCRYPTED LINK</p></div>');
    SFX.boot();
    tlines(C.intro.boot, function () {
      say(C.intro.lines, function () { startClock(); enterRoom(0); });
    }, 420);
  }

  function enterRoom(i) {
    token += 1;
    const my = token;
    S.room = i; S.phase = "intro"; cwd = []; goalsDone = {}; puzzle = null;
    if (bossFace) { bossFace.stop(); bossFace = null; }
    $("#boss-view").hidden = true;
    document.body.classList.toggle("boss", i >= BOSS);
    save(); hud(); setPrompt();
    if (i >= BOSS) { enterBoss(); return; }
    const R = C.rooms[i];
    setTask(R.code + " // " + R.title, '<div class="standby"><div class="ring"></div><p>CONNECTING ...</p></div>');
    tprint("▓▓▓ " + R.code + " // " + esc(R.title) + " ▓▓▓", "hdr");
    SFX.boot();
    tlines(L(R.boot), function () {
      say(L(R.intro), function () { if (my === token) activateRoom(); });
    });
  }

  function activateRoom() {
    S.phase = "play"; save();
    const R = C.rooms[S.room], pd = pdata();
    const body = $("#task-body");
    const task = fill(L(R.task));
    body.innerHTML = '<div class="objective"><span class="lbl">OBJECTIVE</span><p>' + rich(task) + "</p>" + sayBtn(task, R.contact) + '</div><div class="pz" id="pz"></div>';
    const H = {
      rich: rich,
      sfx: function (n) { if (SFX[n]) SFX[n](); },
      note: function (t) { setNote(t, "warn"); },
      goalDone: function (id) { return !!goalsDone[id]; },
      usage: pd.usage || ""
    };
    const foot = document.createElement("div");
    foot.className = "pz-foot";
    if (pd.type === "terminal") {
      puzzle = PZ[pd.view]($("#pz"), pd, H);
      foot.innerHTML = '<p class="term-tip">Type your answer in the terminal: <code>' + esc(pd.usage) + '</code></p><span id="pz-note"></span>';
    } else {
      puzzle = PZ[pd.type]($("#pz"), pd, H);
      foot.innerHTML = '<button type="button" id="btn-check" class="big">RUN CHECK ▶</button><span id="pz-note"></span>';
    }
    body.appendChild(foot);
    renderComms();
    tprint("Node ready. " + (pd.type === "terminal" ? "Type help if you are lost." : "Solve the task in the panel on the right."), "dim");
    if (pd.type === "terminal") cmdEl.focus({ preventScroll: true });
  }

  function runCheck() {
    if (!puzzle || !S || S.phase !== "play" || S.room >= BOSS) return;
    const r = puzzle.check();
    if (r.incomplete) { setNote("Finish every part first.", "warn"); SFX.click(); return; }
    if (r.ok) roomSolved(); else roomWrong(r);
  }

  function roomWrong(r) {
    const st = S.rooms[S.room];
    st.wrong += 1;
    (r.missed || []).forEach(function (m) { st.missed[m.id] = { tag: m.tag, show: m.show, why: m.why }; });
    const n = (r.missed || []).length;
    SFX.bad();
    shake($("#task"));
    flash("", "redsoft", 350);
    setNote("✖ " + (r.msg || (n === 1 ? "1 part is wrong." : n + " parts are wrong.")) + " Trace +" + CFG.trace.wrong + "%", "err");
    tprint("CHECK FAILED. Trace +" + CFG.trace.wrong + "%", "err");
    addTrace(CFG.trace.wrong);
    save();
  }

  function roomSolved(skipped) {
    const i = S.room, R = C.rooms[i], st = S.rooms[i];
    st.done = true; if (skipped) st.skipped = true;
    S.phase = "done";
    S.frags[i] = R.fragment;
    if (puzzle && puzzle.lock) puzzle.lock();
    SFX.solve();
    flash("NODE RESTORED", "green", 1300);
    tprint("▓ " + R.code + " RESTORED ▓", "ok");
    tprint("Key fragment recovered: [ " + R.fragment + " ]", "ok");
    hud(); save();
    const foot = $(".pz-foot"); if (foot) foot.remove();
    $("#comms").innerHTML = "";
    const deb = puzzle && puzzle.debrief ? puzzle.debrief() : null;
    const box = document.createElement("div");
    box.className = "solved";
    box.innerHTML = '<div class="stamp">NODE RESTORED</div><p class="got">Key fragment recovered: <b>' + R.fragment + "</b></p>" +
      (deb ? '<div class="debrief"><span class="lbl">WHY?</span>' + deb + "</div>" : "") +
      '<button type="button" id="btn-continue" class="big">CONTINUE ▶</button>';
    const body = $("#task-body");
    body.insertBefore(box, body.firstChild);
    $("#task-scroll").scrollTop = 0;
    $("#btn-continue").focus({ preventScroll: true });
  }

  function continueRoom() {
    const i = S.room;
    if (S.phase !== "done" || i >= BOSS) return;
    const b = $("#btn-continue"); if (b) b.disabled = true;
    say(L(C.rooms[i].outro), function () { enterRoom(i + 1); });
  }

  /* ---- COMMS: ask the crew for help ---- */
  function hintSet() {
    const R = roomDef();
    if (S.room >= BOSS) return S.bossP2 ? R.hints2 : R.hints1;
    return L(R.hints);
  }
  function hintLevel() { const st = S.rooms[S.room]; return S.room >= BOSS && S.bossP2 ? st.hintB : st.hint; }
  function taskText() {
    const R = roomDef();
    if (S.room >= BOSS) return S.bossP2 ? R.task2 : R.task1;
    return L(R.task);
  }

  function renderComms() {
    const box = $("#comms");
    if (!S || S.phase !== "play") { box.innerHTML = ""; return; }
    const R = roomDef(), who = R.contact, ch = C.characters[who];
    const lvl = hintLevel();
    const labels = ["Can you give me a hint?", "I need more help.", "Show me how to start."];
    const costs = [0, CFG.trace.hint2, CFG.trace.hint3];
    let h = '<div class="comms-head" style="--who:' + ch.color + '"><div class="mini">' + Portraits.svg(who) + '</div><div><span class="lbl">COMMS — ASK YOUR CREW</span><b>' + ch.name +
      "</b><small>" + ch.role + '</small></div></div><div class="comms-opts">';
    h += '<button type="button" class="copt" data-c="task"><span>“What is my task here?”</span><em>free</em></button>';
    hintSet().forEach(function (_, n) {
      const used = n < lvl, open = n <= lvl;
      h += '<button type="button" class="copt' + (used ? " used" : "") + '" data-c="hint" data-n="' + n + '"' + (open ? "" : " disabled") + "><span>“" + labels[n] + "”</span><em" +
        (!used && costs[n] ? ' class="cost"' : "") + ">" + (used ? "read again" : costs[n] ? "+" + costs[n] + "% trace" : "free") + "</em></button>";
    });
    h += '<button type="button" class="copt lore" data-c="lore"><span>“' + esc(R.lore.q) + "”</span><em>story</em></button></div>";
    box.innerHTML = h;
  }

  function commsClick(btn) {
    if (!S || S.phase !== "play" || Dlg.open) return;
    const R = roomDef(), who = R.contact, st = S.rooms[S.room], kind = btn.dataset.c;
    SFX.click();
    if (kind === "task") { say([{ who: who, text: taskText() }]); return; }
    if (kind === "lore") { say([{ who: who, text: R.lore.a }]); return; }
    const n = +btn.dataset.n, lvl = hintLevel();
    if (n > lvl) return;
    if (n === lvl) {
      if (S.room >= BOSS && S.bossP2) st.hintB = n + 1; else st.hint = n + 1;
      const cost = [0, CFG.trace.hint2, CFG.trace.hint3][n];
      if (cost) { st.paid += 1; tprint("Extra hint used. Trace +" + cost + "%", "warn"); addTrace(cost); }
      save();
    }
    say([{ who: who, text: hintSet()[n] }], renderComms);
    renderComms();
  }

  /* ------------------------------------------------------------------
     Boss fight
     ------------------------------------------------------------------ */
  function bossRounds() { return C.boss.rounds[S.level]; }
  function integrity() { return Math.round(100 - (Math.min(S.bossStep, bossRounds().length) / bossRounds().length) * 85); }
  function drawIntegrity(v) {
    const pct = v == null ? integrity() : v;
    const bar = $("#int-bar"); if (!bar) return;
    bar.style.width = pct + "%";
    $("#int-pct").textContent = pct + "%";
    if (bossFace) bossFace.setIntegrity(pct / 100);
  }

  function enterBoss() {
    const B = C.boss, my = token;
    setTask("CORE // THE BREACH", '<div class="boss-arena"><div id="boss-ui"><div class="standby"><div class="ring"></div><p>SHIELD ACTIVE</p></div></div></div>');
    $("#boss-view").hidden = false;
    bossFace = new window.VantaFace($("#vanta-cv"), { cell: 8 }).start();
    logEl.scrollTop = logEl.scrollHeight;
    drawIntegrity();
    tprint("▓▓▓ THE CORE // THE BREACH ▓▓▓", "hdr bossh");
    SFX.alarm();
    tlines(B.boot, function () {
      say(S.bossStep > 0 || S.bossP2 ? [] : B.intro, function () {
        if (my !== token) return;
        S.phase = "play"; save();
        bossNext();
      });
    }, 520);
  }

  function bossNext() {
    if (!S || S.finished) return;
    renderComms();
    if (S.bossStep >= bossRounds().length) bossPhase2(); else bossRound();
  }

  function bossRound() {
    const rd = bossRounds()[S.bossStep], total = bossRounds().length;
    const opts = PZ.shuffle([rd.ok].concat(rd.bad));
    $("#boss-ui").innerHTML =
      '<div class="objective small"><span class="lbl">OBJECTIVE</span><p>' + rich(C.boss.task1) + "</p></div>" +
      '<div class="vsay"><span class="lbl">VANTA SAYS</span><p id="vline"></p>' + sayBtn(rd.say, "vanta") + "</div>" +
      '<div class="lbl q">WHICH SENTENCE IS CORRECT?  (' + (S.bossStep + 1) + " / " + total + ")</div>" +
      '<div class="bopts">' + opts.map(function (o) { return '<button type="button" class="bopt">' + esc(o) + "</button>"; }).join("") + "</div>" +
      '<div class="pz-foot"><span id="pz-note"></span></div>';
    tprint('<b style="color:' + C.characters.vanta.color + '">[VANTA]</b> “' + esc(rd.say) + "”", "talk");
    const out = $("#vline");
    let n = 0;
    const my = token;
    const iv = setInterval(function () {
      if (my !== token || !out.isConnected) { clearInterval(iv); return; }
      n += 2; out.textContent = "“" + rd.say.slice(0, n) + (n >= rd.say.length ? "”" : "");
      if (n >= rd.say.length) clearInterval(iv);
    }, CFG.typeSpeed * 2);
    if (bossFace && !Voice.auto) { bossFace.speak(true); setTimeout(function () { if (bossFace) bossFace.speak(false); }, 1600); }
    if (Voice.auto) Voice.speak(rd.say, "vanta");
  }

  function bossPick(btn) {
    if (!S || S.finished || S.phase !== "play" || btn.disabled) return;
    const rd = bossRounds()[S.bossStep];
    if (!rd) return;
    if (btn.textContent === rd.ok) {
      $$(".bopt").forEach(function (b) { b.disabled = true; });
      btn.classList.add("good");
      S.bossStep += 1;
      SFX.hit();
      if (bossFace) bossFace.hit();
      shake($("#boss-view"));
      drawIntegrity();
      const hl = C.boss.hitLines;
      tprint("SHIELD HIT. " + integrity() + "% left.", "ok");
      tprint('<b style="color:' + C.characters.vanta.color + '">[VANTA]</b> ' + esc(hl[(S.bossStep - 1) % hl.length]), "talk");
      setNote("✔ " + rd.why, "ok");
      save();
      const my = token;
      setTimeout(function () { if (my === token) bossNext(); }, 1900);
    } else {
      btn.disabled = true; btn.classList.add("bad");
      roomWrong({ missed: [{ id: "b" + S.bossStep, tag: rd.tag, show: esc(rd.ok), why: rd.why }], msg: "VANTA laughs. That is not correct." });
    }
  }

  function bossPhase2() {
    if (!S.bossP2) {
      S.bossP2 = true; save();
      say(C.boss.phase2, function () { renderComms(); drawP2(true); });
    } else drawP2(true);
  }

  function drawP2(fresh) {
    const letters = C.rooms.map(function (r) { return r.fragment; });
    if (fresh || !p2) p2 = { pool: letters.map(function (_, i) { return i; }), ans: [] };
    const tile = function (i, where) { return '<button type="button" class="ltile" data-w="' + where + '" data-i="' + i + '">' + letters[i] + "</button>"; };
    $("#boss-ui").innerHTML =
      '<div class="objective small"><span class="lbl">OBJECTIVE</span><p>' + rich(C.boss.task2) + "</p></div>" +
      '<p class="clue">' + esc(L(C.boss.clue)) + "</p>" +
      '<div class="kw-ans" aria-label="Your word">' + (p2.ans.length ? p2.ans.map(function (i) { return tile(i, "a"); }).join("") : '<span class="ghost">click the letters ...</span>') + "</div>" +
      '<div class="kw-pool">' + p2.pool.map(function (i) { return tile(i, "p"); }).join("") + "</div>" +
      '<div class="pz-foot"><button type="button" id="btn-shutdown" class="big danger">EXECUTE SHUTDOWN ▶</button><span id="pz-note"></span></div>' +
      '<p class="term-tip">Or type it in the terminal: <code>shutdown &lt;word&gt;</code></p>';
  }

  function p2Click(btn) {
    if (!p2 || !S || S.finished) return;
    const i = +btn.dataset.i;
    if (btn.dataset.w === "p") { p2.pool.splice(p2.pool.indexOf(i), 1); p2.ans.push(i); SFX.pick(); }
    else { p2.ans.splice(p2.ans.indexOf(i), 1); p2.pool.push(i); SFX.click(); }
    drawP2(false);
  }

  function bossShutdown(word) {
    if (S.bossStep < bossRounds().length) { tprint("The shield is still up. Crack it first.", "warn"); return; }
    if (norm(word) === norm(C.killWord)) bossWin();
    else {
      tprint("SHUTDOWN FAILED: wrong kill word.", "err");
      roomWrong({ missed: [{ id: "kill", tag: "vocab", show: "The kill word was <b>" + C.killWord + "</b>: to break a connection.", why: "" }], msg: "That is not the kill word." });
    }
  }

  function bossWin(skipped) {
    if (S.finished) return;
    token += 1;
    S.finished = "win";
    S.rooms[BOSS].done = true; if (skipped) S.rooms[BOSS].skipped = true;
    stopClock(); Voice.stop(); SFX.stopMusic(); SFX.win();
    Dlg.close(false);
    computeResult(); save(); hud();
    drawIntegrity(0);
    if (bossFace) { bossFace.hit(); bossFace.dissolve(); }
    flash("SHUTDOWN COMPLETE", "green", 2600);
    $("#comms").innerHTML = "";
    const ui = $("#boss-ui");
    if (ui) ui.innerHTML = '<div class="solved"><div class="stamp">SHUTDOWN COMPLETE</div><p class="got">Kill word accepted: <b>' + C.killWord + "</b></p></div>";
    tprint("> shutdown " + C.killWord.toLowerCase(), "ok");
    tprint("KILL WORD ACCEPTED. VANTA IS OFFLINE.", "ok");
    setTimeout(showEnd, 4300);
  }

  /* ------------------------------------------------------------------
     Endings
     ------------------------------------------------------------------ */
  function fail() {
    if (S.finished) return;
    token += 1;
    S.finished = "fail";
    stopClock(); Dlg.close(false); Voice.stop(); SFX.stopMusic(); SFX.fail();
    closeModal();
    computeResult(); save();
    const h = $("#hacked");
    h.hidden = false;
    document.body.classList.add("hacked");
    hackedFace = new window.VantaFace($("#hacked-cv"), { cell: 13 }).start();
    hackedFace.speak(true);
    setTimeout(function () {
      h.hidden = true;
      document.body.classList.remove("hacked");
      if (hackedFace) { hackedFace.stop(); hackedFace = null; }
      showEnd();
    }, 5200);
  }

  function computeResult() {
    let wrong = 0, paid = 0, hints = 0, nodes = 0;
    S.rooms.forEach(function (st, i) {
      wrong += st.wrong; paid += st.paid; hints += st.hint + st.hintB;
      if (i < BOSS && st.done && !st.skipped) nodes += 1;
    });
    const bonus = { rookie: 0, runner: 40, legend: 80 }[S.level] || 0;
    let score = 600 + Math.round(400 * S.remaining / S.duration) - paid * 15 - wrong * 8 - S.traces * 40 + bonus;
    if (S.finished !== "win") score = nodes * 40;
    score = Math.max(0, score);
    const rank = S.finished === "win"
      ? C.ranks.filter(function (r) { return score >= r.min; })[0]
      : { name: "DISCONNECTED", note: "VANTA was faster this time." };
    S.result = { score: score, rank: rank.name, note: rank.note, wrong: wrong, paid: paid, hints: hints, nodes: nodes };
  }

  function buildReview() {
    const sk = {};
    Object.keys(C.skills).forEach(function (k) { sk[k] = { missed: [], paid: 0, wrong: 0, skipped: false, seen: false }; });
    S.rooms.forEach(function (st, i) {
      const def = i < BOSS ? C.rooms[i] : C.boss;
      def.skills.forEach(function (k, n) {
        if (st.done) sk[k].seen = true;
        if (n === 0) { sk[k].paid += st.paid; sk[k].wrong += st.wrong; }
        if (st.skipped) sk[k].skipped = true;
      });
      Object.keys(st.missed).forEach(function (id) {
        const m = st.missed[id];
        if (sk[m.tag]) sk[m.tag].missed.push(m);
      });
    });
    const groups = { work: [], ok: [], strong: [], none: [] };
    Object.keys(sk).forEach(function (k) {
      const s = sk[k];
      let g;
      if (s.skipped || s.missed.length >= 2 || s.paid >= 2 || (s.paid >= 1 && s.missed.length >= 1)) g = "work";
      else if (s.missed.length === 1 || s.paid === 1 || s.wrong >= 2) g = "ok";
      else if (s.seen) g = "strong";
      else g = "none";
      groups[g].push(k);
    });
    function card(k, detail) {
      const s = sk[k], def = C.skills[k];
      let h = '<div class="rv-card"><h4>' + esc(def.name) + "</h4>";
      if (detail) {
        h += '<p class="tip">' + rich(def.tip, true) + "</p>";
        if (s.skipped) h += '<p class="rv-note">This node was skipped by the teacher.</p>';
        if (s.missed.length) {
          h += '<p class="rv-sub">You missed these. Here are the correct answers:</p><ul>' +
            s.missed.map(function (m) { return "<li>" + m.show + (m.why ? '<br><span class="why">' + esc(m.why) + "</span>" : "") + "</li>"; }).join("") + "</ul>";
        }
      }
      return h + "</div>";
    }
    let h = "";
    h += '<div class="rv-group work"><h3>WORK ON THESE</h3>' + (groups.work.length
      ? groups.work.map(function (k) { return card(k, true); }).join("")
      : '<p class="rv-empty">Nothing here. You did not struggle badly with anything. Impressive!</p>') + "</div>";
    if (groups.ok.length) h += '<div class="rv-group ok"><h3>ALMOST THERE</h3>' + groups.ok.map(function (k) { return card(k, true); }).join("") + "</div>";
    if (groups.strong.length) h += '<div class="rv-group strong"><h3>STRONG SKILLS</h3><div class="chips">' +
      groups.strong.map(function (k) { return "<span>✔ " + esc(C.skills[k].name) + "</span>"; }).join("") + "</div></div>";
    if (groups.none.length) h += '<div class="rv-group none"><h3>NOT FINISHED THIS TIME</h3><div class="chips">' +
      groups.none.map(function (k) { return "<span>" + esc(C.skills[k].name) + "</span>"; }).join("") + "</div></div>";

    // what was practised
    let pts = "";
    S.rooms.forEach(function (st, i) {
      if (i >= BOSS || !(st.done || st.time > 0)) return;
      const R = C.rooms[i];
      pts += "<li><b>" + R.code + " " + esc(R.title) + ":</b> " + R.points.map(esc).join(" · ") + "</li>";
    });
    if (pts) h += '<div class="rv-group met"><h3>WHAT YOU PRACTISED</h3><ul class="met-list">' + pts + "</ul></div>";

    // vocabulary
    const vocab = (C.rooms[1].puzzle[S.level].pairs || []).map(function (p) { return p[0]; });
    let words = '<div class="rv-group words"><h3>WORDS FROM THE MISSION</h3><div class="chips">' +
      vocab.map(function (w) { return "<span>" + esc(w) + "</span>"; }).join("") + "</div>";
    if (S.lookups.length) words += '<p class="rv-sub">Words you looked up in the glossary:</p><ul class="lookups">' +
      S.lookups.map(function (k) { return "<li><b>" + esc(k) + "</b> = " + esc(C.glossary[k] || "") + "</li>"; }).join("") + "</ul>";
    h += words + "</div>";

    // per-node table for the teacher
    let rows = "";
    S.rooms.forEach(function (st, i) {
      const def = i < BOSS ? C.rooms[i] : C.boss;
      const status = st.skipped ? "skipped" : st.done ? "done" : (st.time > 0 ? "not finished" : "–");
      rows += "<tr><td>" + def.code + " " + esc(def.title) + "</td><td>" + status + "</td><td>" + (st.time ? mmss(st.time) : "–") + "</td><td>" + st.wrong + "</td><td>" + (st.hint + st.hintB) + "</td></tr>";
    });
    h += '<div class="rv-group table"><h3>NODE BY NODE</h3><table><thead><tr><th>Node</th><th>Status</th><th>Time</th><th>Wrong checks</th><th>Hints</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
    return h;
  }

  function showEnd() {
    const win = S.finished === "win", E = win ? C.win : C.fail, res = S.result;
    document.body.classList.remove("boss", "tense", "critical", "dlg-open");
    document.body.classList.toggle("end-win", win);
    document.body.classList.toggle("end-fail", !win);
    if (bossFace) { bossFace.stop(); bossFace = null; }
    $("#boss-view").hidden = true;
    const story = E.story.map(function (p) {
      const ch = C.characters[p.who];
      return '<p class="st-' + p.who + '">' + (p.who !== "narrator" ? '<b style="color:' + ch.color + '">' + ch.name + ":</b> " : "") + rich(fill(p.text)) + "</p>";
    }).join("");
    const stat = function (label, value, cls) { return '<div class="stat ' + (cls || "") + '"><span>' + label + "</span><b>" + value + "</b></div>"; };
    let h = '<div class="end-wrap ' + (win ? "win" : "fail") + '">' +
      '<header class="end-head"><p class="kicker">' + esc(E.sub) + '</p><h1 class="glitch" data-text="' + esc(E.title) + '">' + esc(E.title) + "</h1></header>" +
      '<section class="story panel"><div class="panel-bar"><span>' + (win ? "EPILOGUE" : "WHAT HAPPENED NEXT") + '</span><button type="button" id="btn-story" class="spk">🔊 READ ALOUD</button></div><div class="story-body">' + story + "</div></section>" +
      '<section class="stats">' +
        stat("RANK", esc(res.rank), "wide rank") + stat("SCORE", res.score) + stat("TIME LEFT", mmss(S.remaining)) +
        stat("NODES REPAIRED", res.nodes + " / " + BOSS) + stat("WRONG CHECKS", res.wrong) + stat("HINTS USED", res.hints) + stat("TIMES TRACED", S.traces) +
      "</section>";
    if (win) {
      h += '<section class="cert"><div class="cert-in"><p class="kicker">NEO-OSLO NET GUARD</p><h2>CERTIFICATE</h2><p>This certifies that the crew</p><h3>' + esc(S.crew) +
        "</h3><p>hacked into the Ironveil, repaired all ten nodes and shut down the rogue AI VANTA.</p>" +
        '<div class="cert-row"><div><span>RANK</span><b>' + esc(res.rank) + "</b></div><div><span>LEVEL</span><b>" + C.levels[S.level].name + "</b></div><div><span>TIME LEFT</span><b>" + mmss(S.remaining) +
        "</b></div><div><span>DATE</span><b>" + esc(S.date) + '</b></div></div><p class="sig">' + esc(res.note) + ' <i>— Mags, fixer</i></p></div></section>';
    }
    h += '<section class="review panel"><div class="panel-bar"><span>MISSION REPORT — ' + esc(S.crew) + " — " + C.levels[S.level].name + '</span></div><div class="review-body">' + buildReview() + "</div></section>" +
      '<div class="end-btns"><button type="button" id="btn-print" class="big alt">PRINT ' + (win ? "CERTIFICATE + REPORT" : "REPORT") + '</button><button type="button" id="btn-again" class="big">' + (win ? "NEW RUN ▶" : "TRY AGAIN ▶") + "</button></div></div>";
    $("#end").innerHTML = h;
    show("end");
  }

  function readStory() {
    const E = S.finished === "win" ? C.win : C.fail;
    let i = 0;
    (function nxt() {
      if (i >= E.story.length) return;
      const p = E.story[i++];
      Voice.speak(fill(p.text), p.who, nxt);
    })();
  }

  /* ------------------------------------------------------------------
     Teacher menu
     ------------------------------------------------------------------ */
  function openModal(title, html) {
    $("#modal-title").textContent = title;
    $("#modal-body").innerHTML = html;
    $("#modal").hidden = false;
    const f = $("#modal-body input, #modal-body button, #modal-body select");
    if (f) f.focus();
  }
  function closeModal() { $("#modal").hidden = true; $("#modal-body").innerHTML = ""; }

  function askCode(then) {
    if (teacherOK) { then(); return; }
    openModal("TEACHER ACCESS", '<form id="code-form"><p>Enter the teacher code.</p><input id="code-in" type="password" inputmode="numeric" autocomplete="off" aria-label="Teacher code"><button type="submit" class="big">UNLOCK</button><p id="code-msg" class="err"></p></form>');
    $("#code-form").addEventListener("submit", function (e) {
      e.preventDefault();
      if ($("#code-in").value.trim() === String(CFG.teacherCode)) { teacherOK = true; closeModal(); then(); }
      else { $("#code-msg").textContent = "Wrong code."; SFX.bad(); }
    });
  }

  function teacherStart() {
    askCode(function () {
      const saved = loadSave();
      openModal("TEACHER SETTINGS",
        '<p>Mission time for new runs on this device:</p><div class="tm-row">' +
        CFG.minuteOptions.map(function (m) { return '<button type="button" class="tm-min' + (m === minutes ? " on" : "") + '" data-min="' + m + '">' + m + " min</button>"; }).join("") + "</div>" +
        (saved ? '<p>There is a saved run on this device (crew: ' + esc(saved.crew) + ').</p><button type="button" class="big alt" data-tm="wipe">DELETE SAVED RUN</button>' : "") +
        '<p class="dim">More settings (teacher code, trace penalties) are in the file js/config.js.</p>');
    });
  }

  function teacherGame() {
    askCode(function () {
      const inGame = S && !S.finished;
      openModal("TEACHER MENU",
        '<div class="tm-grid">' +
        '<button type="button" data-tm="pause">' + (paused ? "▶ RESUME CLOCK" : "❚❚ PAUSE CLOCK") + "</button>" +
        '<button type="button" data-tm="plus">+5 MINUTES</button>' +
        '<button type="button" data-tm="minus">−5 MINUTES</button>' +
        '<button type="button" data-tm="trace">RESET TRACE METER</button>' +
        '<button type="button" data-tm="solution">SHOW SOLUTION</button>' +
        '<button type="button" data-tm="skip">SKIP THIS NODE</button>' +
        '<button type="button" data-tm="quit" class="danger">END RUN, BACK TO START</button></div>' +
        '<div id="tm-out">' + (inGame ? "Time left: " + mmss(S.remaining) + (paused ? " (paused)" : "") : "") + "</div>");
    });
  }

  function solutionHTML() {
    if (S.room >= BOSS) {
      return "<ol>" + bossRounds().map(function (r) { return "<li>" + esc(r.ok) + "</li>"; }).join("") + "</ol><p>Kill word: <code>shutdown " + C.killWord.toLowerCase() + "</code></p>";
    }
    if (puzzle && S.phase === "play") return puzzle.solution();
    return "<p>The solution is available when the node's task is on screen.</p>";
  }

  function teacherAction(a) {
    if (a === "wipe") { clearSave(); $("#btn-resume").hidden = true; closeModal(); return; }
    if (!S || S.finished) { closeModal(); return; }
    const out = $("#tm-out");
    if (a === "pause") { paused = !paused; document.body.classList.toggle("paused", paused); teacherGame(); }
    else if (a === "plus") { S.remaining += 300; S.warned = {}; hud(); save(); out.textContent = "Time left: " + mmss(S.remaining); }
    else if (a === "minus") { S.remaining = Math.max(10, S.remaining - 300); hud(); save(); out.textContent = "Time left: " + mmss(S.remaining); }
    else if (a === "trace") { S.trace = 0; hud(); save(); out.textContent = "Trace meter reset."; }
    else if (a === "solution") { out.innerHTML = '<div class="sol"><b>SOLUTION</b>' + solutionHTML() + "</div>"; }
    else if (a === "skip") {
      closeModal();
      if (Dlg.open) Dlg.close(false);
      if (S.room < 0) { token += 1; startClock(); enterRoom(0); }
      else if (S.room >= BOSS) bossWin(true);
      else if (S.phase === "done") continueRoom();
      else { token += 1; if (S.phase !== "play") { $("#task-body").innerHTML = ""; } roomSolved(true); }
    }
    else if (a === "quit") {
      token += 1; stopClock(); Voice.stop(); SFX.stopMusic(); if (Dlg.open) Dlg.close(false);
      clearSave(); S = null; paused = false; closeModal();
      if (bossFace) { bossFace.stop(); bossFace = null; }
      $("#boss-view").hidden = true;
      document.body.classList.remove("boss", "tense", "critical", "paused");
      startScreen();
    }
  }

  /* ------------------------------------------------------------------
     Start screen and wiring
     ------------------------------------------------------------------ */
  function startScreen() {
    show("start");
    const saved = loadSave();
    $("#btn-resume").hidden = !(saved && !saved.finished);
    if (saved && !saved.finished) $("#btn-resume").textContent = "RESUME SAVED RUN (" + saved.crew + ", " + mmss(saved.remaining) + " left)";
    $("#mins").textContent = minutes;
  }

  function begin() {
    const crew = $("#crew").value.replace(/[`{}]/g, "").replace(/\s+/g, " ").trim() || "Ghost Crew";
    const level = ($('input[name="level"]:checked') || {}).value || "runner";
    S = newState(crew, level);
    paused = false; p2 = null;
    SFX.unlock(); SFX.startMusic();
    save();
    intro();
  }

  function resume() {
    const saved = loadSave();
    if (!saved) return;
    S = saved; paused = false; p2 = null;
    SFX.unlock(); SFX.startMusic();
    show("game"); logEl.innerHTML = ""; hud(); setPrompt();
    tprint("Connection restored. Welcome back, " + esc(S.crew) + ".", "ok");
    if (S.room < 0) { intro(); return; }
    startClock();
    if (S.phase === "done" && S.room < BOSS) enterRoom(S.room + 1); else enterRoom(S.room);
  }

  /* ---- glossary tooltip ---- */
  let tipTimer = null;
  function showTip(el, record) {
    const k = el.dataset.k, tip = $("#gloss-tip");
    tip.innerHTML = "<b>" + esc(el.textContent) + "</b><span>NO</span> " + esc(C.glossary[k] || "");
    tip.hidden = false;
    const r = el.getBoundingClientRect();
    const w = tip.offsetWidth, hgt = tip.offsetHeight;
    let x = r.left + r.width / 2 - w / 2, y = r.top - hgt - 8;
    x = Math.max(8, Math.min(window.innerWidth - w - 8, x));
    if (y < 8) y = r.bottom + 8;
    tip.style.left = x + "px"; tip.style.top = y + "px";
    if (record && S && S.lookups.indexOf(k) < 0) { S.lookups.push(k); save(); }
  }
  function hideTip() { $("#gloss-tip").hidden = true; clearTimeout(tipTimer); }

  function wire() {
    // start screen
    $("#btn-start").addEventListener("click", begin);
    $("#btn-resume").addEventListener("click", resume);
    $("#crew").addEventListener("keydown", function (e) { if (e.key === "Enter") begin(); });
    $("#btn-tset").addEventListener("click", teacherStart);
    [["opt-sfx", "sfx"], ["opt-music", "music"], ["opt-auto", "auto"], ["opt-easy", "easy"]].forEach(function (p) {
      $("#" + p[0]).addEventListener("change", function (e) { prefs[p[1]] = e.target.checked; applyPrefs(); });
    });
    // HUD buttons
    [["btn-sfx", "sfx"], ["btn-music", "music"], ["btn-auto", "auto"], ["btn-easy", "easy"]].forEach(function (p) {
      $("#" + p[0]).addEventListener("click", function () {
        prefs[p[1]] = !prefs[p[1]];
        applyPrefs();
        if (p[1] === "music" && prefs.music && S && !S.finished) SFX.startMusic();
        if (p[1] === "auto" && !prefs.auto) Voice.stop();
        SFX.click();
      });
    });
    $("#btn-teacher").addEventListener("click", teacherGame);

    // terminal
    $("#cmd").addEventListener("submit", function (e) {
      e.preventDefault();
      const v = cmdEl.value; cmdEl.value = "";
      runCmd(v);
    });
    cmdEl.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") { if (histPos > 0) { histPos -= 1; cmdEl.value = hist[histPos]; } e.preventDefault(); }
      else if (e.key === "ArrowDown") { if (histPos < hist.length) { histPos += 1; cmdEl.value = hist[histPos] || ""; } e.preventDefault(); }
      else if (e.key === "Tab") { e.preventDefault(); complete(); }
    });
    $("#term").addEventListener("click", function (e) {
      if (!e.target.closest("button, .gl") && !window.getSelection().toString()) cmdEl.focus({ preventScroll: true });
    });

    // dialogue
    $("#dlg-next").addEventListener("click", function () { Dlg.next(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { hideTip(); if (!$("#modal").hidden) closeModal(); return; }
      if (!Dlg.open || !$("#modal").hidden) return;
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        if (e.target && e.target.id === "dlg-speak") return;
        e.preventDefault(); Dlg.next();
      }
    });

    // everything clickable that is created later
    document.addEventListener("click", function (e) {
      const t = e.target;
      const spk = t.closest(".spk");
      if (spk && spk.dataset.say != null) { Voice.speak(spk.dataset.say, spk.dataset.who); return; }
      if (t.closest("#btn-story")) { readStory(); return; }
      const gl = t.closest(".gl");
      if (gl) { showTip(gl, true); return; }
      hideTip();
      if (t.closest("#btn-check")) { runCheck(); return; }
      if (t.closest("#btn-continue")) { continueRoom(); return; }
      const co = t.closest(".copt"); if (co) { commsClick(co); return; }
      const bo = t.closest(".bopt"); if (bo) { bossPick(bo); return; }
      const lt = t.closest(".ltile"); if (lt) { p2Click(lt); return; }
      if (t.closest("#btn-shutdown")) {
        if (p2 && p2.pool.length) { setNote("Use all ten letters first.", "warn"); return; }
        const letters = C.rooms.map(function (r) { return r.fragment; });
        bossShutdown(p2.ans.map(function (i) { return letters[i]; }).join(""));
        return;
      }
      if (t.closest("#btn-print")) { window.print(); return; }
      if (t.closest("#btn-again")) { Voice.stop(); clearSave(); S = null; document.body.classList.remove("end-win", "end-fail"); startScreen(); return; }
      if (t.closest("#modal-close") || t.id === "modal") { closeModal(); return; }
      const tm = t.closest("[data-tm]"); if (tm) { teacherAction(tm.dataset.tm); return; }
      const mn = t.closest(".tm-min"); if (mn) { minutes = +mn.dataset.min; applyPrefs(); $$(".tm-min").forEach(function (b) { b.classList.toggle("on", b === mn); }); return; }
    });
    document.addEventListener("mouseover", function (e) {
      const gl = e.target.closest && e.target.closest(".gl");
      if (!gl) return;
      showTip(gl, false);
      clearTimeout(tipTimer);
      tipTimer = setTimeout(function () { if (!$("#gloss-tip").hidden) showTip(gl, true); }, 800);
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(".gl")) hideTip();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.classList && e.target.classList.contains("gl")) { e.stopPropagation(); showTip(e.target, true); }
    }, true);

    // the voice moves VANTA's mouth
    Voice.onstart = function (who) {
      if (who === "vanta") { if (bossFace) bossFace.speak(true); if (Dlg.face) Dlg.face.speak(true); }
    };
    Voice.onend = function () {
      if (bossFace) bossFace.speak(false);
      if (Dlg.face) Dlg.face.speak(false);
    };
    window.addEventListener("resize", function () {
      if (bossFace) bossFace.resize();
      if (hackedFace) hackedFace.resize();
    });
    window.addEventListener("beforeunload", function () { save(); Voice.stop(); });
  }

  /* ------------------------------------------------------------------ */
  buildGloss();
  loadPrefs();
  wire();
  applyPrefs();
  const old = loadSave();
  if (old && old.finished && old.result) { S = old; showEnd(); }
  else startScreen();
})();
