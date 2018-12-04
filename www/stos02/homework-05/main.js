/*1. Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/

var birthYear = 1997;
var thisYear = new Date().getFullYear();

console.log('Pepovi je ' + (thisYear - birthYear) + ' let.');



/*2. WTF(wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C = 68°F resp. 68°F = 20°C. 
Výpočet probíhá takto:
    * z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
    * z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/

var celsium = 20;
var fahrenheiht = 150;

var celsiumToFahrenheiht = (celsium * 9 / 5) + 32;
var fahrenheihtToCelsium = (fahrenheiht - 32) * 5 / 9;

console.log(celsium + ' °C =' + celsiumToFahrenheiht + ' °F');
console.log(fahrenheiht + ' °F=' + fahrenheihtToCelsium + ' °C');

/*3. Funkce function fonction funktio.Vemte předchozí úlohy a udělejte z nich funkce.Tj.vytvořte funkce,
 které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.Párkrát zavolejte tyto funkce s různými argumenty.
 V konzoli také vyzkoušejte, zda fungují vaše funkce.*/

function age(birthYear) {
    console.log('Pepovi je ' + (thisYear - birthYear) + ' let.');
}

age(2000);
age(1994);

function fahrToCels(fahrenheiht) {
    console.log(fahrenheiht + ' °F=' + fahrenheihtToCelsium + ' °C');
}
function celsToFahr(celsium) {
    console.log(celsium + ' °C =' + celsiumToFahrenheiht + ' °F');
}
fahrToCels(20);
fahrToCels(14);
celsToFahr(-80);
celsToFahr(0);



/*4. % CENSORED %.Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech.
Výsledek vypište do konzole, např. 21 je 50 % z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci.toFixed(n).Např.var pi = 3.1415926535; 
pi.toFixed(2); Pozor na dělení nulou!*/

function part(first, second) {
    if (second === 0) {
        console.log('Nelze dělit nulou');
    }
    else {
        console.log(first + ' je ' + (first / second * 100).toFixed(2) + ' % z ' + second);
    }
}

part(21, 42);
part(70, 152);

/*5. Kdo s koho.Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich.Pokud se čísla rovnají, vypište, že se rovnají.
Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky.Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.*/

function isBigger(first, second) {
    if (first === second) {
        console.log("Čísla se rovnají");
    } else {
        console.log("Větší je číslo", Math.max(first, second));
    }
}

isBigger(1.52, 3.5266);
isBigger(12 / 5, 3 / 2);
isBigger(2, 6);


/*6. I can cleary see the pattern.Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop.*/

function multiple() {
    for (var i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}
multiple();

/*7. Around and about.Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.*/

function circleArea(r) {
    return Math.PI * r ** 2;
}
console.log(circleArea(7));

/*8. Another dimension.Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.*/

function coneVolume(height, radius) {
    return 1 / 3 * pi * Math.pow(radius, 2) * height;
}


/*9. Not sure if triangle, or just some random values.Vytvořte funkci, která rozhodne, 
zda se z dodaných 3 délek dá postavit trojúhelník, tj.vypíše buď true / yes nebo false / no. */

function isTriangle(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
        return false;
    }
    return true;
}

console.log(isTriangle(2, 2, 8));
console.log(isTriangle(2, 7, 8));

/*10. Heroic performance.Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 tj.funkce dostane délky všech 3 stran.Použijte přitom předchozí validaci, tj.počítejte pouze, když to má smysl.Hint: funkce pro odmocninu je Math.sqrt()*/

function AreaTriangle(a, b, c) {
    if (isTriangle(a, b, c)) {
        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}
console.log(AreaTriangle(2, 7, 8));