// This a demo of the traditional callback way of doing the
// async javascript developement...

let map = new Map();
map.set(432, 'Employee 3');
map.set(883, 'Employee 4');
map.set(523, 'Employee 2');
map.set(974, 'Big Boss 666');

function getRecipe() {

    console.log('fetching data ...')

    // \\\\\\First layer of the callback
    setTimeout(() => {
        const recipeId = [523, 883, 432, 974];
        console.log('data fetching completed.')
        console.log('analyzing id ...')
        /**
         * just trying it out to simulate a server call.
         * Notice for the setTimeout below, we passed in 3 params.
         * 
         * the call back function === param1,
         * the delay === param2,
         * 
         * lastly since we did provide value for the callback, the params3, is the
         * value that we will provide to the callback from param1
         * so -> the param for the callback === param3!!!
         */
        // \\\\\\Second layer of the callback
        setTimeout((id) => {
            console.log(`${id}: ${map.get(id)}`);
            console.log('loading employee details ...');
            // \\\\\\Third layer of the callback
            setTimeout((employee) => {
                console.log(`The function of this ${employee} is: To not get fired!`);
            }, 3000, map.get(id));

        }, 1000, recipeId[2]);

    }, 1500);

}

// If we nested so many callback like this, this is the so called the callback hell! it is not good.

getRecipe();