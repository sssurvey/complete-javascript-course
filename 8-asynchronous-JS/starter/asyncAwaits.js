const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        for (let i = 0; i < 10000000000; i++) { /**no op */ }
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
            for (let i = 0; i < 10000000000; i++) { /**no op */}
            if (id !== undefined) {
                resolve(`${id}: James W`);
            } else {
                reject();
            }
        }, 0, id);
    });
}

function finishingTouch(name) {
    return new Promise((resolve, reject) => {
        setTimeout((name) => {
            console.log('adding the finishing touch ...');
            for (let i = 0; i < 10000000000; i++) { /**no op */ }
            if (name !== undefined) {
                resolve(`-------- #### ${name} #### --------`);
            } else {
                reject();
            }
        }, 0, name);
    })
}

/**
 * We first define a function to be async, this will be the function that we use
 * to `await` the worker thread loads. `await` can handle the promise class, and
 * if the promise is resloved, it will assign the value to the ID, and if not, we
 * can use the normal try catch block to catch the things that is being thrown by
 * the `reject` callback from the promise.
 * 
 * Amazing. And very easy to use...
 * 
 * Compare this with the old version, it is totally different
 * this is a ES8 feature
 * 
 * The async function runs in the backgroud, and we can only have await call be
 * inside the async function...
 */
async function outPutEmployeeQuery() {
    console.log('function called')
    try {
        console.log('function called 1')
        const id = await getIds; // <--- will stop code execution until `resolved` 
        console.log('function called 2')
        const name = await getEmployeeName(id);
        console.log('function called 3')
        const final = await finishingTouch(name);
        console.log(final);
    } catch (error) {
        console.log(`exception :: ${error}`);
    }
}

/**
 * But how do we get a return from the async function?
 * we cannot simply use the return keyword at the end, since we return to the
 * outside, and since outside the function call got executed right away, we dont
 * have any thing to return at the time, which resulting in just having a promise
 * that is pending. got returned...
 * 
 * But keep in mind, that something we havent know yet!!!!
 * That as long as you tagged a function as async funtion, the return type
 * of that function become a promise!!!!
 * 
 * That means... you can use the then to extract the return out form the async
 * function.
 */
async function outPutEmployeeQueryWithReturn() {
    try {
        const id = await getIds;
        const name = await getEmployeeName(id);
        const final = await finishingTouch(name);
        return final;
    } catch (error) {
        console.log(`exception :: ${error}`);
    }
}

// getIds.then((conformation) => {
//     console.log(conformation)
//     if (conformation === 'resolved') {
//         return getEmployeeName(3);
//     }
// }).then((name) => {
//     console.log(name);
//     return finishingTouch(name);
// }).then((final) => {
//     console.log(final);
// }).catch(error => {
//     console.log(`Exception ${error}`);
// });


console.log('god damn! before');
outPutEmployeeQuery() // <----- commented, this is for demo async without return

// We can use the old promise to consume the asycn function with a return value.
// since if we return from a function that is asycn, the return type automatically
// wrapped into a promise.
outPutEmployeeQueryWithReturn().then((item) => {
    console.log(item);
});
console.log('god damn! after');