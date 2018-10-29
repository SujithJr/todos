
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

// if (start === undefined) {
//     // start.innerText = null;
//     document.getElementById('startime').style.display = "none";
// } else {
//     start.innerText = startTime;
// }

// if (end === undefined) {
//     // end.innerText = null;
//     document.getElementById('endtime').style.display = "none";
// } else {
//     end.innerText = endTime;
// }

$('#start').click(function () {
    
    // const time = moment().startOf('minute').format('mm');
    // console.log('time: ', time);
    // const hr = moment().startOf('hour').format('h:mm');
    // console.log('time: ', hr);
    // const before = moment().startOf('hour').subtract(time, 'minute').format('LTS');
    // console.log('hmmm: ', before);
    startTime = moment().format('HH:mm:ss A');
    console.log('startTime: ', startTime);

    // timerValue = moment.utc(moment(now, "HH:mm:ss A").diff(moment(before, "HH:mm:ss A"))).format("HH:mm:ss A");
    timeOut();
});

function timeOut() {
    const timerSet = setInterval(() => {

        sec.innerText = parseInt(sec.innerText) + 1;

        if (sec.innerText < 10 || sec.innerText === 0) {
            sec.innerText = 0 + sec.innerText;
        }
        if (sec.innerText >= 60) {
            minutes(60);
        }
        if (mins.innerText >= 60) {
            hours(60);
        }

        $('#stop').click(function() {
            clearInterval(timerSet);
            stopTime();
        });
    }, 1000);

    return timerSet;
}

function stopTime() {
    endTime = moment().format('HH:mm:ss A');
    console.log('endTime: ', endTime);
    start.innerText = startTime;
    end.innerText = endTime;
    totalTime(startTime, endTime);
}

function totalTime(start, end) {
    startEnd = moment.utc(moment(end, "HH:mm:ss A").diff(moment(start, "HH:mm:ss A"))).format("HH:mm:ss");
    // const total = moment.utc(moment(startEnd, "HH:mm:ss A").add(moment("00:00:01 A"))).format("HH:mm:ss A");
    console.log('Total Time: ', startEnd);
    tim.innerHTML = startEnd;
    // console.log('startTime: ', startTime);
    // console.log('endTime: ', endTime);
    // console.log('Total Time: ', startEnd);
}

function minutes(data) {
    if (parseInt(sec.innerText) >= data) {
        mins.innerText = parseInt(mins.innerText) + 1;
        if (mins.innerText < 10 || mins.innerText === 0) {
            mins.innerText = 0 + mins.innerText;
        }
        sec.innerText = zeroSec + 0;
    }
}

function hours(data) {
    if (parseInt(mins.innerText) >= data) {
        hrs.innerText = parseInt(hrs.innerText) + 1;
        if (hrs.innerText < 10 || hrs.innerText === 0) {
            hrs.innerText = 0 + hrs.innerText;
        }
        mins.innerText = zeroSec + 0;
    }
}