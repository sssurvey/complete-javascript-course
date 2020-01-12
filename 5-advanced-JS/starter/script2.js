// passing functions as arguments

var years = [1995, 1996, 2002, 2005, 2011];

function calculateAge(year) {
    return 2020 - year;
}

function arrayCalculator(array, calcFunction) {
    var result = [];
    array.forEach(element => {
        result.push(calcFunction(element));
    });
    return result;
}

// functions that returns function, basically this is a function that generates
// function for future use
function interviewQuestion(job) {
    switch (job) {
        case 'designer':
            return (name) => {
                console.log(name + ", can you please explain what's UX?");
            }
        case 'teacher':
            return (name) => {
                console.log("What subject do you teach, " + name + "?");
            }
        default:
            return (name) => {
                console.log("Hello " + name + ", what do you do?");
            }
    }
}

// closures
function retirement(retirementAge) {
    var outputString = " years until retirement."
    return (yearOfBirth) => {
        var age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + outputString)
    }
}

// re-write interview question with closure:
function interviewQuestionClosure(job) {
    return function (name) {
        switch (job) {
            case 'designer':
                console.log(name + ", can you please explain what's UX?");
                break;
            case 'teacher':
                console.log("What subject do you teach, " + name + "?");
                break;
            default:
                console.log("Hello " + name + ", what do you do?");
                break;
        }
    }
}

// console
(function consoleOutput() {

    // function that takes a function as param, output below
    console.log(arrayCalculator(years, calculateAge));
    
    // the first fucntion returns a function for us to call it
    // function that returns a function output below
    interviewQuestion('hacker')('Neo'); 
    var teacherQuestion = interviewQuestion('teacher');
    var designerQuestion = interviewQuestion('designer');
    teacherQuestion('John');
    designerQuestion('John');
    console.log('\n')

    // closure outputs below
    retirement(65)(1996);
    var teacherQuestion2 = interviewQuestionClosure('teacher');
    var designerQuestion2 = interviewQuestionClosure('designer');
    teacherQuestion2('Jane');
    designerQuestion2('Dan');
})();