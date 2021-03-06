var points = 0;
var cities = ['Barcelona', 'Dortmund', 'Madrid', 'Turin', 'Prague', 'New York', 'Paris', 'London', 'Beijing', 'Moscow'];
var firstSelect = null;
var firstSelectId = null;
var moves = 0;

// jQuery není dobře reaktivní na změny, dovolil jsem se to řešit takhle, normálně bych odebral třídu `js-playable`, ale tím si nepomohu
var resolved = [];

async function wait() {
    return new Promise(function(resolve) {
      setTimeout(resolve, 1000);
  });
}

cities = cities.concat(cities);
cities.sort(function() { return .5 - Math.random(); });

function editPoints(change){
    if((change > 0) || (points > 0)){
        points+=change;
    } else {
        points = 0;
    }
}

$(document).ready(function(){
    const pexesoPoints = $('#js-points');
    const pexesoBoard = $('#js-pexeso');
    const pexesoCard = '.js-playable';

    pexesoPoints.text(points);

    $.each(cities, function(index, value){
        pexesoBoard.append(`<div data-id="${index}" class="pexeso__card pexeso__card--playing js-playable"></div>`)
    });

    $(pexesoCard).on("click", async function(){
        moves++;
        if(moves<=2){

        let currentCard = $(this);
        let currentCardId = currentCard.data("id");

        currentCard.addClass('pexeso__card--selected').removeClass('pexeso__card--playing');
        currentCard.text(cities[currentCardId]);
        
        if(!resolved.includes(currentCardId)){
        if(firstSelect === null){
            firstSelect = currentCard;
            firstSelectId = currentCardId;
        } else if((currentCardId !== firstSelectId)) {
            if(firstSelect.text() === currentCard.text()){
                firstSelect.addClass('pexeso__card--active');
                currentCard.addClass('pexeso__card--active');

                resolved.push(firstSelectId, currentCardId);
                
                editPoints(1);
            } else {
                await wait();
                firstSelect.addClass('pexeso__card--playing').text('');
                currentCard.addClass('pexeso__card--playing').text('');

                editPoints(-1);
            }

            firstSelect.removeClass('pexeso__card--selected');
            currentCard.removeClass('pexeso__card--selected');

            moves = 0;
            currentCard = null;
            firstSelect = null;
        } else {
            moves--;
        }
        } else {
            moves--;
        }
        pexesoPoints.text(points);
    }
    });
});