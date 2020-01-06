var john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1990,
    family: ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: false,
    calcAge: function(birthYear) {
        return 2020 - birthYear;
    },
    calcAgeDemoThis: function() {
        return 2020 - this.birthYear;
    }
};

console.log(john.calcAge(john.birthYear)); // output -> 30
console.log(john.calcAgeDemoThis()); // same as previous call -> 30

// we can also save the value back to john obj.
// we can choose to have void method and do it in the method lazily
// or we can do it like this:
john.age = john.calcAgeDemoThis();
console.log(john.age); // as expected, we have output -> 30



