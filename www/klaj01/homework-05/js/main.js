/* 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/
var yearofbirth = 1998;
var actualyear = new Date().getFullYear();
var pepesage = actualyear - yearofbirth;

console.log('Pepovi je: ' + pepesage + ' let');
/*2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
    1) z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
    2) z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/

var cels = 20;
var fahr = 68;

var fahrenheiht = cel * 9 / 5 + 32;
var celsius = (fah - 32) * 5 / 9;

console.log(cels + 'stupnů celsia je:' + fahrenheiht + 'stupnů fahrenheita');
console.log(fahr + 'stupnů fahrenheita je:' + celsius + 'stupnů celsia');

/* 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. */
var ageOfPepa = function (yearOfBirth) {
    var actualyear = new Date().getFullYear();
    var age = actualyear - yearOfBirth;
    if (age >= 0) {
        return age;
    }
    else {
        return 'Špatně zadaný rok narození';
    }
};
var convertor = function (targetScale, tempeture) {
    switch (targetScale) {
        case 'C':
            return (tempeture * 9 / 5) + 32;
        case 'F':
            return (tempeture - 32) * 5 / 9;
        default:
            return 'Neznámé hodnoty';
    }
};
/*4)%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!*/

var divide = function (a, b) {
    if (b !== 0) {
        var c = a / b * 100;
        console.log(a + ' je ' + c.toFixed(2) + '% z ' + b);
    } else {
        console.log('Nulou nelze dělit');
    }

};

/*5)Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.*/
var biggerNumber = function (num1, num2) {
    if (num1 > num2) {
        return num1;
    }

    if (num1 < num2) {
        return num2;
    }

    return 'Čísla se rovnají';
};
var a = biggerNumber(3 / 4, 5 / 6);
var b = biggerNumber(0.3, 0.5);
var c = biggerNumber(7, 7);
/*6)I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. Použijte for loop.*/
for (var i = 0; i <= 730; i += 13) {
    console.log(i);
};
/*7)Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.*/

var circleArea = function (radius) {
    return (Math.PI * Math.pow(radius * radius));
};

/*8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.*/
var coneVolume = function (radius, height) {
    return (1 / 3 * Math.PI * Math.pow(radius * radius) * height);
}
/*9)Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.*/
var triangle = function (a, b, c) {
    if ((a >= b + c || b >= a + c || c >= a + b)) {
        return true;
    }
    return false;
}

/*10)Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()*/
var heronFormula = function (a, b, c) {
    if (triangle(a, b, c)) {
        var s = (a + b + c) / 2;
        var area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(area);
    } else {
        console.log('Trojúhelník nelze sestavit');
    }
}
heronformula(30, 40, 50);
heronformula(130, 40, 50);