const moment = require("moment");
require("moment-duration-format");

// stopwatch class
const StopWatch = require("../class/StopWatch.js");
const sw = new StopWatch;

const $time = document.getElementById("timer");
const startBtn = document.getElementById("startButton");
const stopBtn = document.getElementById("stopButton");
const resetBtn = document.getElementById("resetButton");
let runningWatch;
let isRunning = false;      //Bool if stopwatch is running

function update () {
    $time.innerHTML = moment.duration(sw.time, "milliseconds").format("hh:mm:ss.SS", {stopTrim: "s"});
}

function start () {
    isRunning = true;
    $time.style.color = "#0fe300";
    runningWatch = setInterval(update, 1);
    sw.start();
}

function stop () {
    isRunning = false;
    $time.style.color = "#a5a5a5";
    sw.stop();
    clearInterval(runningWatch);
}

function reset () {
    stop();
    $time.style.color = "white";
    sw.reset();
    update();
}

startBtn.addEventListener("click", () => {
    start();
});
stopBtn.addEventListener("click", () => {
    if (isRunning) {
        stop();
    } else {
        start();
    }
});
resetBtn.addEventListener("click", () => {
    reset();
});
