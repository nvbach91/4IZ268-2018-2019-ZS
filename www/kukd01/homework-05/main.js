//1.	Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
// Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.
var age;
var year = new Date().getFullYear();
var birth;
birth = 1997;

age = year - birth;

console.log("1.Pepe´s " + age + " old.");



//2.	WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
//Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto: 
//a.	z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
//b.	z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
var tempC = 20;
var tempF = 68;

vys1 = (tempC * 9) / 5 + 32 + "°F"; //převod z C na F
vys2 = ((tempF - 32) * 5) / 9 + "°C"; //převod z F na C

document.write("2. WTF=" + vys1);
document.write("<br>");
document.write("2. WTF=" + vys2);

//3.	Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. 
//Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
//Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
function pepesAge(year, birth) {
    var age;

    age = year - birth;
    alert("Pepovi je " + age + " let");
};

function temF(tempC) {
    var vys1;
    vys1 = (tempC * 9) / 5 + 32 + "°F";
    alert(vys1);
}

function temC(tempF) {
    var vys2;
    vys2 = ((tempF - 32) * 5) / 9 + "°C";
    alert(vys2);
}


//4.	%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech.
// Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n). 
//Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
function deleni(c1, c2) {

    var proc;
    if (c2 === 0) {
        console.log("Nelze dělit nulou!");
    }
    else {
        proc = ((c1 / c2) * 100).toFixed(2);
        console.log(c1 + " je " + proc + " % z " + c2);
    }
}


//5.	Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. 
//Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. 
//Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.
function comparision(c1, c2) {

    if (c1 === c2) {
        console.log("Čísla jsou stejná.");
    }
    else if (c1 > c2) {
        console.log(c1);
    } else {
        console.log(c2);
    }

}

var a = comparision(50.5, 40);
var b = comparision(40 / 50, 20 / 3);

//6.	I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. 
//Použijte for loop.
function nasobky() {
    for (var i = 13; i <= 730; i += 13) {
        console.log(i);
    }
}


//7.	Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.
function kruh(polomer) {
    var pi = Math.PI;
    var obsah = (polomer * polomer) * pi;
    console.log(obsah);
}

//8.	Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.
function kuzel(vyska, polomer) {
    var objem;
    var pi = Math.PI;
    objem = 1 / 3 * pi * (polomer * polomer) * vyska;
    console.log(objem);

}

//9.	Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, 
//tj. vypíše buď true/yes nebo false/no.
function triangle(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a || a * b * c === 0) {
        return false;
    }
    return true;
}


//10.	Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
// tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, když to má smysl. 
//Hint: funkce pro odmocninu je Math.sqrt()
function heron(a, b, c) {
    var yn;


    if (triangle(a, b, c) === true) {

        var s = (a + b + c) / 2;
        var objem = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(objem);
    }

}

