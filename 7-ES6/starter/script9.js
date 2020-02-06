// ES 5 -> using default params:
// In ES5 this is like a DIY
function tryOutDefaultsES5(param1, param2, param3) { 
    var s1 = param1 === undefined ? 'default provide 1' : param1;
    var s2 = param2 === undefined ? 'default provide 2' : param2;
    var s3 = param3 === undefined ? 'default provide 3' : param3;
    console.log('1: ' + s1 + ' 2: ' + s2 + ' 3: ' + s3);
}
tryOutDefaultsES5('haha');
tryOutDefaultsES5('haha', undefined,'jaja');

console.log('--------------');
// ------
// ES 6 -> using default params:
function tryOutDefaultsES6(param1 = 'default 1', param2 = 'default 2', param3 = 'default 3') {
    console.log(`1: ${param1} 2: ${param2} 3: ${param3}`);
}
tryOutDefaultsES6('jaja');
tryOutDefaultsES6('haha', undefined, 'jaja');