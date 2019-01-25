/* SMOOTH SCROLL */
$(document).on("click", "a[href^='#']", function (event) {
    event.preventDefault();

    $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top - 64.5
    }, 500);
});

// SELECTORS
// let options = document.querySelectorAll(".form-check-label");
// let search = document.querySelector("#search");

// Returns value of a chosen type of food (6-Káva/8-Snídaně/7-Denní menu)
chosenFood = function () {
    let input = document.getElementsByTagName("option");
    for (let i = 0; i < input.length; i++) {
        if (input[i].selected) {
            input = parseInt(input[i].id);
        }
    }
    return input;
};

// Returns values (array) of chosen items in a checkbox
chosenItems = function () {
    let listOfChosenItems = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i].firstElementChild.checked) {
            listOfChosenItems.push(options[i].firstElementChild.id);
        }
    }
    return listOfChosenItems;
};

/* APP */

// 0e118cf04a4f490a03b7ec4b2e178ef6
// e02b6e165f0c7de197bceb648e9e788b
// eae82389eed81a996c6aba78fedb4c33

class APP {
    constructor() {
        this.key = "0e118cf04a4f490a03b7ec4b2e178ef6";
        this.header = {
            method: "GET",
            headers: {
                "user-key": this.key
            }
        }
    }
    async getAPI(city, categoryId) {
        //category url
        const categoryUrl = `https://developers.zomato.com/api/v2.1/categories`;
        //city url
        const cityUrl = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;

        //category data
        const categoryInfo = await fetch(categoryUrl, this.header);
        const categoryJson = await categoryInfo.json();
        const categories = await categoryJson.categories;
        //search city
        const cityInfo = await fetch(cityUrl, this.header);
        const cityJson = await cityInfo.json();
        const cityLocation = await cityJson.location_suggestions;

        let cityId = 0;

        if (cityLocation.length > 0) {
            cityId = await cityLocation[0].id;
        }

        //search restaurant
        const restaurantUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&category=${categoryId}&sort=rating`;
        const restaurantInfo = await fetch(restaurantUrl, this.header);
        const restaurantJson = await restaurantInfo.json();
        const restaurants = await restaurantJson.restaurants;

        return {
            categories,
            cityId,
            restaurants
        }
    }
};
class UI {
    constructor() {
        this.loader = document.querySelector(".loader");
        this.output = document.getElementById("output");
    };
    addCategories(categories) {
        const search = document.getElementById("categoryChoice");
        categories.forEach(category => {
            category.categories.id === chosenFood();
        });
    };

    showLoader() {
        this.loader.classList.add("showItem");
    };
    hideLoader() {
        this.loader.classList.remove("showItem");
    };
    getRestaurants(restaurants) {
        this.hideLoader();
        this.output.innerHTML = "";
        restaurants.forEach(restaurant => {
            const {
                thumb: img,
                name,
                location: {
                    address
                },
                user_rating: {
                    aggregate_rating
                },
                average_cost_for_two: cost,
                currency,
                url
            } = restaurant.restaurant;

            if (img) {
                this.showRestaurant(img, name, address, aggregate_rating, cost, currency, url);
            }
        });
    };
    showRestaurant(img, name, address, aggregate_rating, cost, currency, url) {
        const div = document.createElement("div");
        div.classList.add("outputGrid");
        div.innerHTML =
            `<div class="container-fluid">
            <div class="row">
                <div class="col">
                    <img src="${img}" alt="">
                    <h6>${name}</h6>
                    <p>${address}</p>
                    <p>Hodnocení: ${aggregate_rating}</p>
                    <p>Cena pro dva: ${cost}${currency}</p>
                    <p><a href="${url}" target="_blank">Webová stránka</a></p>
                </div>
            </div>
        </div>`;
        this.output.appendChild(div);
        window.location.href = "#output";
    }
}

(function () {
    const searchForm = document.getElementById("searchForm");
    const searchCity = 'prague';
    const categoryChoice = document.getElementById("categoryChoice");

    const app = new APP();
    const ui = new UI();

    document.addEventListener("DOMContentLoaded", () => {
        app.getAPI().then(data => ui.addCategories(data.categories));
    });

    searchForm.addEventListener("submit", event => {
        event.preventDefault();

        const city = searchCity;
        const categoryId = chosenFood();

        if (categoryId) {
            app.getAPI(city).then(cityData => {
                ui.showLoader();
                app.getAPI(city, categoryId).then(data => {
                    ui.getRestaurants(data.restaurants);
                });
            });
        }
    });
})();

// // Get Prague
// getCity = (userKey) => {
//     fetch(urlCity, {
//             method: "GET",
//             headers: new Headers({
//                 "user-key": userKey
//             })
//         })
//         .then(response => response.json())
//         .then(
//             (data) => {
//                 console.log(data.location_suggestions[0].id);
//             }
//         )
//         .catch(function (error) {
//             console.log("Error: ", error.message);
//         });
// }

// // Get category (6-restaurants, 8-Breakfast, 7-Daily Menus)
// // getCategory = (userKey) => {
// //     fetch(urlCategories, {
// //             method: "GET",
// //             headers: new Headers({
// //                 "user-key": userKey
// //             })
// //         })
// //         .then(response => response.json())
// //         .then(
// //             (data) => {
// //                 for (let i = 0; i < data.categories.length; i++) {
// //                     let item = data.categories[i];
// //                     if (item.categories.id == parseInt(chosenFood())) {
// //                         //let link = "https://developers.zomato.com/api/v2.1/search?entity_id=84&entity_type=city&count=100&category=" + item.categories.id + "&sort=rating&order=desc";
// //                         return item.categories.id;
// //                     }

// //                 }
// //             }
// //         )
// //         .then(json => console.log(json))
// //         .catch(function (error) {
// //             console.log("Error: ", error.message);
// //         });
// // }

// getrestaurants = (userKey) => {
//     // if ()
//     fetch(url + "search?entity_id=84&entity_type=city&count=100&category=7&sort=rating&order=desc", {
//             method: "GET",
//             headers: new Headers({
//                 "user-key": userKey
//             })
//         })
//         .then(response => response.json())
//         .then(
//             (data) => {
//                 let item = data.restaurants;
//                 for (let i = 0; i < item.length; i++) {
//                     let arrayrestaurants = [
//                         data.restaurants[i].restaurant.name,
//                         data.restaurants[i].restaurant.location.address,
//                         data.restaurants[i].restaurant.user_rating.aggregate_rating,
//                         data.restaurants[i].restaurant.average_cost_for_two,
//                         data.restaurants[i].restaurant.menu_url,
//                         data.restaurants[i].restaurant.url
//                     ]
//                     console.log(Object.assign({}, arrayrestaurants));

//                     //console.log(data);
//                 }
//             })
//         .catch(function (error) {
//             console.log("Error: ", error.message);
//         });
// }