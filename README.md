# IRONVEIL — The Last Firewall

A cyberpunk escape room for English lessons (Norwegian 8th–10th grade).
The students are a crew of netrunners in Neo-Oslo, 2089. A rogue AI called VANTA is
breaking through the Ironveil, the firewall that protects the internet. The crew must
hack into the wall, repair its ten control nodes and shut VANTA down before the clock
reaches zero.

It trains **grammar**, **vocabulary** and **basic computer skills**, and it runs in any
modern browser. There is nothing to install and no server: it is a folder of plain files.

---

## Put it on GitHub (about five minutes)

1. Create a new **public** repository on GitHub, for example `ironveil`.
2. Click **Add file → Upload files** and drag in everything in this folder
   (`index.html`, `README.md` and the folders `css` and `js`). Commit.
3. Open **Settings → Pages**. Under *Build and deployment*, choose
   **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. After a minute the game is live at `https://YOUR-USERNAME.github.io/ironveil/`.
   Give that link to the students.

To try it on your own computer first, just double-click `index.html`.

---

## In the classroom

| | |
|---|---|
| Group size | Pairs or groups of 3–4, one device per crew |
| Time | 60 minutes by default (30, 45, 75 or 90 in the teacher settings) |
| Levels | ROOKIE (8th grade), RUNNER (9th grade), LEGEND (10th grade) |
| Devices | Laptops and Chromebooks work best. Tablets and phones also work. |
| Sound | Headphones are a good idea. Everything can be muted. |

**Teacher code: `4096`** (change it in `js/config.js`).

- **Before the lesson:** on the start screen, click *Teacher settings* to set the mission time.
  The setting is stored on that device.
- **During the lesson:** the ⚙ button in the top right opens the teacher menu. You can pause
  the clock, add or remove five minutes, reset the trace meter, show the solution for the
  current node, skip a node, or end the run.
- **After the lesson:** every crew gets a report. It shows what they struggled with
  (with the correct answers and the rule), what they did well, the words they looked up,
  and time, mistakes and hints for each node. Winners also get a certificate.
  *Print* gives a clean paper version of both.

Progress is saved in the browser, so a refresh or a closed lid does not lose the run.

### How the game works

- **Characters** tell the story and explain every task: Mags (the fixer who hired the crew),
  Hex (a veteran netrunner) and Pixel (a language drone). VANTA is the rogue AI.
- **Hints** come from the crew on the COMMS panel. "What is my task here?" and the first hint
  are free. The second and third hint add to the TRACE meter.
- **The TRACE meter** also grows with every failed check. At 100 % VANTA finds the crew and
  they lose two minutes. This stops random guessing without punishing weak readers hard.
- **Read aloud:** every line of story, every hint and every file has a 🔊 button, and
  *Read everything aloud* reads the dialogue automatically. It uses the voice that is built
  into the browser.
- **Glossary:** words with a dotted line under them show a Norwegian translation when
  clicked.
- **Easy-read text** makes the text bigger and calmer and turns off the flicker effects.
- **Kill word:** every node gives one letter. In the final fight the crew must put the ten
  letters in the right order.
- **If time runs out**, the crew is "hacked" and thrown out, and they read what happens
  when VANTA takes over the internet. Then they can try again.

### The ten nodes

| Node | Skill | Task |
|---|---|---|
| 01 The Gate | Terminal commands, opposites | Use `help`, `ls` and `open` to find a password, then `login` |
| 02 The Dictionary | Tech vocabulary | Match words with definitions |
| 03 The Time Log | Verb tenses, subject–verb agreement | Choose (or, on LEGEND, type) the correct verb form |
| 04 The Password Vault | Online safety | Mark passwords as strong or weak |
| 05 The Signal Tower | Word order | Build sentences from scrambled words |
| 06 The Archive | Files, folders, file extensions | Move through folders with `cd` to find a code |
| 07 The Routing Table | Prepositions and articles | Choose in / on / at, a / an / the |
| 08 The Mailroom | Online safety, reading | Mark messages as safe or phishing |
| 09 The Broadcast | Spelling: their / there / they're … | Proofread a warning message |
| 10 The Core Key | Binary and codes | Decode a word and `decrypt` it |
| The Core | Everything | Correct VANTA's broken sentences, then build the kill word |

Many tasks target typical mistakes for Norwegian speakers, for example *Yesterday fixed we*,
*good in*, *wait on*, *afraid for* and *the life*.

---

## Change the content

All texts and tasks are in **`js/content.js`**. You can edit them in GitHub's own editor
(the pencil icon). The file has a short guide at the top.

- Story lines look like `{ who: "mags", text: "..." }`.
- Most tasks have three versions: `rookie`, `runner` and `legend`.
- The glossary is a simple list: `"firewall": "brannmur"`.
- Timer, teacher code and trace penalties are in **`js/config.js`**.

Note: the repository is public, so a curious student can find the answers in
`js/content.js`. In practice, reading the code is harder than playing the game.

---

## Good to know

- **Privacy:** the game loads nothing from other websites and sends nothing anywhere.
  The crew name and progress are stored only in the browser on that device.
- **Read-aloud voices** depend on the browser and device. Chrome, Edge and Safari work well.
  If a browser has no English voice, the 🔊 buttons are hidden.
- **Original material:** the story, characters, artwork and sound are made for this project.
  The portraits are drawn in code and the sound is generated in the browser, so there are
  no image or audio files to license.

## Files

```
index.html        the page
css/style.css     colours, layout, glitch effects, print layout
js/config.js      teacher settings
js/content.js     story, characters, tasks, hints, glossary
js/portraits.js   character portraits and the animated AI face
js/audio.js       sound effects, music and the read-aloud voice
js/puzzles.js     the task types
js/game.js        the game engine
```
