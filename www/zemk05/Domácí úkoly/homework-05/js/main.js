/*1. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/
var birthdayYear = 1980;
var currentYear = (new Date()).getFullYear();
console.log("Pepovi je " + (currentYear - birthdayYear) + "let");
/*2. Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto: 
a.	z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
b.	z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/
var fahrenheit = 68;
var celsius = 20;
console.log( fahrenheit + "°F = " + ((fahrenheit - 32) * 5 / 9) + "°C");
console.log (celsius + "°C = " + (celsius * 9 / 5 + 32) + "°F");
/*3. Funkce function fonction funktio. 
Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.*/
function age(birthdayYear) {
    console.log("Pepovi je " + (currentYear - birthdayYear) + "let");
}
function fahrToCelsius(fahrenheit) {
    console.log( fahrenheit + "°F = " + ((fahrenheit - 32) * 5 / 9) + "°C"); 
}
function celsiusToFahr(celsius) {
    console.log (celsius + "°C = " + (celsius * 9 / 5 + 32) + "°F");
}
fahrToCelsius(0);
fahrToCelsius(30);
celsiusToFahr(-25);
celsiusToFahr(12);
/*4.%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech. 
Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n). 
Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!*/
function percents(numberOne, numberTwo) {
    if (numberTwo == 0) {
    console.log("Nelze dělit nulou!");
    }
    else {
    console.log(numberOne + " je " + (numberOne/numberTwo* 100).toFixed(2) + "% z " + numberTwo );
    }
}
/*5.Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. 
Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. 
Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.*/ 
function higherValue(arg1, arg2) {
    if (arg1 == arg2) {
    console.log("Čísla se rovnají.")
    }
    else {
        if (arg1 > arg2) {
            return arg1;
        }
        else {
            return arg2;
        }
    }
}
var a = higherValue(4.009, 8.4);
var b = higherValue(24/9, 3/5);
var c = higherValue(84, 22);
/*6.I can cleary see the pattern.
Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop. */
function numberMultiple() {
    for (var i = 13; i <= 730; i += 13) {
        console.log(i);
    }
}
/*7.Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru. */
function areaCircle(r) {
    if (r > 0) {
        console.log("Poloměr kružnice nesmí být záporný!");
    }
    else {
        return (Math.PI * r * r);
    }
}
/*8.Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.*/
function volumeCone(v,r) {
    if(v < 0 || r < 0) {
        console.log("Výška a poloměr kuželu nesmí obsahovat zápornou hodnotu!");
    }
    else {
        return(Math.PI *1/3 * r * r * v);
    }
}
/*9.Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.*/
function triangleValue(val1 , val2, val3) {
    if(val1 < 0 || val2 < 0 || val3 < 0 ) {
        console.log("Zadané délky nesmí obsahovat zápornou hodnotu!");
    }
    else {
        if (val1 + val2 <= val3 || val1 + val3 <= val2 || val2 + val3 <= val1) {
            return false;
        }
        return true;
    }
}
/*10.Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, tj. funkce dostane délky všech 3 stran. 
Použijte přitom předchozí validaci, tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()*/
function areaTriangle(side1, side2, side3) {
    if(side1 < 0 || side2 < 0 || side3 < 0 ) {
        console.log("Zadané délky nesmí obsahovat zápornou hodnotu!");
    }
    else {
        var s = (side1 + side2 + side3) / 2;
        return (Math.sqrt(s * (s - side1) * (s - side2) * (s - side3)));
    }
}