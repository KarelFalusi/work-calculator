let data = [];
let dataFromStorage = localStorage.getItem('info');
if (dataFromStorage) {
  data = JSON.parse(dataFromStorage);
};

let workSelect = document.getElementById("work-select");
let workProgress = document.getElementById("progress");
let timeSelect = document.getElementById("tentacles");
let confirmButton = document.getElementById("confirm-button");
let date = new Date().toISOString().slice(0, 10);
let ulElement = document.getElementById('work-history');


// pri kliku na confirm
confirmButton.addEventListener('click', function () {
  let object = {
    workOption: workSelect.value,
    time: Number(timeSelect.value),
    date: date
  };
  console.log(object);
  data.push(object);
  localStorage.setItem('info', JSON.stringify(data))
  calculateProgress();
});


// pri nacteni stranky
function calculateProgress() {
  let monday = new Date();
  monday.setDate(monday.getDate() - monday.getDay() + 1);
  monday = monday.toISOString().slice(0, 10);

  let dataOfThisWeek = data.filter(object => object.date >= monday);
  console.log(dataOfThisWeek);


  let timeOfThisWeek = dataOfThisWeek.reduce((acc, object) => {
    return acc + object.time
  }, 0);
  console.log(timeOfThisWeek, 'min');
  workProgress.value = timeOfThisWeek;
  ulElement.innerHTML = dataOfThisWeek.map(object => {
    return `
            <li>
                ${object.date}
                ${object.workOption}
                ${object.time} minutes
            </li>
                `
  }).join("");
  document.getElementById('total').innerHTML = timeOfThisWeek + ' Workout minutes this week';


};
calculateProgress();


// stopwatch
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);


  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");

  return `${hh}:${formattedMM}:${formattedSS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 1000);
  showButton("PAUSE");
}

function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timerInterval);
  print("0:00:00");
  timeSelect.value = Math.round(elapsedTime / 1000 / 60);
  elapsedTime = 0;
  showButton("PLAY");
}

// Create function to display buttons

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
  const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}
// Create event listeners

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
