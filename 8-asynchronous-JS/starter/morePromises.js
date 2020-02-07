/**
 * For a promise, we have an executor function, which is the first Param for the
 * promise constructor, for this executor function, it also takes 2 params, which
 * is actually 2 different callbacks. One is called:
 * 
 * -> resolve, this is to handle the promise success case
 * -> reject, this is to handle the promise failure case
 */
const getIds = new Promise((resolve, reject) => {
    // fake long operations, we need to put the work to a worker thread,
    // that is why I make the setTimeout() web API call here.
    setTimeout(() => {
        // for loop for simulate long operations at worker thread
        for (let i = 0; i < 10000000000; i++) { }
        // random to simulate if there is an error or now
        if (Math.random() * 100 > 50) {
            resolve(`resolved`);
        } else {
            reject(`rejected`);
        }
    }, 0);
});

function getEmployeeName(id) {
    return new Promise((resolve, reject) => {
        setTimeout((id) => {
            console.log(`loading employee name for id: ${id}`);
            for (let i = 0; i < 10000000000; i++) { }
            resolve(`${id}: James W`);
        }, 0, id);
    });
}

function finishingTouch(name) {
    return new Promise((resolve, reject) => {
        setTimeout((name) => {
            console.log('adding the finishing touch ...');
            for (let i = 0; i < 10000000000; i++) { }
            resolve(`-------- #### ${name} #### --------`);
        }, 0, name);
    })
}

console.log('god damn! before');

// Here we start to listen to the promis result...

/**
 * Then then() allows us to pass in a function that handle the case of if the promise 
 * is successful.
 * 
 * No need to explain catch, it is just like then() but for reject cases.
 */
getIds.then((conformation) => {
    console.log(conformation)
    if (conformation === 'resolved') {
        return getEmployeeName(3); // <--- The return keyword here is important
        // We need the return keyoard so we can chain it.
    }
}).then((name) => {
    console.log(name);
    return finishingTouch(name);
}).then((final) => {
    console.log(final);
}).catch(error => {
    console.log(`Exception ${error}`);
});

// Notice this line got outputted before the getID return? Shows that the async
// nature of Promises
console.log('god damn! after');