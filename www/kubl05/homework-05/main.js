/* HOMEWORK NUMERO CINCO */
/**
 * Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
 * Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.
 */
// SPOILER ALERT!

var birthYear = 2000;

var currentYear = new Date().getFullYear();
var age = currentYear - birthYear;

console.log("Pepeho věk je: " + age);

/**
 * WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// SPOILER ALERT!

var celsius = 20, fahrenheiht = 100;
var fahrenheihtTransferred, celsiusTransferred;

fahrenheihtTransferred = ((celsius * 9) / 5) + 32;
celsiusTransferred = ((fahrenheiht - 32) * 5) / 9;

console.log(celsius + "°C = " + fahrenheihtTransferred + "°F");
console.log(fahrenheiht + "°F = " + celsiusTransferred + "°C");

/**
 * Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// SPOILER ALERT!

var getAge = function (birthYear) {
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;

    return age;
};

var getFahrenheiht = function (celsius) {
    var fahrenheihtTransferred = ((celsius * 9) / 5) + 32;

    return fahrenheihtTransferred;
};

var getCelsius = function (fahrenheiht) {
    var celsiusTransferred = ((fahrenheiht - 32) * 5) / 9;

    return celsiusTransferred;
};

/**
 * %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// SPOILER ALERT!

var getPercent = function (firstNumber, secondNumber) {

    if (secondNumber !== 0) {
        var percent = ((firstNumber / secondNumber) * 100).toFixed(0);
        return firstNumber + " je " + percent + "%" + " z " + secondNumber;
    }

    return "nulou se nedělí :/" //Takhle?
};

console.log(getPercent(10, 20));
console.log(getPercent(10, 0));

/**
 * Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// SPOILER ALERT!

var whoIsBigger = function (a, b) {
    if (a > b) {
        return a;
    }
    else if (a < b) {
        return b;
    }
    else {
        return a + " = " + b;
    }
};

var x, y, z;

x = whoIsBigger(5, 10);
y = whoIsBigger(5.2, 5.1);
z = whoIsBigger(5 / 5, 10 / 2);

/**
 * I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730. Použijte for loop. 
 */
// SPOILER ALERT!

var getMultiplesOfThirteen = function () {
    var multiples = "";

    for (var i = 13; i <= 730; i += 13) {
        multiples += i + " ";
    }

    return multiples;
};

/**
 * Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru. 
 */
// SPOILER ALERT!

var getCircleArea = function (radius) {
    var area = Math.PI * Math.pow(radius, 2);

    return area.toFixed(2);
};

/**
 * Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr. 
 */
// SPOILER ALERT!

var getConeVolume = function (height, radius) {
    var volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;

    return volume.toFixed(2);
};

/** 
 * Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// SPOILER ALERT!

var isTriangle = function (sideA, sideB, sideC) {
    if (sideA + sideB > sideC && sideB + sideC > sideA && sideC + sideA > sideB) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// SPOILER ALERT!

var getTriangleContent = function (sideA, sideB, sideC) {

    if (isTriangle(sideA, sideB, sideC)) {
        var s = (sideA + sideB + sideC) / 2;
        var content = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

        return content.toFixed(2);
    }

    return "nejde o trojúhelník";
};