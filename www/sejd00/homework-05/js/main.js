/* 1.	Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození.
        Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/

var dateOfBirth = 1993;
console.log("Pepovi je " + (new Date().getFullYear() - dateOfBirth) + " let.");

/* 2.	WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto: 
    a.	z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
    b.	z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/

var fahrenheiht = 104;
var celsius = 12;
console.log(fahrenheiht + ("°F = " + (fahrenheiht - 32) * 5 / 9) + "°C");
console.log(celsius + ("°C = " + (celsius * 9 / 5 + 32) + "°F"));

/* 3.	Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce.
        Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
        Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.*/

function age(dateOfBirth) {
    console.log("Pepovi je " + (new Date().getFullYear() - dateOfBirth) + " let.");
}

function fToC(fahrenheiht) {
    console.log(fahrenheiht + ("°F = " + (fahrenheiht - 32) * 5 / 9) + "°C");
}

function cToF(celsius) {
    console.log(celsius + ("°C = " + (celsius * 9 / 5 + 32) + "°F"));
}

age(50);
fToC(100);
cToF(20);

/* 4.	%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech.
        Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n).
        Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!*/

function numbers(number1, number2) {
    if (number2 === 0) {
        console.log("Nelze dělit nulou!")
    }
    else {
        console.log(number1 + " Je " + (number1 / number2 * 100).toFixed(2) + "% z " + number2);
    }
}

numbers(50, 434);

/* 5.	Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich.
        Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky.
        Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.*/

function greater(num1, num2) {
    if (num1 > num2) {
        console.log(num1);
    }
    else {
        if (num1 === num2) {
            console.log("Čísla jsou stejná.");
        }
        else {
            console.log(num2);
        }
    }

}

greater(10, 4);
greater(59, 60);
greater(5, 5);

var a = greater(1.4, 6.6);
var b = greater(3 / 12, 5 / 6);
var c = greater(14, 5);

/* 6.	I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop.*/

function multiples() {
    for (let index = 13; index < 730; index += 13) {
        console.log(index);
    }

}

multiples();

/* 7.	Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.*/

function circle(radius) {
    console.log(Math.PI * Math.pow(radius, 2));
}

circle(50);

/* 8.	Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.*/

function cone(height, radius) {
    console.log(1 / 3 * Math.PI * Math.pow(radius, 2) * height);
}

cone(50, 30);

/* 9.	Not sure if triangle, or just some random values. 
        Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.*/

function canTriangle(a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        console.log("Parametry nemohou být záporné a nulové.");
    }
    else {
        if (a + b <= c || b + c <= a || a + c <= b) {
            return false;
        }
        else {
            return true;
        }
    }
}

canTriangle(2, 4, 5);
canTriangle(0, 5, 3);
canTriangle(1, 1, 4);

/* 10.	Heroic performance.
        Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, tj. funkce dostane délky všech 3 stran. 
        Použijte přitom předchozí validaci, tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()*/

function formula(a, b, c) {
    if (canTriangle(a, b, c)) {
        var s = (a + b + c) / 2;
        content = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(content);

    }
}
formula(3, 4, 5);

