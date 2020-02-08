// --> https://api.allorigins.win/get?url=
// we use this: --> https://api.allorigins.win/raw?url=
// use any origin as proxy

function demo() {
    fetch('https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/2487956/')
        .then((result) => {
            console.log(result);  // <--- we obtain the result returned from the server
            return result.json(); // <--- convert the result from raw stream to JSON
            // This is also a async operation
        }).then(processedJson => {// <--- chaining then to get the converted json
            console.log(processedJson); // <--- finally, we can log it now as JSON

            // demo of getting value out from json
            const today = processedJson.consolidated_weather[0].applicable_date
            console.log(`---> ${today}`);

        }).catch(err => {
            console.log('exception');
            console.log(err)
        });
}

/**
 * we can even convert the whole thing above into a packaged method. As you can see
 * here we take in an id for the location, and return the weather of the location.
 * 
 * However, the entire chain is more complex:
 * 
 * 1. we return the fetch() which is a promise to the toplevel
 * 2. in the fetch, we have chained with then, which means we have another promise
 * -> so we returned a promise that will return a promise
 * 3. lastly in the top level, we added a then to listen to the:
 * -> listen to the promise that is the then of the original promise (fetch)
 * 
 * So with all that , we can load the result from weather asyncly.
 */
function getWeather(locationID) {
    return fetch(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${locationID}/`).then((result) => {
        return result.json(); // <--- convert the result from raw stream to JSON
    }).catch(err => {
        console.log('exception');
        console.log(err)
    });
}

// <--- original approach taught in class
demo();

// <--- experiments
getWeather('2487956').then((info) => {
    console.log(info.consolidated_weather[0].weather_state_name);
});
