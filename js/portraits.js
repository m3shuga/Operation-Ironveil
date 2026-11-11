/* =====================================================================
   IRONVEIL — character portraits (drawn in code, no image files)
   and the animated face of the rogue AI.
   ===================================================================== */
(function () {
  "use strict";
  let uid = 0;

  const ART = {
    /* ---------------- MAGS — the fixer ---------------- */
    mags: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" role="img" aria-label="Mags, the fixer">
  <defs>
    <linearGradient id="bg__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2a02"/><stop offset=".55" stop-color="#1a0f05"/><stop offset="1" stop-color="#05060c"/></linearGradient>
    <linearGradient id="sk__" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e0aa84"/><stop offset=".6" stop-color="#c58a66"/><stop offset="1" stop-color="#84533e"/></linearGradient>
    <linearGradient id="hr__" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#8591a6"/></linearGradient>
    <radialGradient id="gl__" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb000" stop-opacity=".55"/><stop offset="1" stop-color="#ffb000" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="200" height="240" fill="url(#bg__)"/>
  <g fill="#231503"><rect x="0" y="118" width="24" height="122"/><rect x="28" y="92" width="18" height="148"/><rect x="152" y="100" width="22" height="140"/><rect x="178" y="130" width="22" height="110"/></g>
  <g fill="#ffb000" opacity=".55"><rect x="4" y="126" width="4" height="3"/><rect x="14" y="140" width="4" height="3"/><rect x="33" y="102" width="3" height="3"/><rect x="39" y="118" width="3" height="3"/><rect x="157" y="110" width="4" height="3"/><rect x="165" y="128" width="4" height="3"/><rect x="184" y="140" width="4" height="3"/></g>
  <circle cx="100" cy="96" r="92" fill="url(#gl__)"/>
  <path d="M0 240 L12 198 Q40 178 78 168 L122 168 Q160 178 188 198 L200 240Z" fill="#11131c"/>
  <path d="M80 168 L100 216 L120 168Z" fill="#2a1d10"/>
  <path d="M54 180 L74 136 L99 212Z" fill="#191c28" stroke="#ffb000" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M146 180 L126 136 L101 212Z" fill="#191c28" stroke="#ffb000" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M20 214 L46 204 M180 214 L154 204" stroke="#ffb000" stroke-width="1.5" opacity=".7"/>
  <path d="M85 138 L85 170 L100 194 L115 170 L115 138Z" fill="#9a6850"/>
  <path d="M85 150 Q100 162 115 150 L115 138 L85 138Z" fill="#7a4d3a"/>
  <path d="M67 88 Q66 52 100 50 Q134 52 133 88 L131 116 Q127 140 110 152 Q100 157 90 152 Q73 140 69 116Z" fill="url(#sk__)"/>
  <path d="M60 100 Q50 42 98 32 Q152 28 142 100 L135 104 Q139 76 124 60 Q98 78 71 66 Q64 80 67 104Z" fill="url(#hr__)"/>
  <path d="M124 60 Q147 68 142 100 L135 104 Q139 78 124 60Z" fill="#aab3c2"/>
  <path d="M62 84 L68 82 M61 92 L67 91 M62 100 L67 100" stroke="#6d7688" stroke-width="1.4"/>
  <path d="M74 91 L93 88" stroke="#5d4a3c" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M107 86 L127 89" stroke="#5d4a3c" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M76 99 Q84 94 92 99 Q84 103 76 99Z" fill="#fff"/><circle cx="84.5" cy="98.8" r="3" fill="#3a2414"/>
  <circle cx="117" cy="99" r="9.5" fill="#120a00" stroke="#ffb000" stroke-width="2"/>
  <circle cx="117" cy="99" r="3.5" fill="#ffd34d"><animate attributeName="r" values="3.5;5.2;3.5" dur="3s" repeatCount="indefinite"/></circle>
  <path d="M126.5 97 L134 93 M126 103 L133 108" stroke="#ffb000" stroke-width="1.3"/>
  <path d="M100 100 L96 121 L104 123" stroke="#8a5a44" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M88 135 Q100 139 113 133" stroke="#7a2b2b" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  <path d="M72 118 L78 132" stroke="#f1c9a8" stroke-width="1.2" opacity=".6"/>
  <circle cx="66.5" cy="118" r="3.2" fill="#ffb000"/><circle cx="66.5" cy="127" r="2" fill="#ffb000" opacity=".7"/>
</svg>`,

    /* ---------------- HEX — the veteran netrunner ---------------- */
    hex: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" role="img" aria-label="Hex, the veteran netrunner">
  <defs>
    <linearGradient id="bg__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#062a3a"/><stop offset=".55" stop-color="#0a0d22"/><stop offset="1" stop-color="#05060c"/></linearGradient>
    <linearGradient id="sk__" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a6a4c"/><stop offset=".6" stop-color="#7a4e38"/><stop offset="1" stop-color="#4a2c20"/></linearGradient>
    <linearGradient id="vs__" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00e5ff"/><stop offset=".5" stop-color="#b8fbff"/><stop offset="1" stop-color="#0077ff"/></linearGradient>
    <linearGradient id="hd__" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c1d55"/><stop offset="1" stop-color="#120b26"/></linearGradient>
    <radialGradient id="gl__" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#00e5ff" stop-opacity=".45"/><stop offset="1" stop-color="#00e5ff" stop-opacity="0"/></radialGradient>
    <clipPath id="cp__"><rect x="64" y="88" width="72" height="21" rx="6"/></clipPath>
  </defs>
  <rect width="200" height="240" fill="url(#bg__)"/>
  <g stroke="#00e5ff" stroke-width=".6" opacity=".25"><path d="M0 40H200M0 80H200M0 120H200M0 160H200M0 200H200M40 0V240M80 0V240M120 0V240M160 0V240"/></g>
  <circle cx="100" cy="100" r="96" fill="url(#gl__)"/>
  <path d="M0 240 L10 204 Q40 186 70 180 L130 180 Q160 186 190 204 L200 240Z" fill="#0c0f18"/>
  <path d="M34 240 L42 150 Q38 36 100 24 Q162 36 158 150 L166 240Z" fill="url(#hd__)"/>
  <path d="M42 150 Q38 36 100 24 Q162 36 158 150" fill="none" stroke="#00e5ff" stroke-width="1.6" opacity=".8"/>
  <path d="M61 150 Q54 60 100 52 Q146 60 139 150 Q131 180 100 190 Q69 180 61 150Z" fill="#06050c"/>
  <path d="M86 150 L86 186 L114 186 L114 150Z" fill="#5a3828"/>
  <path d="M72 98 Q72 70 100 68 Q128 70 128 98 L126 124 Q122 146 100 158 Q78 146 74 124Z" fill="url(#sk__)"/>
  <path d="M72 96 Q72 70 100 68 Q128 70 128 96 L128 86 Q100 78 72 86Z" fill="#06050c" opacity=".55"/>
  <rect x="64" y="88" width="72" height="21" rx="6" fill="#031018" stroke="#b8fbff" stroke-width="1.4"/>
  <rect x="67" y="91" width="66" height="15" rx="4" fill="url(#vs__)" opacity=".92"/>
  <g clip-path="url(#cp__)">
    <rect x="50" y="88" width="10" height="21" fill="#ffffff" opacity=".75"><animate attributeName="x" values="50;140;50" dur="3.2s" repeatCount="indefinite"/></rect>
    <path d="M64 95H136M64 100H136M64 105H136" stroke="#003b4d" stroke-width=".8" opacity=".6"/>
  </g>
  <path d="M100 110 L97 126 L104 127" stroke="#3d241a" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M89 139 Q100 142 111 139" stroke="#2c1711" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M94 147 Q100 149 106 147" stroke="#3d241a" stroke-width="1.4" fill="none"/>
  <circle cx="100" cy="152.5" r="1.8" fill="#00e5ff"/>
  <path d="M136 98 Q150 104 148 130 Q146 160 154 200" fill="none" stroke="#00e5ff" stroke-width="2"/>
  <path d="M136 102 Q144 110 142 134 Q140 166 146 210" fill="none" stroke="#ff2a6d" stroke-width="1.5" opacity=".9"/>
  <circle cx="148" cy="130" r="2.6" fill="#b8fbff"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <path d="M78 190 L92 204 L100 198 L108 204 L122 190" fill="none" stroke="#00e5ff" stroke-width="1.4" opacity=".7"/>
  <path d="M52 214 L68 208 M148 208 L134 214" stroke="#00e5ff" stroke-width="1.4" opacity=".6"/>
</svg>`,

    /* ---------------- PIXEL — the language drone ---------------- */
    pixel: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" role="img" aria-label="Pixel, the language drone">
  <defs>
    <linearGradient id="bg__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#06301f"/><stop offset=".6" stop-color="#07140f"/><stop offset="1" stop-color="#05060c"/></linearGradient>
    <linearGradient id="bd__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4a5a"/><stop offset="1" stop-color="#18212c"/></linearGradient>
    <radialGradient id="gl__" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#39ff88" stop-opacity=".4"/><stop offset="1" stop-color="#39ff88" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="200" height="240" fill="url(#bg__)"/>
  <g fill="#39ff88" opacity=".3"><rect x="18" y="30" width="5" height="5"/><rect x="168" y="52" width="5" height="5"/><rect x="30" y="190" width="5" height="5"/><rect x="160" y="200" width="5" height="5"/><rect x="176" y="120" width="4" height="4"/><rect x="14" y="110" width="4" height="4"/></g>
  <circle cx="100" cy="112" r="100" fill="url(#gl__)"/>
  <ellipse cx="100" cy="218" rx="42" ry="7" fill="#39ff88" opacity=".18"><animate attributeName="rx" values="42;34;42" dur="2.6s" repeatCount="indefinite"/></ellipse>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M100 58 L100 34" stroke="#8fa3b5" stroke-width="3"/>
    <circle cx="100" cy="30" r="6" fill="#39ff88"><animate attributeName="opacity" values="1;.25;1" dur="1.2s" repeatCount="indefinite"/></circle>
    <rect x="26" y="96" width="16" height="34" rx="6" fill="#2a3644" stroke="#39ff88" stroke-width="1.4"/>
    <rect x="158" y="96" width="16" height="34" rx="6" fill="#2a3644" stroke="#39ff88" stroke-width="1.4"/>
    <rect x="40" y="58" width="120" height="110" rx="26" fill="url(#bd__)" stroke="#39ff88" stroke-width="2.2"/>
    <rect x="54" y="74" width="92" height="68" rx="12" fill="#02140d" stroke="#0e3d2a" stroke-width="2"/>
    <g fill="#39ff88">
      <rect x="72" y="90" width="14" height="20" rx="2"><animate attributeName="height" values="20;20;3;20;20" keyTimes="0;.9;.94;.98;1" dur="4s" repeatCount="indefinite"/><animate attributeName="y" values="90;90;99;90;90" keyTimes="0;.9;.94;.98;1" dur="4s" repeatCount="indefinite"/></rect>
      <rect x="114" y="90" width="14" height="20" rx="2"><animate attributeName="height" values="20;20;3;20;20" keyTimes="0;.9;.94;.98;1" dur="4s" repeatCount="indefinite"/><animate attributeName="y" values="90;90;99;90;90" keyTimes="0;.9;.94;.98;1" dur="4s" repeatCount="indefinite"/></rect>
      <rect x="80" y="120" width="6" height="6"/><rect x="86" y="126" width="28" height="6"/><rect x="114" y="120" width="6" height="6"/>
    </g>
    <path d="M54 96H146M54 118H146" stroke="#39ff88" stroke-width=".6" opacity=".25"/>
    <rect x="70" y="150" width="60" height="8" rx="4" fill="#0d1a22"/>
    <g fill="#39ff88"><circle cx="80" cy="154" r="2"/><circle cx="90" cy="154" r="2" opacity=".6"/><circle cx="100" cy="154" r="2" opacity=".3"/></g>
    <path d="M70 168 L76 184 L124 184 L130 168Z" fill="#202a36" stroke="#39ff88" stroke-width="1.4"/>
    <path d="M86 184 L82 200 M100 184 L100 204 M114 184 L118 200" stroke="#39ff88" stroke-width="3" stroke-linecap="round" opacity=".8"><animate attributeName="opacity" values=".9;.3;.9" dur=".5s" repeatCount="indefinite"/></path>
  </g>
</svg>`,

    /* ---------------- VANTA — small static mask (the big one is a canvas) ---------------- */
    vanta: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" role="img" aria-label="VANTA, the rogue AI">
  <defs>
    <linearGradient id="bg__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0414"/><stop offset="1" stop-color="#05060c"/></linearGradient>
  </defs>
  <rect width="200" height="240" fill="url(#bg__)"/>
  <g font-family="monospace" font-size="13" fill="#ff2a6d" opacity=".35"><text x="8" y="30">01 10 0</text><text x="140" y="60">1 0 11</text><text x="12" y="210">0 1 1 0</text><text x="136" y="200">10 01</text></g>
  <path d="M100 30 Q150 34 150 100 Q148 160 100 206 Q52 160 50 100 Q50 34 100 30Z" fill="#1a0410" stroke="#ff2a6d" stroke-width="2.5" stroke-dasharray="7 4"/>
  <path d="M64 96 Q80 84 94 100 Q80 106 64 96Z" fill="#fff"><animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/></path>
  <path d="M136 96 Q120 84 106 100 Q120 106 136 96Z" fill="#fff"><animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/></path>
  <path d="M84 152 Q100 160 116 152" stroke="#ff2a6d" stroke-width="3" fill="none"/>
  <path d="M100 110 V134 M72 60 V78 M128 60 V78 M86 44 V70 M114 44 V70" stroke="#ff2a6d" stroke-width="1.5" opacity=".7"/>
</svg>`
  };

  window.Portraits = {
    svg(who) {
      const art = ART[who] || ART.vanta;
      uid += 1;
      return art.replace(/__/g, "_" + who + uid);
    }
  };

  /* ===================================================================
     VantaFace — a face made of falling code, drawn on a <canvas>.
     =================================================================== */
  const GLYPHS = "01<>/\\{}[]#$%&*+=?!:;ABCDEFXZ0110";

  function hash(a, b) {
    let h = (a * 374761393 + b * 668265263) | 0;
    h = (h ^ (h >>> 13)) * 1274126177 | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  }

  class VantaFace {
    constructor(canvas, opts) {
      this.cv = canvas;
      this.ctx = canvas.getContext("2d");
      this.cell = (opts && opts.cell) || 11;
      this.integrity = 1;
      this.talk = 0;
      this.hitT = 0;
      this.dissolveT = -1;
      this.t = 0;
      this.running = false;
      this.last = 0;
      this._loop = this._loop.bind(this);
      this.resize();
    }
    resize() {
      const r = this.cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(80, Math.round(r.width || this.cv.clientWidth || 300));
      this.h = Math.max(80, Math.round(r.height || this.cv.clientHeight || 300));
      this.cv.width = this.w * dpr;
      this.cv.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.cols = Math.ceil(this.w / this.cell);
      this.rows = Math.ceil(this.h / this.cell);
    }
    start() { if (!this.running) { this.running = true; requestAnimationFrame(this._loop); } return this; }
    stop() { this.running = false; }
    setIntegrity(v) { this.integrity = Math.max(0, Math.min(1, v)); }
    hit() { this.hitT = 1; }
    speak(on) { this.talking = !!on; }
    dissolve() { this.dissolveT = 0; }

    /* brightness of the face at a point; x and y run from -1 to 1 */
    density(x, y) {
      const ax = Math.abs(x);
      y += 0.06;
      let headW;
      if (y < 0) headW = 0.5 * Math.sqrt(Math.max(0, 1 - (y / 0.76) * (y / 0.76)));
      else headW = 0.5 * (1 - 0.55 * Math.pow(Math.min(1, y / 0.8), 2.1));
      const inHead = y > -0.76 && y < 0.8 && ax < headW;
      if (inHead) {
        const ex = (ax - 0.2) / 0.125, ey = (y + 0.1) / 0.055;
        const ed = ex * ex + ey * ey;
        if (ed < 1) return 3;                       // eyes
        if (ed < 2.6) return 0.12;                  // eye sockets
        const mh = 0.016 + this.talk * 0.075;
        const mx = ax / 0.17, my = (y - 0.43) / mh;
        const md = mx * mx + my * my;
        if (md < 1) return 0.04;                    // mouth
        if (md < 1.9) return 1.5;                   // lips
        if (ax < 0.028 && y > 0.02 && y < 0.24) return 1.35;   // nose
        const rim = ax / headW;
        return 0.62 + 0.5 * rim * rim;              // skin, brighter at the edge
      }
      if (ax < 0.15 && y >= 0.8 && y < 0.98) return 0.42;      // neck
      if (y >= 0.9 && ax < 0.2 + (y - 0.9) * 4.5) return 0.36; // shoulders
      return -1;                                    // outside: code rain
    }

    _loop(now) {
      if (!this.running) return;
      requestAnimationFrame(this._loop);
      if (now - this.last < 55) return;
      const dt = Math.min(0.1, (now - this.last) / 1000 || 0.05);
      this.last = now;
      this.t += dt;
      if (this.hitT > 0) this.hitT = Math.max(0, this.hitT - dt * 2.2);
      if (this.dissolveT >= 0) this.dissolveT += dt;
      const target = this.talking ? 0.5 + 0.5 * Math.sin(this.t * 17) * Math.sin(this.t * 5.3) : 0;
      this.talk += (Math.max(0, target) - this.talk) * 0.5;
      this.draw();
    }

    draw() {
      const { ctx, w, h, cell, cols, rows, t } = this;
      ctx.clearRect(0, 0, w, h);
      ctx.font = "bold " + cell + "px ui-monospace, Consolas, Menlo, monospace";
      ctx.textBaseline = "top";
      const dmg = 1 - this.integrity;
      const dis = this.dissolveT >= 0 ? Math.min(1, this.dissolveT / 2.6) : 0;
      const tick = Math.floor(t * 9);
      const scale = h / 2;
      // a soft glow behind the head so the shape reads from a distance
      if (dis < 1) {
        const halo = ctx.createRadialGradient(w / 2, h * 0.47, 0, w / 2, h * 0.47, scale * 0.95);
        halo.addColorStop(0, "rgba(255,42,109," + (0.30 * this.integrity * (1 - dis) + 0.06).toFixed(2) + ")");
        halo.addColorStop(0.55, "rgba(255,42,109," + (0.10 * (1 - dis)).toFixed(2) + ")");
        halo.addColorStop(1, "rgba(255,42,109,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, w, h);
      }
      for (let r = 0; r < rows; r++) {
        // glitch: some rows slide sideways, more when damaged or hit
        let shift = 0;
        const g = hash(r, Math.floor(t * 7));
        if (g < 0.03 + dmg * 0.22 + this.hitT * 0.5) shift = Math.round((hash(r, tick) - 0.5) * (4 + dmg * 14 + this.hitT * 16));
        for (let c = 0; c < cols; c++) {
          const px = c * cell, py = r * cell;
          const x = ((c + shift) * cell + cell / 2 - w / 2) / scale;
          let y = (py + cell / 2 - h / 2) / scale;
          const seed = hash(c, r);
          if (dis > 0) y -= dis * dis * (0.4 + seed * 2.2);   // pieces fall away
          let d = this.density(x, y);
          let col;
          if (d < 0) {
            // code rain outside the face
            const speed = 0.25 + hash(c, 7) * 0.6;
            const head = ((t * speed + hash(c, 3)) % 1.4) * rows;
            const dist = head - r;
            if (dist < 0 || dist > 9 || hash(c, 11) < 0.45) continue;
            const a = (1 - dist / 9) * 0.42 * (1 - dis);
            if (a < 0.03) continue;
            col = dist < 1 ? "rgba(220,255,255," + a.toFixed(2) + ")" : "rgba(0,229,255," + a.toFixed(2) + ")";
          } else {
            if (seed < dmg * 0.55 || hash(c + tick, r) < dis * 1.1) continue;   // holes
            const flick = 0.72 + 0.28 * hash(c + tick * 3, r + tick);
            let a = Math.min(1, d * flick + this.hitT * 0.6) * (1 - dis * 0.6);
            if (a < 0.04) continue;
            if (d >= 3) col = "rgba(255,255,255," + a.toFixed(2) + ")";
            else if (this.hitT > 0.5 && seed > 0.5) col = "rgba(255,255,255," + a.toFixed(2) + ")";
            else if (d > 1.2) col = "rgba(255,170,200," + a.toFixed(2) + ")";
            else col = "rgba(255,42,109," + a.toFixed(2) + ")";
          }
          ctx.fillStyle = col;
          const gi = Math.floor(hash(c + Math.floor(t * (2 + seed * 6)), r * 3) * GLYPHS.length);
          ctx.fillText(GLYPHS[gi], px, py);
        }
      }
      // eye glow
      if (dis < 0.7) {
        const ey = h / 2 + (-0.1 - 0.06) * scale, ex = 0.2 * scale;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (const s of [-1, 1]) {
          const grd = ctx.createRadialGradient(w / 2 + s * ex, ey, 0, w / 2 + s * ex, ey, scale * 0.2);
          grd.addColorStop(0, "rgba(255,120,170," + (0.45 * (1 - dis)).toFixed(2) + ")");
          grd.addColorStop(1, "rgba(255,42,109,0)");
          ctx.fillStyle = grd;
          ctx.fillRect(w / 2 + s * ex - scale * 0.2, ey - scale * 0.2, scale * 0.4, scale * 0.4);
        }
        ctx.restore();
      }
    }
  }

  window.VantaFace = VantaFace;
})();
