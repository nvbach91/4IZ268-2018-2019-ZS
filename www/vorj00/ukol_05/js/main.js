const pi = Math.PI;
const thisYear = new Date().getFullYear();

/* HOMEWORK NUMERO CINQ */
/**
 * Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. 
 * Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.
 */
const pepe = {};
pepe.birthYear = 2000;
pepe.age = thisYear - pepe.birthYear;

console.log('Pepovi je', pepe.age, 'let');

/**
 * WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
var fahrenheiht = 451;
var celsius = 20;

var fToC = (fahrenheiht - 32) * 5 / 9;
var cToF = celsius * 9 / 5 + 32;

console.log(celsius+'°C =',Math.round(cToF)+'°C');
console.log(fahrenheiht+'°F =',Math.round(fToC)+'°C');

/**
 * Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
/* ES6! protože podpora je už (docela) dost dobrá — https://caniuse.com/#search=ES6 */
getAge = birthYear => {
    thisYear < birthYear ? console.log("Nemůže se narodit v budoucnu") : console.log('Věk:', thisYear - birthYear);
};

function temperatureConverter(n, resultUnit){
    let result;

    switch(resultUnit){
        case "F":
            result = n * 9 / 5 + 32;
            break;
        case "C":
            result = (n - 32) * 5 / 9
            break;
        default:
            return console.log("zadej prosím jednotku `C` nebo `F`");
    }

    console.log("Výsledek je:", result+"°"+resultUnit)
}

temperatureConverter(451, "C");
temperatureConverter(451, "D");
temperatureConverter(451, "F");
temperatureConverter(20, "F");
temperatureConverter(68, "C");

getAge(2000);
getAge(1999)
getAge(2001);
getAge(2048);

/**
 * %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
/* opět jiný zápis */
var percentage = function(n1, n2){
    if(n2 == 0){
        return console.log("Dělení nulou!")
    };

    n1 = n1.toFixed(2);
    n2 = n2.toFixed(2);

    let percentage = (n1 / n2 * 100).toFixed(2);
    console.log(n1, "je", percentage+"% z", n2);
}

percentage(21,42);
percentage(42,21);
percentage(0,21);
percentage(0,0);
percentage(21,0);
percentage(pi,259);
percentage(3.1415926535,259);

/**
 * Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
var maxNumber = (n1, n2) => {
    if(n1 == n2){
        console.log("Čísla se rovnají");
    } else {
        console.log("Větší je číslo",Math.max(n1, n2));
    }
}

maxNumber(1,0);
maxNumber(1,10);
maxNumber(1,1);
maxNumber(-1,0);

// trololoJS
maxNumber(1,"1");
maxNumber(1,true);
maxNumber(0,[]);
maxNumber(9, (!+[]+[]+![]).length);
maxNumber(91, 9+"1");

/**
 * I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730. Použijte for loop. 
 */
var times13 = () => {
    for(let i = 0; i <= 730; i+=13){
        console.log(i);
    }
}

times13();
/**
 * Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru. 
 */
var circleArea = radius => pi * radius**2;

/**
 * Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr. 
 */
var coneVolume = (height, radius) => 1/3 * pi * radius**2 * height;

/** 
 * Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
var isTriangle = (n1, n2, n3) => {
    let result = true;
    let values = [n1, n2, n3];
    let sum = values.reduce((a, b) => a + b, 0); // sečtu

    values.forEach((value) => {
        if((sum - value) < value){ // vynechávám záměrně rovno, protože by pak hodnota byla 0 a nedávalo by to smysl
            result = false;
            return;
        }
    })

    return result;
}

console.log(isTriangle(2,5,9));
console.log(isTriangle(1,5,0));
console.log(isTriangle(2,2,2));

/**
 * Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */

 var heronTriangle = (n1, n2, n3) => {
     if(!isTriangle(n1, n2, n3)){
         return "Nelze počítat"
     } else {
        let values = [n1, n2, n3];
        let semiperimeter = values.reduce((a, b) => a + b, 0) / 2;
        return (Math.sqrt(semiperimeter * (semiperimeter - n1) * (semiperimeter - n2) * (semiperimeter - n3)))
     }
 }

 console.log(heronTriangle(2,5,9));
 console.log(heronTriangle(2,2,2));