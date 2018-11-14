/**
 * 1. Pepe's age. 
 * Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, 
 * pokud znáte jeho rok narození. Použijte proměnné a pro výpis použijte zřetězení stringů. 
 * Jako názvy proměnných používejte anglické pojmy. 
 */

var ageString = 'Pepe\'s age is ';
var birthYear;
var currentYear = (new Date()).getFullYear();
console.log(ageString + (currentYear - birthYear));

/** 
 * 2. WTF (wow, that's fun). 
 * Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, 
 * a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 * a) z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 * b) z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */

var fahrenheiht;
var celsius;
console.log(fahrenheiht + '°F = ' + (fahrenheiht - 32) * 5 / 9 + '°C');
console.log(celsius + '°C = ' + (celsius * 9 / 5 + 32) + '°F');

/**
 * 3. Funkce function fonction funktio. 
 * Vemte předchozí úlohy a udělejte z nich funkce. 
 * Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše 
 * výsledek na konzoli. Párkrát zavolejte tyto funkce s různými argumenty. 
 * V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */

var age = function (birthYear) {
    let ageString = 'Pepe\'s age is ';
    let currentYear = (new Date()).getFullYear();
    return (ageString + (currentYear - birthYear));
}
var toCelsius = function (fahrenheiht) {
    return fahrenheiht + '°F is ' + (fahrenheiht - 32) * 5 / 9 + '°C';
}
var toFahrenheiht = function (celsius) {
    return celsius + '°C is ' + (celsius * 9 / 5 + 32) + '°F';
}

/** 
 * 4. %CENSORED%. 
 * Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního 
 * čísla a druhého čísla v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. 
 * Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n). 
 * Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */

var censored = function (num1, num2) {
    if (num2 == 0) {
        return false;
    } else {
        let result = (num1 / num2 * 100);
        return (num1 + ' je ' + result + '% z ' + num2);
    }
}

/** 
 * 5. Kdo s koho. 
 * Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. 
 * Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, 
 * desetinná čísla, zlomky. Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */

var isGreater = function (num1, num2) {
    if (num1 == num2) {
        return 'Čísla se rovnají.';
    } else
        return Math.max(num1, num2) + ' is greater';
}
var num3 = isGreater(1, 2);
var num4 = isGreater(3.8, 5.8);
var num5 = isGreater(1 / 3, 2 / 3);

/** 
 * 6. I can cleary see the pattern. 
 * Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. 
 * Použijte for loop.
 */

var thirteen = function () {
    for (var i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}

/** 
 * 7. Around and about. 
 * Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.
 */

var aroundAbout = function (r) {
    if (r <= 0) {
        return false;
    } else {
        return (r * r * Math.PI);
    }
}

/** 
 * 8. Another dimension. 
 * Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.
 */

var anotherDimension = function (h, r) {
    if (h <= 0 || r <= 0) {
        return false;
    } else {
        return (aroundAbout(r) * h * 1 / 3);
    }
}

/** 
 * 9. Not sure if triangle, or just some random values. 
 * Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, 
 * tj. vypíše buď true/yes nebo false/no.
 */

var isTriangle = function (a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        return false;
    } else
        return true;
}

/** 
 * 10. Heroic performance. 
 *  Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, 
 * tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */

var heroicPerformance = function (a, b, c) {
    if (!isTriangle(a, b, c)) {
        return false;
    } else {
        let y = (a + b + c) / 2;
        return (Math.sqrt(y * (y - a) * (y - b) * (y - c)));
    }
}