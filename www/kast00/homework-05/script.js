        /*Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/
        var yearOfBirth = 1994;
        var currentYear = (new Date()).getFullYear();
        console.log("Pepe's age is " + (currentYear - yearOfBirth));

        /*WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
       z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
       z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.*/
        var Celsius = 20;
        var Fahrenheiht = 68;
        console.log(Celsius + "°C = " + (((Celsius * 9) / 5) + 32) + "°F");
        console.log(Fahrenheiht + "°F = " + (((Fahrenheiht - 32) * 5) / 9) + "°C");

        /*Funkce function fonction funktio. 
        Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
        Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.*/
        function getAge(year) {
            return "Pepe's age is " + (currentYear - year);
        }
        console.log(getAge(1990));
        console.log(getAge(2000));
        function celsiusToFahrenheiht(celsiusTemp) {
            return celsiusTemp + "°C = " + (((celsiusTemp * 9) / 5) + 32) + "°F";
        }
        console.log(celsiusToFahrenheiht(12));
        console.log(celsiusToFahrenheiht(-17.77777777777778));

        function fahrenheihtToCelsius(fahrenheihtTemp) {
            return fahrenheihtTemp + "°F = " + (((fahrenheihtTemp - 32) * 5) / 9) + "°C";
        }
        console.log(fahrenheihtToCelsius(0));
        console.log(fahrenheihtToCelsius(100));

        /*%CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla v procentech. 
        Výsledek vypište do konzole, např. 21 je 50% z 42.
        Pro zkrácení / zaokrouhlování desetinných míst použijte funkci .toFixed(n). 
        Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!*/

        function getPercentage(num1, num2) {
            if (num2 === 0) {
                return "You cannot divide by zero!";
            } else {
                vysledek = (num1 / num2) * 100;
                vysledek = vysledek.toFixed(2);
                return num1 + " je " + vysledek + "% z " + num2;
            }
        }
        console.log(getPercentage(21, 42));
        console.log(getPercentage(21, 420));
        console.log(getPercentage(4, 0));

        /*Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich.
        Pokud se čísla rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky.
        Zkuste je párkrát zavolat v kódu a výsledky uložit do proměnných.*/
        function fight(num1, num2) {
            if (num1 === num2) {
                return "Cisla se rovnaji";
            }
            if (num1 > num2) {
                return num1;
            }
            if (num1 < num2) {
                return num2;
            }
        }

        var fight1 = fight(10, 20);
        var fight2 = fight(0, 0);
        var fight3 = fight(30, 20);
        var fight4 = fight(10.23, 10);
        var fight5 = fight(10 / 20, 11 / 20);
        console.log(fight1 + " " + fight2 + " " + fight3 + " " + fight4 + " " + fight5);

        /*I can cleary see the pattern. 
        Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší nebo rovno 730. 
        Použijte for loop.*/

        function getPattern() {
            var vysledek = "";
            for (let i = 0; i <= 730; i+=13) {
                vysledek = vysledek + " " + i;
            }
            return vysledek;
        }
        console.log(getPattern());

        /*Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru.*/
        function getArea(radius) {
            return Math.PI * radius * radius;
        }
        console.log(getArea(25));

        /*Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud znáte jeho výšku a poloměr.*/
        function getVolumeCone(height, radius) {
            return 1 / 3 * Math.PI * radius * radius * height;
        }
        console.log(getVolumeCone(20, 10));
        /*Not sure if triangle, or just some random values. 
        Vytvořte funkci, která rozhodne, zda se z dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.*/
        function triangle(a, b, c) {

            if (a + b > c && a + c > b && b + c > a) {
                return true;
            } else {
                return false;
            }
        }

        console.log(triangle(3,3,3));

        /*Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, tj. funkce dostane délky všech 3 stran. 
        Použijte přitom předchozí validaci, tj. počítejte pouze, když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()*/
        function heroicPerformance(a,b,c) {
            if (triangle(a,b,c)) {
                var s = (a+b+c)/2;
                return Math.sqrt(s*(s-a)*(s-b)*(s-c));
            } else {
                return "Nelze";
            } 
        }
        console.log(heroicPerformance(3,3,3));