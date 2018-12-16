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
            var topicsList = $('#topics');

            $.each(data, function (i) {
                var li = $(`<li>${data[i]}</li>`)
                    .addClass("topic-item")
                    .appendTo(topicsList);
            });
            console.log(document.querySelector(".topic-item").innerHTML);

            /*Teprve na kliknuti se zavola dalsi pozadavek */
            $(".topic-item").on("click", function () {
                var topicName = this.innerHTML;
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
                             const element = data[i];
                             var li = $(`<li>${element}</li>`)
                             .addClass("vocab-item")
                             .appendTo(vocabList);
                             

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

