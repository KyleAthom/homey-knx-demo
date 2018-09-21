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

// ==== Homey Devices ===== //
let devices = await Homey.devices.getDevices();

_.forEach(devices, device => {
    // Test for KNX devices
    if (device.driver.id.includes('knx')) { // Filter for KNX devices
        if (device.capabilities.hasOwnProperty('measure_temperature')) { // Check for temp. measurement devices
            console.log('Measured room temperature:', device.state.measure_temperature); // Obtain and print measured temperature
        }
        if (device.capabilities.hasOwnProperty('target_temperature')) { //Check for heating control devices
            if (temperature => 22) { //if the obtained outside temperature is higher then 18 degrees
                device.setCapabilityValue('target_temperature', (temperature -3)); //Set the hvac to outside minus 3.
            } else {
                device.setCapabilityValue('target_temperature', 20); //normal scenario, just keep it at a comfy temperature
            }
        }
    }
});

return true;