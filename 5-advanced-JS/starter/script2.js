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

(function consoleOutput() {
    console.log(arrayCalculator(years, calculateAge));
})();
