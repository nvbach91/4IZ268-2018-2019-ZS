/*Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně
věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro výpis
 použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/
 var birthYear = 1999;
 var currentYear = 2018;
 var age = currentYear-birthYear;
 console.log("Pepův věk je " + age + " let");

 /*WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu
 v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C.
 Výpočet probíhá takto:
    a. z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
    b. z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/
var a = 20;
var vypocet = (9*a)/5 + 32;
console.log(a + "°C = " + vypocet + "°F");

var b = 68;
var vypocet = ((b-32)*5)/9;
console.log(b + "°F = " + vypocet + "°C");

/*Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich
funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů
po zavolání vypíše výsledek na konzoli. Párkrát zavolejte tyto funkce s různými
argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.*/
//Pepův věk
var countAge = function(currentYear, birthYear) {
    var age = currentYear-birthYear;
 console.log("Pepův věk je " + age + " let");
}
//převod C a F
var prevod = function(a, b)
 {
     var jednotka = ['C','F'];
     var x = jednotka.shift(0);
     var y = jednotka.shift(1);
if (b == x) {
    var vypocet = (9*a)/5 + 32;
    console.log(a + "°" + jednotka + "=" + vypocet + "°F")
}
else { if (b == y) {
    var vypocet = ((a-32)*5)/9;
    console.log(a + "°" + jednotka + "=" + vypocet + "°C")
}
else {
    console.log("error");
}
}
}