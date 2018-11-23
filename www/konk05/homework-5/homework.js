/**
 * Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně 
 * věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro
 * výpis použijte zřetězení stringů. Jako názvy proměnných používejte
 * anglické pojmy.
 */
var name = "Pepe's ";
var ageIs = "age is ";
var birthYear = 1996;
var age = new Date().getFullYear() - birthYear;

console.log(name + ageIs + age);


/**
 * WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte
 *  teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F 
 * resp. 68°F = 20°C. Výpočet probíhá takto:
 * a. z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 * b. z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
var c = 20;
var f = 68;
var equalsTo = " = ";
var Celsius = "°C";
var Fahrenheiht = "°F";

console.log(c + Celsius + equalsTo + (c * 9 / 5 + 32) + Fahrenheiht);
console.log(f + Fahrenheiht + equalsTo + (f - 32) * 5 / 9 + Celsius);

/**
 * Funkce function fonction funktio. Vemte předchozí úlohy a udělejte
 * z nich funkce. Tj. vytvořte funkce, které přijímají argumenty,
 * a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také 
 * vyzkoušejte, zda fungují vaše funkce.
 */

var celsiusToFahrenheiht = function (c) {
    var F = c * 9 / 5 + 32;
    return c + Celsius + equalsTo + F + Fahrenheiht;
};

var fahrenheihtToCelsius = function (f) {
    var C = (f - 32) * 5 / 9;
    return f + Fahrenheiht + equalsTo + C + Celsius;
};

var getAge = function (birthYear) {
    var age = new Date().getFullYear() - birthYear;
    return name + ageIs + age;
};

/**
 * %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a 
 * vrátí podíl prvního čísla a druhého čísla v procentech. Výsledek
 * vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / 
 * zaokrouhlování desetinných míst použijte funkci .toFixed(n). 
 * Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */

var getPercentage = function (a, b) {
    if (b === 0) {
        return "You can't divide by zero!";
    } else {
        var percentage = a * 100 / b;
        percentage = percentage.toFixed(1);
        return a + " is " + percentage + "%" + " of " + b;
    }
};

/**
 * Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a 
 * vrátí ten větší z nich. Pokud se čísla rovnají, vypište, že se 
 * rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, 
 * zlomky. Zkuste je párkrát zavolat v kódu a výsledky uložit do 
 * proměnných.
 */

var getMax = function (a, b) {
    if (a > b) {
        return a + " is bigger.";
    } else if (b > a) {
        return b + " is bigger.";
    } else {
        return "The numbers are equal.";
    }
};

var result1 = getMax(50, 50);
var result2 = getMax(1 / 2, 3 / 5);
var result3 = getMax(0.28941, 0.285486);

/**
 * I can cleary see the pattern. Vytvořte funkci, která vypíše 
 * popořadě všechny násobky 13, které jsou menší nebo rovno 730. 
 * Použijte for loop.
 */

var getMultiples = function () {
    var i;
    for (i = 1; i <= 730; i += 13) {
        console.log(i);
    }
};

/**
 * Around and about. Vytvořte funkci, která vypočte obsah kružnice 
 * podle dodaného poloměru.
 */

var getCircleArea = function (r) {
    return Math.pow(r, 2) * Math.PI;
};

/**
 * Another dimension. Vytvořte funkci, která vypočte objem kuželu, 
 * pokud znáte jeho výšku a poloměr.
 */

var getConeVolume = function (r, h) {
    return 1 / 3 * h * Math.pow(r, 2) * Math.PI;
};

/**
 * Not sure if triangle, or just some random values. Vytvořte 
 * funkci, která rozhodne, zda se z dodaných 3 délek dá postavit 
 * trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */

var isTriangle = function (a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
        return false;
    } else {
        return true;
    }
};

/**
 * Heroic performance. Vytvořte funkci, která vypočte obsah 
 * trojúhelníka podle Heronova vzorce, tj. funkce dostane délky 
 * všech 3 stran. Použijte přitom předchozí validaci, tj. 
 * počítejte pouze, když to má smysl. Hint: funkce pro odmocninu 
 * je Math.sqrt()
 */

var getTriangleArea = function (a, b, c) {
    if (isTriangle(a, b, c)) {
        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else {
        return "Not a triangle.";
    }
};





