const { ipcRenderer } = require("electron");
// StopWatch Class
const StopWatch = require("./class/StopWatch.js");
const sw = new StopWatch;

const $time = document.getElementById("timer");
let runningWatch;
let isRunning = false;      //Bool if stopwatch is running

function formatTime (d) {
    const ms = d % 1000;
    d = (d - ms) / 1000;
    const secs = d % 60;
    d = (d - secs) / 60;
    const mins = d % 60;
    const hrs = (d - mins) / 60;

    // Pad to 2 or 3 digits, default is 2
    function pad (n, z) {
        z = z || 2;
        return ("00" + n).slice(-z);
    }

    if (hrs > 0) {
        return pad(hrs) + ":" + pad(mins) + ":" + pad(secs) + "." + pad(ms, 3).substr(0,2);
    } else if (mins > 0) {
        return pad(mins) + ":" + pad(secs) + "." + pad(ms, 3).substr(0,2);
    } else {
        return pad(secs) + "." + pad(ms, 3).substr(0,2);
    }
}

function update () {
    $time.innerHTML = formatTime(sw.time);
}

function startTimer () {
    isRunning = true;
    $time.style.color = "#8beb15";
    runningWatch = setInterval(update, 1);
    sw.start();
}

function stopTimer () {
    isRunning = false;
    $time.style.color = "#5d6267";
    sw.stop();
    clearInterval(runningWatch);
}

function resetTimer () {
    stopTimer();
    $time.style.color = "white";
    sw.reset();
    update();
}

ipcRenderer.on("start", () => {
    startTimer();
});

ipcRenderer.on("stop", () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

ipcRenderer.on("reset", () => {
    resetTimer();
});
