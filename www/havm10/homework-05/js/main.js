const pi = Math.PI;

/*
1)
Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.
*/

var yearOfBirth = 1994;
var thisYear = new Date().getFullYear();
var age = thisYear - yearOfBirth;

console.log('Pepovy je: ' + age + ' let');

/*
2)
WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
    1) z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
    2) z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
*/

var celsium = 0;
var fahrenheiht = 100;

var celsiumToFahrenheiht = (celsium - 32) * 5 / 9;
var fahrenheihtToCelsium = (fahrenheiht - 32) * 5 / 9;

console.log(celsium + ' stupnů celsia je: ' + celsiumToFahrenheiht + ' stupnů fahrenheita');
console.log(fahrenheiht + ' stupnů fahrenheita je: ' + fahrenheihtToCelsium + ' stupnů celsia');

/*
3)
Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
*/

var ageOfPepa = function (yearOfBirth) {
    var thisYear = new Date().getFullYear();
    var age = thisYear - yearOfBirth;
    if (age >= 0) {
        return age;
    }
    else {
        return ('pepe se nemuze narodit v budoucnosti')
    }
}

var convertor = function (targetScale, tempeture) {
    switch (targetScale) {
        case 'C':
            return (tempeture * 9 / 5) + 32;
            break;
        case 'F':
            return (tempeture - 32) * 5 / 9;
            break;
        default:
            return ('neznámá stupnice');
    }
};


/*
4)
%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
*/

var percentageDivision = function (number1, number2) {
    if (number2 === 0) {
        return ('dělení nulou');
    }
    else {
        var percentage = number1 / number2 * 100;
        return (percentage.toFixed(2) + '%');
    }
}

/*
5)
Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.
*/

var biggerNumber = function (number1, number2) {
    if (number1 > number2) {
        return number1;
    }

    if (number1 < number2) {
        return number2;
    }

    return ('Čísla se rovnají');
}

var a = biggerNumber(1 / 2, 1 / 3);
var b = biggerNumber(0, 7, 0, 9);
var c = biggerNumber(5, 5);

/*
6)
I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop.
*/

var multiplicationTable = function () {
    for (i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}

/*
7)
Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.
*/

var circleArea = function (radius) {
    return (pi * Math.pow(radius, 2));
}

/*
8)
Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.
*/

var coneVolume = function (height, radius) {
    return (1 / 3 * pi * Math.pow(radius, 2) * height);
}

/*
9)
Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
*/

var isItTriangle = function (side1, side2, side3) {
    var isTrue = (side1 + side2 >= side3) && (side3 + side1 >= side2) && (side2 + side3 >= side1);
    return (isTrue);
}

/*
10)
Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
*/

var heronFormula = function (side1, side2, side3) {
    var halfPerimeter = (side1 + side2 + side3) / 2;
    return (Math.sqrt(halfPerimeter * (halfPerimeter - side1) * (halfPerimeter - side2) * (halfPerimeter - side3)))
}