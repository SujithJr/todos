const start = document.getElementById('startime');
const end = document.getElementById('endtime');
const tim = document.getElementById('time');

const num = 0;
const zeroSec = num.toString();

let startTime;
let endTime;
let startEnd;
let total;

let clock = `<span id="hrs">00</span>:<span id="mins">00</span>:<span id="sec">00</span>`;
tim.innerHTML = clock;

const hrs = document.getElementById('hrs');
const mins = document.getElementById('mins');
const sec = document.getElementById('sec');

$('#start').click(function () {

    // The time recorded when the timer starts
    startTime = moment().format('HH:mm:ss'); 

    // Sets the interval to run the seconds with 1000ms(1s) interval
    const timerSet = setInterval(() => {

        // Increments 'seconds' counter in the timer by 1 on each interval
        sec.innerText = parseInt(sec.innerText) + 1;

        // Adds a trialing zero to the 'seconds' counter if it is less than 10 (eg: 01)
        if (sec.innerText < 10 || sec.innerText === 0) {
            sec.innerText = 0 + sec.innerText;
        }

        if (sec.innerText >= 60) {
            minutes(60);
        }

        if (mins.innerText >= 60) {
            hours(60);
        }

        // Stops the timer and clears the interval when stop is clicked
        $('#stop').click(function () {
            clearInterval(timerSet);
            stopTime();
        });
    }, 1000);    
});

function stopTime() {
    const tick = startTime;

    // Connects the hrs, mins and sec counter values (eg: 01:23:45 => 012345)
    const ticking = hrs.innerText + '' + mins.innerText + '' + sec.innerText;

    // Converts the connected timer value into time format
    const timerValue = moment(ticking, "hmmss").format('HH:mm:ss');
    const timeDuration = [tick, timerValue];

    // Adds the start time (tick) and counter value (timerValue)
    const totalTime = timeDuration.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(timeDuration[0]));

    start.innerText = moment.utc(startTime, "HH:mm:ss A").format("HH:mm:ss A");
    end.innerText = moment.utc(totalTime.asMilliseconds()).format("HH:mm:ss A");

    // Resets the counter after 500ms once the timer stops
    setTimeout(() => {
        hrs.innerText = zeroSec + 0;
        mins.innerText = zeroSec + 0;
        sec.innerText = zeroSec + 0;
    }, 500);
}

// Ticks the 'minute' counter for every 60second
function minutes(data) {
    if (parseInt(sec.innerText) >= data) {
        mins.innerText = parseInt(mins.innerText) + 1;
        if (mins.innerText < 10 || mins.innerText === 0) {
            mins.innerText = 0 + mins.innerText;
        }
        sec.innerText = zeroSec + 0;
    }
}

// Ticks 'hour' counter for every 60minute
function hours(data) {
    if (parseInt(mins.innerText) >= data) {
        hrs.innerText = parseInt(hrs.innerText) + 1;
        if (hrs.innerText < 10 || hrs.innerText === 0) {
            hrs.innerText = 0 + hrs.innerText;
        }
        mins.innerText = zeroSec + 0;
    }
}