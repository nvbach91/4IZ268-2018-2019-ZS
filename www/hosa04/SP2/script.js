//button refresh p
$("#refresh-button").click(function () {
    resetElements();
}
);

//pushed entered letters to an array
function pushDataToArray() {
    var inputText = selectTip.val();
    if (inputText.length <= 0) return;
    inputText = inputText.toLowerCase();

    guessedLettersArr.push(inputText);
    selectTip.val("");

    console.log(guessedLettersArr);
}


//gets hang image based od mistakes
function getHangImage() {
    return ("hang" + wrongCount + ".png");
}

//changes the hang picture based on getHangImage
function changeHangImage() {
    $("#images-render").css("background-image", "url(hang_images/" + getHangImage() + ")");
}

//basic variables
var guessedLettersArr = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var offlineWords = ["bespin", "hoth", "coruscant", "naboo", "dagobah"];
var unknown = [];
var chosenWord = getRandomWord();
var tries = 10;
var correct = 0;
var wrongCount = 0;
var audio = new Audio("winner_music.mp3");
var selectTip = $("#tip-window");
var selectBody = $("body")


//updates mistakes + tries
function rewriteCounts() {
    $("#mistakes").text("Mistakes: " + wrongCount);
    $("#remaining").text("Remaining: " + (tries - wrongCount));
}


//resetovat jen individualni prvky
function resetElements() {
    guessedLettersArr = [];
    tries = 10;
    correct = 0;
    wrongCount = 0;
    rewriteCounts();
    getRandomWord();
    plantSpaces();
    selectTip.prop("disabled", false);
    audio.pause();
    selectBody.css("background-image", "url(https://nerdist.com/wp-content/uploads/2017/08/MinimalSWPoster002.jpg)");
    selectBody.css("background-size", "100%");
}

//refreshes the page
function refreshPage() {
    location.reload();
}

//deletes the page
function deletePage() {
    $("body").remove();
}

/*
function removeDivs() {
    selectTip.remove();
    $("#mistakes").remove();
    $("#remaining").remove();
    $("#secret").remove();
    $("#images-render").remove();
    $("#discovered").remove();
    $("#refresh-button").remove();
    $("#hint").remove();
    $("a").remove();
}*/

//alert when you win + repeat?
function winRepeatConfirmation() {
    var txt;
    if (confirm("YOU WON! :)" + "\n" + "Do you want to play again?")) {
        resetElements();
    }
    else {
        deletePage();
        audio.pause();
    }
}

//alert when you loose + repeat?
function looseRepeatConfirmation() {
    var txt;
    if (confirm("YOU LOOSE! :( " + "\n" + "Do you want to repeat?")) {
        resetElements();
    }
    else {
        deletePage();
    }
}

//clicking into guessing fild "tip"
$(document).ready(
    function () {
        selectTip.focus();
        selectTip.change(function () {
            guessWord($(this).val());
        });
        rewriteCounts();
    });

//chooses a random path for JSON to get planet name
function getRandomPlanet() {
    var planetUrlBase = "https://swapi.co/api/planets/";
    var planetUrlEnding = "/?format=json";
    var planetNumbersArr = [];

    for (var i = 1; i <= 61; i++) {
        planetNumbersArr.push(i);
    }

    var randomPlanetNumber = planetNumbersArr[Math.floor(Math.random() * planetNumbersArr.length)];

    return planetUrlBase + randomPlanetNumber + planetUrlEnding;



    /*var planet1 = "https://swapi.co/api/planets/1/?format=json";
    var planet2 = "https://swapi.co/api/planets/2/?format=json";
    var planet3 = "https://swapi.co/api/planets/13/?format=json";
    var planet4 = "https://swapi.co/api/planets/19/?format=json";
    var planet5 = "https://swapi.co/api/planets/29/?format=json";

    var planets = [planet1, planet2, planet3, planet4, planet5];

    var APIChosenPlanet = planets[Math.floor(Math.random() * planets.length)];
    return APIChosenPlanet;*/
}

//chooses planet name through JSON and puts it as chosenWord
function getRandomWord() {
    $.ajax({
        type: "GET",
        url: getRandomPlanet(),
        success: function (response) {

            chosenWord = response.name;
            chosenWord = chosenWord.toLowerCase();
        },
        error: function () {
            chosenWord = offlineWords[Math.floor(Math.random() * offlineWords.length)];
        },
        complete: function () {
            console.log("Chosen word: " + chosenWord);
            plantSpaces();

            //$("#hint").text("(" + chosenWord + ")");
        }
    });

}


function preparePlantingSpaces() {
    var result = "";

    for (var i = 0; i < unknown.length; i++) {
        result += unknown[i];
    }

    /*var result = unknown.join("");*/

    $("#secret").text(result);
}

//creates _ _ _ field according to the number of characters in chosenWord
function plantSpaces() {
    for (var i = 0; i < chosenWord.length; i++) {
        unknown[i] = " _ ";
    }

    preparePlantingSpaces();
}

//looks for reseblence of characters in entered character and chosenWord
function findIndexesOfOccurrencesOfLetterInWord(letter, str) {
    var occurrences = [];

    for (var i = 0; i < str.length; i++) {
        if (letter === str[i]) {
            occurrences.push(i);
        }
    }

    return occurrences;
}


//trying new guess words !MAIN FUNCTION!
function guessWord(p) {
    p = p.toLowerCase();
    var indexes = findIndexesOfOccurrencesOfLetterInWord(p, chosenWord);

    if (guessedLettersArr.includes(p)) {
        $("#discovered").text("Try different letter");
        return;
    }
    else {
        if (indexes.length) {
            $("#discovered").text("");

            for (var i = 0; i < indexes.length; i++) {
                unknown[indexes[i]] = p;
            }

            correct += indexes.length;
            preparePlantingSpaces();
        } else {
            wrongCount += 1;
            rewriteCounts();
            $("#discovered").text("Wrong");
        }



        //determination of game ending
        if (chosenWord.length == correct) {
            selectTip.val("You won!");
            selectTip.prop("disabled", true);
            audio.play();
            $("body").css("background-image", "url(https://thumbs.gfycat.com/DefiniteAridAnkole-small.gif)");
            $("body").css("background-size", "contain");
            setTimeout(winRepeatConfirmation, 10000);
        } else if ((tries - wrongCount) <= 0) {
            selectTip.val("You lose!");
            selectTip.prop("disabled", true);
            setTimeout(looseRepeatConfirmation, 1000);
        }
    }
    pushDataToArray();
    changeHangImage();
}