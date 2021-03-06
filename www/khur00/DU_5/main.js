/* 1.	
Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození.
Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy. */

var pepeYear = "Write Pepe's year of birth";
var year = new Date().getFullYear();
console.log("Pepe's age is " + (year - pepeYear));
/**
 * 2.
 * WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
var celsius = 20;
var fahrenheiht = 68;
console.log(celsius + "°C = " + (celsius * 9 / 5 + 32) + "°F");
console.log(fahrenheiht + "°F = " + ((fahrenheiht - 32) * 5 / 9) + "°C");
/**
 * 3.
 * Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
function getPepa(pepeYear) {
    console.log("Pepe's age is " + (year - pepeYear));
}
function getCels(celsius) {
    console.log(celsius + "°C = " + (celsius * 9 / 5 + 32) + "°F");
}
function getFaren(fahrenheiht) {
    console.log(fahrenheiht + "°F = " + ((fahrenheiht - 32) * 5 / 9) + "°C");
}
/**
 * 4.
 * %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
function getProcent(first_number, second_number) {
    if (second_number === 0) {
        console.log("Function will not work");
    }
    else {
        console.log(first_number + " je " + (first_number / second_number * 100).toFixed(0) + "%" + " z " + second_number);

    }

}
/**
 * 5.
 * Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
function getMax(first_number, second_number) {
    if (first_number === second_number) {
        console.log("Numbers are equal");
    }
    else {
        console.log(Math.max(first_number, second_number) + " is greater than" + " " + Math.min(first_number, second_number));
    }

}
var a = getMax(10, 9);
var b = getMax(7 / 2, 8 / 4);
var c = getMax(1.5, 2.5);
/**
 * 6.
 * I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730. Použijte for loop. 
 */

function getLine() {
    for (var i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}
/**
 * 7.
 * Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru. 
 */
function getRad(r) {
    if (r <= 0) {
        console.log("Function will not work");
    }
    else {
        console.log(r * r * Math.PI + " is right answer");
    }
}
/**
 * 8.
 * Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr. 
 */
function getCone(h, r) {
    if (h <= 0 || r <= 0) {
        console.log("Function will not work");
    }
    else {
        console.log((r * r * Math.PI * h) / 3 + " is right answer");
    }
}
/** 
 * 9
 * Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */

function getTriangle(z, y, x) {
    if (z <= 0 || y <= 0 || x <= 0) {
        console.log("Function will not work");
    }
    else {
        if (z > (y + x) || y > (x + z) || x > (y + x)) {
            return false;
        }
        return true;
    }
}
/**
 * 10
* Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
* tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
* když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
*/
function getHeron(z, y, x) {
    if (getTriangle(z, y, x)) {
        var s = (z + y + x) / 2;
        return (Math.sqrt(s * (s - x) * (s - y) * (s - z)) + " is right answer");
    }
    else {
        return false;
    }
}
