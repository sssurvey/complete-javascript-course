// create object using constructor
// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

function consoleOut() {
    console.log(john);
    console.log(jane);
    console.log(mark);
    console.log(kent);
    console.log(john.species);
    console.log(jane.species);
    console.log(kent.species);
    kent.usePower();
    john.calculateAge();
}

// now we will create a constructor of john type of object called Person
// the convention for creating constructor is to set the first letter capital case
// just like what we do for class
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

// Now lets consider the inheritance case
// we simply access the prototype property of the Person constructor and add
// new property that is a function to the prototype. And since we know that 
// the prototype is not really for the constructor, but for the instance that
// is created by the constructor, we know that we can access these method from
// our new instances of the person object. And the reason why we did not add this
// function to the object directly using this in the constructor is that the method
// code would repeat every time we create a new instance, this will cause overhead
Person.prototype.calculateAge = function () { // adding method
    console.log(2020 - this.yearOfBirth);
}
Person.prototype.species = 'Homo Sapiens';

// Now notice the new keyword new that we used here inorder to use the constructor
// to create a instance for the john obj, instantiation, is the word
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

// BONUS: How do you do sub class, a.k.a make a class that is Person's sub-class
var SuperHero = function(name, yearOfBirth, job, power) {
    Person.call(this, name, yearOfBirth, job);
    this.power = power;
}
// The create keyword is special!
// the object.create is a special method to create prototype that inherit from a
// prototype!
SuperHero.prototype = Object.create(Person.prototype);
SuperHero.prototype.usePower = function() {
    console.log(this.power);
}

// add super hero
var kent = new SuperHero('Kent', 1000, 'Journalist', 'fly');

// out put for logging
consoleOut();