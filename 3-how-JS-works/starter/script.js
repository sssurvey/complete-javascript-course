///////////////////////////////////////
// Lecture: Hoisting
calculateAge(2000);

function calculateAge(year) {
    console.log(2016 - year);
}

// calculateAge2(2000);
console.log(calculateAge2);
var calculateAge2 = (year) => {
    console.log(2016 - year)
}
console.log(calculateAge2);
calculateAge2(2000);

this.console.log((this instanceof Window));
console.log(this);
this.onclick = function() {
    this.console.log("clicked");
}

var temp = {
    name: "temp",
    myFunc: function() {
        console.log(this);
        innerFunc();
        function innerFunc() {
            console.log(this);
        }
    }
}

temp.myFunc();

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









