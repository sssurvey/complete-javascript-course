let firstName = 'John';
let lastName = 'Smith';

const yearOfBirth = 1990;

function calculateAge(year) {
    return 2016 - year;
}

console.log(`This is ${firstName} ${lastName}. And his age is ${calculateAge(yearOfBirth)}`);

const fullName = `${firstName} ${lastName}`;

console.log(fullName.startsWith('J'));  // output true
console.log(fullName.startsWith('K'));  // output false

console.log(fullName.endsWith('h'));  // output true
console.log(fullName.endsWith('H'));  // output false

console.log(fullName.includes('hn')); // output true
console.log(fullName.includes('ss')); // output false

console.log(fullName.repeat(5)); // repeat fullname 5 times