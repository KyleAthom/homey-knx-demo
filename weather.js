// Set City 
const city = "Utrecht";

// ==== Weather information ==== //
// Create the requst URL
let fullPath = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=0efee746dee8830a056d48f545f3e639" + "&units=metric";
let condition; let temperature; //declare variables

await fetch(fullPath)
    .then((resp) => resp.json())
    .then(function(data) {
        condition = data.weather[0].main; temperature = data.main.temp;
    });

//Print the obtained weather condtions
console.log('The weather condition in', city ,'is', condition, 'and the temperature is', temperature);
// let Homey tell the current weather conditions. It only accepts one arguement, hence the + to create one string.
say('The weather condition in ' + city + ' is ' + condition + ' and the temperature is ' + temperature + ' degrees');