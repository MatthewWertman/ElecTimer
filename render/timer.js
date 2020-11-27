const moment = require("moment");
require("moment-duration-format");

const startBtn = document.getElementById("startButton");
const stopBtn = document.getElementById("stopButton");
const timer = document.getElementById("timer");

startBtn.addEventListener("click", () => {
    console.log("Started timer");
    var time = 0;
    const currentTime = setInterval(function () {
        time += 1;
        timer.innerHTML = moment.duration(time, "seconds").format("hh:mm:ss", {trim: false});
    }, 1000);
    stopBtn.addEventListener("click", () => {
        console.log("Stopped timer");
        timer.innerHTML = "00:00:00";
        clearInterval(currentTime);
    });
});
