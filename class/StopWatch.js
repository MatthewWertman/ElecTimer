// Should do the job for now
// ORIGINAL SOURCE: https://gist.github.com/electricg/4372563#file-stopwatch-js-L95

let start = 0;      //Start time
let lap = 0;       //Last stop time in milliseconds

const now = function () {   //Return right now in milliseconds
    return (new Date()).getTime();
};

class StopWatch {
    // default constructor
    start () {
        if (!start) { start = now(); }
    }

    stop () {
        if (start) { lap = lap + now() - start; }
        start = 0;  //Paused
    }

    reset () {
        lap = start = 0;
    }

    get time () {
        return lap + (start ? now() - start : 0);
    }
}

module.exports = StopWatch;
