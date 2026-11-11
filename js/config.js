/* =====================================================================
   IRONVEIL — teacher settings
   Change the values in this file to adjust the game for your class.
   ===================================================================== */
window.CONFIG = {
  // Code that opens the teacher menu (gear button) and the time setting.
  teacherCode: "4096",

  // Mission time in minutes, and the choices shown in the teacher settings.
  defaultMinutes: 60,
  minuteOptions: [30, 45, 60, 75, 90],

  // TRACE meter. Numbers are percentage points added to the meter.
  trace: {
    wrong: 10,          // a failed check or wrong command
    hint2: 15,          // the second hint in a node (the first hint is free)
    hint3: 25,          // the third hint in a node
    penaltySeconds: 120 // time lost when the meter reaches 100 %
  },

  // Milliseconds per letter when characters "type" their lines.
  typeSpeed: 14,

  // Name of the save slot in the browser. Change it to wipe all old saves.
  saveKey: "ironveil-save-v1",
  prefsKey: "ironveil-prefs-v1"
};
