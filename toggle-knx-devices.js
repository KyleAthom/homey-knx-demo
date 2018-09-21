// ==== Homey Devices ===== //
let devices = await Homey.devices.getDevices();

if (device.driver.id.includes('knx') && device.class != 'light') { // Filter for KNX light devices
    device.setCapabilityValue('onoff', !device.state.onoff);
}

return true;