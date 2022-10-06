const inputEl = document.getElementById("input-container");
const formEl = document.getElementById("countForm");
const dateEl = document.getElementById("time-picker");

const countEl = document.getElementById("countdown");
const titleEl = document.getElementById("count-title");
const btnEl = document.getElementById("countdown-btn");
const spanElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeTick = document.getElementById("complete-tick");
const completeBtn = document.getElementById("complete_btn");

let countTitle = "";
let countDate = "";
let countDown = new Date();
let countDownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//js date

const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute("min", today);

//complete ui
function updateDOM() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDown - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //input hide
    inputEl.hidden = true;

    //if count end ,show complete
    if (distance < 0) {
      countEl.hidden = true;
      clearInterval(countDownActive);
      completeTick.textContent = `${countTitle} finished on ${countDate}`;
      completeEl.hidden = false;
    } else {
      //populating

      titleEl.textContent = `${countTitle}`;

      spanElements[0].textContent = `${days}`;

      spanElements[1].textContent = `${hours}`;

      spanElements[2].textContent = `${minutes}`;
      spanElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countEl.hidden = false;
    }
  }, second);
}

//submit fnc
function updateCount(e) {
  e.preventDefault();

  countTitle = e.srcElement[0].value;
  countDate = e.srcElement[1].value;
  //local storage obj
  savedCountdown = {
    Title: countTitle,
    date: countDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  if (countDate === "") {
    alert("Plese select a date for countdown.");
  } else {
    //updateDOM

    countDown = new Date(countDate).getTime();

    updateDOM();
  }
}

//Reset func
function Reset() {
  // hide countdown
  countEl.hidden = true;
  completeEl.hidden = true;
  inputEl.hidden = false;

  //stop count interval
  clearInterval(countDownActive);

  //reset value
  countTitle = "";
  countDate = "";

  //reset localStorage
  localStorage.removeItem("countdown");
}

//func get local storage if
function restoreLocalstorageSet() {
  if (localStorage.getItem("countdown")) {
    inputEl.hidden = true;

    savedCountdown = JSON.parse(localStorage.getItem("countdown"));

    countTitle = savedCountdown.Title;
    countDate = savedCountdown.date;

    countDown = new Date(countDate).getTime();

    updateDOM();
  }
}

//event Listener
formEl.addEventListener("submit", updateCount);
btnEl.addEventListener("click", Reset);
completeBtn.addEventListener("click", Reset);
//on load
restoreLocalstorageSet();
