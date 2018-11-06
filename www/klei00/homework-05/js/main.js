/* 1.	Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy. */
var birthYear = 1973;
console.log("Pepovi je " + (2018 - birthYear) + " let.");

/* 2.	WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto: 
a.	z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
b.	z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. */
var fahr = 68;
var cels = 20;
console.log(fahr + "°F = " + ((fahr - 32) * 5 / 9) + "°C");
console.log(cels + "°C = " + (cels * 9 / 5 + 32) + "°F");

/* 3.	Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. */
function age(birthYear) {
    console.log("Pepovi je " + (2018 - birthYear) + " let.");
}
function fahrToCels(fahr) {
    console.log(fahr + "°F = " + ((fahr - 32) * 5 / 9) + "°C");
}
function celsToFahr(cels) {
    console.log(cels + "°C = " + (cels * 9 / 5 + 32) + "°F");
}
fahrToCels(10);
fahrToCels(0);
celsToFahr(-70);
celsToFahr(0);

/* 4.	%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! */
function part(first, second) {
    if (second === 0) {
        console.log("Nulou nelze dělit.");
    }
    else {
        console.log(first + " je " + (first / second * 100).toFixed(2) + " % z " + second);
    }
}

/* 5.	Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných. */
function isGreater(first, second) {
    if (first === second) {
        console.log("Zadaná čísla se rovnají.");
    } else {
        if (first > second) {
            return first;
        } else {
            return second;
        }
    }
}
var x = isGreater(1.0568, 2.56);
var y = isGreater(7 / 8, 3 / 4);
var z = isGreater(x, y);

/* 6.	I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop. */
function multiples() {
    for (var i = 13; i <= 730; i += 13) {
        console.log(i);
    }
}

/* 7.	Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru. */
function circleArea(r) {
    if (r < 0) {
        console.log("Poloměr nemůže být záporný.")
    } else {
        return (Math.PI * r * r);
    }
}

/* 8.	Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr. */
function coneVolume(h, r) {
    if (h < 0 || r < 0) {
        console.log("Parametry nemohou být záporné.");
    } else {
        return (circleArea(r) * h * 1 / 3);
    }
}

/* 9.	Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. */
function isTriangle(a, b, c) {
    if (a < 0 || b < 0 || c < 0) {
        console.log("Parametry nemohou být záporné.")
    } else {
        if (a + b <= c || b + c <= a || a + c <= b) {
            return false;
        }
        return true;
    }
}

/* 10.	Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() */
function triangleArea(a, b, c) {
    if (isTriangle(a, b, c)) {
        var s = (a + b + c) / 2;
        return (Math.sqrt(s * (s - a) * (s - b) * (s - c)));
    }
}