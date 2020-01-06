class Person {
    constructor(height, weight) {
        this.height = height;
        this.weight = weight;
    }

    calculateBMI() {
        this.bmi = this.weight / (this.height * this.height);
    }
}

function compareMarksBMIToJohn(p1, p2) {
    if (p1.bmi > p2.bmi) {
        console.log('true');
    } else if (p1.bmi === p2.bmi) {
        console.log('they are the same');
    } else {
        console.log('false');
    }
}

const mark = new Person(172, 66);
const john = new Person(172, 60);

mark.calculateBMI();
john.calculateBMI();

console.log('Is Mark\'s BMI higher than John\'s BMI?');
compareMarksBMIToJohn(mark, john);

// coding challenge 2
const firstTeam = [100, 200, 140];
const secondTeam = [100, 200, 143];

function calculateWinner(team1, team2) {
    let avgTeam1 = 0;
    const avgTeam2 = 0;
    team1.forEach((element) => {
        avgTeam1 += element;
    });
    team2.forEach((element) => {
        avgTeam1 += element;
    });
    switch (true) {
        case avgTeam1 < avgTeam2:
            console.log('Team 2 won');
            break;
        case avgTeam1 > avgTeam2:
            console.log('Team 1 won');
            break;
        default:
            console.log('Draw');
    }
}

calculateWinner(firstTeam, secondTeam);

// coding challenge 3
const amountSpendArr = [23, 55, 108];

function calculateTip(intArr) {
    const tipArr = [];
    intArr.forEach((e) => {
        switch (e) {
            case e > 0 && e < 20:
                tipArr.push(e * 0.2);
                break;
            case e >= 20 && e <= 50:
                tipArr.push(e * 0.15);
                break;
            default:
                tipArr.push(e * 0.1);
        }
    });
    tipArr.forEach((e) => {
        console.log('You need to pay just tip = ' + e + ' dollars.');
    });

    const totalAmountArr = [];
    let counter = 0;
    intArr.forEach((e) => {
        totalAmountArr.push(e + tipArr[counter++]);
    });
    totalAmountArr.forEach((e) => {
        console.log('You need to pay total = ' + e + ' dollars.');
    });
}

calculateTip(amountSpendArr);
