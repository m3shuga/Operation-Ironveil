/* =====================================================================
   IRONVEIL — the puzzle widgets.
   Each widget draws itself inside `root` and returns:
     check()    -> { incomplete } or { ok, missed: [{id, tag, show, why}] }
     solution() -> HTML for the teacher's answer key
     debrief()  -> HTML shown to the players after the node is solved
   ===================================================================== */
window.Puzzles = (function () {
  "use strict";

  const esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  const norm = function (s) {
    return String(s == null ? "" : s).toLowerCase().replace(/[’`´‘]/g, "'").replace(/\s+/g, " ").trim();
  };
  function shuffle(arr, mustDiffer) {
    const a = arr.slice();
    for (let tries = 0; tries < 30; tries++) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
      }
      if (!mustDiffer || a.length < 2 || a.some(function (v, i) { return v !== arr[i]; })) break;
    }
    return a;
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  const optLabel = function (o) { return o === "–" ? "– (no word)" : o; };

  /* ------------------------------------------------------------------
     GAPS — choose or type the missing word
     ------------------------------------------------------------------ */
  function gaps(root, d, H) {
    const ctl = [];
    if (d.note) root.appendChild(el("div", "pz-note", esc(d.note)));
    const list = el(d.flow ? "div" : "ol", "gaps" + (d.flow ? " flow" : ""));
    d.items.forEach(function (it, i) {
      const row = el(d.flow ? "p" : "li");
      it.t.split("{}").forEach(function (part, j) {
        row.appendChild(document.createTextNode(part));
        if (j >= it.g.length) return;
        const g = it.g[j];
        const wrap = el("span", "gapw");
        let input;
        if (g.typed) {
          input = el("input", "gap");
          input.type = "text"; input.size = 16;
          input.setAttribute("autocomplete", "off"); input.setAttribute("autocapitalize", "off");
          input.setAttribute("spellcheck", "false");
          input.setAttribute("aria-label", "Type the correct form of: " + g.base);
          wrap.appendChild(input);
          wrap.appendChild(el("span", "base", "(" + esc(g.base) + ")"));
        } else {
          input = el("select", "gap");
          input.setAttribute("aria-label", "Choose the correct word");
          if (!g.init) { const ph = el("option", null, "· · ·"); ph.value = ""; input.appendChild(ph); }
          g.o.slice().sort(function (a, b) { return a.toLowerCase() < b.toLowerCase() ? -1 : 1; }).forEach(function (o) {
            const op = el("option", null, esc(optLabel(o))); op.value = o; input.appendChild(op);
          });
          input.value = g.init || "";
          if (g.init) wrap.classList.add("pre");
          wrap.appendChild(input);
        }
        input.addEventListener("input", function () { wrap.classList.remove("bad", "good"); });
        input.addEventListener("change", function () { wrap.classList.remove("bad", "good"); H.sfx("click"); });
        ctl.push({ el: input, wrap: wrap, g: g, it: it, id: i + "." + j });
        row.appendChild(wrap);
      });
      list.appendChild(row);
    });
    root.appendChild(list);

    function right(c) { return [].concat(c.g.a).map(norm).indexOf(norm(c.el.value)) >= 0; }
    function shown(c) {
      if (c.g.ctx) return c.g.ctx;
      const parts = c.it.t.split("{}");
      let out = "";
      parts.forEach(function (p, k) {
        out += esc(p);
        if (k < c.it.g.length) out += "<b>" + esc([].concat(c.it.g[k].a)[0]) + "</b>";
      });
      return out;
    }
    return {
      check() {
        if (ctl.some(function (c) { return !norm(c.el.value); })) {
          ctl.forEach(function (c) { if (!norm(c.el.value)) c.wrap.classList.add("bad"); });
          return { incomplete: true };
        }
        const missed = [];
        ctl.forEach(function (c) {
          c.wrap.classList.remove("bad", "good");
          if (right(c)) c.wrap.classList.add("good");
          else { c.wrap.classList.add("bad"); missed.push({ id: c.id, tag: c.g.tag || d.tag, show: shown(c), why: c.g.why || "" }); }
        });
        return { ok: !missed.length, missed: missed };
      },
      lock() { ctl.forEach(function (c) { c.el.disabled = true; }); },
      solution() {
        return "<ol>" + ctl.map(function (c) { return "<li>" + shown(c) + "</li>"; }).join("") + "</ol>";
      },
      debrief() { return null; }
    };
  }

  /* ------------------------------------------------------------------
     MATCH — pair words with meanings
     ------------------------------------------------------------------ */
  function match(root, d, H) {
    const n = d.pairs.length;
    const defOrder = shuffle(d.pairs.map(function (_, i) { return i; }), true);
    const pair = d.pairs.map(function () { return -1; });   // term index -> definition index
    const bad = {};
    let sel = -1;
    const LET = "ABCDEFGHIJ";
    const box = el("div", "match");
    root.appendChild(box);

    function draw() {
      const usedBy = {};
      pair.forEach(function (dIdx, t) { if (dIdx >= 0) usedBy[dIdx] = t; });
      let h = '<div class="m-col m-terms">';
      d.pairs.forEach(function (p, i) {
        h += '<button type="button" class="m-term c' + (i % 7) + (sel === i ? " sel" : "") + (pair[i] >= 0 ? " paired" : "") + (bad[i] ? " bad" : "") +
             '" data-t="' + i + '"><span class="tagl">' + LET[i] + "</span>" + esc(p[0]) + "</button>";
      });
      h += '</div><div class="m-col m-defs">';
      defOrder.forEach(function (dIdx) {
        const t = usedBy[dIdx];
        h += '<button type="button" class="m-def' + (t != null ? " paired c" + (t % 7) : "") + (t != null && bad[t] ? " bad" : "") +
             '" data-d="' + dIdx + '"><span class="tagl">' + (t != null ? LET[t] : "?") + "</span>" + esc(d.pairs[dIdx][1]) + "</button>";
      });
      h += "</div>";
      box.innerHTML = h;
    }
    box.addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (!b || b.disabled) return;
      if (b.dataset.t != null) {
        const i = +b.dataset.t;
        delete bad[i];
        if (pair[i] >= 0) pair[i] = -1;
        sel = sel === i ? -1 : i;
        H.sfx("click");
      } else if (b.dataset.d != null) {
        const dIdx = +b.dataset.d;
        const owner = pair.indexOf(dIdx);
        if (sel < 0) {
          if (owner >= 0) { pair[owner] = -1; delete bad[owner]; H.sfx("click"); }
          else H.note("Click a word on the left first.");
        } else {
          if (owner >= 0) { pair[owner] = -1; delete bad[owner]; }
          pair[sel] = dIdx; delete bad[sel]; sel = -1;
          H.sfx("pick");
        }
      }
      draw();
    });
    draw();

    return {
      check() {
        if (pair.some(function (p) { return p < 0; })) return { incomplete: true };
        const missed = [];
        pair.forEach(function (dIdx, t) {
          if (dIdx !== t) {
            bad[t] = true;
            missed.push({ id: "m" + t, tag: d.tag || "vocab", show: "<b>" + esc(d.pairs[t][0]) + "</b> = " + esc(d.pairs[t][1]), why: "" });
          }
        });
        draw();
        return { ok: !missed.length, missed: missed };
      },
      lock() { Array.prototype.forEach.call(box.querySelectorAll("button"), function (b) { b.disabled = true; }); },
      solution() {
        return "<ul>" + d.pairs.map(function (p) { return "<li><b>" + esc(p[0]) + "</b> = " + esc(p[1]) + "</li>"; }).join("") + "</ul>";
      },
      debrief() { return null; }
    };
  }

  /* ------------------------------------------------------------------
     ORDER — build sentences from scrambled tiles
     ------------------------------------------------------------------ */
  function order(root, d, H) {
    const st = d.items.map(function (it) {
      return { pool: shuffle(it.w.map(function (_, i) { return i; }), true), ans: [], bad: false };
    });
    const box = el("div", "order");
    root.appendChild(box);

    function draw() {
      let h = "";
      d.items.forEach(function (it, i) {
        const s = st[i];
        h += '<div class="ord' + (s.bad ? " bad" : "") + '"><div class="ord-n">' + (i + 1) + '</div><div class="ord-main">' +
             '<div class="ord-ans" aria-label="Your sentence">' +
             (s.ans.length ? s.ans.map(function (w) { return '<button type="button" class="tile in" data-i="' + i + '" data-a="' + w + '">' + esc(it.w[w]) + "</button>"; }).join("") : '<span class="ghost">click the words below ...</span>') +
             '<span class="end">' + esc(it.end || ".") + "</span></div>" +
             '<div class="ord-pool">' + s.pool.map(function (w) { return '<button type="button" class="tile" data-i="' + i + '" data-p="' + w + '">' + esc(it.w[w]) + "</button>"; }).join("") + "</div></div></div>";
      });
      box.innerHTML = h;
    }
    box.addEventListener("click", function (e) {
      const b = e.target.closest("button.tile");
      if (!b || b.disabled) return;
      const s = st[+b.dataset.i];
      s.bad = false;
      if (b.dataset.p != null) { const w = +b.dataset.p; s.pool.splice(s.pool.indexOf(w), 1); s.ans.push(w); H.sfx("pick"); }
      else { const w = +b.dataset.a; s.ans.splice(s.ans.indexOf(w), 1); s.pool.push(w); H.sfx("click"); }
      draw();
    });
    draw();

    function isRight(it, s) {
      const built = norm(s.ans.map(function (w) { return it.w[w]; }).join(" "));
      return [it.w.join(" ")].concat(it.alts || []).map(norm).indexOf(built) >= 0;
    }
    return {
      check() {
        if (st.some(function (s) { return s.pool.length; })) return { incomplete: true };
        const missed = [];
        d.items.forEach(function (it, i) {
          st[i].bad = !isRight(it, st[i]);
          if (st[i].bad) missed.push({ id: "o" + i, tag: it.tag || d.tag, show: esc(it.full), why: it.why || "" });
        });
        draw();
        return { ok: !missed.length, missed: missed };
      },
      lock() { Array.prototype.forEach.call(box.querySelectorAll("button"), function (b) { b.disabled = true; }); },
      solution() { return "<ol>" + d.items.map(function (it) { return "<li>" + esc(it.full) + "</li>"; }).join("") + "</ol>"; },
      debrief() {
        return "<ol class='deb'>" + d.items.map(function (it) { return "<li><b>" + esc(it.full) + "</b><br><span>" + esc(it.why || "") + "</span></li>"; }).join("") + "</ol>";
      }
    };
  }

  /* ------------------------------------------------------------------
     FLAG — mark each card with one of two labels (passwords, messages)
     ------------------------------------------------------------------ */
  function flag(root, d, H) {
    const val = d.items.map(function () { return null; });
    const bad = {};
    const box = el("div", "flag " + (d.kind || ""));
    root.appendChild(box);
    const labelOf = function (k) { return (d.labels.filter(function (l) { return l.k === k; })[0] || {}).label || k; };
    const titleOf = function (it) { return it.t != null ? "<code>" + esc(it.t) + "</code>" : esc(it.subj) + " <i>(" + esc(it.from) + ")</i>"; };

    function draw() {
      box.innerHTML = d.items.map(function (it, i) {
        const body = it.t != null
          ? '<div class="pw"><code>' + esc(it.t) + "</code></div>"
          : '<div class="mail"><div class="mh"><span>FROM</span> ' + esc(it.from) + '</div><div class="mh"><span>SUBJECT</span> ' + esc(it.subj) + '</div><div class="mb">' + esc(it.body) + "</div></div>";
        return '<div class="card' + (bad[i] ? " bad" : "") + (val[i] ? " set" : "") + '">' + body + '<div class="btns">' +
          d.labels.map(function (l, li) {
            return '<button type="button" class="fl fl' + li + (val[i] === l.k ? " on" : "") + '" data-i="' + i + '" data-k="' + l.k + '" aria-pressed="' + (val[i] === l.k) + '">' + esc(l.label) + "</button>";
          }).join("") + "</div></div>";
      }).join("");
    }
    box.addEventListener("click", function (e) {
      const b = e.target.closest("button.fl");
      if (!b || b.disabled) return;
      val[+b.dataset.i] = b.dataset.k; delete bad[+b.dataset.i];
      H.sfx("click");
      draw();
    });
    draw();

    return {
      check() {
        if (val.some(function (v) { return !v; })) return { incomplete: true };
        const missed = [];
        d.items.forEach(function (it, i) {
          if (val[i] !== it.a) {
            bad[i] = true;
            missed.push({ id: "f" + i, tag: d.tag, show: titleOf(it) + " → <b>" + esc(labelOf(it.a)) + "</b>", why: it.why || "" });
          }
        });
        draw();
        return { ok: !missed.length, missed: missed };
      },
      lock() { Array.prototype.forEach.call(box.querySelectorAll("button"), function (b) { b.disabled = true; }); },
      solution() {
        return "<ul>" + d.items.map(function (it) { return "<li>" + titleOf(it) + " → <b>" + esc(labelOf(it.a)) + "</b></li>"; }).join("") + "</ul>";
      },
      debrief() {
        return "<ul class='deb'>" + d.items.map(function (it) {
          return "<li>" + titleOf(it) + " → <b>" + esc(labelOf(it.a)) + "</b><br><span>" + esc(it.why || "") + "</span></li>";
        }).join("") + "</ul>";
      }
    };
  }

  /* ------------------------------------------------------------------
     CIPHER — a coded word and the table needed to decode it
     (the answer is typed in the terminal)
     ------------------------------------------------------------------ */
  function cipher(root, d, H) {
    const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const bin = function (n, len) { let s = n.toString(2); while (s.length < len) s = "0" + s; return s; };
    const letters = d.word.toUpperCase().split("");
    let code, table, how;
    if (d.mode === "a1") {
      code = letters.map(function (l) { return A.indexOf(l) + 1; });
      table = A.map(function (l, i) { return "<div><b>" + (i + 1) + "</b><span>" + l + "</span></div>"; }).join("");
      how = "Each number is one letter.";
    } else if (d.mode === "b5") {
      code = letters.map(function (l) { return bin(A.indexOf(l) + 1, 5); });
      table = A.map(function (l, i) { return "<div><b>" + bin(i + 1, 5) + "</b><span>" + l + "</span></div>"; }).join("");
      how = "Each group of five digits is one letter.";
    } else {
      code = letters.map(function (l) { return bin(l.charCodeAt(0), 8); });
      table = A.map(function (l) { return "<div><b>" + l.charCodeAt(0) + "</b><span>" + l + "</span></div>"; }).join("");
      how = "Each group of eight digits is one number. Add the place values where there is a 1.";
    }
    let h = '<div class="pz-note">ENCRYPTED KEY</div><div class="code-groups">' +
      code.map(function (c) { return "<span>" + c + "</span>"; }).join("") + "</div><p class='cph-how'>" + esc(how) + "</p>";
    if (d.mode === "b8") {
      h += '<div class="places"><div class="pl-h">PLACE VALUES</div><div class="pl-r">' +
        [128, 64, 32, 16, 8, 4, 2, 1].map(function (v) { return "<span>" + v + "</span>"; }).join("") +
        '</div><div class="pl-r ex">' + "01000001".split("").map(function (v) { return "<span>" + v + "</span>"; }).join("") +
        '</div><div class="pl-n">Example: 01000001 = 64 + 1 = 65 = A</div></div>';
    }
    h += '<div class="pz-note">DECODING TABLE</div><div class="ctable ' + d.mode + '">' + table + "</div>";
    root.appendChild(el("div", "cipher", h));
    return {
      check() { return { incomplete: true }; },
      lock() {},
      solution() { return "<p><code>" + esc(H.usage.split(" ")[0] + " " + d.answers[0]) + "</code></p>"; },
      debrief() { return "<p class='deb'>" + esc(d.reveal || "") + "</p>"; }
    };
  }

  /* ------------------------------------------------------------------
     GOALS — a checklist for the terminal nodes
     ------------------------------------------------------------------ */
  function goals(root, d, H) {
    const box = el("ul", "goals");
    root.appendChild(box);
    function draw() {
      box.innerHTML = d.goals.map(function (g) {
        const done = H.goalDone(g.id);
        return '<li class="' + (done ? "done" : "") + '"><span class="chk">' + (done ? "✔" : "") + "</span>" + H.rich(g.label, true) + "</li>";
      }).join("");
    }
    draw();
    return {
      update: draw,
      check() { return { incomplete: true }; },
      lock() {},
      solution() { return "<p><code>" + esc(H.usage.split(" ")[0] + " " + d.answers[0]) + "</code></p>"; },
      debrief() { return "<p class='deb'>" + esc(d.reveal || "") + "</p>"; }
    };
  }

  return { gaps: gaps, match: match, order: order, flag: flag, cipher: cipher, goals: goals, norm: norm, esc: esc, shuffle: shuffle };
})();
