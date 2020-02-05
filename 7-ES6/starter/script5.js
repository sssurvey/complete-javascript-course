// es 5
var john = ['john', 26];
console.log(john[0]);
console.log(john[1]);

// es 6 -> array deconstruct
const [name, age] = john;
console.log(name);
console.log(age);

// es 6 -> object deconstruct
const obj = {
    firstname: 'john',
    lastname: 'Kim'
};

// es 6 -> obj deconstruct with aliasing
const {
    firstname: fn,
    lastname: ln } = obj;

console.log(fn);
console.log(ln);