/*1.Pepe's age */
var Pepe = {
    firstname: "Pepa",
    age: "30"
}
document.getElementById("pepe's_age").innerHTML = "Pepe is "+ Pepe.age;


function toCelsius(f) {
    return "Fahr =77, celsius ="+ (5/9) * (f-32);
}
document.getElementById("demo").innerHTML = toCelsius(77);

function toFahrenheiht(c){
    return ((c*9)/5)+32;
}
document.getElementById("demo2").innerHTML = toFahrenheiht(25);

/*WTF*/ 
var temperatureCelsius ={ 
    celsius: 30,
    fahr: ((celsius+32)*(9/5))
};
document.getElementById("celsius").innerHTML = "Teplota ve Fahrenheitech je "+temperatureCelsius.fahr;

var temperatureFahr ={ 
    fahr: 111,
    celsius: ((fahr-32)*(5/9))
};
document.getElementById("fahr").innerHTML = "Teplota v celsiich je "+temperatureFahr.celsius;

/*%CENSORED*/
function divide(firstN, secN){
       return (firstN/secN);
}
document.getElementById("deleni").innerHTML = divide(10,5);

