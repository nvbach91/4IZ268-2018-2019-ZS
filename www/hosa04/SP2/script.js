//testing functions
function imageChange(){
    $('#images-render').css("background-color","blue");
}


//basic variables
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var offlineWords = ['bespin', 'hoth', 'coruscant', 'naboo', 'dagobah'];
var unknown = [];
var chosenWord = getRandomWord();

var tries = 15;
var correct = 0;
var wrongCount = 0;


//updates mistakes + tries
function rewrite() {
    $("#mistakes").text("Mistakes: " + wrongCount);
    $("#remaining").text("Remaining: " + (tries - wrongCount));
}

//refreshes the page
function refreshPage() {
    location.reload();
}

//deletes the page
function deletePage() {
    $("body").remove();
}

//alert when you win + repeat?
function winRepeatConfirmation() {
    var txt;
    if (confirm("YOU WON! :)" +"\n"+ "Do you want to play again?")) {
        refreshPage()
    }
    else {
        deletePage();
    }
}

//alert when you loose + repeat?
function looseRepeatConfirmation() {
    var txt;
    if (confirm("YOU LOOSE! :( " +"\n"+ "Do you want to repeat?")) {
        refreshPage();
    }
    else {
        deletePage();
    }
}

//clicking into guessing fild "tip"
$(document).ready(
    function () {
    $('#tip').focus();
    $('#tip').change(function () {
        guessWord($(this).val());
    });
    rewrite();
});

//chooses a random path for JSON to get planet name
function getRandomPlanet() {
    var planet1 = "https://swapi.co/api/planets/1/?format=json";
    var planet2 = "https://swapi.co/api/planets/2/?format=json";
    var planet3 = "https://swapi.co/api/planets/13/?format=json";
    var planet4 = "https://swapi.co/api/planets/19/?format=json";
    var planet5 = "https://swapi.co/api/planets/29/?format=json";
    var planets = [planet1, planet2, planet3, planet4, planet5];

    var APIChosenPlanet = planets[Math.floor(Math.random() * planets.length)];
    return APIChosenPlanet;
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
            fillTajenka();

            $('#hint').text("(Word is: " + chosenWord + ")");
        }
    });

}


function createTajenka() {
    var result = "";

    for (var i = 0; i < unknown.length; i++) {
        result += unknown[i];
    }

    /*var result = unknown.join("");*/

    $('#secret').text(result);
    $('#tip').val("");
}

//creates _ _ _ field according to the number of characters in chosenWord
function fillTajenka() {
    for (var i = 0; i < chosenWord.length; i++) {
        unknown[i] = " _ ";
    }

    createTajenka();
}

//looks for reseblence of characters in entered character and chosenWord
function findAllOccurrencesOfIn(letter, str) {
    var occurrences = [];

    for (var i = 0; i < str.length; i++) {
        if (letter == str[i]) {
            occurrences.push(i);
        }
    }

    return occurrences;
}


//trying new guess words
function guessWord(p) {
    p = p.toLowerCase();
    var indexes = findAllOccurrencesOfIn(p, chosenWord);

    if (indexes.length > 0) {
        $('#discovered').text("");

        for (var i = 0; i < indexes.length; i++) {
            unknown[indexes[i]] = p;
        }

        correct += indexes.length;
        createTajenka();
    } else {
        wrongCount += 1;
        rewrite();
        $('#discovered').text("Wrong");
    }

    $('#tip').val("");

//determination of game ending
    if (chosenWord.length == correct) {
        $('#tip').val("You won!");
        $("#tip").prop('disabled', true);
        setTimeout(winRepeatConfirmation, 2000);
    } else if ((tries - wrongCount) <= 0) {
        $('#tip').val("You lose!");
        $("#tip").prop('disabled', true);
        setTimeout(looseRepeatConfirmation, 2000);
    }
}