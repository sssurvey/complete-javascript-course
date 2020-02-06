// ES 5 way:

// To do it in the ES5 way, we can write a function without any parameters. And
// then we refer the params via the arguments keyword! Note that this is actually
// a keyword that allows us to address the param of the function.
function isFullAge5() {
    // console.log(arguments); -> OUTPUT: { '0': 1990, '1': 1992, '2': 1993 }
    // the arguments is an array like structure, that we must cast it into an array
    Array.prototype.slice.call(arguments).forEach(function (element) {
        (2020 - element) > 18 ? console.log('Is fullage') : console.log('Is not fullage');
    });
}

isFullAge5(1990, 1992, 1993);

// ES 5 with mixed var
function isFullAge5(legalAge) {
    // console.log(arguments); -> OUTPUT: { '0': 1990, '1': 1992, '2': 1993 }
    // the arguments is an array like structure, that we must cast it into an array
    Array.prototype.slice.call(arguments, 1).forEach(function (element) {
        (2020 - element) > legalAge ? console.log('Is fullage') : console.log('Is not fullage');
    });
}

isFullAge5(21,1990, 1992, 1993);

// ES 6 way:
function isFullAge6(...ages) {
    ages.forEach(element => (2020 - element) > 18 ? 
        console.log('Is fullage') : console.log('Is not fullage'))
}

isFullAge6(1992, 1998, 1990)

// ES 6, with mixed vars
function isFullAge6(legalAge, ...ages) {
    ages.forEach(element => (2020 - element) > legalAge ?
        console.log('Is fullage') : console.log('Is not fullage'))
}

isFullAge6(18, 1992, 1998, 1990)