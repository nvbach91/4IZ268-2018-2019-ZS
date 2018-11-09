/*1. Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/

var birthday = 2011;
var today = new Date().getFullYear();

console.log('Pepa je ' + (today - birthday) + ' let starý.');

/*2. WTF(wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
Formát výpisu je: 20°C = 68°F resp. 68°F = 20°C. 
Výpočet probíhá takto:
    * z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
    * z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/

var C = 20;
var F = 68;

var Fahrenheiht = (C * 9 / 5) + 32;
var Celsium = (F - 32) * 5 / 9;

console.log(C + ' °C odpovídá ' + Fahrenheiht + ' °F');
console.log(F + ' °F odpovídá ' + Celsium + ' °C');

/*3. Funkce function fonction funktio.Vemte předchozí úlohy a udělejte z nich funkce.Tj.vytvořte funkce,
 které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.Párkrát zavolejte tyto funkce s různými argumenty.
 V konzoli také vyzkoušejte, zda fungují vaše funkce.*/

function year(birthday) {
    console.log('Pepovi je ' + (today - birthday) + ' let.');
}
year(1997);
year(1969);

function changeCelsium(C) {
    console.log(C + ' °C odpovídá ' + (C * 9 / 5) + 32 + ' °F');
}
function changeFahrenheiht(F) {
    console.log(F + ' °F odpovídá ' + (F - 32) * 5 / 9 + ' °C');
}
changeCelsium(2);
changeCelsium(36);
changeFahrenheiht(-12);
changeFahrenheiht(0);


/*4. % CENSORED %.Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech.
Výsledek vypište do konzole, např. 21 je 50 % z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci.toFixed(n).Např.var pi = 3.1415926535; 
pi.toFixed(2); Pozor na dělení nulou!*/
var a, b;

function divide(a, b) {
    if (b !== 0) {
        c = (a / b) * 100;
        c = c.toFixed(2);
        console.log(a + ' je ' + c + ' % z ' + b);
    }
    else {
        console.log('Nelze dělit nulou');
    }
}

divide(10, 0);
divide(1, 3);


/*5. Kdo s koho.Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich.Pokud se čísla rovnají, vypište, že se rovnají.
Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky.Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.*/

function comparing(a, b) {
    if (a == b) {
        console.log("Čísla se rovnají");
    } else {
        c = Math.max(a, b);
        console.log("Větší číslo je", c);
    }
}

comparing(2, 0);
comparing(-5, -5);

/*6. I can cleary see the pattern.Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop.*/

function multiplicity() {
    for (var i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}
multiplicity();

/*7. Around and about.Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.*/
var r;

function circle(r) {
    S = (Math.PI * r ** 2);
    S = S.toFixed(2);
    console.log("Kružnice s poloměrem " + r + " má obsah " + S);
}

circle(2);

/*8. Another dimension.Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.*/
var h;

function cone(h, r) {
    if (h == 0 || r == 0) {
        console.log("Takový kužel neexistuje!");
    }
    else {
        S = (1 / 3 * Math.PI * r ** 2) * h;
        S = S.toFixed(2);
        console.log("Kružnice s poloměrem " + r + " má obsah " + S);
    }
}

cone(0, 5);
cone(10, 2);

/*9. Not sure if triangle, or just some random values.Vytvořte funkci, která rozhodne, 
zda se z dodaných 3 délek dá postavit trojúhelník, tj.vypíše buď true / yes nebo false / no.*/

function Triangle(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
        console.log("no");
    }
    else {
        console.log("yes");
    }
}

Triangle(0, 5, 10);
Triangle(5, 6, 8);


/*10. Heroic performance.Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 tj.funkce dostane délky všech 3 stran.Použijte přitom předchozí validaci, tj.počítejte pouze, když to má smysl.
 Hint: funkce pro odmocninu je Math.sqrt()*/
var s, d;

function herons_formula(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
        console.log("Toto není trojuhelník!");
    }
    else {
        s = (a + b + c) / 2;
        d = (s * ((s - a) * (s - b) * (s - c)));
        d = d.toFixed(2);
        console.log("Obsah trojuhelníku je " + d);
    }
}

herons_formula(5, 2, 8);
herons_formula(10, 5, 6);
