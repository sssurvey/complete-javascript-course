// class in ES6

class People {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // this is a method
    toString() {
        return `The name is: ${this.name}, the age is: ${this.age}`;
    }

    // this is a static method
    static greeting() {
        return 'Hi there!';
    }
}

let people = new People('Ggoogle', 32);
console.log(people.toString());
console.log(People.greeting());

// inheritance in ES6

class Athlete extends People {

    constructor(name, age, olympicGames, medals) {
        super(name, age); // <-------- important call
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    // override to string
    toString() {
        return `The athelete's name is: ${this.name}, the age is: ${this.age}.`
        + ` He has attended ${this.olympicGames} olympicgames and won ${this.medals} medals!`;
    }

    wonMedal() {
        this.medals++;
        console.log(`Now ${this.name} has ${this.medals} medals!`);
    }
}

const athlete = new Athlete('John', 23, 3, 10);
console.log(Athlete.greeting());
console.log(athlete.toString());
athlete.wonMedal()
// console.log();