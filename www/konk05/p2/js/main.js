var textArea = document.querySelector('#text-area');
var htmlTimer = document.querySelector('#timer');
var textExample = document.querySelector('#example');
var resetButton = document.querySelector('#reset-button');
var speedScore = document.querySelector('#speed');
var mistakesScore = document.querySelector('#mistakes');
var accuracyScore = document.querySelector('#accuracy');
var animatedText = document.querySelector('#intro');
var timerStarted = false;
var timer = htmlTimer.innerHTML;

textArea.addEventListener('input', handleTextAreaInput);
resetButton.addEventListener('click', resetAll, false);

function countWords(str) {
    return str.split(' ').length;
}

function countMistakes() {
    var mistakesDone = 0;
    var typedText = textArea.value.split(' ');
    var sample = textExample.innerHTML.split(' ');
    for (var i = 0; i < typedText.length; i++) {
        if (typedText[i] !== sample[i]) {
            mistakesDone++;
        }
    }
    return mistakesDone;
}

var char = 0;
function typeWriter() {
    var welcomeText = 'Welcome to Typing Speed Test'; //text to animate
    if (char < welcomeText.length) {
        animatedText.innerHTML += welcomeText.charAt(char);
        char++;
        setTimeout(typeWriter, 100);
    }
}

function startTimer() {
    if (timer > 0) {
        timer--;
    }
    else if (timer === 0) {
        textArea.disabled = true;
        totalWords = countWords(textArea.value);
        mistakesDone = countMistakes();
        wordsPerMinute = totalWords * 6;
        accuracy = ((totalWords - mistakesDone) / totalWords) * 100;
        speedScore.innerHTML = 'Speed: ' + wordsPerMinute + ' WPM';
        mistakesScore.innerHTML = 'Mistakes: ' + mistakesDone;
        accuracyScore.innerHTML = 'Accuracy: ' + accuracy.toFixed() + '%';
    }
    htmlTimer.innerHTML = timer;
}

function handleTextAreaInput() {
    if (textArea.value.length === 1 && !timerStarted) {
        interval = setInterval(startTimer, 1000);
        timerStarted = true;
    }
}

function loadQuote() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.icndb.com/jokes/random?exclude=[explicit]', true);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            result = JSON.parse(request.responseText);
            textExample.innerHTML = result.value.joke;
        }
    };
    request.onerror = function () {
        textExample.innerHTML = 'Unable to load text. Please refresh the page';
    };
    request.send();
};

function resetAll() {
    textArea.disabled = false;
    clearInterval(interval);
    timerStarted = false;
    timer = 10;
    mistakesDone = 0;
    totalWords = 0;
    accuracy = 0;
    wordsPerMinute = 0;
    htmlTimer.innerHTML = '10';
    speedScore.innerHTML = 'Speed: 0 WPM';
    mistakesScore.innerHTML = 'Mistakes: 0';
    accuracyScore.innerHTML = 'Accuracy: 0%';
    textArea.value = '';
    loadQuote();
}

loadQuote();
window.onload = typeWriter;