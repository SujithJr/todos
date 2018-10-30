
const start = document.getElementById('startime');
const end = document.getElementById('endtime');
const tim = document.getElementById('time');

const num = 0;
const zeroSec = num.toString();

let startTime;
let endTime;
let startEnd;
let total;
let counter = 0;

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
    // timeOut();
    startTime = moment().format('HH:mm:ss');
    console.log('startTime: ', startTime);
    const timerSet = setInterval(() => {

        sec.innerText = parseInt(sec.innerText) + 1;
        // counter = counter + 1;
        // console.log(counter);

        const nowTime = moment().format('HH:mm:ss a');
        console.log(nowTime);

        if (sec.innerText < 10 || sec.innerText === 0) {
            sec.innerText = 0 + sec.innerText;
        }
        if (sec.innerText >= 58) {
            minutes(58);
        }
        if (mins.innerText >= 58) {
            hours(58);
        }

        $('#stop').click(function () {
            clearInterval(timerSet);
            stopTime();
        });
    }, 1000);
    // const time = moment().startOf('minute').format('mm');
    // console.log('time: ', time);
    // const hr = moment().startOf('hour').format('h:mm');
    // console.log('time: ', hr);
    // const before = moment().startOf('hour').subtract(time, 'minute').format('LTS');
    // console.log('hmmm: ', before);
    

    // timerValue = moment.utc(moment(now, "HH:mm:ss A").diff(moment(before, "HH:mm:ss A"))).format("HH:mm:ss A");
    
});

function stopTime() {
    // endTime = moment().format('HH:mm:ss a');
    // console.log('endTime: ', endTime);
    
    // const tickInt = parseInt(ticking);
    // const ticker = moment.duration(tickInt).milliseconds();
    // console.log('Tick: ', tick);
    // console.log('Real: ', moment.utc(ticker).format("HH:mm:ss"));
    // const ending = moment(moment(ticking, "hmmss")).format("HH:mm:ss");
    // console.log(ending);
    const tick = startTime;
    console.log("Starting Time: ", tick);

    const ticking = hrs.innerText + '' + mins.innerText + '' + sec.innerText;
    const real = moment(ticking, "hmmss").format('HH:mm:ss');
    console.log('Clock Timer: ', real);

    const durations = [
        tick,
        real
    ]

    const totalDurations = durations.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(durations[0]));
    console.log(`Total time is: ${moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss A")}`);
    console.log(typeof tick, tick);
    console.log(typeof real, real);
    // const realDeal = moment(moment(startTime, "HH:mm:ss a").add(moment(real, "HH:mm:ss a"))).format('HH:mm:ss a');
    // const realDeal = moment({hour: parseInt(hrs.innerText), minute: parseInt(mins.innerText), seconds: parseInt(sec.innerText)}, "hh:mm:ss");
    // console.log("Real: ", realDeal);

    start.innerText = moment.utc(startTime, "HH:mm:ss A").format("HH:mm:ss A");
    end.innerText = moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss A");
    // end.innerText = moment.utc(moment(startTime, "HH:mm:ss a").add(tick, "HH:mm:ss")).format('HH:mm:ss a');
    // end.innerText = endTime;
    // totalTime(startTime, endTime);// To find the total time
}

function totalTime(start, end) {
    startEnd = moment.utc(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a"))).format("HH:mm:ss");
    console.log('Total Time: ', startEnd);
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
        // mins.innerText = 0;
        mins.innerText = zeroSec + 0;
    }
}