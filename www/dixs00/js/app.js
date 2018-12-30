/*

Plan for app:

- it is basically like a presentation
- I see the prompt, I click and then the application shows me the correct answer and I rate how well I knew it
- the app then puts this word into another box, like another level of knowledge, into local storage
- when I finish the first box, it prompts me for the translation again, but it only uses cards in the second box
- the same can happen many times, I can let the user torture themselves with 8 boxes, it doesn't matter

more sepcific plan

so obviously a big "flashcard" which will be sourced from the API-imported list of words

on click - it will show the correct answer and display three buttons -
 - Hard
 - OK
 - Too easy

 if it ishard, it will go back to the preevious box

 // flag "harded" bych asi tady nedelal, nejdriv proste predesly box a budouci box
 Každé slovíčko je Object, ktery v sobe ma indikator úrovně procvičení.
Taky má flag "harded". Tzn. Tlacitko hard jenom da "harded" = truea
estw nepremisti do predesleho boxiku, pak kdyz da ok tak to presune
do dalsiho boxu a pokud to bylo harded tak to vymaze na false.
Pokud hardne student jiz jednoz hardnute slovo, putuje do predesleho boxu.

Jakmile dosahne x+1. boxu, brainu, tak

          Addneš event listener k jednotlivým kartičkám, které je otočí.
                                Do nějakýho session storage si uložíš aktuálně procvičovanou kartičku, stačí index
                                a pak z vocab listu vybíráš nth child a dáš display: něco
                                a zbytek bude display: none

                                navíc musíš z toho "append to" udělat spíš toggle funkci, že se to vypíše a pak zase schová

                                musíš taky nastylovat ty kartičky



*/


$(document).ready(function () {
    var topics = fetch('https://pure-chamber-44082.herokuapp.com/api/topics', {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(data => data.json())
        .then(data => {
            data = JSON.parse(data);
            var topicDropdown = $('#topicDropdown');

            //TODO:default value for dropdown
            $.each(data, function (i) {
                var option = $(`<option>${ data[i] }</option>`)
                    .addClass("topic-item")
                    .appendTo(topicDropdown);
            });

            /*Teprve na kliknuti se zavola dalsi pozadavek */
            $("#practiceButton").on("click", function () {
                var e = document.getElementById("topicDropdown");
                var selectedOptionIndex = e.options.selectedIndex;
                var selectedOptionText = e.options[selectedOptionIndex].text;
                var topicName = selectedOptionText;
                var vocab = fetch('https://pure-chamber-44082.herokuapp.com/api/topics/' + topicName + '/vocab', {
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(data => data.json())
                    .then(
                        data => {
                            data = JSON.parse(data);
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
                            let ls = window.localStorage;
                            if (storageAvailable('localStorage')) {
                                /*TODO: kontroluj co už uživatel má a přidávej*/
                                if (ls.getItem("dix-application-data") === null) {
                                    ls.setItem("dix-application-data", JSON.stringify(data));
                                }

                                function exists(id) {
                                    return document.getElementById(id) !== null
                                }
                                var questionText = "Nothing to show."
                                var answerText = "No answer."
                                var words = JSON.parse(ls.getItem("dix-application-data"));
                                var maximumLevel = 10;
                                ls.setItem("dix-application-data", words.forEach(element => {
                                    if (element["difficultyCardStackNumber"] == undefined) {
                                        element["difficultyCardStackNumber"] = 0;
                                        console.log("each word should have diffcsn according to this")
                                    }
                                }))

                                function chooseNextWord() {
                                    for (var i = 0; i < maximumLevel; i++) {
                                        var arrayOfWordsAtGivenLevel = words.filter(word => word["difficultyCardStackNumber"] == i)

                                        if (arrayOfWordsAtGivenLevel.length > 0) {
                                            const randomNumber = Math.floor(Math.random() * arrayOfWordsAtGivenLevel.length)
                                            const chosenWordObject = arrayOfWordsAtGivenLevel[randomNumber];
                                            questionText = Object.keys(chosenWordObject).filter(function (e) {return e != "difficultyCardStackNumber"})[0]
                                            answerText = chosenWordObject[questionText]
                                            break
                                        }
                                    }
                                    console.log("chooseNextWord Function fired", questionText, answerText);

                                }

                                flashcard.className = "";



                                if (!exists("question")) {
                                    $(`<div>${ questionText }</div > `)
                                        .attr('id', 'question')
                                        .appendTo(flashcard)
                                }

                                if (!exists("show-answer")) {
                                    $(`<button>${ "Show answer" }</button>`)
                                        .attr('id', 'show-answer')
                                        .appendTo(flashcard)
                                }



                            }


                        }

                    )

                var showAnswerButton = $("#show-answer");
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

                showAnswerButton.on("click", function () {
                    if ((exists("answer") && $("#answer").hasClass("disabled")) || !exists("answer")) {
                        if (exists("answer") && $("#answer").hasClass("disabled")) {
                            $("#answer").removeClass("disabled");
                        }
                        var answer = insertUniqueElement("div", answerText, flashcard, "answer");
                        var forgot = insertUniqueElement("button", "Forgot", flashcard, "forgot");
                        var hard = insertUniqueElement("button", "Hard", flashcard, "hard");
                        var good = insertUniqueElement("button", "Good", flashcard, "good");
                        var easy = insertUniqueElement("button", "Too easy", flashcard, "easy");

                        [forgot, hard, good, easy].forEach(button => button.on("click", function () {
                            [forgot, hard, good, easy].forEach(button => button.addClass("disabled"));
                            var practicedTerm = document.getElementById("question").innerText;
                            changeLevelOfPractice(practicedTerm, button.attr('id'));
                            chooseNextWord();
                            document.getElementById("question").innerText = questionText;
                            $("#answer").addClass("disabled");
                        }))

                    }
                })
            }
            )
        })
})









/*
            //     $(".topic-item").on("click",function() {
            //         console.log(document.querySelector(".topic-item").innerHTML);
            //         console.log($(this).innerHTML);

            //         var vocab = fetch('https://pure-chamber-44082.herokuapp.com/api/topics/work/vocab',{  mode: 'cors',
            //         headers: {
            //           'Access-Control-Allow-Origin':'*'
            //         }})
            //         .then(data => data.json())
            //         .then(data => {
            //             data = JSON.parse(data);
            //             console.log(data)

            //         var vocabEl = $('#vocab');

            //         $.each(data, function(i){
            //             var li = $(`< li > ${data[i]}</li > `)
            //                 .addClass('vocab-item')
            //                 .appendTo(vocabEl);
            //         });
            //     })
            //     })
            //     )
            */






