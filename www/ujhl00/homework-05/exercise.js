/*
 Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.
*/

birthYear = 1996;

const currentYear = new Date().getFullYear();
pepeAge = currentYear - birthYear;

console.log('Pepe is ' + pepeAge + ' y/o.')

/*
WTF (wow, that's fun).
Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
*/

var celsius = 20;
var fahrenheiht = 68;

var celToFahr = celsius * 9 / 5 + 32;
var fahrToCel = (fahrenheiht - 32) * 5 / 9;

console.log(celsius + '°C = ' + celToFahr + '°F');
console.log(fahrenheiht + '°F = ' + fahrToCel + '°C');

/*
Funkce function fonction funktio.
 Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají argumenty,
a na základě argumentů po zavolání vypíše výsledek na konzoli. 
Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
*/

function pepesAge(birthYear) {
    //const currentYear = new Date().getFullYear(); - už deklarovaná
    if (birthYear > currentYear) {
        console.log('Pepe sa nenarodil v budúcnosti')
    } else {
        var age = currentYear - birthYear;
        return age;
    }
};

pepesAge(-1995);
pepesAge(2020);
pepesAge(1995);



function temperatureCalc(value, unit) {
    let result;
    switch (unit) {
        case "C":
            result = value * 9 / 5 + 32;
            break;
        case "F":
            result = (value - 32) * 5 / 9;
            break;
        default:
            return console.log('Zadaj jednotku výslednej teploty "C" alebo "F"');
    }
    console.log('Výsledok je: ' + result + '°' + unit);
}

temperatureCalc(20, "C");
temperatureCalc(68, "F");

/*
%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a 
vrátí podíl prvního čísla a druhého čísla v procentech. Výsledek vypište do konzole, 
např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci.
toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
*/

function censored(x, y) {
    let result;
    if (y === 0) {
        console.log('Delenie nulou!')
    } else {
        console.log(x + ' je ' + (x / y * 100).toFixed(2) + '% z ' + y);
    }
}

/*
Kdo s koho. 
Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. 
Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro 
celá čísla, desetinná čísla, zlomky. Zkuste je párkrát zavolat v kódu a 
výsledky uložit do proměnných.
*/

function isGreater(x, y) {
    if (x === y) {
        console.log('Zadané čísla sa rovnajú');
    } else if (x > y) {
        return x;
    } else {
        return y;
    }
}

var firstTry = isGreater(5, 6);
var secondTry = isGreater(10.011, 10.021);
var thirdTry = isGreater(4 / 5, 5 / 6);
var fourthTry = isGreater(8, 8);

/*
I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13,
 které jsou menší nebo rovno 730. Použijte for loop.
 */

function thirteen() {
    for (let i = 13; i <= 730; i += 13) {
        console.log(i);
    }
}

//thirteen();

/*
Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.
*/

function circle(r) {
    if (r < 0) {
        console.log('Zadaný polomer je záporný');
    } else {
        return (Math.PI * r * r).toFixed(4);
    }
}

/*
Another dimension. Vytvořte funkci, která vypočte
 objem kuželu, pokud znáte jeho výšku a poloměr.
*/

function cone(r, v) {
    if (r < 0 || v < 0) {
        console.log('Zadané hodnoty sú záporné')
    } else {
        return (circle(r) * v * 1 / 3).toFixed(4);
    }
}

/*
Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, 
zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
*/

function isTriangle(a, b, c) {
    if (a < 0 || b < 0 || c < 0) {
        console.log("Zadané strany trojuholníka sú záporné");
        return false;
    } else {
        if (a + b <= c || b + c <= a || a + c <= b) {
            return false;
        }
        return true;
    }
}

isTriangle(5, 1, 6);
isTriangle(5, 1, 2);
isTriangle(1, 4, 1);
isTriangle(4, 5, 7);


/*
Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle 
Heronova vzorce, tj. funkce dostane délky všech 3 stran. Použijte přitom 
předchozí validaci, tj. počítejte pouze, když to má smysl. 
Hint: funkce pro odmocninu je Math.sqrt()
*/

function heroicTriangle(a, b, c) {
    if (isTriangle(a, b, c)) {
        var s = (a + b + c) / 2;
        return (Math.sqrt(s * (s - a) * (s - b) * (s - c))).toFixed(4);
    } else {
        console.log('Trojuholník sa nedá zostrojiť');
    }
}

