/* Pepe's age. Vypište na konzoli smysluplnou oznamovací větu 
ohledně věku Pepy, pokud znáte jeho rok narození. Použijte 
proměnné a pro výpis použijte zřetězení stringů. 
Jako názvy proměnných používejte anglické pojmy.*/
var currentYear = new Date().getFullYear();
var pepeYear = 1996;
var pepeAge = currentYear - pepeYear;
console.log("Ahoj, Pepe age is " + pepeAge + ".");

/* WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, 
pokud znáte teplotu v Celsius, a také naopak. 
Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. 
Výpočet probíhá takto:*/
var tempC = 22;
var tempF = 100;
// a. z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
var temp = tempC * 9 / 5 + 32;
console.log("Ahoj, " + tempC + "°C in Fahrenheiht is " + temp + "°F.");
// b. z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
var temp = (tempF - 32) * 5 / 9;
console.log("Ahoj, " + tempF + "°F in Celsius is " + temp + "°C.");

/* Funkce function fonction funktio. Vemte předchozí úlohy 
a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají 
argumenty, a na základě argumentů po zavolání vypíše výsledek 
na konzoli. Párkrát zavolejte tyto funkce s různými argumenty. 
V konzoli také vyzkoušejte, zda fungují vaše funkce.*/
function myFunction_1(a,b) {
	var resF = a * 9 / 5 + 32;
	console.log("Ahoj, " + a + "°C in Fahrenheiht is " + resF + "°F.");
	var resC = (b - 32) * 5 / 9;
	console.log("Ahoj, " + b + "°F in Celsius is " + resC + "°C.");
}

myFunction_1(22,100);
myFunction_1(50,200);
myFunction_1(77,222);

/*%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty 
a vrátí podíl prvního čísla a druhého čísla v procentech. 
Výsledek vypište do konzole, např. 21 je 50% z 42. Pro 
zkrácení / zaokrouhlování desetinných míst použijte 
funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
Pozor na dělení nulou!*/
function myFunction_2(c,d) {
	if(d != 0) {
	var res2 = c/d*100;
	console.log("Ahoj, " + c + " je " + res2.toFixed(2) + "% z " + d + ".");
} else {
	console.log("Ahoj, do not divide by 0!");
}
}

myFunction_2(21,0);

/*Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty 
a vrátí ten větší z nich. Pokud se čísla rovnají, vypište, že 
se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, 
zlomky. Zkuste je párkrát zavolat v kódu a výsledky uložit do 
proměnných.*/
function myFunction_3(e,f) {
	if (e > f) {
		console.log("Ahoj, " + e + " is bigger than" + f + ".");
	} else if (e < f) {
		console.log("Ahoj, " + f + " is bigger than " + e + ".");
	} else {
		console.log("Ahoj, " + e + " is equal to " + f + ".");
	}
}

myFunction_3(22.02,22.22);
myFunction_3(5,10);
myFunction_3(8,7);

/*I can cleary see the pattern. Vytvořte funkci, která vypíše 
popořadě všechny násobky 13, které jsou menší nebo rovno 730. 
Použijte for loop.*/
function myFunction_4() {
	for (var i = 0; i <= 730; i+=13) {
		console.log(i);
	}
}

myFunction_4();

/*Around and about. Vytvořte funkci, která vypočte obsah 
kružnice podle dodaného poloměru.*/
function myFun5(h) {
	var pi = Math.PI;
	var res3 = pi*Math.pow(h,2);
	console.log("Ahoj, obsah kruhu je " + res3 + "sth square.");
}

myFun5(4);

/*Another dimension. Vytvořte funkci, která vypočte objem
kuželu, pokud znáte jeho výšku a poloměr.*/
function myFun6(j,k) {
	var pi = Math.PI;
	var res4 = (pi*Math.pow(k,2)*j)/3;
	console.log("Ahoj, objem kužele je " + res4 + "sth round.");
}

myFun6(10,5);

/*Not sure if triangle, or just some random values. 
Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá 
postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.*/
function myFun7(l,m,n) {
	var y = new Boolean(l+m > n);
	console.log(y);
}

myFun7(13,5,16);
myFun7(11,5,16);

/*Heroic performance. Vytvořte funkci, která vypočte obsah 
trojúhelníka podle Heronova vzorce, tj. funkce dostane délky 
všech 3 stran. Použijte přitom předchozí validaci, tj. 
počítejte pouze, když to má smysl. Hint: funkce pro odmocninu 
je Math.sqrt()*/
function myFun8(o,p,q) {
	var z = new Boolean(o+p > q);
	if(z == true) {
		var s = (o+p+q)/2;
		var res5 = Math.sqrt(s*(s-o)*(s-p)*(s-q));
		console.log("Ahoj, obsah trojúhelníka je " + res5 + "sth square.");
	} else {
		console.log("Ahoj, obsah nejde vypočítat.");
	}
}

myFun8(13,5,16);
myFun8(11,5,16);