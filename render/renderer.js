/*eslint no-undef: "off"*/
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

function format_time (time) {
    return moment.duration(time, "milliseconds").format("hh:mm:ss.SS", {stopTrim: "s"});
}

function createSplit (titleText, time) {

    const splitContainer = document.createElement("div");
    const lap = document.createElement("span");
    const card = document.createElement("span");

    const splitContainerClass = document.createAttribute("id");
    splitContainerClass.value = "splitContainer";
    const lapClass = document.createAttribute("class");
    lapClass.value = "split";

    card.appendChild(document.createTextNode(titleText));

    lap.setAttributeNode(lapClass);
    lap.appendChild(document.createTextNode(format_time(time)));

    splitContainer.appendChild(card);
    splitContainer.appendChild(lap);
    splitContainer.setAttributeNode(splitContainerClass);
    document.body.insertBefore(splitContainer, $time);
}

function removeSplits () {
    const laps = document.querySelectorAll("div");
    laps.forEach(lap => {
        lap.remove();
    });
}

function update () {
    $time.innerHTML = format_time(sw.time);
}

// Potential solution to format the time without the use of moment.
//let hrs, mins;
// hrs = Number(new Date(sw.time).toISOString().substr(11,2));
// mins = Number(new Date(sw.time).toISOString().substr(14,2));
//
// if (hrs >= 1) {
//     $time.innerHTML = new Date(sw.time).toISOString().substr(11,8);
// } else if (mins >= 1) {
//     $time.innerHTML = new Date(sw.time).toISOString().substr(14,8);
// } else {
//     $time.innerHTML = new Date(sw.time).toISOString().substr(17,5);
// }

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
    removeSplits();
    update();
}

startBtn.addEventListener("click", () => {
    if (isRunning) {
        createSplit("Time", sw.time);
    } else {
        start();
    }
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
