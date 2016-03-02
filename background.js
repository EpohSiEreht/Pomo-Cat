var states = {
	"off": "text test",
	"pomodoro": "pomo text"
};

var currentState = "off";

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
		if (request.command === "startTimer" && currentState === "off") {
			startTimer();
			sendResponse({message: "Timer started."});
		}
		else if (request.command === "stopTimer") {
			stopTimer();
			sendResponse({message: "Timer stopped."});
		} else if (request.command == "resetTimer") {
			resetTimer();
			sendResponse({message: "Timer reset"});
		}
});

var timer;

function startTimer() {
	var start,
		now = new Date().getTime(),
		min       = 0,
	    sec       = 0,
	    mField    = 0,
	    sField    = 0;
		start = now;
	timer = setInterval(function() {
		now = new Date().getTime(); 
		var difference = Math.floor(now - start);
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
	        sField = ((sField > 0 && sField < 10) ? "0" : "") + sField;
	        chrome.browserAction.setBadgeText({text: mField});
	        var currentTime = mField + ":" + sField;
	    } 
	    else if(difference >= 1500000){
	      var currentTime = "00:00";
	      clearInterval(timer);
	    }
		// document.getElementById('timer').innerText = difference;
		updateTime(currentTime);
		return start, now, min, sec, mField, sField;
	}, 1000);
	currentState = "pomodoro";
	return start, now, min, sec, mField, sField;
}

function updateTime(difference) {
	chrome.runtime.sendMessage({
		"command": "updateTime",
		"time": difference
	});
}

function stopTimer() {
	clearInterval(timer);
	timer = null;
	chrome.browserAction.setBadgeText({text: "Boo"});
}

function resetTimer() {
	location.reload();
}