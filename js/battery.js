/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

// STEP 5a: Create an image element dynamically
const roboImage = document.createElement("img");
roboImage.alt = "RoboHash based on battery level";
roboImage.style.display = "block";
roboImage.style.marginTop = "20px";
roboImage.style.maxWidth = "300px";
roboImage.style.height = "auto";
roboImage.style.transition = "opacity 0.5s ease-in-out";
document.body.appendChild(roboImage); // Append image to body

/* Functions
-------------------------------------------------- */
// STEP 5b: Update image source based on battery level
function updateRobotImage(level) {
    const percentage = Math.round(level * 100);
    roboImage.style.opacity = 0;
    setTimeout(() => {
        roboImage.src = `https://robohash.org/${percentage}percent.png`;
        roboImage.onload = () => roboImage.style.opacity = 1;
    }, 300);
}

// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    console.log(battery);
    // STEP 3b: Update the charging status
    if (battery.charging) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    // STEP 3c: Update the charge level
    const percentage = battery.level * 100;
    chargeLevel.textContent = percentage + "%";
    chargeMeter.value = percentage;

    // Update robot image
    updateRobotImage(battery.level);
}

// STEP 2a: Using the getBattery() method of the navigator object, 
//create a promise to retrieve the battery information
navigator.getBattery().then(battery => {
    // STEP 2b: See what the battery object contains
    console.log(battery);
    // STEP 3d: Update the battery information when the promise resolves
    updateBatteryStatus(battery);
    // STEP 4a: Event listener for changes to the charging status
    battery.addEventListener("chargingchange", function () {
        updateBatteryStatus(battery);
    })
    // STEP 4b: Event listener for changes to the charge level
    battery.addEventListener("levelchange", function () {
        updateBatteryStatus(battery);
    })
})


/* This script adapted from the excellent code examples found at https://www.w3.org/TR/battery-status/#examples and https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API */
