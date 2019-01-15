/*

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var pole = [ [0], [1], [2], [3], [4], [5], [6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25] ]

var words = ['lightsaber','solo','vader','republic','vader'];
var unknown = new Array;
var chosenWord = getRandomWord();

var tabulka = new Array

function createTajenka(secret) {
    var result = "";
    for (var i = 0; i < secret.length; i++) {
        result += unknown[i];
    }
    $('#secret').text(result);
    $('#tip').val("");
}

function fillTajenka() {
    for (var i = 0; i < chosenWord.length; i++) {
        unknown[i] = "_ ";
    }
    createTajenka(unknown);
}

function getRandomWord(){
    var wordIndex =  Math.floor(Math.random() * words.length);
    console.log(words[wordIndex]);
    return words[wordIndex];
}

function guessWord(p) {
    $('#discovered').text("");
    if (chosenWord.match(p)) { //jake pismeno se nachazi v tejence
        var x = alphabet.indexOf(p);
        for (var i = 0; i < pole.length; i++) {
            for (var j = 0; j < pole[i].length; j++) {
                if (pole[i][j] == x) {
                    var xy = pole[i];

                }
            }
        }
        for (var i = 0; i < xy.length; i++) {
            for (var j = 0; j < chosenWord.length; j++){
                if (chosenWord[j] == alphabet[xy[i]]) {
                    unknown[j] = alphabet[xy[i]];
                }
                else {
                    if ([0][j] == p)
                        unknown[j] = p;
                }
            }
        }
        createTajenka(unknown);
    }
    else {
        $('#discovered').text("Wrong");
        $('#tip').val("");
    }


    }


$(function() {
    $('#tip').focus();
    fillTajenka();
    $('#tip').change(function() {
        guessWord($(this).val());
    });
});

*/

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var words = ['lightsaber','solo','vader','republic','vader'];
var unknown = [];
var chosenWord = getRandomWord();

var tries = 5;
var correct = 0;
var wrongCount = 0;

function rewrite() {
    $("#mistakes").text("Mistakes: " + wrongCount);
    $("#remaining").text("Remaining: " + (tries - wrongCount));
}

function getRandomWord() {
    $.ajax({
        type: "GET",
        url: 'randomWord.php',
        success: function(data){
            chosenWord = JSON.parse(data)["secret"];
        },
        error: function() {
            chosenWord = words[Math.floor(Math.random() * words.length)];
        },
        complete: function() {
            console.log("Chosen word: " + chosenWord);
            fillTajenka();
        }
    });
}

function createTajenka() {
    var result = "";

    for (var i = 0; i < unknown.length; i++) {
        result += unknown[i];
    }

    $('#secret').text(result);
    $('#tip').val("");
}

function fillTajenka() {
    for (var i = 0; i < chosenWord.length; i++) {
        unknown[i] = "_ ";
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

$(document).ready(function() {
    $('#tip').focus();
    $('#tip').change(function() {
        guessWord($(this).val());
    });
    rewrite();
});

