/* Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození. Použijte proměnné a pro výpis použijte zřetězení stringů. Jako názvy proměnných používejte anglické pojmy.*/
var year = new Date().getFullYear()
var yearOfBirth = 1979
var age = year - yearOfBirth
console.log("Pepe is " + age + " years old.")

/* WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. */

var celsiusTemperature = 20
var fahrenheihtTem = ((celsiusTemperature * 9) / 5) + 32
var celsiusTemp = ((fahrenheihtTem - 32) * 5) / 9
console.log(fahrenheihtTem)
console.log(celsiusTemp)

/* Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. */

function pepesAges {
    var year = new Date().getFullYear()
    var yearOfBirth = 1979
    var age = year - yearOfBirth
    console.log("Pepe is " + age + " years old.")
}

function temperature(temp) {
    var celsiusTemperature = 20
    var fahrenheihtTemperature = 68

    if (temp == celsiusTemperature)
        var fahrenheihtTem = ((celsiusTemperature * 9) / 5) + 32
    var celsiusTemp = ((fahrenheihtTem - 32) * 5) / 9
    console.log(fahrenheihtTem)
    console.log(celsiusTemp)
}