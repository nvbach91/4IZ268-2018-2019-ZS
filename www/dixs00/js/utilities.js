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
            e.code === 1014 ||
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
    if (newData == undefined) {
        let applicationData = JSON.parse(ls.getItem("dix-application-data"));
        if (applicationData != null) {
            return applicationData;
        } else {
            alert("No 'dix-application-data' item in local storage");
            throw "No 'dix-application-data' item in local storage"
        }
    } else {
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
        return Object.keys(element)[0] === termName;
    });

    if (voc[index]["difficultyCardStackNumber"] === undefined) {
        voc[index]["difficultyCardStackNumber"] = 0;
    }

    if (voc[index]["difficultyCardStackNumber"] < 0) {
        voc[index]["difficultyCardStackNumber"] = 0;
    }

    if (voc[index]["difficultyCardStackNumber"] > 10) {
        voc[index]["difficultyCardStackNumber"] = 10;
    }

    voc[index]["difficultyCardStackNumber"] = voc[index]["difficultyCardStackNumber"] + buttonMap[button];
    vocab(JSON.stringify(voc));
}