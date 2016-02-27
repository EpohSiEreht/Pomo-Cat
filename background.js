// Global variables with inital values
var startTime = {},
    now       = new Date().getTime(),
    min       = 0,
    sec       = 0,
    mField    = 0,
    sField    = 0;
// Insert current time into the startTime variable
startTime = now;
// Starts the countdown
function timer() {
  now = new Date().getTime();  // Every time the timer function runs, start with new  time
  var display = document.querySelector('#timer'),
      difference = Math.floor(now - startTime);
  if(difference <= 1500000) {
      sec++;
      if(sec % 60 === 0){
          min++;
      }
      if(sec > 59){
          sec = 0;
      }
      mField = 24 - min;
      sField = 60 - sec;
      if(sField === 60) {
        sField = "0" + 0;
      }
      mField = (mField < 10 ? "0" : "") + mField;
      sField = (sField < 10 ? "0" : "") + sField;
      display.innerHTML = mField + ":" + sField;
  } 
  else if(difference >= 1500000){
    clearInterval(counter);
    display.innerHTML = "00:00";
  }
}
// Listen for the start button click
function start() {
  document.getElementById('start').addEventListener('click', function(){
    counter = setInterval(timer, 1000);
    timer();
  });
}
// Listen for the stop button click
function stop() {
  document.getElementById('stop').addEventListener('click', function(){
    var display = document.querySelector('#timer');
    clearInterval(counter);
    startTime = {},
    display.innerHTML = "Fail No Good";
  });
}
// Listen for the reset button click
function reset() {
  document.getElementById('reset').addEventListener('click', function(){
    var display = document.querySelector('#timer');
    clearInterval(counter);
    startTime = {},
    now       = new Date().getTime(),
    min       = 0,
    sec       = 0,
    mField    = 0,
    sField    = 0,
    startTime = now;
    display.innerHTML = "25:00";
  });
}
// Set up the Pomodoro
function initializePomodoro(){
  var counter;
  start();
  stop();
  reset();
}
// After the page has been loaded, initialize the Pomodoro
window.onload = function(e) {
  e.preventDefault();
  initializePomodoro();
};