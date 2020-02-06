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