/* DU 05 */
/**
 * Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
 * Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.
 */
var pepe = {};
const thisYear = new Date().getFullYear();
pepe.yearOfBirth = 1980;
pepe.age = thisYear - pepe.yearOfBirth;
console.log('Pepovi je ' + pepe.age + ' let');








/**
 * WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */

var inputCelsius = 20;
var inputFarhaint = 68;
F = inputCelsius * 9 / 5 + 32;
C = (inputFarhaint - 32) / 9 * 5;
console.log(inputCelsius + "°C = " + F + "°F");
console.log(inputFarhaint + "°F = " + C + "°C");



/**
 * Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */

function FunkceAge(yearOfBirth) {
    const pepeAge = thisYear - yearOfBirth
    return pepeAge;
};
console.log("Pepe je " + FunkceAge(1954) + " roku star.")

function FromCtoF(InputCelsius) {
    F = InputCelsius * 9 / 5 + 32;
    return F;
};

function FromFtoC(InputFarhaint) {
    C = (InputFarhaint - 32) / 9 * 5;
    return C;
};

console.log(70 + "°C = " + FromCtoF(70) + "°F");

console.log(158 + "°F = " + FromFtoC(158) + "°F");

/**
 * %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 *   
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */


function percentFrom(A, B) {
    if (B == 0) {
        console.log("Deleni nulou");
    } else {
        T1 = 100 / B * A
        T2 = T1.toFixed(2)
        console.log(A + " je " + T2 + "% z " + B + ".");
    }
};
percentFrom(10, 6)

/**
 * Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
function compare(A, B) {
    if (A > B) {
        var T = "prvni clen je vetsi";
    } else if (B > A) {
        var T = "druhy clen je vetsi";
    } else {
        var T = "Jsou stejne.";
    }

    console.log("Kdyz se porovnaji " + A + " a " + B + " , tak " + T);
};
compare(85, 32);



/**
 * I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730. Použijte for loop. 
 */


var powers13 = () => {
    for (let i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}

powers13();
/**
 * Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru. 
 */

function around(radius) {
    space = 3.1415926535 * radius * 2;
    return space;
};
console.log(around(20));



/**
 * Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr. 
 */


function dimension(radius, height) {
    dimen = 3.1415926535 * radius * radius * height / 3;
    return dimen;
};
console.log(dimension(20, 5));


/** 
 * Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */


function isTriangle(a, b, c) {
    if (a + b > c && b + c > a && c + a > b &&) { result = "True" } else {
        result = "False";
    }
    return result;

};
/* Toto není třeba dalé dělat,pří jakékoliv hodnotě která nebude >0, to hod9 false. , */

console.log(isTriangle(40, 20, 170));

/**
 * Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */

function areaOfTriangle(a, b, c) {
    if (a + b > c && b + c > a && c + a > b) {
        var s = (a + b + c) / 2;
        var s2 = s * (s - a) * (s - b) * (s - c)
        result = Math.sqrt(s2)
    } else {
        result = 0;
    }
    return result;

};
console.log(areaOfTriangle(30, 40, 50));

/**
 * Tady jsem si trosku hral
 * a zkousel udelat webove rozhrani pro vkladani inputu k jednotlivym funkcim ale uz to nestiham tak..
 *
 */

function FunkceAge2() {
    x = document.getElementsByName("narozeni")[0].value;
    FunkceAge(x);
    alert("Pepe je " + FunkceAge(x) + " roku star.")
};



