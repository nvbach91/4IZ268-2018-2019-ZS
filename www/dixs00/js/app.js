$(document).ready(function(){
    var topics = fetch('https://pure-chamber-44082.herokuapp.com/api/topics',{  mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }})
        .then(data => data.json())  
        .then(data => {
            data = JSON.parse(data);
        var topicsEl = $('#topics');
    
        $.each(data, function(i){
            var li = $(`<li>${data[i]}</li>`)
                .addClass("topic-item")
                .appendTo(topicsEl);
        });
        console.log(document.querySelector(".topic-item").innerHTML);
    })

    $(".topic-item").on("click",function() {
        console.log(document.querySelector(".topic-item").innerHTML);
        console.log($(this).innerHTML);
        // Vytahnout na co jsem kliknul
        // Zeditujes URL tak ze na konec pridas topic na ktery jsi klikl napr https://pure-chamber-44082.herokuapp.com/api/topics/nature/vocab
        var vocab = fetch('https://pure-chamber-44082.herokuapp.com/api/topics/work/vocab',{  mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }})
        .then(data => data.json())
        .then(data => {
            data = JSON.parse(data);
            console.log(data)

        var vocabEl = $('#vocab');
    
        $.each(data, function(i){
            var li = $(`<li>${data[i]}</li>`)
                .addClass('vocab-item')
                .appendTo(vocabEl);
        });
    })
    })

    
})

