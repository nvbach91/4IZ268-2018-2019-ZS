alert('hello world!');

// comment

/* 
multi line
comment
*/

//Boolean
var a = true;
var b = false;

//Number
var c = 42;
var d = 13.012122;

//String
var e = '42'
var f = 'ahoj svet';

var div = '<div class="class"></div>'

//undefined
var h = undefined;

//null
var i = null;

//variables
var j = 'jjj'; //globálna premenná, prepisateľná
let k = 'k'; //lokálna premenná, prepisateľná
const pi = '3.14'; //konštanta, nezmeniteľná
// pi = 10 - chyba nemožno zmeniť
j = 'abc';
k = 15;

//functions
var lambda = function () {
    alert('funkcia l zavolaná');
};
lambda();

var addUp = function (a, b) {
    var sum = a + b;
    return sum;
};
//addUp(5, 10);

//arrays
var p = [1, 2, 3, 4, 5];
var q = ['ananas', 'banana', 'pineapple'];

//objects
var o = {
    age: 42,
    name: 'Bob',
    kids: ['Charles', 'Anna'],
    isBald = false,
};

var dave = {
    name: 'David',
    age: 59,
    job: 'Beggar',
    money: 0,
    achievements: [],
}
