/*Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně
věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro výpis
 použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/
var birthYear = 1999;
var currentYear = new Date().getFullYear();
var age = currentYear - birthYear;
console.log("Pepův věk je " + age + " let");

/*WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu
v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C.
Výpočet probíhá takto:
   a. z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
   b. z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/
var a = 20;
var result = (9 * a) / 5 + 32;
console.log(a + "°C = " + result + "°F");

var b = 68;
var result = ((b - 32) * 5) / 9;
console.log(b + "°F = " + result + "°C");

/*Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich
funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů
po zavolání vypíše výsledek na konzoli. Párkrát zavolejte tyto funkce s různými
argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.*/

//Pepův věk
var countAge = function (birthYear) {
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;
    console.log("Pepův věk je " + age + " let");
}

//převod C a F
var transform = function (a, unit) {
    var temp = ['C', 'F'];
    var x = temp[0];
    var y = temp[1];
    if (unit === x) {
        var result = (9 * a) / 5 + 32;
        console.log(a + "°" + unit + "=" + result + "°F");
    }
    else {
        if (unit === y) {
            var result = ((a - 32) * 5) / 9;
            console.log(a + "°" + unit + "=" + result + "°C");
        }
        else {
            console.log("error");
        }
    }
}

/*%CENSORED%. Vytvořte funkci, která vezme 2 číselné 
argumenty a vrátí podíl prvního čísla a druhého 
čísla v procentech. Výsledek vypište do 
konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování 
desetinných míst použijte funkci .toFixed(n). 
Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!*/
var division = function (a, b) {
    if (b !== 0) {
        var result = (a / b) * 100;
        result = result.toFixed(2);
        console.log(a + " je " + result + "% z " + b);
    }
    else {
        console.log("Dělení nulou!");
    }
}

/*Kdo s koho. Vytvořte funkci, která vezme 2 číselné
argumenty a vrátí ten větší z nich. Pokud se čísla 
rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost 
pro celá čísla, desetinná čísla, zlomky. Zkuste je párkrát 
zavolat v kódu a výsledky uložit do proměnných.*/
var comparison = function (a, b) {
    var x;
    if (a === b) {
        console.log(a + " se rovná " + b);
        var text = a + " se rovná " + b;
        x = text;
    }
    else if (a > b) {
        console.log(a);
        x = a;
    }
    else {
        console.log(b);
        x = b;
    }
    return x;
}

var a = comparison(5,5);
var b = comparison(2,3);
var c = comparison(2.5,5.5);
var d = comparison(2/5,9/8);

/*I can cleary see the pattern. Vytvořte funkci, která
vypíše popořadě všechny násobky 13, které jsou menší 
nebo rovno 730. Použijte for loop.*/
var pattern = function () {
    for (var i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}

/*Around and about. Vytvořte funkci, která vypočte obsah
kružnice podle dodaného poloměru.*/
var circleArea = function (r) {
    const pi = Math.PI;
    result = pi * r * r;
    console.log(result);
}

/*Another dimension. Vytvořte funkci, která vypočte objem
kuželu, pokud znáte jeho výšku a poloměr.*/
var coneVolume = function (r, v) {
    const pi = Math.PI;
    result = 1 / 3 * (pi * r * r * v);
    console.log(result);
}

/*Not sure if triangle, or just some random values. Vytvořte
funkci, která rozhodne, zda se z dodaných 3 délek dá postavit
trojúhelník, tj. vypíše buď true/yes nebo false/no.*/
var triangle = function (a, b, c) {
    var decision = true;
    var x = a + b;
    var y = a + c;
    var z = b + c;
    if (x > c && y > b && z > a) {
        console.log(decision);
    }
    else {
        decision = false;
        console.log(decision);
    }
    return decision;
}

/*Heroic performance. Vytvořte funkci, která vypočte obsah 
trojúhelníka podle Heronova vzorce, tj. funkce dostane 
délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte 
pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()*/
var heron = function (a, b, c) {
    var s = ((a + b + c) / 2);
    if (triangle(a,b,c)===true) {
        var S = s * ((s - a) * (s - b) * (s - c));
        var result = Math.sqrt(S);
        console.log(S);

    }
    else {
        console.log("Nelze sestrojit trojúhelník");
    }
}                                        