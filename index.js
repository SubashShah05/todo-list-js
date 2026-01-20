// Initial values
let sessionMin = 1;
let breakMin = 1;

let timeLeft = 0;
let timerId = null;
let currentMode = "SESSION";

// DOM elements
const display = document.getElementById("display");
const modeText = document.getElementById("modeText");
const sessionLabel = document.getElementById("sessionLabel");
const breakLabel = document.getElementById("breakLabel");

// Increase / Decrease Session Time
function changeSession(value) {
  sessionMin += value;
  if (sessionMin < 1) sessionMin = 1;
  sessionLabel.innerText = sessionMin + " min";
}

// Increase / Decrease Break Time
function changeBreak(value) {
  breakMin += value;
  if (breakMin < 1) breakMin = 1;
  breakLabel.innerText = breakMin + " min";
}

// Start Timer
function start() {
  if (timerId) return; // prevent multiple timers

  currentMode = "SESSION";
  modeText.innerText = "Current Session : Session Time";
  timeLeft = sessionMin * 60;

  runTimer();
}

// Timer Logic
function runTimer() {
  timerId = setInterval(() => {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    display.innerText =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");

    if (timeLeft === 0) {
      clearInterval(timerId);
      timerId = null;
      switchSession();
    }
  }, 1000);
}

// Switch between Session & Break
function switchSession() {
  if (currentMode === "SESSION") {
    currentMode = "BREAK";
    modeText.innerText = "Current Session : Break Time";
    timeLeft = breakMin * 60;
  } else {
    currentMode = "SESSION";
    modeText.innerText = "Current Session : Session Time";
    timeLeft = sessionMin * 60;
  }
  runTimer();
}

// Reset Timer
function reset() {
  clearInterval(timerId);
  timerId = null;
  display.innerText = "00:00";
  modeText.innerText = "Current Session :";
}
