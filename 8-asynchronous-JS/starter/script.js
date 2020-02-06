console.log(1);
// Note, setTimeout does not block!
setTimeout(() => console.log(2), 1000); 
console.log(3);
// output = 1,3,,,,2
