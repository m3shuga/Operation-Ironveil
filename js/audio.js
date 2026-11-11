/* =====================================================================
   IRONVEIL — sound effects, background music and the read-aloud voice.
   Everything is generated in the browser. There are no audio files.
   ===================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Sound effects and music (Web Audio)
     ------------------------------------------------------------------ */
  let ctx = null, master = null, sfxBus = null, musicBus = null;
  let sfxOn = true, musicOn = true, tense = false;
  let musicTimer = null, nextNote = 0, step = 0, pad = null;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { ctx = new AC(); } catch (e) { return null; }
      master = ctx.createGain(); master.gain.value = 0.6; master.connect(ctx.destination);
      sfxBus = ctx.createGain(); sfxBus.gain.value = 0.55; sfxBus.connect(master);
      musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master);
    }
    if (ctx.state === "suspended") ctx.resume().catch(function () {});
    return ctx;
  }

  function tone(freq, dur, type, vol, delay, slideTo, bus) {
    if (!ensure()) return;
    const t0 = ctx.currentTime + (delay || 0);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "square";
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(bus || sfxBus);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  function noise(dur, vol, delay, freq, bus) {
    if (!ensure()) return;
    const t0 = ctx.currentTime + (delay || 0);
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq || 1800; f.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol || 0.2, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(bus || sfxBus);
    src.start(t0); src.stop(t0 + dur + 0.02);
  }

  const fx = {
    type()   { tone(900 + Math.random() * 500, 0.025, "square", 0.035); },
    click()  { tone(520, 0.05, "square", 0.08); },
    pick()   { tone(700, 0.05, "triangle", 0.12); tone(1050, 0.06, "triangle", 0.08, 0.04); },
    ok()     { tone(660, 0.09, "square", 0.1); tone(880, 0.09, "square", 0.1, 0.09); tone(1320, 0.18, "square", 0.1, 0.18); },
    bad()    { tone(180, 0.25, "sawtooth", 0.16, 0, 90); noise(0.2, 0.12, 0, 600); },
    solve()  { [523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(f, 0.16, "square", 0.1, i * 0.09); }); noise(0.3, 0.05, 0.45, 5000); },
    alarm()  { for (let i = 0; i < 4; i++) { tone(880, 0.16, "sawtooth", 0.13, i * 0.32); tone(660, 0.16, "sawtooth", 0.13, i * 0.32 + 0.16); } },
    glitch() { noise(0.12, 0.12, 0, 3000); tone(90, 0.12, "sawtooth", 0.1, 0.02, 40); },
    boot()   { tone(110, 0.5, "sawtooth", 0.1, 0, 440); tone(880, 0.12, "square", 0.07, 0.5); },
    hit()    { noise(0.35, 0.22, 0, 900); tone(220, 0.4, "sawtooth", 0.16, 0, 55); },
    win()    { [392, 523, 659, 784, 1047, 1319, 1568].forEach(function (f, i) { tone(f, 0.35, "triangle", 0.13, i * 0.13); }); },
    fail()   { tone(440, 1.6, "sawtooth", 0.2, 0, 40); noise(1.4, 0.2, 0, 400); tone(55, 2, "square", 0.12, 0.3); }
  };

  /* ---- music: a slow dark synth loop ---- */
  const ROOTS = [0, 0, -4, -4, 3, 3, -2, -2];          // A, F, C, G (in semitones from A)
  const ARP = [0, 7, 12, 15, 19, 15, 12, 7, 0, 7, 12, 14, 19, 14, 12, 7];
  const BASS = [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  function semi(base, n) { return base * Math.pow(2, n / 12); }

  function schedule() {
    if (!ctx || !musicOn) return;
    const spb = 60 / (tense ? 124 : 96) / 4;
    while (nextNote < ctx.currentTime + 0.25) {
      const s = step % 16, bar = Math.floor(step / 16) % ROOTS.length, root = ROOTS[bar];
      const when = Math.max(0, nextNote - ctx.currentTime);
      if (BASS[s]) tone(semi(55, root), spb * 1.8, "sawtooth", 0.11, when, null, musicBus);
      if (s % 2 === 0 || tense) tone(semi(220, root + ARP[s]), spb * 0.9, "square", 0.022, when, null, musicBus);
      if (s % 4 === 2) noise(0.04, 0.03, when, 7000, musicBus);
      if (s === 0 && pad) {
        const t0 = ctx.currentTime + when;
        pad.a.frequency.setTargetAtTime(semi(110, root), t0, 0.4);
        pad.b.frequency.setTargetAtTime(semi(110, root + 7) * 1.003, t0, 0.4);
      }
      nextNote += spb; step += 1;
    }
  }

  function startMusic() {
    if (!musicOn || !ensure() || musicTimer) return;
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 420;
    const g = ctx.createGain(); g.gain.value = 0.05;
    const a = ctx.createOscillator(), b = ctx.createOscillator();
    a.type = "sawtooth"; b.type = "sawtooth"; a.frequency.value = 110; b.frequency.value = 165;
    a.connect(f); b.connect(f); f.connect(g); g.connect(musicBus);
    a.start(); b.start();
    pad = { a: a, b: b, g: g };
    nextNote = ctx.currentTime + 0.1; step = 0;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setTargetAtTime(0.5, ctx.currentTime, 1.2);
    musicTimer = setInterval(schedule, 90);
  }

  function stopMusic() {
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
    if (ctx && musicBus) musicBus.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
    if (pad) {
      const p = pad; pad = null;
      setTimeout(function () { try { p.a.stop(); p.b.stop(); } catch (e) {} }, 900);
    }
  }

  const SFX = { unlock: ensure, startMusic: startMusic, stopMusic: stopMusic,
    setSfx(v) { sfxOn = !!v; },
    setMusic(v) { musicOn = !!v; if (!musicOn) stopMusic(); },
    setTense(v) { tense = !!v; },
    get sfxOn() { return sfxOn; }, get musicOn() { return musicOn; }
  };
  Object.keys(fx).forEach(function (k) {
    SFX[k] = function () { if (sfxOn) { try { fx[k](); } catch (e) {} } };
  });
  window.SFX = SFX;

  /* ------------------------------------------------------------------
     Read-aloud voice (the browser's built-in speech synthesis)
     ------------------------------------------------------------------ */
  const synth = window.speechSynthesis;
  let voices = [];
  function loadVoices() { try { voices = synth ? synth.getVoices() : []; } catch (e) { voices = []; } }
  if (synth) {
    loadVoices();
    if (typeof synth.addEventListener === "function") synth.addEventListener("voiceschanged", loadVoices);
  }

  function pickVoice(pref) {
    const en = voices.filter(function (v) { return /^en([-_]|$)/i.test(v.lang); });
    if (!en.length) return null;
    const female = /female|zira|samantha|susan|hazel|karen|moira|tessa|fiona|serena|libby|sonia|aria|jenny|victoria/i;
    const male = /\bmale|david|daniel|george|ryan|guy|alex|fred|oliver|arthur|thomas|mark/i;
    let pool = en;
    if (pref === "female") { const f = en.filter(function (v) { return female.test(v.name); }); if (f.length) pool = f; }
    if (pref === "male") { const m = en.filter(function (v) { return male.test(v.name) && !female.test(v.name); }); if (m.length) pool = m; }
    return pool.find(function (v) { return /en[-_]GB/i.test(v.lang); }) ||
           pool.find(function (v) { return /en[-_]US/i.test(v.lang); }) || pool[0];
  }

  /* make terminal text sound right when it is read aloud */
  function speakable(text) {
    return String(text)
      .replace(/`cd \.\.`/g, "C D dot dot")
      .replace(/`ls`/g, "L S")
      .replace(/`cd`/g, "C D")
      .replace(/`cd (\w+)`/g, "C D $1")
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\.(txt|jpg|png|gif|mp3|wav|zip|exe)\b/gi, function (m, e) { return " dot " + e.toUpperCase().split("").join(" "); })
      .replace(/<[^>]+>/g, " ")
      .replace(/[–—]/g, ", ")
      .replace(/\.\.\./g, ", ")
      .replace(/\s+/g, " ").trim();
  }

  const Voice = {
    supported: !!(synth && window.SpeechSynthesisUtterance),
    auto: false,
    onstart: null, onend: null,
    _id: 0,
    /* cb runs when the text has been read to the end (not when it is stopped) */
    speak(text, who, cb) {
      if (!this.supported) return false;
      this.stop();
      const my = ++this._id;
      if (!voices.length) loadVoices();
      const ch = (window.CONTENT.characters[who] || window.CONTENT.characters.narrator).voice || {};
      const u = new SpeechSynthesisUtterance(speakable(text));
      const v = pickVoice(ch.pref);
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-GB"; }
      u.pitch = ch.pitch == null ? 1 : ch.pitch;
      u.rate = ch.rate == null ? 0.95 : ch.rate;
      const self = this;
      u.onstart = function () { if (self.onstart) self.onstart(who); };
      u.onend = u.onerror = function () {
        if (my !== self._id) return;
        if (self.onend) self.onend(who);
        if (cb) cb();
      };
      try { synth.speak(u); } catch (e) { return false; }
      return true;
    },
    stop() {
      if (!this.supported) return;
      this._id++;
      try { synth.cancel(); } catch (e) {}
      if (this.onend) this.onend();
    }
  };
  window.Voice = Voice;
})();
