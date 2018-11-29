//1.    Pepe's age

var pepeYearOfBirth = 1989;
if (typeof pepeYearOfBirth === 'number') {

    var pepeAge = new Date().getFullYear() - pepeYearOfBirth;
    console.log("Věk Pepy je " + pepeAge + " let.");
}
else {
    console.log("Věk Pepy je neznámý");
}


//2.    WTF

var tempCelsius = 15;
var tempFahrenheit;

if (tempCelsius !== null) {

    tempFahrenheit = tempCelsius * 9 / 5 + 32;
    console.log(tempCelsius + "°C = " + tempFahrenheit + "°F");

} else {

    if (tempFahrenheit != null) {

        tempCelsius = (tempFahrenheit - 32) / 9 * 5;
        console.log(tempFahrenheit + "°F = " + tempCelsius + "°C");

    } else {

        console.log("Vstupní hodnoty nejsou zadané");

    }

}


//4.    Funkce function fonction funktio

function celsiusToFahrenheit(tempCelsius) {
    tempFahrenheit = tempCelsius * 9 / 5 + 32;
    return tempCelsius + "°C = " + tempFahrenheit + "°F";
}

function fahrenheitToCelsius(tempFahrenheit) {
    tempCelsius = (tempFahrenheit - 32) / 9 * 5;
    return tempFahrenheit + "°F = " + tempCelsius + "°C";
}

//4.    %CENSORED%.


function percents(a, b) {

    if (b !== 0) {

        var percentage = a / b * 100;
        percentage.toFixed(2);
        return a + " je " + percentage + "% z " + b;

    }
        return "Nulou nelze dělit!";
}

//5.	Kdo s koho

function compareNumbers(w, z) {

    if (w === z) {
        return "Čísla se rovnají";
    } else if (w > z) {
        return w;
    } else {
        return z;
    }
}

var numbers1 = compareNumbers(5, 3);
var numbers2 = compareNumbers(5.2, 3);
var numbers3 = compareNumbers(5 / 2, 3 / 9);
var numbers4 = compareNumbers(4, 4);
var numbers5 = compareNumbers(4.0, 4);


//6.	I can cleary see the pattern

function multipleThirteen() {
    for(var i = 0; i <= 730; i+=13) {
        console.log(i);
    }
}

//7.    Around and about


function circleArea(r) {

    return Math.PI * r * r;
}

//8.    Another dimension

function coneVolume(r, v) {

    return (Math.PI * r * r * v) / 3;

}

//9.	Not sure if triangle, or just some random values

function isTriangle(a, b, c) {

    return a + b > c && a + c > b && b + c > a;
}

//10.	Heroic performance

function triangleArea(a, b, c) {

    var rightTriangle = isTriangle(a, b, c);

    if (rightTriangle) {

        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));

    }
        return "Není trojúhelník";

}

