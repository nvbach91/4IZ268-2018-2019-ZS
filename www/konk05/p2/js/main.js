var textArea = document.querySelector('#text-area');
var htmlTimer = document.querySelector('#timer');
var textExample = document.querySelector('#example');
var resetButton = document.querySelector('#reset-button');
var speedScore = document.querySelector('#speed');
var mistakesScore = document.querySelector('#mistakes');
var accuracyScore = document.querySelector('#accuracy');
var interval;
var timerStarted = false;
var timer = htmlTimer.innerHTML;
var totalWords = 0;
var wordsPerMinute = 0;
var i = 0;
var accuracy = 0;
var welcomeText = 'Welcome to Typing Speed Test'; //text to animate

textArea.addEventListener('input', handleTextAreaInput, false);
resetButton.addEventListener('click', resetAll, false);
loadQuote();
window.onload = typeWriter();

function typeWriter() {
    if (i < welcomeText.length) {
        document.getElementById('intro').innerHTML += welcomeText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

function handleTextAreaInput() {
    if (textArea.value.length === 1 && !timerStarted) {
        interval = setInterval(startTimer, 1000);
        timerStarted = true;
    }
}

function startTimer() {
    if (timer > 0) {
        timer--;
    }
    else if (timer === 0) {
        document.getElementById('text-area').disabled = true;
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

function resetAll() {
    document.getElementById('text-area').disabled = false;
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

function countWords(str) {
    var wordsNumber = 0;
    var words = str.split(' ');
    for (var i = 0; i < words.length; i++) {
        if (words[i] !== '') {
            wordsNumber++;
        }
    }
    return wordsNumber;
}

function replaceIncorrectSymbols() {
    var str = textExample.innerHTML;
    var replace = str.replace("’", "'");
    textExample.innerHTML = replace;
}

function loadQuote() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://quotes.stormconsultancy.co.uk/quotes.json', true);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            result = JSON.parse(request.responseText);
            var randomQuote = result[Math.floor(Math.random() * result.length)];
            textExample.innerHTML = randomQuote.quote;
            replaceIncorrectSymbols();
        }
    };

    request.onerror = function () {
        textExample.innerHTML = 'Unable to load text. Please refresh the page';
    };

    request.send();
};