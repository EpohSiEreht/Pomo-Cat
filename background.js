
var startTime = {},
    now       = new Date().getTime(),
    min       = 0,
    sec       = 0,
    mField    = 0,
    sField    = 0;

startTime = now;

function timer() {
  now = new Date().getTime();
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
    now = new Date().getTime();
    clearInterval(countdown);
    display.innerHTML = "00:00";
  }
}

function start() {
  document.getElementById('start').addEventListener('click', function(){
    counter = setInterval(timer, 1000);
    timer();
  });
}

function stop() {
  document.getElementById('stop').addEventListener('click', function(){
    var display = document.querySelector('#timer');
    clearInterval(counter);
    startTime = {},
    display.innerHTML = "Fail No Good";
  });
}

function reset() {
  document.getElementById('reset').addEventListener('click', function(){
    var display = document.querySelector('#timer');
    startTime = {},
    now       = new Date().getTime(),
    min       = 0,
    sec       = 0,
    mField    = 0,
    sField    = 0;
    startTime = now,
    counter   = "";
    display.innerHTML = "25:00";
  });
}

function initiatePomodoro(){
  var counter;
  start();
  stop();
  reset();
}

window.onload = function(e) {
  e.preventDefault();
  initiatePomodoro();
};