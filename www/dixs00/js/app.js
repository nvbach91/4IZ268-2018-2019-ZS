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
                                for (let i = 0; i < data.length; i++) {
                                    let pair = data[i];
                                    let term = pair[Object.keys(pair)[0]];
                                    let definition = Object.keys(pair)[0];
                                    ls.setItem(term, definition);
                                }
                                const wordsToPractice = Object.keys(ls);
                                ls.setItem("wordsToPractice", wordsToPractice);

                                var flashcard = document.getElementById("flashcard");
                                flashcard.className = "";

                                var questionText = ls.wordsToPractice.split(",")[0];
                                var answerText = ls[questionText];
                                console.log("bub");

                                function exists(id) {
                                    return document.getElementById(id) !== null
                                }

                                if (!exists("question")) {
                                    console.log("if fired");
                                    var prd = $(`<div>${ questionText }</div > `)
                                        .attr('id', 'question')
                                        .appendTo(flashcard)
                                }

                                if (!exists("show-answer")) {
                                    $(`<button>${ "Show answer" }</button>`)
                                        .attr('id', 'show-answer')
                                        .appendTo(flashcard)
                                }

                                /*When the user chooses to display the answer, he will press
                                "Show answer" and the answer will be displayed.
                                Then 3 buttons will be displayed. 
                                a) Forgot
                                b) Hard
                                c) OK
                                And now for the gameplay mechanic:
                                The user will have 3-5 "boxes". All the flashcards start in the first box.
                                Being in thix box indicates that the flashcard hasn't been practiced yet or 
                                has been forgotten. If the flashcard doesn't have this property yet, it will 
                                get it. Which requires you to save the pair under the pair name.
                                */
                                var showAnswerButton = $("#show-answer");

                                function appendElement(tag, name, target, id) {
                                    var element = $(`<` + tag + `> ${ name }</` + tag + `>`)
                                        .attr('id', id)
                                        .appendTo(target)
                                    return element
                                }

                                function setDifficultyCardStack(number) {
                                    /** Legend 
                                    0 = Forgot = move to previous box
                                    1 = Hard = stay in this box
                                    2 = Good = move to next box
                                    3 = Too easy = move 2 boxes forward 
                                    */
                                }
                                showAnswerButton.on("click", function () {
                                    if (!exists("answer")) {
                                        var answer = appendElement("div", answerText, flashcard, "answer");
                                        var forgot = appendElement("button", "Forgot", flashcard, "forgot");
                                        var hard = appendElement("button", "Hard", flashcard, "hard");
                                        var good = appendElement("button", "Good", flashcard, "good");
                                        var easy = appendElement("button", "Too easy", flashcard, "easy");





                                    }
                                })
                            } else {
                                alert("Your vocabulary shall not be stored, you will have to wait until the database is active and register as a user. Database launch date < March 2019")
                            }
                        }
                    )
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






