class Person {

    constructor(height, weight) {
        this.height = height;
        this.weight = weight;
        this.bmi = this.weight / (this.height * this.height);
    }

}

function compareMarksBMIToJohn(p1, p2) {
    if (p1.bmi > p2.bmi) {
        console.log("true");
    } else if (p1.bmi == p2.bmi) {
        console.log("they are the same");
    } else {
        console.log("false");
    }
}

var mark = new Person(172, 66);
var john = new Person(172, 60);

console.log("Is Mark's BMI higher than John's BMI?");
compareMarksBMIToJohn(mark, john);

// coding challenge 2
var firstTeam = [100, 200, 140];
var secondTeam = [100, 200, 143];

function calculateWinner(team1, team2) {
    var avgTeam1 = 0;
    var avgTeam2 = 0;
    team1.forEach(element => {
        avgTeam1 += element;
    });
    team2.forEach(element => {
        avgTeam1 += element;
    });
    switch (true) {
        case avgTeam1 < avgTeam2:
            console.log("Team 2 won");
            break;
        case avgTeam1 > avgTeam2:
            console.log("Team 1 won");
            break;
        default:
            console.log("Draw");
    }
}

calculateWinner(firstTeam, secondTeam);