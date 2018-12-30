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