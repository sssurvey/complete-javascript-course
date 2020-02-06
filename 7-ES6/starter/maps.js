// ES 6 new, the Map data structure

/**
 * Note that in the ES5 we can use the object to subsitute as a map data structure.
 * 
 * However, that is very limiting, since we can only use string as the key. Now in
 * ES 6 with the map DS, we can use any *primitive* type as the key value.
 * */ 

const question = new Map();

// Notice the map allows you to use mixed type as the key or the value
question.set('question', 'What is the official name of the latest major javascript version?');
question.set(1, 'ES 5');
question.set(2, 'ES 6');
question.set(3, 'ES 2015');
question.set(4, 'ES 7');
question.set('correct', 3);
question.set(true, 'correct answer!');
question.set(false, 'wrong answer!');

// Log the map object to print out the entire map DS
console.log(question);

console.log('-----------------------------------')
// <---------------------------------------------------------->

// .get(key) to get the specific value from map
console.log(question.get('question'));
console.log(question.has('question'));

// .delete(key), delete specific key
// ---> question.delete(4);

// .clear() deletes everything
// ---> question.clear();

// Set, get, has, delete and clear are the most important methods for use when
// dealing with the map class.

// <---------------------------------------------------------->

// Other important things about the map --- we can also iterate through it...
question.forEach((value) => console.log(value));
question.forEach((value, key) => console.log(value, key));

for (let entry of question) {
    console.log(entry);
}

for (let [key, value] of question.entries()) {
    console.log(key + " " + question.get(value));
}

// console.log(question);