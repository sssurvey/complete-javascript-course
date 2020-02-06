const boxes = document.querySelectorAll('.box'); // node list returned

//ES5 -> nodeList to array
var boxarrs = Array.prototype.slice.call(boxes);
boxarrs.forEach(element => {
    element.style.backgroundColor = 'dodgerblue';
});

//ES6 -> nodeList to array
const boxarrs2 = Array.from(boxes); // <--- notice the new array from
boxarrs2.forEach( element => element.style.backgroundColor = 'green');

//ES 6 new loops for of <--- this is new in es6
for (const item of boxes) {
    console.log(item.className);
}

let ages = [12, 17, 16, 18, 14, 11, 20];

//ES6 find index --> sample to find age > 18
/**
 * Notice the sample here, we pass in a logic for the condition to be true, once
 * we return a true value from the condition, we got the index for that condition
 * to be true.
 * 
 * Note it breaks after we find the first one.
 */
let sample = ages.findIndex(current =>  current > 18);
console.log(sample);
let sample2 = ages.find(current => current > 18); // this returns the value
console.log(sample2);