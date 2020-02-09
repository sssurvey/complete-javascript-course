// Use async, await to handle AJAX, instead of using raw promises
async function loadWeather(locationId) { // <--- async function always return promise
    try {
        const rawData = await fetch(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${locationId}/`);
        const jsonData = await rawData.json();
        const weather = jsonData.consolidated_weather[0].weather_state_name;
        // since async function, the return type is a promise, though it is a string
        return weather;
    } catch (error) {
        console.log(error);
        // since async function, the return type is a promise, though it is a string
        return 'unknown';
    }
}

// weather: Promise
// so we cannot print it like normal string, we will have to use then()
const weather = loadWeather('2487956');

// finally, we use then to print it out...
weather.then(weather => {
    console.log(weather);
});