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
                console.log("button clicked")
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
                            vocabList = $("#vocab");

                            for (let i = 0; i < data.length; i++) {
                                const pair = data[i];
                                let word = pair[Object.keys(pair)[0]];
                                var li = $(`<li>${ word }</li>`)
                                    .addClass("vocab-item")
                                    .appendTo(vocabList);

                                /* Addneš event listener k jednotlivým kartičkám, které je otočí. 
                                Do nějakýho session storage si uložíš aktuálně procvičovanou kartičku, stačí index
                                a pak z vocab listu vybíráš nth child a dáš display: něco
                                a zbytek bude display: none
                                
                                navíc musíš z toho "append to" udělat spíš toggle funkci, že se to vypíše a pak zase schová
                                
                                musíš taky nastylovat ty kartičky
                                */
                            }
                        }

                    )
            })

        })
})
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
//             var li = $(`<li>${data[i]}</li>`)
//                 .addClass('vocab-item')
//                 .appendTo(vocabEl);
//         });
//     })
//     })
//     )


// })

