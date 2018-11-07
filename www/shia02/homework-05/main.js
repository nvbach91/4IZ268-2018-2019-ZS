/* HOMEWORK NUMERO CINCO */
/**
 * Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
 * Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.
 */

var yearOfBirth = 1996;
var currentYear = new Date().getFullYear();
var pepesAge = currentYear - yearOfBirth;
console.log('Věk Pepy je ' + pepesAge);


/**
 * WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */

var cel = 20;
var fah = 68;
var fahrenheiht = cel * 9 / 5 + 32;
var celsius = (fah - 32) * 5 / 9;
console.log(cel + '°C = ' + fahrenheiht + '°F');
console.log(fah + '°F = ' + celsius + '°C');


/**
 * Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */

var age = function (yearOfBirth) {
    var currentYear = new Date().getFullYear();
    if (yearOfBirth <= currentYear) {
        var pepesAge = currentYear - yearOfBirth;
        console.log('Věk Pepy je ' + pepesAge);
    } else {
        console.log('Rok narození musí být menší než současný rok');
    }
    
};
age(2006);
age(2020);


var tempInFah = function (c) {
    var fahrenheiht = c * 9 / 5 + 32;
   console.log(c + '°C = ' + fahrenheiht + '°F');
};
tempInFah(20);


var tempInCel = function (f) {
    var celsius = (f - 32) * 5 / 9;
    console.log(f + '°F = ' + celsius + '°C');
};
tempInCel(68);


/**
 * %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */

var divide = function (a, b) {
    if (b !== 0) {
        var c = a / b * 100;
        console.log(a + ' je ' + c.toFixed(2) + '% z ' + b);
    } else {
        console.log('Nelze dělit nulou!');
    }

};
divide(1312.6526, 21.545);
divide(13, 0);


/**
 * Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */

var comparison = function (a, b) {
    if (a > b) {
        return a;
    }
    if (b > a) {
        return b;
    }
    return "čísla se rovnájí";
};



/**
 * I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730. Použijte for loop. 
 */

for (var i = 0; i <= 730; i += 13) {
    console.log(i);
};



/**
 * Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru. 
 */

var areaOfACircle = function (radius) {
    const pi = 3.14;
    var area = pi * radius * radius;
    return area;
};
console.log(areaOfACircle(10));



/**
 * Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr. 
 */

var volumeOfACone = function (height, radius) {
    const pi = 3.14;
    var volume = (1 / 3) * pi * radius * radius * height;
    console.log(volume);
};
volumeOfACone(10, 20);
volumeOfACone(5.2, 3 / 4);


/** 
 * Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */

var triangle = function (a, b, c) {
    if ((a < b + c) && (b < a + c) && (c < a + b)) {
        return true;
    }
    return false;
};



/**
 * Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */

var areaOfATriangle = function (a, b, c) {
    if (triangle(a, b, c)) {
        var s = (a + b + c) / 2;
        var area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(area);
    } else {
        console.log('Nelze postavit trojúhelník');
    }
};
areaOfATriangle(30, 40, 50);
areaOfATriangle(130, 40, 50);
