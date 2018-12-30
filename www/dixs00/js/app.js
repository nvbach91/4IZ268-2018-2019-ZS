$(document).ready(function () {
    var topics = fetch('https://pure-chamber-44082.herokuapp.com/api/topics', {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(data => data.json())
        .then(data => {
            $("#loader").addClass("disabled");
            $("#loader").removeClass("loader");

            $('#topicDropdown').removeClass("disabled")
            $("#practiceButton").removeClass("disabled")
            data = JSON.parse(data);

            //TODO:default value for dropdown
            $.each(data, function (i) {
                var option = $(`<option>${ data[i] }</option>`)
                    .addClass("topic-item")
                    .appendTo(topicDropdown);
            });
        })

    /*Teprve na kliknuti se zavola dalsi pozadavek */
    $("#practiceButton").on("click", function () {
        var topicDropdown = document.getElementById("topicDropdown");
        var topicName = topicDropdown.options[topicDropdown.options.selectedIndex].text;
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
                    let ls = window.localStorage;
                    if (storageAvailable('localStorage')) {
                        /*TODO: kontroluj co už uživatel má a přidávej*/

                        /*check if localstorage has dix-application-data entry
                        and if not, create it and put data into it*/
                        var dad = ls.getItem("dix-application-data")
                        if (dad === null || dad === undefined || dad === "undefined") {
                            ls.setItem("dix-application-data", JSON.stringify(data));
                        }

                        /*Each word should have a property indicating how much it has been practiced already*/
                        var words = JSON.parse(ls.getItem("dix-application-data"));
                        var maximumLevel = 10;
                        ls.setItem("dix-application-data", words.forEach(element => {
                            if (element["difficultyCardStackNumber"] == undefined) {
                                element["difficultyCardStackNumber"] = 0;
                            }
                        }))

                        var questionText = "Nothing to show."
                        var answerText = "No answer."

                        function chooseNextWord(wordObjectArray) {
                            for (var i = 0; i < maximumLevel; i++) {
                                var arrayOfWordsAtGivenLevel = wordObjectArray.filter(word => word["difficultyCardStackNumber"] == i)

                                if (arrayOfWordsAtGivenLevel.length > 0) {
                                    const randomNumber = Math.floor(Math.random() * arrayOfWordsAtGivenLevel.length)
                                    const chosenWordObject = arrayOfWordsAtGivenLevel[randomNumber];
                                    return [
                                        Object.keys(chosenWordObject).filter(function (e) {return e != "difficultyCardStackNumber"})[0],
                                        chosenWordObject[questionText]
                                    ]
                                }
                            }
                        }
                        console.log("pozor", flashcard)
                        flashcard.className = "";
                        var questionAnswerArray = chooseNextWord(words);
                        var questionText = questionAnswerArray[0]
                        var answerText = questionAnswerArray[1]

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
    })

    var showAnswerButton = $("#show-answer");
    console.log(showAnswerButton)
    showAnswerButton.on("click", function () {
        if (!exists("answer")) {
            insertUniqueElement("div", answerText, flashcard, "answer");
            if ($("#answer").hasClass("disabled")) {
                $("#answer").removeClass("disabled");

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
        }
    })



})
















