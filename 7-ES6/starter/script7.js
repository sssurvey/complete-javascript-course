function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(11, 2, 21, 23);
console.log(sum1);

// In ES 5 if we want to supply variable argument as an array to this function we can use
// the following
var ages = [1, 2, 31, 45];
// with this line of code we achieved the calling using array
var sum2 = addFourAges.apply(null, ages); // param1 = null, since we dont have `this`
console.log(sum2);

// ES 6 way of doing it
const sum3 = addFourAges(...ages);
console.log(`ES6 spread call -> ${sum3}`);

let a = ['a', 'b', 'c'];
let d = ['d', 'e', 'f'];
let c = [...a, ...d];
let e = a.concat(d);
console.log(c);
console.log(e);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes]; // <--- all is a nodelist
const arr = Array.from(all);
console.log(arr);