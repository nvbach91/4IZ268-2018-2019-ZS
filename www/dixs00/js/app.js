$(document).ready(function () {
    var topics = fetch('https://pure-chamber-44082.herokuapp.com/api/topics', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(data => data.json())
        .then(data => {
            $("#loader").hide();
            $("#loader2").hide();
            $('#topicDropdown').show();
            $("#practiceButton").show();

            data = JSON.parse(data);

            //TODO:default value for dropdown
            $.each(data, function (i) {
                var option = $(`<option>${ data[i] }</option>`)
                    .addClass("topic-item")
                    .appendTo(topicDropdown);
            });
        })

    /*Teprve na kliknuti se zavola dalsi pozadavek */
    $("#practiceButton").unbind().on("click", function () {

        $("#loader2").show();
        var topicDropdown = document.getElementById("topicDropdown");
        var topicName = topicDropdown.options[topicDropdown.options.selectedIndex].text;
        fetch('https://pure-chamber-44082.herokuapp.com/api/topics/' + topicName + '/vocab', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(data => data.json()).then(
            data => {
                $("#loader2").hide();
                data = JSON.parse(data);
                let ls = window.localStorage;

                if (!storageAvailable('localStorage')) {
                    alert("Local storage is not available on your machine! Please wait until March 2019 for" +
                        "database, until then, use a different or more modern browser or enable local storage.")
                    $("*").hide();

                }

                /*TODO: kontroluj co už uživatel má a přidávej*/
                let dad = ls.getItem("dix-application-data");
                if (dad === null || dad === undefined) {
                    /*
                     **check if localstorage has dix-application-data entry
                     **and if not, create it and put data into it
                     */
                    data = trimObj(data) //remove trailing spaces
                    removeDuplicates(data) // remove duplicate words
                    ls.setItem("dix-application-data", JSON.stringify(data));
                } else {
                    data = trimObj(data) //remove trailing spaces
                    removeDuplicates(data) // remove duplicate words
                    //here we will check if there are any changes
                    let wordNamesInLocalStorage = vocab().map(e => e[Object.keys(e)[0]]);
                    let newWordNames = data.map(e => e[Object.keys(e)[0]]);

                    if (JSON.stringify(wordNamesInLocalStorage) == JSON.stringify(newWordNames)) {
                        console.log("no new words added")
                        /**
                         * If the words we are trying to add are exactly the same as the words we already have,
                         * then nothing needs to be done.
                         */

                    } else {
                        /**
                         * If the words we are trying to add are not exactly the same as the words we already have,
                         * then we need to add those which are different from those we already have in our local storage vocabulary.
                         */
                        let wordsCurrentlyInLocalStorage = vocab().map(e => e[Object.keys(e)[0]]);
                        let newWordNames = data.map(e => e[Object.keys(e)[0]]);
                        let vo = vocab();
                        let duplicates = new Array();
                        for (let i = 0; i < wordsCurrentlyInLocalStorage.length; i++) {
                            const oldWord = wordsCurrentlyInLocalStorage[i]
                            for (let j = 0; j < newWordNames.length; j++) {
                                const newWord = newWordNames[j];
                                if (oldWord == newWord) {
                                    duplicates.push(newWord);
                                }

                            }
                        }

                        if (duplicates.length == 0) {
                            for (let i = 0; i < data.length; i++) {
                                const newWord = data[i];
                                newWord["difficultyCardStackNumber"] = 0;
                                vo.push(newWord);
                            }
                        }


                        for (let i = 0; i < duplicates.length; i++) {
                            const duplicate = Array[i];
                            for (let j = 0; j < newWordNames.length; j++) {
                                const newWord = newWordNames[j];
                                if (newWord != duplicate) {
                                    let wordsToAdd = data.filter(e => key(e) == newWord)
                                    if (wordsToAdd.length != 0) {
                                        vo.push(wordsToAdd);
                                    }
                                }
                            }
                        }
                        //add new words we don't already have in our localstorage into localstorage
                        vocab(vo);
                    }
                }

                /*Each word should have a property indicating how much it has been practiced already*/
                var words = JSON.parse(ls.getItem("dix-application-data"));
                words.forEach(element => {
                    if (element["difficultyCardStackNumber"] == undefined) {
                        element["difficultyCardStackNumber"] = 0;
                    }
                })

                ls.setItem("dix-application-data", JSON.stringify(words));

                //displays the flashcard
                $("#flashcard").css("display", "flex")
                $("#flashcard").removeClass("disabled").addClass("flexColumn")
                $("#question").text(key(chooseNextWord()))
                $("#question").show();
                $("#show-answer").show();
                vocabularyDashboard()
                dashboardConditionalFormatting();
            })

    }) //end of practice button on click

    /*adds functions to buttons which change the difficulty of the given words*/
    $("#forgot").hide().unbind().on("click", function () {
        answer($("#question").text(), "forgot")
    })
    $("#hard").hide().unbind().on("click", function () {
        answer($("#question").text(), "hard")
    })
    $("#easy").hide().unbind().on("click", function () {
        answer($("#question").text(), "easy")
    })
    $("#good").hide().unbind().on("click", function () {
        answer($("#question").text(), "good")
    })
    $("#show-answer").on("click", function () {
        let ans = findAnswer($("#question").text());
        $("#answer").text(ans).show();
        $("#forgot").show()
        $("#hard").show()
        $("#easy").show()
        $("#good").show()
    })
})