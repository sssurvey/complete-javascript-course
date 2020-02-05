const years = [1990, 1994, 1996, 1999, 2002];

// old school: arrow style
var ages = years.map((year) => {
    return 2020 - year;
});
// even shorter: arrow style
var ages = years.map(year => 2020 - year);

// old school: function style
var ages = years.map(function (year) { 
    return 2020 - year;
});

for (let age of ages) {
    console.log(age);
}



for (let age of ages) {
    console.log(age);
}

var tems = {
    a: 'haha',
    b: 'jaja',
    c: 'lol',
    d: 'huehue',
}

console.log('------');

for (let item in tems) {
    console.log(item)
}

// --------------
