const moment = require("moment");
require("moment-duration-format");

// stopwatch class
const StopWatch = require("../StopWatch.js");
const sw = new StopWatch;

const $time = document.getElementById("timer");
const startBtn = document.getElementById("startButton");
const stopBtn = document.getElementById("stopButton");
const resetBtn = document.getElementById("resetButton");
let runningWatch;

function update () {
    $time.innerHTML = moment.duration(sw.time, "milliseconds").format("hh:mm:ss.SS", {stopTrim: "s SS"});
}

function start () {
    runningWatch = setInterval(update, 1);
    sw.start();
}

function stop () {
    sw.stop();
    clearInterval(runningWatch);
}

function reset () {
    stop();
    sw.reset();
    update();
}

startBtn.addEventListener("click", () => {
    start();
});
stopBtn.addEventListener("click", () => {
    stop();
});
resetBtn.addEventListener("click", () => {
    reset();
});
