function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
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
        if (element.hasClass("disabled")) {
            element.removeClass("disabled")
        };
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
        if (typeof newData == "object") {
            newData = JSON.stringify(newData)
        }
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
    /*
Zdroj
https: //stackoverflow.com/questions/33510625/trim-white-spaces-in-both-object-key-and-value-recursively/33510710
*/
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : trimObj(obj[key]);
        return acc;
    }, Array.isArray(obj) ? [] : {});
}

function removeDuplicates(arrayOfObjects) {
    //zdroj: autor = Sebastian Dix
    var keys = new Array();
    for (var i = 0; i < arrayOfObjects.length; i++) {
        var wordObject = arrayOfObjects[i]
        var key = Object.keys(wordObject)[0]
        if (keys.indexOf(key) === -1) {
            keys.push(key)
        } else {
            for (var j = 0; j < arrayOfObjects.length; j++) {

                arrayOfObjects.splice(i, 1)

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

function toggleVisibility(element) {
    if (element.style.visibility == "hidden" || element.style.visibility == "") {
        element.style.visibility = "visible"
    } else {
        element.style.visibility = "hidden"
    }
}

function jqt() {
    $("header").toggle("visibility");
}

function randomizeDifficulty() {
    let v = vocab();
    let r = Math.floor(Math.random() * 11);
    v.forEach(element => element["difficultyCardStackNumber"] = Math.floor(Math.random() * 11))
    vocab(v)
    return vocab().map(e => e.difficultyCardStackNumber)
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function visibilityPracticeLevelArrays() {
    let max = 10;
    let v = vocab()
    //let object = new Object;
    let array = new Array;
    for (let i = 0; i < max; i++) {
        //object[i] = v.filter(e => e["difficultyCardStackNumber"] === i)
        array[i] = v.filter(word => word["difficultyCardStackNumber"] === i)
    }
    console.log(array)
}

function chooseNextWord(previousWord) {
    console.log(previousWord);
    let max = 10; //TODO: user should be able to set this up themselves
    let v = vocab()
    //let object = new Object;
    let array = new Array;
    for (let i = 0; i < max; i++) {
        //object[i] = v.filter(e => e["difficultyCardStackNumber"] === i)
        array[i] = v.filter(word => word["difficultyCardStackNumber"] === i)
    }
    //  console.log(vocab().map(e => e.difficultyCardStackNumber))

    let arrayOfCandidates = [];
    for (let i = 0; i < max; i++) {
        //console.log(i)
        const level = array[i]
        //console.log(level)
        if (level.length != 0) {
            let r = Math.floor(Math.random() * level.length);
            console.log("previousWord", previousWord)
            console.log("level[r]", level[r])
            if (previousWord != undefined && key(previousWord) == key(level[r])) {
                console.log("dve za sebou", i)
                for (let j = i + 1; j < max; j++) {
                    console.log(j)
                    const newLevel = array[j]
                    console.log(newLevel)
                    if (newLevel.length != 0) {
                        let r = Math.floor(Math.random() * level.length);
                        console.log("jasny", newLevel[r])
                        return newLevel[r];
                    }
                }
            }
            return level[r];

            /*for (let j = 0; j < level.length; j++) {
                let word = array[i][j];
                if (word != previousWord) {
                    if (word != undefined) {
                        return word;
                    } else {
                        alert("No words to practice!")
                    }
                }
            }*/

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
    let practiceLevelChange = difficultyMap[difficulty]
    let practiceLevel = term["difficultyCardStackNumber"];
    newPracticeLevel = practiceLevel + practiceLevelChange;
    if (newPracticeLevel < 0) newPracticeLevel = 0;

    let v = vocab();
    let index = findIndexOfWord(question);

    v[index]["difficultyCardStackNumber"] = newPracticeLevel;
    vocab(v);
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

    $("#forgot").css("visibility", "hidden")
    $("#hard").css("visibility", "hidden")
    $("#good").css("visibility", "hidden")
    $("#easy").css("visibility", "hidden")
    $("#answer").css("visibility", "hidden")


    $("#question").text(key(
        chooseNextWord(findTerm(question))
    ));

    vocabularyDashboard();
    dashboardConditionalFormatting();

}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */


function vocabularyDashboard() {
    $("#map").remove()
    let v = vocab();

    let virtualMap = $('<ul></ul>')
        .attr("id", "map")

    v.forEach(wordObject => {
        let wordTitle = key(wordObject);
        let practiceLevel = wordObject.difficultyCardStackNumber;
        let item = document.createElement("li");
        item.classList.add("mapItem");
        item.setAttribute("data-practiceLevel", practiceLevel)
        item.innerText = wordTitle;
        item.style.order = practiceLevel + 1;
        item.title = wordTitle;
        virtualMap.append(item); //tohle se prekresluje tolikrat, kolikrat se appenduje
    });
    console.log(virtualMap[0])
    $("#appContainerOne").append(virtualMap);

}


function colorScaleArray(numberOfLevels) {
    let color = window.w3color;
    if (!numberOfLevels) {
        numberOfLevels = 10
    }
    numberOfLevels = 10;
    let c = new color("hwb(151, 34%, 27%)")
    let colorArray = [];
    for (let i = 1; i < numberOfLevels; i++) {
        let whitenessToAdd = (1 - c.whiteness) / (numberOfLevels - i)
        let blacknessToSubtract = (c.blackness) / (numberOfLevels - i)
        c.whiteness = c.whiteness + whitenessToAdd;
        c.blackness = c.blackness - blacknessToSubtract;
        c = new color(`hwb(151,${c.whiteness},${c.blackness})`);
        colorArray.push(c.toHexString());
    }
    return colorArray;
}

function reverseColorScaleArray(numberOfLevels) {
    let color = window.w3color;
    if (!numberOfLevels) {
        numberOfLevels = 10
    }
    numberOfLevels = 10;
    let c = new color("hwb(151, 34%, 27%)")
    let colorArray = [];
    for (let i = 1; i < numberOfLevels; i++) {
        let whitenessToAdd = (1 - c.whiteness) / (numberOfLevels - i)
        let blacknessToSubtract = (c.blackness) / (numberOfLevels - i)
        c.whiteness = c.whiteness + whitenessToAdd;
        c.blackness = c.blackness - blacknessToSubtract;
        c = new color(`hwb(151,${c.whiteness},${c.blackness})`);
        colorArray.unshift(c.toHexString());
    }
    return colorArray;
}

function dashboardConditionalFormatting() {
    let dashboard = document.getElementsByClassName("mapItem")
    var colorMap = reverseColorScaleArray();
    for (let i = 0; i < dashboard.length; i++) {
        const listItem = dashboard[i];
        const practiceLevel = listItem.getAttribute("data-practiceLevel")
        listItem.style.backgroundColor = colorMap[practiceLevel]
    }
}


function createTenShadedDivs(numberOfLevels) {
    let color = window.w3color;
    if (!numberOfLevels) {
        numberOfLevels = 10
    }
    numberOfLevels = 10;
    let c = new color("hwb(151, 34%, 27%)")
    var header = document.getElementsByTagName("header")[0];
    console.log(header)
    for (let i = 1; i < numberOfLevels; i++) {
        let d = document.createElement("div");
        d.innerText = Math.random();
        let whitenessToAdd = (1 - c.whiteness) / (numberOfLevels - i)
        let blacknessToSubtract = (c.blackness) / (numberOfLevels - i)
        c.whiteness = c.whiteness + whitenessToAdd;
        c.blackness = c.blackness - blacknessToSubtract;
        c = new color(`hwb(151,${c.whiteness},${c.blackness})`);
        d.style.backgroundColor = c.toHexString();
        header.appendChild(d)
    }
}



function generateSettings() {}








/*arrayOfObjects = arrayOfObjects.filter((thing, index, self) =>
index === self.findIndex((t) => (
t.place === thing.place && t.name === thing.name
))
)*/