//1.    Pepe's age

var PepeYearOfBirth = 1989;
if (PepeYearOfBirth != null) {
    var pepeAge = 2018 - PepeYearOfBirth;
    console.log("Věk Pepy je " + pepeAge + " let.");
}
else {
    console.log("Věk Pepy je neznámý")
}


//2.    WTF

var tempCelsius;
var tempFahrenheit;

if (tempCelsius != null) {

    tempFahrenheit = tempCelsius * 9 / 5 + 32;
    console.log(tempCelsius + "°C = " + tempFahrenheit + "°F");
} else {

    if (tempFahrenheit != null) {

        tempCelsius = (tempFahrenheit - 32) / 9 * 5;
        console.log(tempFahrenheit + "°F = " + tempCelsius + "°C");

    } else {

        console.log("Vstupní hodnoty nejsou zadané")

    }

}



//4.    Funkce function fonction funktio

function celsiusToFahrenheit(tempCelsius) {
    tempFahrenheit = tempCelsius * 9 / 5 + 32;
    return tempCelsius + "°C = " + tempFahrenheit + "°F";
}

function fahrenheitToCelsius(tempFahrenheit) {
    tempCelsius = (tempFahrenheit - 32) / 9 *5;
    return tempFahrenheit + "°F = " + tempCelsius + "°C";
}

//4.    %CENSORED%.

var a = 0, b = 0;
function percents(a, b) {

    if (b != 0) {

        var percentage = a / b * 100;
        percentage.toFixed(2);
        return a + " je " + percentage + "% z " + b;

    }
    else {

        return "Nulou nelze dělit!";

    }


}

//5.	Kdo s koho

function compareNumbers(w, z) {

    if (w == z) {
        return "Čísla se rovnají";
    } else if (w > z) {
        return w;
    } else {
        return z;
    }
}

var numbers1 = compareNumbers(5, 3);
var numbers2 = compareNumbers(5.2, 3);
var numbers3 = compareNumbers(5/2, 3/9);
var numbers4 = compareNumbers(4, 4);
var numbers5 = compareNumbers(4.0, 4);


//6.	I can cleary see the pattern

function multipleThirteen() {
    var j = 1;
    var i = 0;
    for ( ; i < 728; ) {
        i = j * 13;
        j++;
        console.log(i);
    }
}
//7.    Around and about

const PI = 3.14;

function circleContent(r) {

    var content = PI * r * r;
    return "Obsah kruhu je " + content + "cm";
}

//8.    Another dimension

function objemKuzele(r, v) {

    var volume = (PI * r * r * v) / 3;
    return "Objem kuželu je " + volume + "cm krychlových";

}

//9.	Not sure if triangle, or just some random values

function isTriangle(a, b, c) {

    if (a != 0 && b != 0 && c != 0 && (a + b > c)) {

        return true;

    }
    else {

        return false;

    }
}

//10.	Heroic performance

function triangleArea(a, b, c) {

    var rightTriangle = isTriangle(a, b, c);

    if (rightTriangle == true) {

        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));

    } else {

       return "Není trojúhelník";

    }

}

