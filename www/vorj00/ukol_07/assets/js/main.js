var points = 0;
var moves = 0;
var cities = ['Barcelona', 'Dortmund', 'Madrid', 'Turin', 'Prague', 'New York', 'Paris', 'London', 'Beijing', 'Moscow'];

const pexesoBoard = document.querySelector('#js-pexeso');

cities = cities.concat(cities);
cities.sort(function() { return .5 - Math.random(); });

cities.forEach(city => {
    let elem = document.createElement('div');
    elem.className = 'pexeso__card';
    elem.innerHTML = city;

    pexesoBoard.appendChild(elem);
})

const pexesoCard = document.querySelectorAll('.pexeso__card')

pexesoCard.addEventListener('click', () => {
    if(moves < 2){
        moves++;
    } else {
        moves = 0;
    }

    console.log(moves)
})