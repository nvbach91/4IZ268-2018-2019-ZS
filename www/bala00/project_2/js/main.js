/* SMOOTH SCROLL */
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 64.5
    }, 500);
});

/* APP */

// SELECTORS
let foodChoice = document.querySelector('#foodChoice');
let output = document.querySelector('#output');
let searchButtonFirst = document.querySelector('#searchButtonFirst');
let searchButtonSecond = document.querySelector('#searchButtonSecond');
let search = document.querySelector('#search');
let vegetarians = document.querySelector('#vegetarians');
let coffee = document.querySelector('#coffee');
let breakfast = document.querySelector('#breakfast');
let lunch = document.querySelector('#lunch');
let options = document.querySelectorAll('.form-check-label');

// VARIABLES
const userKey = 'e02b6e165f0c7de197bceb648e9e788b';
const url = 'https://developers.zomato.com/api/v2.1/';
const availableCategories = [
    'Cafes',
    'Daily Menus',
    'Breakfast'
];

// Creates space for output 
addOutputView = function (selector) {
    selector.addEventListener('click', function () {
        output.style.minHeight = '90vh';
        output.style.display = 'flex';
        output.style.alignItems = 'center';
    })
};
addOutputView(searchButtonFirst);
addOutputView(searchButtonSecond);

// Returns values of chosen items in a checkbox
chosenItems = function () {
    let listOfChosenItems = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i].firstElementChild.checked) {
            listOfChosenItems.push(options[i].firstElementChild.id);
        }
    }
    return listOfChosenItems;
}
// Returns value of a chosen type of food (Káva/Snídaně/Denní menu)
chosenFood = function () {
    return foodChoice.value;
}

// Get Prague
getCity = (userKey) => {
    fetch(url + 'cities?city_ids=84', {
            method: 'GET',
            headers: new Headers({
                'user-key': userKey
            })
        })
        .then(response => response.json())
        .then(
            (data) => {
                console.log(data.location_suggestions)
            }
        )
        .catch(function (error) {
            console.log('Error: ', error.message);
        });
}

// Get categories (Cafes, Breakfast, Daily Menus)
getCategories = (userKey) => {
    fetch(url + 'categories', {
            method: 'GET',
            headers: new Headers({
                'user-key': userKey
            })
        })
        .then(response => response.json())
        .then(
            (data) => {
                for (let i = 0; i < data.categories.length; i++) {
                    let item = data.categories[i];
                    for (let j = 0; j < availableCategories.length; j++) {
                        if (item.categories.name == availableCategories[j]) {
                            console.log(item.categories)
                        }
                    }
                }
            }
        )
        .catch(function (error) {
            console.log('Error: ', error.message);
        });
}

// Search request according to selected characteristics
// (Prague, Cafes+Breakfast+Daily Menus, sort by rating, order desc)
searchCafes = (userKey, cityId) => {
    if (cityId) {
        fetch(url + 'search?entity_id=84&entity_type=city&category=6%2C7%2C8&sort=rating&order=desc', {
                method: 'GET',
                headers: new Headers({
                    'user-key': userKey
                })
            })
            .then(response => response.json())
            .then(
                (data) => {

                }
            )
            .catch(function (error) {
                console.log('Error: ', error.message);
            });
    }
}


// Search request for a specific cafe 
// (Prague, Cafes+Breakfast+Daily Menus, sort by rating, order desc)
searchSpecificCafe = function () {

}
// url + 'search?entity_id=84&entity_type=city&category=6%2C7%2C8&sort=rating&order=desc'