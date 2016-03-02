function init() {
	fade();
	addMessageListeners();
	clickListener();
	setTimeout(function() {
		if(document.querySelector('#timer').innerText !== "Ready?"){
    	document.getElementById('stop').style.display = "block";
		} else if(document.querySelector('#timer').innerText === "Ready?"){
      document.getElementById('start').style.display = "block";
    }
	}, 1000);
}

function fade() {
  var html = document.querySelector('.js-fade');
  if (html.classList.contains('is-paused')){
    html.classList.remove('is-paused');
  }
}

function addMessageListeners() {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.command === "updateTime") {
			var time = request.time;
			document.getElementById("timer").innerText = time;
		}
	});
}

function clickListener() {
	document.getElementById('start').onclick = function() {
		chrome.runtime.sendMessage({
			"command":"startTimer"
		});
		document.getElementById('start').style.display = "none";
    	document.getElementById('stop').style.display = "block";
    	document.getElementById('cat').src = "img/cat-board.png";
    	document.getElementById('status').innerHTML = "You can do it!";
	}
	document.getElementById('stop').onclick = function() {
		chrome.runtime.sendMessage({
			"command": "stopTimer"
		});
		document.getElementById('stop').style.display = "none";
    	document.getElementById('reset').style.display = "block";
    	document.getElementById('cat').src = "img/cat-boo.png";
    	document.getElementById('status').innerHTML = "MEOWWW!!!!";
    	document.querySelector('#timer').innerHTML = "Booo!";
	}
	document.getElementById('reset').onclick = function() {
		chrome.runtime.sendMessage({
			"command": "resetTimer"
		});
		document.getElementById('reset').style.display = "none";
    	document.getElementById('start').style.display = "block";
    	document.getElementById('cat').src = "img/cat-reset.png";
    	document.getElementById('status').innerHTML = "Let's try again!";
    	var display = document.querySelector('#timer');
    	display.innerHTML = "25:00";
	}
}

document.addEventListener('DOMContentLoaded', init);