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

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

// console
(function consoleOutput() {
    console.log(arrayCalculator(years, calculateAge));
    
    // the first fucntion returns a function for us to call it
    interviewQuestion('hacker')('Neo'); 

    teacherQuestion('John');
    designerQuestion('John');
})();