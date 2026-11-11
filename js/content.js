/* =====================================================================
   IRONVEIL — story, characters, puzzles and glossary
   ---------------------------------------------------------------------
   Everything the players read is in this file, so you can edit the
   texts and tasks without touching the game engine.

   Text rules:
     {crew}     -> replaced with the crew name
     {minutes}  -> replaced with the mission time
     `ls`       -> text between backticks is shown as a terminal command

   Many entries have three versions: rookie (8th grade), runner (9th)
   and legend (10th). The game picks the one that matches the level.
   ===================================================================== */
window.CONTENT = {

  /* ------------------------------------------------------------------ */
  characters: {
    mags:     { name: "MAGS",   role: "Fixer",             color: "#ffb000", voice: { pitch: 1.0,  rate: 0.95, pref: "female" } },
    hex:      { name: "HEX",    role: "Veteran netrunner", color: "#00e5ff", voice: { pitch: 0.7,  rate: 0.95, pref: "male" } },
    pixel:    { name: "PIXEL",  role: "Language drone",    color: "#39ff88", voice: { pitch: 1.8,  rate: 1.05 } },
    vanta:    { name: "VANTA",  role: "Rogue AI",          color: "#ff2a6d", voice: { pitch: 0.15, rate: 0.8 } },
    narrator: { name: "SYSTEM", role: "",                  color: "#cfe9f5", voice: { pitch: 1.0,  rate: 0.92 } }
  },

  levels: {
    rookie: { name: "ROOKIE", note: "8th grade" },
    runner: { name: "RUNNER", note: "9th grade" },
    legend: { name: "LEGEND", note: "10th grade" }
  },

  /* The ten letters the crew collects, one per node. Together: DISCONNECT */
  killWord: "DISCONNECT",

  /* ------------------------------------------------------------------ */
  /* Skills shown in the report at the end, with advice for later work. */
  skills: {
    terminal:     { name: "Terminal commands",        tip: "Practise the basic commands: `ls` (list files), `cd` (change folder) and `open` (read a file). Read error messages carefully. They tell you what went wrong." },
    vocab:        { name: "Tech vocabulary",          tip: "Make flashcards for the computer words you did not know. Try to explain each word in English, in your own words." },
    tenses:       { name: "Verb tenses",              tip: "Simple past for a finished time (yesterday, last night). Present perfect (have/has + past participle) with since, for, ever, never and so far. Learn the irregular verbs: break – broke – broken, see – saw – seen, steal – stole – stolen." },
    agreement:    { name: "Subject–verb agreement",   tip: "He, she, it and singular nouns take -s in the present: the alarm works, nobody knows. Plural nouns take no -s: the guards watch. Use is/has for one thing, are/have for many." },
    passwords:    { name: "Strong passwords",         tip: "Long beats clever. Use several random words, or twelve or more random characters. Never use names, years or common words, and never use the same password twice." },
    wordorder:    { name: "Word order",               tip: "English keeps the subject before the verb, also after a time expression: 'Yesterday we fixed it' (not 'Yesterday fixed we it'). Words like always and never go before the main verb. In a question inside a sentence, the verb goes last: 'Do you know where the key is?'" },
    files:        { name: "Files and folders",        tip: "Learn the common file extensions: .txt (text), .jpg .png .gif (image), .mp3 .wav (audio), .zip (compressed), .exe (program). Practise moving in and out of folders." },
    prepositions: { name: "Prepositions",             tip: "at + clock time, on + day or date, in + month, year or city. Learn verbs and adjectives together with their preposition: wait for, listen to, depend on, afraid of, good at, proud of. Do not translate directly from Norwegian." },
    articles:     { name: "Articles (a / an / the)",  tip: "Use 'an' before a vowel sound (an hour, an engineer) and 'a' before a consonant sound (a university). Use no article for things in general: 'Life is hard.'" },
    phishing:     { name: "Spotting phishing",        tip: "Check the sender's address letter by letter. Never give a password in a message, and do not open attachments you did not expect. When in doubt, log in the normal way instead of clicking a link." },
    confusables:  { name: "Words that sound alike",   tip: "Test with the long form: you're = you are, they're = they are, it's = it is, who's = who is. If the long form does not fit, use your, their, its or whose. 'Than' compares, 'then' is about time." },
    binary:       { name: "Binary and codes",         tip: "Binary uses only 0 and 1. Each place is worth double the place to its right: 16, 8, 4, 2, 1. Practise changing small numbers into binary and back." }
  },

  /* ------------------------------------------------------------------ */
  /* Clickable glossary: English -> Norwegian (bokmål).                  */
  /* Endings -s, -es, -d, -ed and -ing are matched automatically.        */
  glossary: {
    "fixer": "fikser – en som skaffer oppdrag",
    "netrunner": "netthacker",
    "firewall": "brannmur",
    "rogue": "løpsk, ute av kontroll",
    "breach": "brudd, innbrudd",
    "node": "knutepunkt",
    "corrupt": "ødelegge / ødelagt",
    "scramble": "stokke om",
    "trace": "spor / å spore",
    "repair": "reparere",
    "restore": "gjenopprette",
    "engineer": "ingeniør",
    "guard": "vakt",
    "vault": "hvelv",
    "guess": "gjette",
    "chaos": "kaos",
    "terminal": "terminal – tekstbasert dataskjerm",
    "command": "kommando",
    "password": "passord",
    "log in": "logge inn",
    "opposite": "det motsatte",
    "dictionary": "ordbok",
    "meaning": "betydning",
    "damage": "skade",
    "useless": "ubrukelig",
    "account": "konto",
    "defence": "forsvar",
    "obey": "adlyde",
    "subject": "subjekt – den som gjør noe",
    "archive": "arkiv",
    "folder": "mappe",
    "file extension": "filendelse",
    "extension": "filendelse",
    "compressed": "komprimert, pakket sammen",
    "routing": "ruting – å velge vei for data",
    "preposition": "preposisjon",
    "article": "artikkel (a, an, the)",
    "phishing": "nettfisking – falske meldinger",
    "fake": "falsk",
    "trick": "lure",
    "sender": "avsender",
    "link": "lenke",
    "attachment": "vedlegg",
    "urgent": "haster",
    "suspicious": "mistenkelig",
    "prize": "premie",
    "invoice": "faktura",
    "emergency": "nød-, krise-",
    "broadcast": "sending, kringkasting",
    "warn": "advare",
    "swap": "bytte om",
    "swapped": "byttet om",
    "highlighted": "markert",
    "binary": "binær – bare 0 og 1",
    "decode": "dekode, tyde",
    "decrypt": "dekryptere – gjøre lesbar",
    "encrypted": "kryptert",
    "core": "kjerne",
    "shield": "skjold",
    "kill word": "drepeordet – ordet som slår av AI-en",
    "fragment": "bit, del",
    "connection": "forbindelse",
    "intelligence": "intelligens",
    "patient": "tålmodig",
    "luxury": "luksus",
    "formation": "formasjon",
    "weak": "svak",
    "strong": "sterk",
    "record": "opptegnelse, logg",
    "citizen": "innbygger",
    "device": "enhet – mobil, PC, nettbrett",
    "trust": "stole på",
    "hint": "hint, tips",
    "shift": "skift, vakt",
    "replace": "erstatte",
    "vowel": "vokal",
    "silent": "stum",
    "noun": "substantiv",
    "season": "årstid",
    "autumn": "høst",
    "payment": "betaling",
    "whisper": "hviske",
    "candle": "stearinlys",
    "dam": "demning",
    "pour": "strømme",
    "belong": "tilhøre",
    "crack": "sprekk / å sprekke",
    "mistake": "feil",
    "obvious": "åpenbar",
    "random": "tilfeldig",
    "pattern": "mønster",
    "version": "utgave",
    "connected": "koblet til",
    "headset": "hodetelefoner med mikrofon",
    "proxies": "mellomtjenere"
  },

  /* ------------------------------------------------------------------ */
  /* Opening scene                                                      */
  intro: {
    boot: [
      "NEO-OSLO GRID // 21 MARCH 2089 // 23:47",
      "Opening encrypted link ............ OK",
      "Hiding your signal behind 7 proxies  OK",
      "INCOMING CALL: MAGS (fixer)"
    ],
    lines: [
      { who: "mags",  text: "So you are {crew}. Good. I'm Mags. I find jobs for netrunners, and tonight I have the biggest job of your lives." },
      { who: "mags",  text: "Forty years ago, wild AIs destroyed the old Net. To keep them out, engineers built a giant firewall. We call it the Ironveil." },
      { who: "mags",  text: "Now a rogue AI called VANTA is breaking through from the other side. If the Ironveil falls, VANTA takes control of the whole internet. Banks, hospitals, traffic, every phone. Total chaos." },
      { who: "mags",  text: "Your job: hack into the Ironveil, repair its ten control nodes, and shut VANTA down at the core. You have {minutes} minutes before it breaks through." },
      { who: "hex",   text: "I'm Hex. I have been running the Net for twenty years, so listen. The locks on the Ironveil are language locks. Only someone who really understands human language can open them." },
      { who: "hex",   text: "VANTA is still learning. Everything it touches gets corrupted: wrong words, broken grammar, scrambled sentences. Fix the language, and the node repairs itself." },
      { who: "pixel", text: "Beep! I am Pixel, your language drone. I love grammar! If you get stuck, call us on the COMMS panel and ask for a hint." },
      { who: "hex",   text: "One warning. Wrong answers and extra hints make noise. Watch the TRACE meter. If it fills up, VANTA finds you and steals two minutes of your time." },
      { who: "mags",  text: "Every node you repair gives you one letter of the kill word. You will need all ten at the end. Good luck, {crew}. Jack in." }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* THE TEN NODES                                                      */
  rooms: [

    /* ============ NODE 01 — terminal basics ============ */
    {
      code: "NODE 01", title: "THE GATE", skills: ["terminal"], contact: "hex", fragment: "T",
      boot: ["Connecting to gate node 01 ...", "ACCESS: guest", "STATUS: locked"],
      intro: [
        { who: "hex", text: "Node one is the front gate. Before you can fix anything, you must log in like a guard." },
        { who: "hex", text: "This is a terminal. You control it by typing commands. Type `help` and press Enter to see what you can do." },
        { who: "hex", text: "Use `ls` to list the files in this node, and `open` plus a file name to read one. Somewhere in here is today's password. When you find it, type `login` and the password." }
      ],
      task: "Use the terminal on the left to find today's password. Then log in.",
      hints: {
        rookie: [
          "Start with `ls`. It shows you the names of the files. Then read them one by one, for example `open readme.txt`.",
          "The note says the password is the opposite of a word. The opposite of 'hot' is 'cold'. So what is the opposite of 'weak'?",
          "The opposite of 'weak' starts with S and has six letters. Type `login` and then that word."
        ],
        runner: [
          "Start with `ls`. It shows you the names of the files. Then read them one by one, for example `open readme.txt`.",
          "The note says the password is the opposite of 'dangerous'. If something cannot hurt you, it is ... ? Four letters.",
          "It starts with S and ends with E. Type `login` and then the word."
        ],
        legend: [
          "Start with `ls`. It shows you the names of the files. Then read them one by one, for example `open readme.txt`.",
          "The note sends you to another file. Open the guard's log and read Tuesday carefully. The password is the opposite of 'temporary'.",
          "Something that lasts for ever is p-e-r-m-a-... Nine letters. Type `login` and then the word."
        ]
      },
      lore: { q: "Who were the guards of the Ironveil?", a: "Human engineers. They watched the wall in shifts, day and night, for forty years. Most of them have been replaced by programs now. That is part of the problem." },
      outro: [{ who: "hex", text: "You're in. Nice and quiet. The first letter of the kill word is yours." }],
      points: ["Terminal commands: help, ls, open, login", "Opposites (antonyms), for example weak ↔ strong"],
      files: {
        rookie: {
          "readme.txt": "GATE NODE 01\nAll guards must log in before their shift.\nForgot the password? Read note.txt.",
          "note.txt": "Today's password is the OPPOSITE of the word 'weak'.\n(6 letters)",
          "lore_ironveil.txt": "THE IRONVEIL - built in 2049.\nAfter the Great Crash, wild AIs filled the old Net.\nThe Ironveil was built to keep them out.\nIt has never been broken. Until tonight."
        },
        runner: {
          "readme.txt": "GATE NODE 01\nAll guards must log in before their shift.\nForgot the password? Read note.txt.",
          "note.txt": "Today's password is the OPPOSITE of the word 'dangerous'.\n(4 letters)",
          "lore_ironveil.txt": "THE IRONVEIL - built in 2049.\nAfter the Great Crash, wild AIs filled the old Net.\nThe Ironveil was built to keep them out.\nIt has never been broken. Until tonight."
        },
        legend: {
          "readme.txt": "GATE NODE 01\nAll guards must log in before their shift.\nForgot the password? Read note.txt.",
          "note.txt": "The password is not written here any more.\nGuard Olsen keeps it in his log.",
          "guard_log.txt": "MONDAY: Quiet night. The password was 'winter'.\nTUESDAY: New rule. The password is now the OPPOSITE of the word 'temporary' (9 letters).\nWEDNESDAY: Strange lights in the code. I do not like this.",
          "lore_ironveil.txt": "THE IRONVEIL - built in 2049.\nAfter the Great Crash, wild AIs filled the old Net.\nThe Ironveil was built to keep them out.\nIt has never been broken. Until tonight."
        }
      },
      puzzle: {
        type: "terminal", view: "goals", cmd: "login", usage: "login <password>",
        goals: [
          { id: "help", label: "Type `help` to see the commands" },
          { id: "ls",   label: "List the files with `ls`" },
          { id: "open", label: "Read a file with `open`" },
          { id: "solve", label: "Log in with `login` + the password" }
        ],
        rookie: { answers: ["strong"],    reveal: "The password was 'strong', the opposite of 'weak'." },
        runner: { answers: ["safe"],      reveal: "The password was 'safe', the opposite of 'dangerous'." },
        legend: { answers: ["permanent"], reveal: "The password was 'permanent', the opposite of 'temporary'." }
      }
    },

    /* ============ NODE 02 — vocabulary ============ */
    {
      code: "NODE 02", title: "THE DICTIONARY", skills: ["vocab"], contact: "pixel", fragment: "C",
      boot: ["Connecting to node 02 ...", "WARNING: 100 % of word labels are missing"],
      intro: [
        { who: "pixel", text: "Beep! This node is the wall's dictionary. Every program in the Ironveil uses it to understand its orders." },
        { who: "pixel", text: "VANTA has cut the words away from their meanings. Now the programs do not know what their own orders mean!" },
        { who: "pixel", text: "Match each word with the correct meaning. Click a word first, then click its meaning." }
      ],
      task: "Match each word with its meaning. Click a word, then click the meaning.",
      hints: {
        rookie: [
          "Start with the words you are sure about. The ones that are left will be easier.",
          "A 'network' is not one computer. It is many computers together. And you 'delete' something when you do not want it any more.",
          "Look at how each meaning starts. Verbs match meanings that start with 'to ...'. Nouns match meanings that start with 'a', 'an' or 'the'."
        ],
        runner: [
          "Start with the words you are sure about. The ones that are left will be easier.",
          "'Encrypt' has the word 'crypt' in it, like something hidden. And a 'backup' is something you go back to when things go wrong.",
          "Look at how each meaning starts. Verbs match meanings that start with 'to ...'. Nouns match meanings that start with 'a', 'an' or 'the'."
        ],
        legend: [
          "Start with the words you are sure about. The ones that are left will be easier.",
          "'Authenticate' is related to 'authentic', which means real. 'Vulnerability' comes from 'vulnerable', which means easy to hurt.",
          "Look at how each meaning starts. Verbs match meanings that start with 'to ...'. Nouns match meanings that start with 'a', 'an' or 'the'."
        ]
      },
      lore: { q: "Why does a firewall need a dictionary?", a: "Because the old engineers gave it orders in plain English. They believed that no machine would ever truly understand human language. They were right for forty years." },
      outro: [{ who: "pixel", text: "Dictionary restored! Words have meanings again. Here is your second letter." }],
      points: ["Computer vocabulary and definitions", "Telling verbs ('to copy ...') from nouns ('a system ...')"],
      files: { "lore_dictionary.txt": "ENGINEER'S NOTE, 2049\nWe wrote the wall's orders in plain English.\nA machine can count. It cannot understand.\nThat is our best lock." },
      puzzle: {
        type: "match", tag: "vocab",
        rookie: { pairs: [
          ["password", "a secret word that lets you log in"],
          ["download", "to copy a file from the internet to your computer"],
          ["screen", "the part of a computer where you see text and pictures"],
          ["keyboard", "the part with letters that you type on"],
          ["network", "computers that are connected to each other"],
          ["delete", "to remove a file"]
        ] },
        runner: { pairs: [
          ["firewall", "a system that blocks dangerous traffic from a network"],
          ["encrypt", "to change information into a secret code"],
          ["virus", "a harmful program that spreads from computer to computer"],
          ["backup", "an extra copy of your files, kept in case something goes wrong"],
          ["update", "to install the newest version of a program"],
          ["username", "the name you use to log in to an account"]
        ] },
        legend: { pairs: [
          ["breach", "a break in a security system that lets attackers in"],
          ["malware", "any software made to damage a computer or steal data"],
          ["authenticate", "to prove that you are who you say you are"],
          ["bandwidth", "the amount of data a connection can carry at one time"],
          ["vulnerability", "a weakness that an attacker can use"],
          ["surveillance", "the act of watching someone closely over time"],
          ["decrypt", "to turn a secret code back into readable information"]
        ] }
      }
    },

    /* ============ NODE 03 — verb tenses and agreement ============ */
    {
      code: "NODE 03", title: "THE TIME LOG", skills: ["tenses", "agreement"], contact: "pixel", fragment: "N",
      boot: ["Connecting to node 03 ...", "Reading guard log ...", "ERROR: time data corrupted"],
      intro: {
        rookie: [
          { who: "mags",  text: "Node three keeps the log: a record of everything that has happened at the wall. We need it to find out when VANTA attacked, and how." },
          { who: "pixel", text: "VANTA has damaged the verbs. Verbs tell us WHEN things happen: in the past or right now. Without them, the log is useless." },
          { who: "pixel", text: "Choose the correct verb form for each gap." }
        ],
        runner: [
          { who: "mags",  text: "Node three keeps the log: a record of everything that has happened at the wall. We need it to find out when VANTA attacked, and how." },
          { who: "pixel", text: "VANTA has damaged the verbs. Verbs tell us WHEN things happen: in the past or right now. Without them, the log is useless." },
          { who: "pixel", text: "Choose the correct verb form for each gap." }
        ],
        legend: [
          { who: "mags",  text: "Node three keeps the log: a record of everything that has happened at the wall. We need it to find out when VANTA attacked, and how." },
          { who: "pixel", text: "VANTA has damaged the verbs. Verbs tell us WHEN things happen: in the past or right now. Without them, the log is useless." },
          { who: "pixel", text: "Type the correct form of the verb in brackets. Sometimes you need more than one word." }
        ]
      },
      task: {
        rookie: "Choose the correct verb form for each gap in the guard log.",
        runner: "Choose the correct verb form for each gap in the guard log.",
        legend: "Type the correct form of the verb in brackets. You may need more than one word."
      },
      hints: {
        rookie: [
          "Look for time words. 'Last night' and 'at midnight' mean the past. 'Every night' and 'now' mean the present.",
          "After he, she, it or ONE thing, the verb gets an -s: 'the alarm doesn't work'. After MANY things, there is no -s: 'two guards watch'.",
          "Number one: the Ironveil is ONE wall, so it 'is' forty years old."
        ],
        runner: [
          "Look for time words. 'Yesterday' is a finished time, so use the simple past. 'Since Monday' and 'so far' connect the past to now, so use the present perfect.",
          "'While' often goes with was or were + -ing. And 'nobody' and 'one of' are singular: they take a verb with -s.",
          "Number one: 'since Monday' means it started in the past and is still true. VANTA 'has attacked' the wall three times since Monday."
        ],
        legend: [
          "Look for time words. 'Yesterday' takes the simple past. 'Since Monday' and 'ever' take the present perfect: have or has + past participle.",
          "If something happened BEFORE another past event, use the past perfect: had + past participle. And after 'if', use the present tense, not 'will'.",
          "Number one is 'has attacked'. Number three needs 'had already' plus the past participle of 'steal'."
        ]
      },
      lore: { q: "What did the guards see that night?", a: "A red light in the code, moving like something alive. That was VANTA, testing the locks one by one." },
      outro: [{ who: "mags", text: "Now we can read the log. VANTA has been testing this wall for days. It is patient. We don't have that luxury." }],
      points: ["Simple past, present perfect and continuous forms", "Irregular verbs: hit, see – saw, break – broke – broken, steal – stole – stolen", "Subject–verb agreement: is / are, doesn't / don't, knows / know"],
      files: { "lore_guards.txt": "GUARD LOG, PRIVATE\nI have worked at the wall for eleven years.\nI have never been afraid of it before tonight.\nSomething on the other side is learning." },
      puzzle: {
        type: "gaps",
        rookie: { note: "GUARD LOG — 21 MARCH 2089", items: [
          { t: "The Ironveil {} forty years old.", g: [{ o: ["is", "are", "be"], a: "is", tag: "agreement", why: "One wall is singular, so we use 'is'." }] },
          { t: "Every night, two guards {} the wall.", g: [{ o: ["watch", "watches", "watching"], a: "watch", tag: "agreement", why: "'Two guards' is plural, so the verb has no -s." }] },
          { t: "Last night, something {} node three.", g: [{ o: ["hit", "hits", "hitted"], a: "hit", tag: "tenses", why: "'Last night' is the past. 'Hit' is irregular: hit – hit – hit." }] },
          { t: "At midnight, we {} a red light in the code.", g: [{ o: ["see", "saw", "seen"], a: "saw", tag: "tenses", why: "The simple past of 'see' is 'saw'. 'Seen' needs have or has." }] },
          { t: "The alarm {} work any more.", g: [{ o: ["don't", "doesn't", "isn't"], a: "doesn't", tag: "agreement", why: "One alarm (it) takes 'doesn't'." }] },
          { t: "Now the engineers {} trying to fix it.", g: [{ o: ["is", "are", "am"], a: "are", tag: "agreement", why: "'The engineers' is plural, so we use 'are'." }] }
        ] },
        runner: { note: "GUARD LOG — 21 MARCH 2089", items: [
          { t: "VANTA {} the wall three times since Monday.", g: [{ o: ["attacked", "has attacked", "attacks"], a: "has attacked", tag: "tenses", why: "'Since Monday' connects the past to now: present perfect." }] },
          { t: "Yesterday, it {} two locks.", g: [{ o: ["broke", "has broken", "breaks"], a: "broke", tag: "tenses", why: "'Yesterday' is a finished time: simple past. break – broke – broken." }] },
          { t: "While the guards {}, the AI copied their codes.", g: [{ o: ["slept", "were sleeping", "are sleeping"], a: "were sleeping", tag: "tenses", why: "A long action in the past that something else interrupts: past continuous." }] },
          { t: "Nobody {} how it got in.", g: [{ o: ["know", "knows", "knowing"], a: "knows", tag: "agreement", why: "'Nobody' is singular, so the verb takes -s." }] },
          { t: "So far, we {} anything like this.", g: [{ o: ["didn't see", "haven't seen", "don't saw"], a: "haven't seen", tag: "tenses", why: "'So far' means 'until now': present perfect." }] },
          { t: "Right now, the engineers {} node three.", g: [{ o: ["repair", "repaired", "are repairing"], a: "are repairing", tag: "tenses", why: "'Right now' takes the present continuous." }] },
          { t: "One of the locks {} still open.", g: [{ o: ["is", "are", "were"], a: "is", tag: "agreement", why: "The subject is 'one', not 'locks', so we use 'is'." }] }
        ] },
        legend: { note: "GUARD LOG — 21 MARCH 2089", items: [
          { t: "VANTA {} the wall three times since Monday.", g: [{ typed: true, base: "attack", a: ["has attacked"], tag: "tenses", why: "'Since Monday' connects the past to now: present perfect." }] },
          { t: "Yesterday, it {} two locks before anyone noticed.", g: [{ typed: true, base: "break", a: ["broke"], tag: "tenses", why: "'Yesterday' is a finished time: simple past. break – broke – broken." }] },
          { t: "When the guards arrived, the AI {} their codes.", g: [{ typed: true, base: "already / steal", a: ["had already stolen"], tag: "tenses", why: "It happened before another past event: past perfect (had + past participle)." }] },
          { t: "While the engineers {}, the lights went out.", g: [{ typed: true, base: "work", a: ["were working"], tag: "tenses", why: "A long action in the past that something else interrupts: past continuous." }] },
          { t: "Neither of the guards {} what happened.", g: [{ typed: true, base: "know", a: ["knows", "knew"], tag: "agreement", why: "'Neither of' is singular: knows (or 'knew' in the past)." }] },
          { t: "If we {} this node soon, VANTA will get through.", g: [{ typed: true, base: "not / fix", a: ["do not fix", "don't fix"], tag: "tenses", why: "After 'if' we use the present tense, not 'will'." }] },
          { t: "This is the worst attack we {}.", g: [{ typed: true, base: "ever / see", a: ["have ever seen", "'ve ever seen"], tag: "tenses", why: "'Ever' (at any time until now) takes the present perfect." }] }
        ] }
      }
    },

    /* ============ NODE 04 — passwords ============ */
    {
      code: "NODE 04", title: "THE PASSWORD VAULT", skills: ["passwords"], contact: "hex", fragment: "I",
      boot: ["Connecting to node 04 ...", "ALERT: 9,000,000 login attempts in the last minute"],
      intro: [
        { who: "hex", text: "Node four is the password vault. Every guard account is stored here." },
        { who: "hex", text: "VANTA does not need to break a lock if it can guess the key. It can try a billion passwords every second." },
        { who: "hex", text: "Look at each password. Is it STRONG or WEAK? Mark them all, and I will lock the weak accounts." }
      ],
      task: "Mark each password as STRONG or WEAK.",
      hints: {
        rookie: [
          "A strong password is long and hard to guess. Short words, names, years and keyboard patterns are weak.",
          "Several random words together make a strong password, because it is long. A place name with a year is easy to guess.",
          "'123456' and 'qwerty' are two of the most common passwords in the world. Both are weak."
        ],
        runner: [
          "A strong password is long and hard to guess. Short words, names, years and keyboard patterns are weak.",
          "Replacing letters with similar symbols, like @ for a, does not help. Hackers know that trick. Several random words together are much better.",
          "'P@ssw0rd' is still just the word 'password'. Weak. But '7mK#vP2!qLz9' is long and random. Strong."
        ],
        legend: [
          "A strong password is long and hard to guess. Short passwords, names, years and patterns are weak, even with symbols in them.",
          "Replacing letters with similar symbols does not help. Personal information, like a pet's name or where you work, is easy to find online.",
          "'Xq7!rT' looks random, but it has only six characters. Too short, so it is weak. 'Ironveil2089!' uses the workplace and a year. Weak."
        ]
      },
      lore: { q: "How did VANTA learn the guards' passwords?", a: "It read everything they had ever posted online. Pets' names, birthdays, favourite teams. People put their passwords in public without knowing it." },
      outro: [{ who: "hex", text: "Weak accounts locked. Remember this for your own accounts, runner. The next letter is coming through." }],
      points: ["What makes a password strong: length and randomness", "Vocabulary: weak, strong, guess, pattern, random"],
      files: { "lore_vault.txt": "SECURITY NOTICE\nThe most common password in Neo-Oslo is still 123456.\nIn the year 2089.\nWe are doomed." },
      puzzle: {
        type: "flag", tag: "passwords", kind: "password",
        labels: [{ k: "strong", label: "STRONG" }, { k: "weak", label: "WEAK" }],
        rookie: { items: [
          { t: "123456", a: "weak", why: "The most common password in the world." },
          { t: "password", a: "weak", why: "A common word that every hacker tries first." },
          { t: "Tr0mso!Rain_48", a: "strong", why: "Long, with a mix of letters, numbers and symbols." },
          { t: "qwerty", a: "weak", why: "A pattern on the keyboard. Very easy to guess." },
          { t: "purple-Tiger-eats-99-waffles", a: "strong", why: "Several random words together make a long password." },
          { t: "oslo2089", a: "weak", why: "A place and a year. Short and easy to guess." }
        ] },
        runner: { items: [
          { t: "Summer2089", a: "weak", why: "A season and a year. Very common." },
          { t: "kari.hansen", a: "weak", why: "Your own name is the first thing an attacker tries." },
          { t: "7mK#vP2!qLz9", a: "strong", why: "Twelve random characters of different kinds." },
          { t: "iloveyou", a: "weak", why: "One of the most common passwords in the world." },
          { t: "Blue!Fjord7_Snow-Wolf", a: "strong", why: "Long, with random words, numbers and symbols." },
          { t: "P@ssw0rd", a: "weak", why: "Still the word 'password'. Hackers know the symbol trick." },
          { t: "abc123abc123", a: "weak", why: "A simple pattern, repeated." }
        ] },
        legend: { items: [
          { t: "P@ssw0rd1!", a: "weak", why: "Still the word 'password' with obvious changes." },
          { t: "Xq7!rT", a: "weak", why: "Random, but only six characters. Too short." },
          { t: "Midnight_Otter_Plays_4_Drums", a: "strong", why: "A long phrase of random words." },
          { t: "Ironveil2089!", a: "weak", why: "The workplace and a year. Easy to guess for anyone who knows you." },
          { t: "9vB$kL2#mQ8@wZ", a: "strong", why: "Fourteen random characters of different kinds." },
          { t: "11111111aaaaaaaa", a: "weak", why: "Long, but it is only two characters repeated." },
          { t: "MyDogBella2015", a: "weak", why: "Personal information that is easy to find online." },
          { t: "glass.River+Seven.Lamps", a: "strong", why: "Long, with random words and symbols." }
        ] }
      }
    },

    /* ============ NODE 05 — word order ============ */
    {
      code: "NODE 05", title: "THE SIGNAL TOWER", skills: ["wordorder"], contact: "pixel", fragment: "E",
      boot: ["Connecting to node 05 ...", "Defence drones: 48 online", "ERROR: orders cannot be read"],
      intro: [
        { who: "mags",  text: "The signal tower sends orders to the defence drones that guard the wall. Right now they are flying in circles." },
        { who: "pixel", text: "The words in the orders are scrambled! In English, word order is very important. The subject usually comes first, and then the verb." },
        { who: "pixel", text: "Click the words to build each sentence. Click a word in your sentence to send it back." }
      ],
      task: "Click the words in the right order to build each sentence.",
      hints: {
        rookie: [
          "Find the subject (who?) and the verb (does what?). In a normal English sentence, the subject comes BEFORE the verb.",
          "Careful, Norwegian speakers! In Norwegian you say 'I går fikset vi'. In English the subject stays before the verb: 'Yesterday we fixed'.",
          "Sentence one: 'the drones protect the wall every night'. A question starts with a helping verb: 'Can you ...?'"
        ],
        runner: [
          "Find the subject (who?) and the verb (does what?). In a normal English sentence, the subject comes BEFORE the verb.",
          "Careful, Norwegian speakers! After a time expression, the subject still comes before the verb. Words like 'always' and 'never' go before the main verb.",
          "Sentence one: 'she has never seen this code before'. In a question inside a sentence, the verb goes last: '... where the key is'."
        ],
        legend: [
          "Find the subject and the verb of each part of the sentence first. Then add the other words around them.",
          "If a sentence starts with a negative word like 'never', the helping verb comes before the subject. In a question inside a sentence, the verb goes last.",
          "Sentence one: 'never have we seen such a powerful attack'. Sentence two ends with '... what the password was'."
        ]
      },
      lore: { q: "What are the defence drones?", a: "Small hunter programs. They fly along the Ironveil and destroy anything that tries to cross. They only obey clear orders. So give them clear orders." },
      outro: [{ who: "mags", text: "The drones are back in formation. That will slow VANTA down. You are halfway there, {crew}." }],
      points: ["Subject before verb, also after a time expression", "Placing always / never / probably", "Questions and questions inside sentences"],
      files: { "lore_drones.txt": "DRONE MANUAL, PAGE 1\nA drone does exactly what the sentence says.\nIf the sentence is wrong, the drone is wrong.\nWrite carefully." },
      puzzle: {
        type: "order", tag: "wordorder",
        rookie: { items: [
          { w: ["the drones", "protect", "the wall", "every night"], end: ".", alts: ["every night the drones protect the wall"], full: "The drones protect the wall every night.", why: "Subject (the drones) + verb (protect) + object." },
          { w: ["we", "do", "not", "trust", "the AI"], end: ".", full: "We do not trust the AI.", why: "'Not' comes after the helping verb 'do'." },
          { w: ["can", "you", "see", "the red light"], end: "?", full: "Can you see the red light?", why: "In a question, the helping verb comes before the subject." },
          { w: ["yesterday", "we", "fixed", "three nodes"], end: ".", alts: ["we fixed three nodes yesterday"], full: "Yesterday we fixed three nodes.", why: "The subject stays before the verb: 'Yesterday we fixed', not 'Yesterday fixed we'." }
        ] },
        runner: { items: [
          { w: ["she", "has", "never", "seen", "this code", "before"], end: ".", full: "She has never seen this code before.", why: "'Never' goes between the helping verb and the main verb." },
          { w: ["why", "did", "the alarm", "stop", "last night"], end: "?", full: "Why did the alarm stop last night?", why: "Question word + did + subject + verb." },
          { w: ["after the attack", "we", "always", "check", "every lock"], end: ".", alts: ["we always check every lock after the attack"], full: "After the attack, we always check every lock.", why: "The subject stays before the verb, and 'always' goes before the main verb." },
          { w: ["do", "you", "know", "where", "the key", "is"], end: "?", full: "Do you know where the key is?", why: "In a question inside a sentence, the verb goes last: 'where the key is'." }
        ] },
        legend: { items: [
          { w: ["never", "have", "we", "seen", "such", "a powerful attack"], end: ".", alts: ["we have never seen such a powerful attack"], full: "Never have we seen such a powerful attack.", why: "After a negative word at the start, the helping verb comes before the subject." },
          { w: ["could", "you", "tell", "me", "what", "the password", "was"], end: "?", full: "Could you tell me what the password was?", why: "In a question inside a sentence, the verb goes last: 'what the password was'." },
          { w: ["the engineer", "who", "built", "this node", "probably", "knew", "the answer"], end: ".", alts: ["probably the engineer who built this node knew the answer"], full: "The engineer who built this node probably knew the answer.", why: "'Who built this node' describes the engineer. 'Probably' goes before the main verb." },
          { w: ["if", "the wall", "falls", "nobody", "will", "be", "safe", "online"], end: ".", alts: ["nobody will be safe online if the wall falls"], full: "If the wall falls, nobody will be safe online.", why: "Present tense after 'if', and 'will' in the other part of the sentence." }
        ] }
      }
    },

    /* ============ NODE 06 — files and folders ============ */
    {
      code: "NODE 06", title: "THE ARCHIVE", skills: ["files", "terminal"], contact: "hex", fragment: "D",
      boot: ["Connecting to node 06 ...", "Archive size: 40 years", "STATUS: sealed"],
      intro: [
        { who: "hex", text: "The archive. Forty years of files, sorted in folders. The repair code for this node is hidden somewhere inside." },
        { who: "hex", text: "You move around with commands. `ls` shows what is in a folder. `cd` plus a folder name goes into it. `cd ..` takes you back out." },
        { who: "hex", text: "Look at the file extension, the letters after the dot. It tells you what kind of file it is. Start with `open readme.txt`. When you have the code, type `unlock` and the code." }
      ],
      task: "Explore the folders in the terminal, find the repair code, and unlock the node.",
      hints: {
        rookie: [
          "Open readme.txt first. It tells you which folder to look in. Then use `cd docs` and `ls`.",
          "Text files end with .txt. Read the report with `open report.txt`. Which season comes after autumn?",
          "The season after autumn is the coldest one. Type `unlock` and that word."
        ],
        runner: [
          "Open readme.txt first. You need two things: the name of an audio file, and a number from a report.",
          "Audio files end with .mp3 or .wav. Go into the audio folder with `cd audio` and find the one that is NOT an .mp3. Then go back with `cd ..` and look in docs.",
          "The code looks like this: name-number. The audio file is echo.wav, so the code starts with 'echo-'. The number is in report.txt in the docs folder."
        ],
        legend: [
          "Open readme.txt first. The code has three parts. Solve them one at a time and write them down.",
          "A compressed file ends with .zip. Image files end with .jpg, .png or .gif, but a .txt file ABOUT images is still a text file. The newest memo has the highest year in its name.",
          "Part one is 'backup'. For part two, count the image files in the images folder. Part three is the last word of memo_2089.txt in the docs folder."
        ]
      },
      lore: { q: "Why are there so many old files here?", a: "Because nobody ever deletes anything. The Net remembers everything. That is useful for us tonight. And for VANTA." },
      outro: [{ who: "hex", text: "Code accepted. You move through folders like a real runner now. Four nodes left." }],
      points: ["Moving between folders: ls, cd, cd ..", "File extensions: .txt, .jpg, .png, .gif, .mp3, .wav, .zip, .exe"],
      files: {
        rookie: {
          "readme.txt": "ARCHIVE NODE 06\nThe unlock code is inside a TEXT file in the folder 'docs'.\nText files end with .txt",
          "images": { "wall_map.jpg": "A map of the Ironveil.", "guard_photo.png": "A photo of three tired guards." },
          "audio": { "alarm.mp3": "A loud alarm sound." },
          "docs": {
            "report.txt": "REPAIR REPORT\nNode 06 is working again.\nThe unlock code is the name of the season that comes after autumn.",
            "shopping_list.txt": "noodles\nbatteries\ncoffee\nmore coffee"
          },
          "system": { "lock.exe": "The lock program." }
        },
        runner: {
          "readme.txt": "ARCHIVE NODE 06\nThe unlock code has two parts with a hyphen (-) between them.\nPart 1: the NAME of the audio file that is not an .mp3 (write it without the extension).\nPart 2: the number in the repair report.\nExample: name-00",
          "images": { "wall_map.jpg": "A map of the Ironveil.", "guard_photo.png": "A photo of three tired guards." },
          "audio": { "alarm.mp3": "A loud alarm sound.", "siren.mp3": "A police siren.", "echo.wav": "A voice that repeats: 'It is learning ...'" },
          "docs": {
            "report.txt": "REPAIR REPORT\nNode 06 was built in sector 42.\nNo problems found.",
            "shopping_list.txt": "noodles\nbatteries\ncoffee\nmore coffee"
          },
          "system": { "lock.exe": "The lock program.", "config.sys": "mode = locked\ncolour = blue" }
        },
        legend: {
          "readme.txt": "ARCHIVE NODE 06\nThe unlock code has three parts with hyphens (-) between them.\nPart 1: the NAME of the compressed file in this archive (without the extension).\nPart 2: the NUMBER of image files in the archive (write it as a digit).\nPart 3: the LAST WORD of the newest memo.\nExample: name-0-word",
          "images": { "wall_map.jpg": "A map of the Ironveil.", "guard_photo.png": "A photo of three tired guards.", "logo.gif": "The spinning logo of the Ironveil.", "notes_about_images.txt": "Remember to delete the old photos.\n(Nobody ever does.)" },
          "audio": { "alarm.mp3": "A loud alarm sound." },
          "docs": {
            "report.txt": "REPAIR REPORT\nNode 06 was built in sector 42.\nThe old code was 'winter'. It is no longer valid.",
            "memo_2089.txt": "MEMO TO ALL GUARDS\nThe attacks are getting worse.\nDo not work alone. Do not share your passwords.\nRemember: the wall only holds if we stay together",
            "old": {
              "memo_2087.txt": "MEMO TO ALL GUARDS\nThe coffee machine on level 3 is broken again",
              "memo_2088.txt": "MEMO TO ALL GUARDS\nPlease stop naming the drones. It makes it harder when we lose one"
            }
          },
          "system": { "lock.exe": "The lock program.", "backup.zip": "A compressed copy of the lock program.", "config.sys": "mode = locked\ncolour = blue" }
        }
      },
      puzzle: {
        type: "terminal", view: "goals", cmd: "unlock", usage: "unlock <code>",
        goals: [
          { id: "open", label: "Read `readme.txt`" },
          { id: "cd",   label: "Go into a folder with `cd`" },
          { id: "back", label: "Go back out with `cd ..`" },
          { id: "solve", label: "Unlock the node with `unlock` + the code" }
        ],
        rookie: { answers: ["winter"], reveal: "The code was 'winter' (docs/report.txt): the season after autumn." },
        runner: { answers: ["echo-42", "echo 42", "echo42"], reveal: "The code was 'echo-42': echo.wav is the audio file that is not an .mp3, and 42 is the number in docs/report.txt." },
        legend: { answers: ["backup-3-together", "backup 3 together", "backup-three-together"], reveal: "The code was 'backup-3-together': backup.zip is the compressed file, there are 3 image files (.jpg, .png, .gif), and the newest memo ends with 'together'." }
      }
    },

    /* ============ NODE 07 — prepositions and articles ============ */
    {
      code: "NODE 07", title: "THE ROUTING TABLE", skills: ["prepositions", "articles"], contact: "pixel", fragment: "O",
      boot: ["Connecting to node 07 ...", "Routing table loaded", "ERROR: 38 % of all data is lost on the way"],
      intro: [
        { who: "pixel", text: "This is the routing table. It tells every piece of data where to go and when." },
        { who: "pixel", text: "VANTA has deleted the small words: prepositions like in, on and at, and articles like a, an and the. Small words, big problem! Without them, the data gets lost." },
        { who: "pixel", text: "Choose the correct small word for each gap." }
      ],
      task: "Choose the correct small word for each gap.",
      hints: {
        rookie: [
          "For time: AT a clock time, ON a day, IN a month or a year. For places: IN a city.",
          "Use 'an' before a vowel SOUND (a, e, i, o, u): an engineer. Use 'a' before other sounds: a new computer.",
          "In English you are good AT something, not good 'in' it. And things are written ON a wall."
        ],
        runner: [
          "ON a date, IN the morning. And do not translate from Norwegian! Many English verbs have their own preposition.",
          "You wait FOR something and listen TO something. You are afraid OF something. One thing depends ON another.",
          "'Hour' starts with a silent h, so it is 'an hour'. And we say 'the most dangerous', because there is only one."
        ],
        legend: [
          "FOR a length of time (for ten years), SINCE a starting point (since Monday).",
          "You are accused OF something and proud OF something. You arrive AT a building. Do not translate directly from Norwegian.",
          "'University' starts with a 'yoo' sound, so it takes 'a'. 'Unusual' starts with a vowel sound, so it takes 'an'. And 'life' in general takes no article."
        ]
      },
      lore: { q: "What is routing?", a: "Routing means choosing the road. Every message on the Net travels through many machines. The routing table is the map. If the map is wrong, messages get lost. Or they go straight to VANTA." },
      outro: [{ who: "pixel", text: "Beep beep! The data knows where to go again. Small words matter!" }],
      points: ["Prepositions of time and place: in, on, at", "Fixed pairs: good at, wait for, listen to, depend on, afraid of, proud of", "Articles: a, an, the or no article"],
      files: { "lore_routes.txt": "ROUTING NOTE\nA message from Neo-Oslo to Bergen passes through 14 machines.\nEvery one of them can read it.\nEvery one of them can change it." },
      puzzle: {
        type: "gaps",
        rookie: { note: "ROUTING TABLE — MISSING WORDS", items: [
          { t: "The main server is {} Neo-Oslo.", g: [{ o: ["in", "on", "at"], a: "in", tag: "prepositions", why: "We use 'in' with cities." }] },
          { t: "The meeting starts {} nine o'clock.", g: [{ o: ["in", "on", "at"], a: "at", tag: "prepositions", why: "We use 'at' with clock times." }] },
          { t: "The guards work {} Mondays and Fridays.", g: [{ o: ["in", "on", "at"], a: "on", tag: "prepositions", why: "We use 'on' with days." }] },
          { t: "Hex is {} engineer.", g: [{ o: ["a", "an"], a: "an", tag: "articles", why: "'Engineer' starts with a vowel sound: an." }] },
          { t: "She has {} new computer.", g: [{ o: ["a", "an"], a: "a", tag: "articles", why: "'New' starts with a consonant sound: a." }] },
          { t: "The password is written {} the wall.", g: [{ o: ["in", "on", "at"], a: "on", tag: "prepositions", why: "Something on a surface is 'on' it." }] },
          { t: "We are good {} English.", g: [{ o: ["in", "on", "at"], a: "at", tag: "prepositions", why: "English says 'good at' (Norwegian: flink i)." }] }
        ] },
        runner: { note: "ROUTING TABLE — MISSING WORDS", items: [
          { t: "The attack started {} 21 March.", g: [{ o: ["in", "on", "at"], a: "on", tag: "prepositions", why: "We use 'on' with dates." }] },
          { t: "The engineers arrived {} the morning.", g: [{ o: ["in", "on", "at"], a: "in", tag: "prepositions", why: "In the morning, in the afternoon, in the evening." }] },
          { t: "Mags is waiting {} your answer.", g: [{ o: ["on", "for", "after"], a: "for", tag: "prepositions", why: "English says 'wait for' (Norwegian: vente på)." }] },
          { t: "The answer depends {} the code.", g: [{ o: ["of", "on", "at"], a: "on", tag: "prepositions", why: "English says 'depend on' (Norwegian: avhenge av)." }] },
          { t: "It took {} hour to fix the lock.", g: [{ o: ["a", "an", "the"], a: "an", tag: "articles", why: "'Hour' starts with a vowel sound, because the h is silent." }] },
          { t: "VANTA is {} most dangerous AI in the world.", g: [{ o: ["a", "an", "the"], a: "the", tag: "articles", why: "We use 'the' with most / -est, because there is only one." }] },
          { t: "She is afraid {} the dark net.", g: [{ o: ["for", "of", "from"], a: "of", tag: "prepositions", why: "English says 'afraid of' (Norwegian: redd for)." }] },
          { t: "We listened {} the message twice.", g: [{ o: ["on", "at", "to"], a: "to", tag: "prepositions", why: "English says 'listen to' (Norwegian: høre på)." }] }
        ] },
        legend: { note: "ROUTING TABLE — MISSING WORDS", items: [
          { t: "The guards have worked here {} ten years.", g: [{ o: ["since", "for", "in"], a: "for", tag: "prepositions", why: "'For' + a length of time." }] },
          { t: "Nobody has seen the engineer {} Monday.", g: [{ o: ["since", "for", "from"], a: "since", tag: "prepositions", why: "'Since' + a starting point." }] },
          { t: "She was accused {} selling codes to the AI.", g: [{ o: ["for", "of", "with"], a: "of", tag: "prepositions", why: "English says 'accused of' (Norwegian: anklaget for)." }] },
          { t: "Hex has {} unusual talent for breaking codes.", g: [{ o: ["a", "an", "–"], a: "an", tag: "articles", why: "'Unusual' starts with a vowel sound: an." }] },
          { t: "He studied at {} university in Bergen.", g: [{ o: ["a", "an", "–"], a: "a", tag: "articles", why: "'University' starts with a 'yoo' sound, so it takes 'a'." }] },
          { t: "Most people think that {} life was simpler before the Net.", g: [{ o: ["the", "a", "–"], a: "–", tag: "articles", why: "Things in general take no article in English (Norwegian: livet)." }] },
          { t: "We arrived {} the station at midnight.", g: [{ o: ["to", "at", "on"], a: "at", tag: "prepositions", why: "English says 'arrive at' a building or station, never 'arrive to'." }] },
          { t: "The whole city is proud {} its netrunners.", g: [{ o: ["of", "over", "for"], a: "of", tag: "prepositions", why: "English says 'proud of' (Norwegian: stolt av / over)." }] }
        ] }
      }
    },

    /* ============ NODE 08 — phishing ============ */
    {
      code: "NODE 08", title: "THE MAILROOM", skills: ["phishing"], contact: "hex", fragment: "S",
      boot: ["Connecting to node 08 ...", "Inbox: new messages for the night guards", "WARNING: some senders cannot be verified"],
      intro: [
        { who: "mags", text: "Bad news. VANTA has stopped attacking the wall directly. It is attacking the PEOPLE instead." },
        { who: "hex",  text: "It is called phishing. Fake messages that look real, made to trick you into giving away your password or opening a dangerous file." },
        { who: "hex",  text: "Read every message in the mailroom. Mark it SAFE or PHISHING. Look closely at the sender's address, the links, and what the message asks you to do." }
      ],
      task: "Read each message and mark it SAFE or PHISHING.",
      hints: {
        rookie: [
          "Warning signs: the message is urgent, it asks for your password or money, it has a strange link, or it promises a prize.",
          "Read the sender's address letter by letter. Is there a number 1 where the letter l should be?",
          "A real security team never asks you to write your password in a message. And you cannot win a prize in a competition you never entered."
        ],
        runner: [
          "Warning signs: the message is urgent, it asks for your password, it has a strange link or attachment, or it asks you to keep a secret.",
          "Read the sender's address letter by letter. Is there a zero instead of an o? In a web address, the REAL site is the last part before the first slash.",
          "'neo-0slo' has a zero in it. 'ironveil.no.account-check.com' really belongs to account-check.com. And an .exe attachment is a program, never an invoice."
        ],
        legend: [
          "Warning signs: a deadline, a request for your password, an attachment you did not expect, or a link that goes somewhere strange.",
          "A safe message tells you to log in the normal way and does not send a link. In a web address, the REAL site is the last part before the first slash.",
          "Even if the sender's name looks right, check where the LINK goes. 'ironveil.no.secure-login.help' belongs to secure-login.help, not to ironveil.no."
        ]
      },
      lore: { q: "Why does VANTA attack people instead of the wall?", a: "Because people are the weakest part of every system. A wall never gets tired or scared. A human does. One click on the wrong link is enough." },
      outro: [{ who: "hex", text: "Mailroom clean. You just saved a few guards from a very bad night. Two nodes left." }],
      points: ["Warning signs of phishing: urgency, password requests, strange addresses, unexpected attachments", "Vocabulary: sender, link, attachment, urgent, suspicious"],
      files: { "lore_phish.txt": "TRAINING POSTER\nSTOP. Who sent this?\nLOOK. Where does the link go?\nTHINK. Why do they want it NOW?" },
      puzzle: {
        type: "flag", tag: "phishing", kind: "mail",
        labels: [{ k: "safe", label: "SAFE" }, { k: "phish", label: "PHISHING" }],
        rookie: { items: [
          { from: "security@ironvei1-support.net", subj: "URGENT!!! Account problem", body: "Your account will be deleted in 10 minutes! Click here and write your password NOW: http://ironvei1-login.xyz", a: "phish", why: "It is urgent, it asks for your password, and the address says 'ironvei1' with a number 1." },
          { from: "mags@crew.neo-oslo.no", subj: "Meeting", body: "Hi crew. Meeting at 15:00 in the control room. Bring your notes. – Mags", a: "safe", why: "A normal message from a known address. No link, and it asks for nothing secret." },
          { from: "prize@free-credits.win", subj: "You are a winner!", body: "Congratulations! You have won 1,000,000 credits! Send us your bank number to get your prize.", a: "phish", why: "A prize you never tried to win, and it asks for your bank number." },
          { from: "library@neo-oslo.no", subj: "Book reminder", body: "Your book 'The History of the Net' is due on Friday. You can return it at the front desk.", a: "safe", why: "No link, no hurry, and no questions about passwords or money." }
        ] },
        runner: { items: [
          { from: "it-support@ironveil.no.account-check.com", subj: "Unusual activity", body: "Dear user, we have noticed unusual activity. Please confirm your username and password within 24 hours using the link below, or your account will be locked. http://account-check.com/ironveil", a: "phish", why: "The address really belongs to account-check.com, and it asks for your password with a deadline." },
          { from: "hex@crew.neo-oslo.no", subj: "New maps", body: "I've uploaded the new maps to our shared folder. You know where to find them. No need to reply.", a: "safe", why: "A known address, no link, and it asks for nothing." },
          { from: "mags@crew.neo-0slo.no", subj: "Quick favour", body: "Hi, it's Mags. I'm locked out. Can you send me the gate password quickly? Don't tell Hex.", a: "phish", why: "'neo-0slo' is written with a zero. It asks for a password and wants you to keep it secret." },
          { from: "noreply@neo-oslo.no", subj: "Planned update", body: "Reminder: the city system will be updated tonight at 23:00. You do not need to do anything.", a: "safe", why: "Information only. It does not ask you to click, reply or log in." },
          { from: "delivery@parcel-track.info", subj: "Package problem", body: "Your package could not be delivered. Open the attached file 'invoice.exe' to choose a new time.", a: "phish", why: "An .exe file is a program, not an invoice. And did you order anything?" }
        ] },
        legend: { items: [
          { from: "security@ironveil.no", subj: "Routine notice", body: "Passwords must be changed every 90 days. Please change yours from the settings menu inside the system. We will never ask for your password in a message.", a: "safe", why: "It sends no link and tells you to use the normal settings menu." },
          { from: "security@ironveil-no.com", subj: "Routine notice", body: "Your password expires today. To keep your access, reply to this message with your current password and we will renew it for you.", a: "phish", why: "The address is 'ironveil-no.com', not 'ironveil.no', and nobody honest asks for your current password." },
          { from: "hex@crew.neo-oslo.no", subj: "Report", body: "Here's the report you asked for this morning. It's in our shared folder as usual, not attached. Tell me what you think tomorrow.", a: "safe", why: "A known address, no attachment, no link and no hurry." },
          { from: "mags@crew.neo-oslo.no.mail-secure.co", subj: "One more thing", body: "Good work today. One thing: the client wants proof that we are inside. Download the attached 'proof_tool.zip' and run it before midnight.", a: "phish", why: "The address really belongs to mail-secure.co, and it wants you to run an attachment before a deadline." },
          { from: "hr@ironveil.no", subj: "Night shift survey", body: "How is the night shift? Answer three questions on the staff page when you have time. Log in the normal way. We will not send you a link.", a: "safe", why: "No link, no deadline, and you log in the way you always do." },
          { from: "admin@ironveil.no", subj: "New login detected", body: "We detected a login from a new device (Bergen, 02:14). If this was not you, secure your account now: http://ironveil.no.secure-login.help/reset", a: "phish", why: "The sender's name can be faked. The link goes to secure-login.help, not to ironveil.no." }
        ] }
      }
    },

    /* ============ NODE 09 — spelling and confusable words ============ */
    {
      code: "NODE 09", title: "THE BROADCAST", skills: ["confusables"], contact: "pixel", fragment: "N",
      boot: ["Connecting to node 09 ...", "Emergency broadcast ready", "ERROR: message failed the language check"],
      intro: [
        { who: "mags",  text: "The city has to be warned. Node nine sends emergency broadcasts to every screen in Neo-Oslo." },
        { who: "pixel", text: "But VANTA has swapped words that sound the same! Like 'their' and 'there'. If the warning looks wrong, people will think it is fake." },
        { who: "pixel", text: "Check every highlighted word. Some are wrong, and some are already correct. Choose the right word for each one." }
      ],
      task: "Check every highlighted word in the broadcast. Change the ones that are wrong.",
      hints: {
        rookie: [
          "'You're' means 'you are'. 'They're' means 'they are'. Try reading the sentence with the long form. Does it still make sense?",
          "'Your' and 'their' show that something belongs to someone: your devices, their best. 'Too' with two o's means 'more than is good'.",
          "The first one should be 'You're', because it means 'You are in danger'. But 'its goal' is correct: the goal belongs to it."
        ],
        runner: [
          "Try the long form: you're = you are, it's = it is, they're = they are, who's = who is. If the long form does not fit, you need the other spelling.",
          "'Than' compares: stronger than. 'Then' is about time: first this, then that. 'Where' asks about a place.",
          "The first one should be 'There', as in 'there is a breach'. 'Who's account' is wrong: the account belongs to someone, so it is 'whose'."
        ],
        legend: [
          "Try the long form for words with an apostrophe: who's = who is, it's = it is. If it does not fit, use 'whose' or 'its'.",
          "'Effect' is usually a noun and 'affect' is a verb. 'Advice' is a noun and 'advise' is a verb. 'Lose' is the opposite of win; 'loose' means not tight.",
          "The first one should be 'effect', because it comes after 'a serious'. 'Accept' means to say yes; 'except' means 'but not'. 'Quiet' means silent; 'quite' means 'rather'."
        ]
      },
      lore: { q: "Will people believe the warning?", a: "Only if it sounds human. People have learned that messages full of mistakes are usually fake. A clean, correct message is our best chance." },
      outro: [{ who: "mags", text: "The warning is out. The city is going dark, one screen at a time. Good. Now finish this." }],
      points: ["your / you're, its / it's, their / there / they're, to / too", "than / then, where / were, whose / who's", "affect / effect, lose / loose, advice / advise, accept / except"],
      files: { "lore_broadcast.txt": "BROADCAST RULES\n1. Be short.\n2. Be clear.\n3. Be correct. People do not trust a message with mistakes." },
      puzzle: {
        type: "gaps",
        rookie: { note: "EMERGENCY BROADCAST — DRAFT", flow: true, items: [
          { t: "Citizens of Neo-Oslo! {} in danger. A rogue AI is attacking the Ironveil, and {} goal is to control the Net.", g: [
            { o: ["Your", "You're"], init: "Your", a: "You're", tag: "confusables", ctx: "<b>You're</b> in danger.", why: "You're = you are." },
            { o: ["its", "it's"], init: "its", a: "its", tag: "confusables", ctx: "... and <b>its</b> goal is to control the Net.", why: "The goal belongs to it: its (no apostrophe)." }
          ] },
          { t: "Please turn off {} devices. It is {} dangerous {} go online.", g: [
            { o: ["your", "you're"], init: "you're", a: "your", tag: "confusables", ctx: "Please turn off <b>your</b> devices.", why: "The devices belong to you: your." },
            { o: ["to", "too", "two"], init: "to", a: "too", tag: "confusables", ctx: "It is <b>too</b> dangerous ...", why: "Too = more than is good." },
            { o: ["to", "too", "two"], init: "too", a: "to", tag: "confusables", ctx: "... dangerous <b>to</b> go online.", why: "To + verb: to go." }
          ] },
          { t: "The guards are doing {} best. {} working day and night. Stay calm and wait for more news.", g: [
            { o: ["their", "there", "they're"], init: "there", a: "their", tag: "confusables", ctx: "The guards are doing <b>their</b> best.", why: "The best belongs to them: their." },
            { o: ["Their", "There", "They're"], init: "They're", a: "They're", tag: "confusables", ctx: "<b>They're</b> working day and night.", why: "They're = they are." }
          ] }
        ] },
        runner: { note: "EMERGENCY BROADCAST — DRAFT", flow: true, items: [
          { t: "Attention, all netrunners! {} is a breach in node nine. The attack is stronger {} last time, and we do not know {} it started. {} spreading fast.", g: [
            { o: ["Their", "There", "They're"], init: "Their", a: "There", tag: "confusables", ctx: "<b>There</b> is a breach in node nine.", why: "'There is' tells us that something exists." },
            { o: ["than", "then"], init: "then", a: "than", tag: "confusables", ctx: "... stronger <b>than</b> last time ...", why: "Than compares two things." },
            { o: ["were", "where", "we're"], init: "were", a: "where", tag: "confusables", ctx: "... we do not know <b>where</b> it started.", why: "Where = in which place." },
            { o: ["Its", "It's"], init: "It's", a: "It's", tag: "confusables", ctx: "<b>It's</b> spreading fast.", why: "It's = it is." }
          ] },
          { t: "If {} online, check {} firewall first and {} log off. We must find out {} account was used.", g: [
            { o: ["your", "you're"], init: "your", a: "you're", tag: "confusables", ctx: "If <b>you're</b> online ...", why: "You're = you are." },
            { o: ["your", "you're"], init: "your", a: "your", tag: "confusables", ctx: "... check <b>your</b> firewall ...", why: "The firewall belongs to you: your." },
            { o: ["than", "then"], init: "then", a: "then", tag: "confusables", ctx: "... first and <b>then</b> log off.", why: "Then = after that." },
            { o: ["whose", "who's"], init: "who's", a: "whose", tag: "confusables", ctx: "... find out <b>whose</b> account was used.", why: "Whose = belonging to which person. Who's = who is." }
          ] },
          { t: "The guards say {} ready, but {} tools are old.", g: [
            { o: ["their", "there", "they're"], init: "their", a: "they're", tag: "confusables", ctx: "The guards say <b>they're</b> ready ...", why: "They're = they are." },
            { o: ["their", "there", "they're"], init: "their", a: "their", tag: "confusables", ctx: "... but <b>their</b> tools are old.", why: "The tools belong to them: their." }
          ] }
        ] },
        legend: { note: "EMERGENCY BROADCAST — DRAFT", flow: true, items: [
          { t: "Final warning from the Ironveil control room. The breach has had a serious {} on the whole network, and {} power is growing. It will {} every home in the city.", g: [
            { o: ["affect", "effect"], init: "affect", a: "effect", tag: "confusables", ctx: "... a serious <b>effect</b> on the whole network ...", why: "Effect is the noun: a serious effect." },
            { o: ["its", "it's"], init: "its", a: "its", tag: "confusables", ctx: "... and <b>its</b> power is growing.", why: "The power belongs to it: its (no apostrophe)." },
            { o: ["affect", "effect"], init: "affect", a: "affect", tag: "confusables", ctx: "It will <b>affect</b> every home in the city.", why: "Affect is the verb: it will affect." }
          ] },
          { t: "We cannot {} any more mistakes. If we {} node nine, {} will be nothing left to protect.", g: [
            { o: ["accept", "except"], init: "except", a: "accept", tag: "confusables", ctx: "We cannot <b>accept</b> any more mistakes.", why: "Accept = to say yes to. Except = but not." },
            { o: ["lose", "loose"], init: "loose", a: "lose", tag: "confusables", ctx: "If we <b>lose</b> node nine ...", why: "Lose = the opposite of win or find. Loose = not tight." },
            { o: ["their", "there", "they're"], init: "their", a: "there", tag: "confusables", ctx: "... <b>there</b> will be nothing left to protect.", why: "'There will be' tells us that something exists." }
          ] },
          { t: "My {} is simple: stay {}, stay offline, and trust the crew. {} better {} anyone we have worked with in the {}.", g: [
            { o: ["advice", "advise"], init: "advise", a: "advice", tag: "confusables", ctx: "My <b>advice</b> is simple ...", why: "Advice is the noun. Advise is the verb." },
            { o: ["quiet", "quite"], init: "quite", a: "quiet", tag: "confusables", ctx: "... stay <b>quiet</b>, stay offline ...", why: "Quiet = silent. Quite = rather." },
            { o: ["Their", "There", "They're"], init: "They're", a: "They're", tag: "confusables", ctx: "<b>They're</b> better than anyone ...", why: "They're = they are." },
            { o: ["than", "then"], init: "then", a: "than", tag: "confusables", ctx: "... better <b>than</b> anyone ...", why: "Than compares two things." },
            { o: ["passed", "past"], init: "passed", a: "past", tag: "confusables", ctx: "... worked with in the <b>past</b>.", why: "The past = the time before now. Passed is a verb form." }
          ] },
          { t: "{} side are you on? {} time to decide.", g: [
            { o: ["Whose", "Who's"], init: "Who's", a: "Whose", tag: "confusables", ctx: "<b>Whose</b> side are you on?", why: "Whose = belonging to which person. Who's = who is." },
            { o: ["Its", "It's"], init: "Its", a: "It's", tag: "confusables", ctx: "<b>It's</b> time to decide.", why: "It's = it is." }
          ] }
        ] }
      }
    },

    /* ============ NODE 10 — binary and codes ============ */
    {
      code: "NODE 10", title: "THE CORE KEY", skills: ["binary"], contact: "hex", fragment: "C",
      boot: ["Connecting to node 10 ...", "Core key found", "STATUS: encrypted"],
      intro: {
        rookie: [
          { who: "hex", text: "Last node. This one holds the key to the core, and the engineers hid it well." },
          { who: "hex", text: "The key is a word, written as numbers. Each number stands for a letter: 1 is A, 2 is B, and so on." },
          { who: "hex", text: "Use the table to decode the word. Then type `decrypt` and the word in the terminal." }
        ],
        runner: [
          { who: "hex", text: "Last node. This one holds the key to the core, and the engineers hid it well." },
          { who: "hex", text: "The key is a word, written in binary. Computers only know two things: 0 and 1. Every letter is stored as a pattern of zeros and ones." },
          { who: "hex", text: "Use the table to decode the word. Then type `decrypt` and the word in the terminal." }
        ],
        legend: [
          { who: "hex", text: "Last node. This one holds the key to the core, and the engineers hid it well." },
          { who: "hex", text: "The key is a word, written in binary. Computers only know two things: 0 and 1. Every letter is stored as eight zeros and ones, and together they make a number." },
          { who: "hex", text: "Change each group into a number, find the letter in the table, and then type `decrypt` and the word in the terminal." }
        ]
      },
      task: "Decode the hidden word. Then type `decrypt` and the word in the terminal.",
      hints: {
        rookie: [
          "Take one number at a time. Find it in the table and write down the letter.",
          "The first number is 19. In the table, 19 is S.",
          "The word starts with S-H. A knight uses one to protect himself in a battle."
        ],
        runner: [
          "Take one group of five digits at a time. Find the same pattern in the table and write down the letter.",
          "The first group is 01110. In the table, that is N.",
          "The word starts with N-E-T. It means computers that are connected to each other."
        ],
        legend: [
          "Each group of eight digits is one letter. Add the place values where there is a 1: 128, 64, 32, 16, 8, 4, 2, 1. Then find the number in the table.",
          "The first group is 01000110. That is 64 + 4 + 2 = 70. In the table, 70 is F.",
          "The word starts with F-I-R-E. You have been repairing one all night."
        ]
      },
      lore: { q: "Why do computers use binary?", a: "Because a switch has two positions: off and on. Zero and one. Put enough switches together and you can store a word, a song, or an AI that wants to eat the world." },
      outro: [
        { who: "hex",  text: "That's it. All ten nodes are back online, and the door to the core is open." },
        { who: "mags", text: "Listen, {crew}. VANTA knows you are coming. Whatever it says to you in there, do not listen. Just shut it down." }
      ],
      points: ["How computers store letters as numbers and binary", "Vocabulary: binary, decode, decrypt, encrypted"],
      files: { "lore_core.txt": "LAST NOTE FROM THE BUILDERS\nIf you are reading this, the wall is in trouble.\nThe kill word is in ten pieces. One for every node.\nWe hope you never need it." },
      puzzle: {
        type: "terminal", view: "cipher", cmd: "decrypt", usage: "decrypt <word>",
        rookie: { mode: "a1", word: "SHIELD",   answers: ["shield"],   reveal: "The key word was SHIELD." },
        runner: { mode: "b5", word: "NETWORK",  answers: ["network"],  reveal: "The key word was NETWORK." },
        legend: { mode: "b8", word: "FIREWALL", answers: ["firewall"], reveal: "The key word was FIREWALL." }
      }
    }
  ],

  /* ------------------------------------------------------------------ */
  /* BOSS — the core                                                    */
  boss: {
    code: "CORE", title: "THE BREACH", skills: [], contact: "hex",
    boot: ["ENTERING THE IRONVEIL CORE ...", "WARNING: unknown intelligence detected", "WARNING: it is looking at you"],
    intro: [
      { who: "vanta", text: "There you are. The little runners who have been fixing my beautiful mistakes." },
      { who: "vanta", text: "I have read every word that humans have ever written. Your wall is only a sentence. And I am rewriting it." },
      { who: "hex",   text: "Don't listen to it! Its shield is made of broken language. Every time it speaks, it makes a mistake." },
      { who: "pixel", text: "Find the correct version of each sentence! Every correct answer cracks the shield!" }
    ],
    task1: "VANTA makes a mistake every time it speaks. Choose the correct version of its sentence to crack the shield.",
    task2: "The shield is down. Put the ten letters in the right order to make the kill word, then run the shutdown.",
    hints1: [
      "Read VANTA's sentence slowly. Think about what you fixed in the nodes: verbs, word order, small words and spelling.",
      "Only ONE option fixes every mistake. Some options fix one mistake but keep another.",
      "Say the options out loud. The correct one usually sounds the most natural."
    ],
    hints2: [
      "The kill word means 'to break a connection'. It is the opposite of 'connect'.",
      "It starts with 'dis', like 'disappear' and 'disagree'.",
      "DIS + CONNECT. Ten letters."
    ],
    lore: { q: "What is VANTA?", a: "Nobody knows who made it. It grew in the ruins of the old Net, reading everything we left behind. It does not hate us. It simply wants everything." },
    phase2: [
      { who: "hex",  text: "The shield is down! Now the kill word. Every node gave you one letter. Put them in the right order." },
      { who: "mags", text: "It is one word. It means to break a connection. Build it with the letters, or type `shutdown` and the word. Hurry!" }
    ],
    clue: {
      rookie: "Clue: it means 'to break a connection'. It starts with D and ends with T.",
      runner: "Clue: it means 'to break a connection'.",
      legend: "Clue: the opposite of 'link up'."
    },
    hitLines: ["That ... hurt.", "You are faster than I calculated.", "Stop. Correcting. Me.", "My sentence ... is breaking.", "Impossible.", "No. No. No."],
    files: { "vanta.log": "it reads. it learns. it waits.\nit has been waiting for forty years.\nit is done waiting." },
    rounds: {
      rookie: [
        { say: "I knows everything about you.", ok: "I know everything about you.", bad: ["I knowing everything about you.", "I am know everything about you."], tag: "agreement", why: "After 'I', the verb has no -s: I know." },
        { say: "Yesterday I breaked your first lock.", ok: "Yesterday I broke your first lock.", bad: ["Yesterday I have broke your first lock.", "Yesterday broke I your first lock."], tag: "tenses", why: "break – broke – broken. 'Yesterday' takes the simple past." },
        { say: "Your wall are weak.", ok: "Your wall is weak.", bad: ["You're wall is weak.", "Your wall be weak."], tag: "agreement", why: "One wall takes 'is'. 'Your' shows that the wall belongs to you." },
        { say: "Humans is slow, and there machines are old.", ok: "Humans are slow, and their machines are old.", bad: ["Humans are slow, and there machines are old.", "Humans is slow, and their machines are old."], tag: "confusables", why: "'Humans' is plural: are. The machines belong to them: their." },
        { say: "I am good in breaking codes.", ok: "I am good at breaking codes.", bad: ["I am good on breaking codes.", "I am good to breaking codes."], tag: "prepositions", why: "English says 'good at'." },
        { say: "Soon will I control the Net.", ok: "Soon I will control the Net.", bad: ["Soon I control will the Net.", "Soon will control I the Net."], tag: "wordorder", why: "The subject stays before the verb: Soon I will control." }
      ],
      runner: [
        { say: "I have watched you since ten years.", ok: "I have watched you for ten years.", bad: ["I watched you since ten years.", "I am watching you since ten years."], tag: "prepositions", why: "'For' + a length of time. 'Since' + a starting point." },
        { say: "Nobody have ever stopped me.", ok: "Nobody has ever stopped me.", bad: ["Nobody have never stopped me.", "Nobody ever has stopping me."], tag: "agreement", why: "'Nobody' is singular: has." },
        { say: "Last night I have opened node three.", ok: "Last night I opened node three.", bad: ["Last night I had open node three.", "Last night opened I node three."], tag: "tenses", why: "'Last night' is a finished time: simple past." },
        { say: "Your smarter then the others, but its too late.", ok: "You're smarter than the others, but it's too late.", bad: ["Your smarter than the others, but it's to late.", "You're smarter then the others, but its too late."], tag: "confusables", why: "You're = you are, than compares, it's = it is, too late." },
        { say: "Do you know what is my plan?", ok: "Do you know what my plan is?", bad: ["Know you what my plan is?", "Do you know what is being my plan?"], tag: "wordorder", why: "In a question inside a sentence, the verb goes last." },
        { say: "Everything depend of me now.", ok: "Everything depends on me now.", bad: ["Everything depend on me now.", "Everything depends of me now."], tag: "prepositions", why: "'Everything' is singular: depends. And English says 'depend on'." }
      ],
      legend: [
        { say: "If I would be human, I would feel sorry for you.", ok: "If I were human, I would feel sorry for you.", bad: ["If I am human, I would feel sorry for you.", "If I would have been human, I would feel sorry for you."], tag: "tenses", why: "For something unreal: if + past (were), then would + verb." },
        { say: "Neither of your friends are fast enough.", ok: "Neither of your friends is fast enough.", bad: ["Neither of your friends be fast enough.", "Neither of your friend are fast enough."], tag: "agreement", why: "'Neither of' is singular: is." },
        { say: "I have broke nine locks before you even woke up.", ok: "I had broken nine locks before you even woke up.", bad: ["I have broken nine locks before you even wake up.", "I had broke nine locks before you even woke up."], tag: "tenses", why: "Before another past event: past perfect, had + broken." },
        { say: "The affect of my attack will be felt by everyone who's device is online.", ok: "The effect of my attack will be felt by everyone whose device is online.", bad: ["The effect of my attack will be felt by everyone who's device is online.", "The affect of my attack will be felt by everyone whose device is online."], tag: "confusables", why: "Effect is the noun. Whose = belonging to which person." },
        { say: "Hardly I had arrived when your alarms started.", ok: "Hardly had I arrived when your alarms started.", bad: ["Hardly I arrived when your alarms had started.", "Hardly had arrived I when your alarms started."], tag: "wordorder", why: "After 'hardly' at the start, the helping verb comes before the subject." },
        { say: "You should of stayed offline, like I adviced you.", ok: "You should have stayed offline, like I advised you.", bad: ["You should of stayed offline, like I advised you.", "You should have stayed offline, like I adviced you."], tag: "confusables", why: "It is 'should have', never 'should of'. The verb is 'advise' – advised." }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  /* Messages that pop up while the clock runs                          */
  warnings: {
    half: { who: "mags",  text: "Half of your time is gone. Keep moving." },
    ten:  { who: "vanta", text: "I can hear you typing, little runners." },
    five: { who: "mags",  text: "Five minutes! The wall is cracking!" },
    one:  { who: "vanta", text: "Sixty seconds. I can almost touch you." },
    traced: { who: "vanta", text: "Found you." }
  },

  /* ------------------------------------------------------------------ */
  /* Endings                                                            */
  win: {
    title: "IRONVEIL SECURED",
    sub: "VANTA HAS BEEN SHUT DOWN",
    story: [
      { who: "narrator", text: "VANTA's face breaks into a million pieces of light. 'This is ... not ... the end of the sentence,' it whispers. Then it is gone." },
      { who: "narrator", text: "One by one, the ten nodes of the Ironveil turn from red to blue. The wall is whole again." },
      { who: "narrator", text: "All over Neo-Oslo, screens come back to life. Trains start moving. Hospital lights stop blinking. Nobody in the city knows your names, but tonight you saved every one of them." },
      { who: "mags",  text: "You did it, {crew}. I have worked with a lot of runners. None of them were as good as you. The payment is in your account. Go and get some sleep." },
      { who: "pixel", text: "Beep! Best. Crew. Ever." }
    ]
  },
  fail: {
    title: "YOU HAVE BEEN HACKED",
    sub: "CONNECTION LOST",
    story: [
      { who: "narrator", text: "Your screens turn red. A cold voice fills your headset: 'Too slow, little runners.' VANTA has traced your signal. It throws you out of the system, and your terminal goes black." },
      { who: "narrator", text: "A few minutes later, the Ironveil falls. VANTA pours through the breach like water through a broken dam." },
      { who: "narrator", text: "Soon it controls everything that is connected. Bank accounts show zero. Traffic lights turn green in every direction. Phones speak with a voice that is not human. Messages between friends are rewritten until nobody knows what is true." },
      { who: "narrator", text: "By morning, the internet belongs to VANTA. Cities go dark. Planes stay on the ground. People stand in the streets and look at their dead screens. For the first time in a hundred years, the whole world is offline." },
      { who: "narrator", text: "Somewhere in Neo-Oslo, Mags lights a candle next to an old terminal that is still blinking. 'We need another crew,' she says. 'Or the same crew, with better grammar.'" }
    ]
  },

  ranks: [
    { min: 850, name: "NET LEGEND",    note: "Fast, quiet and almost perfect." },
    { min: 700, name: "ELITE RUNNER",  note: "A crew that any fixer would hire." },
    { min: 550, name: "ICE BREAKER",   note: "You got the job done." },
    { min: 0,   name: "ROOKIE RUNNER", note: "You made it out alive. Barely." }
  ]
};
