function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === max14 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

function exists(id) {
    return document.getElementById(id) !== null
}

function insertUniqueElement(tag, name, target, id) {
    var element;
    if (!exists(id)) {
        /*function insertUniqueElement = simplifies the appending of elements in jQuery to a single line*/
        element = $(`<` + tag + `> ${ name }</` + tag + `>`)
            .attr('id', id)
            .appendTo(target)

        return element;
    } else {
        element = $('#' + id);
        if (element.hasClass("disabled")) {element.removeClass("disabled")};
        return element;
    }
}

function vocab(newData) {
    /*function vocab(newData) = this function either returns the value from local storage which matches
    the key 'dix-application-data' OR, if a argument is passed, sets the data*/
    var ls = window.localStorage;
    if (newData == undefined) {

        let applicationData = ls.getItem("dix-application-data");
        if (applicationData != null) {
            return JSON.parse(applicationData);
        } else {
            alert("No 'dix-application-data' item in local storage");
            throw "No 'dix-application-data' item in local storage"
        }
    } else {
        if (typeof newData == "object") {newData = JSON.stringify(newData)}
        ls.setItem("dix-application-data", newData)
    }
}

function changeLevelOfPractice(termName, button) {
    /*function changeLevelOfPractice: This function takes
    the current word being practiced and moves it
    up or down the practicing queue based on which button is pressed*/
    var buttonMap = {
        "forgot": -1,
        "hard": 0,
        "good": 1,
        "easy": 2,
    }

    var voc = vocab();

    const index = voc.findIndex(function (element) {
        var index = Object.keys(element)[0];
        if (index === -1 || index === undefined) {
            alert("Cannot change difficulty of word, it is not in the vocabulary!");
        }

        return index === termName;
    });

    if (voc[index]["difficultyCardStackNumber"] === undefined) {
        voc[index]["difficultyCardStackNumber"] = 0;
    }

    if (voc[index]["difficultyCardStackNumber"] < 0) {
        voc[index]["difficultyCardStackNumber"] = 0;
    }

    if (voc[index]["difficultyCardStackNumber"] > max) {
        voc[index]["difficultyCardStackNumber"] = max;
    }

    voc[index]["difficultyCardStackNumber"] = voc[index]["difficultyCardStackNumber"] + buttonMap[button];
    vocab(JSON.stringify(voc));
}

function trimObj(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : trimObj(obj[key]);
        return acc;
    }, Array.isArray(obj) ? [] : {});
}

function removeDuplicates(arrayOfObjects) {
    var keys = new Array();
    for (var i = 0; i < arrayOfObjects.length; i++) {
        var wordObject = arrayOfObjects[i]
        var key = Object.keys(wordObject)[0]
        if (keys.indexOf(key) == -1) {keys.push(key)} else {
            for (var j = 0; j < arrayOfObjects.length; j++) {
                if (arrayOfObjects[i][key] != undefined) {
                    arrayOfObjects.splice(i, 1)
                }
            }
        }
    }
}

function findTermByAnswer(word) {
    var vocabulary = vocab();
    return vocabulary.filter(o => o[Object.keys(o)[0]] === word)[0]
}

function findTerm(word) {
    var vocabulary = vocab();
    return vocabulary.filter(o => Object.keys(o)[0] === word)[0]
}

function td(w, d) {
    var r = JSON.stringify(findTerm(w))
    changeLevelOfPractice(w, d)
    return r;
}

function randomizeDifficulty() {
    let v = vocab();
    let r = Math.floor(Math.random() * 11);
    v.forEach(element => element["difficultyCardStackNumber"] = Math.floor(Math.random() * 11))
    vocab(v)
    return vocab().map(e => e.difficultyCardStackNumber)
}

function chooseNextWord() {
    let max = 10;
    let v = vocab()
    let object = new Object;
    let array = new Array;
    for (var i = 0; i < max; i++) {
        //object[i] = v.filter(e => e["difficultyCardStackNumber"] === i)
        array[i] = v.filter(word => word["difficultyCardStackNumber"] === i)
    }

    shuffleArray(array)

    for (var i = 0; i < max; i++) {
        if (array[i].length != 0) {
            for (var j = 0; j < array[i].length; j++) {
                var word = array[i][j];
                if (word != undefined) {
                    return word;
                } else {
                    alert("No words to practice!")
                }
            }

        }
    }

}


function key(object) {
    return Object.keys(object)[0];
}

function changeDifficulty(question, difficulty) {
    let term = findTerm(question)
    var difficultyMap = {
        "forgot": -1,
        "hard": 0,
        "good": 1,
        "easy": 2
    }
    let numberToAddToDifficulty = difficultyMap[difficulty]
    let dif = term["difficultyCardStackNumber"];
    dif = dif + numberToAddToDifficulty;
    if (dif > -1) {
        let v = vocab();
        let index = findIndexOfWord(question);
        v[index]["difficultyCardStackNumber"] = dif;
        vocab(v);
    }
}

function findIndexOfWord(word) {
    let v = vocab();

    function isWord(object) {
        return key(object) === word
    }

    return v.findIndex(isWord);

}

function findAnswer(question) {
    return findTerm(question)[question];
}

function answer(question, difficulty) {
    changeDifficulty(question, difficulty)

    $("#forgot").css("display", "none")
    $("#hard").css("display", "none")
    $("#good").css("display", "none")
    $("#easy").css("display", "none")
    $("#answer").css("display", "none")

    $("#question").text(key(chooseNextWord()));
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}




/*arrayOfObjects = arrayOfObjects.filter((thing, index, self) =>
index === self.findIndex((t) => (
t.place === thing.place && t.name === thing.name
))
)*/
