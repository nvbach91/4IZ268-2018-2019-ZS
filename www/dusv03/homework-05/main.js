//JavaScript exercise

/*1. Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy,
//pokud znáte jeho rok narození. Použijte proměnné a pro výpis použijte zřetězení
stringů. Jako názvy proměnných používejte anglické pojmy.*/
var year_born = 1957;
var age = 2018 - year_born;

console.log('Pepe je ještě mladý je mu jen ' + age + ' let.');

/*2. WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius,
a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto: 

a, z C na F: vynásobit devíti, vydělit pěti a přičíst 32.*/
var tempC1 = 20;
var tempF1 = ((tempC1 * 9) / 5) + 32;
console.log(tempC1 + '°C = ' + tempF1 + '°F');

/*b, z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/
var tempF2 = 55;
var tempC2 = ((tempF2 - 32) * 5) / 9;
console.log(tempF2 + '°F = ' + tempC2 + '°C');

/*3. Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce.
Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.*/

var year_bornf;
var age = function (year_bornf) {
    var agen = 2018 - year_bornf;
    return 'Pepe je ještě mladý je mu jen ' + agen + ' let.';
};

var tempC;
var fonction = function (tempC) {
    var temp = ((tempC * 9) / 5) + 32;
    return temp + '°C = ' + tempF + '°F';
};

var tempF;
var funktio = function (tempF) {
    var temp = ((tempF - 32) * 5) / 9;
    return temp + '°F = ' + tempF + '°C';
};

/*4. %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech.
Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n).
Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!*/

var divide = function (a, b) {
    if (b === 0) {
        return 'Nemůžete dělit nulou!'
    } else {
        var c = (a / b) * 100;
        return a + ' je ' + c.toFixed(2) + '% z ' + b;
    }
};

/*5. Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla rovnají, vypište, že se rovnají.
Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.*/

var compare = function (a, b) {
    if (a > b) {
        return a;
    } else {
        if (a === b) {
            return 'čísla se rovnají!';
        } else {
            return b;
        }
    }
};

/*6. I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop.*/

var multiple = function () {
    var i;
    for (i = 0; i <= 730; i++) {
        console.log(i);
        i += 13;
    }
};

/*7. Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.*/

var circumference = function (radius) {
    return radius * 2 * Math.PI;
};

/*8. Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.*/

var volume = function (radius, height) {
    var volume = 12.33;
    volume = (1 / 3) * Math.PI * radius * radius * height;
    return volume.toFixed(2);
};

/*9. Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne,
zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.*/

var triangle = function (a, b, c) {
    var higher;
    var highest;
    var lower;
    if (a > b) {
        higher = a;
        lower = b;
    } else {
        higher = b;
        lower = a;
    }
    if (higher > c) {
        highest = higher;
        higher = c;
    } else {
        highest = c;
    }
    if ((highest - higher - lower) > 0) {
        /*console.log(highest + ',' + higher + ',' + lower);*/
        return false;
    } else {
        return true;
    }
}

/*10. Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()*/

var hero = function (a, b, c) {
    if (triangle(a, b, c) === true) {
        var s = (a + b + c) / 2
        var trio = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return trio;
    } else {
        return 'Trojuhelník nelze sestrojit!';
    }
}