var alphabet = "abcdefghijklmnopqrstuvwxyz";
var words = ['bespin', 'hoth', 'coruscant', 'naboo', 'dagobah'];
var unknown = [];
var chosenWord = getRandomWord();

var tries = 15;
var correct = 0;
var wrongCount = 0;

function rewrite() {
    $("#mistakes").text("Mistakes: " + wrongCount);
    $("#remaining").text("Remaining: " + (tries - wrongCount));
}

function getRandomPlanet(){
    var planet1 = "https://swapi.co/api/planets/1/?format=json";
    var planet2 = "https://swapi.co/api/planets/2/?format=json";
    var planet3 = "https://swapi.co/api/planets/3/?format=json";
    var planets = [planet1, planet2, planet3]; 

    var APIChosenPlanet = planets[Math.floor(Math.random() * planets.length)];
    return APIChosenPlanet;
}

function getRandomWord() {
    $.ajax({
        type: "GET",
        url: getRandomPlanet(),
        success: function (response) {

            chosenWord = response.name;
            chosenWord = chosenWord.toLowerCase();
        },
        error: function () {
            chosenWord = words[Math.floor(Math.random() * words.length)];
        },
        complete: function () {
            console.log("Chosen word: " + chosenWord);
            fillTajenka();
        }
    });
}



function createTajenka() {
    /*var result = "";

    for (var i = 0; i < unknown.length; i++) {
        result += unknown[i];
    }*/

    var result = unknown.join("");

    $('#secret').text(result);
    $('#tip').val("");
}

function fillTajenka() {
    for (var i = 0; i < chosenWord.length; i++) {
        unknown[i] = " _ ";
    }

    createTajenka();
}

function findAllOccurrencesOfIn(letter, str) {
    var occurrences = [];

    for (var i = 0; i < str.length; i++) {
        if (letter == str[i]) {
            occurrences.push(i);
        }
    }

    return occurrences;
}

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

    if (chosenWord.length == correct) {
        $('#tip').val("You won!");
        $("#tip").prop('disabled', true);
    } else if ((tries - wrongCount) <= 0) {
        $('#tip').val("You lose!");
        $("#tip").prop('disabled', true);
    }
}

$(document).ready(function () {
    $('#tip').focus();
    $('#tip').change(function () {
        guessWord($(this).val());
    });
    rewrite();
});

