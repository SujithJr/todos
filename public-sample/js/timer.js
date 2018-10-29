const hrs = document.getElementById('hrs');
const mins = document.getElementById('mins');
const sec = document.getElementById('sec');
const tim = document.getElementById('time');

const num = 0;
const zeroSec = num.toString();

$('#start').click(function () {
    
    const time = moment().startOf('minute').format('mm');
    console.log('time: ', time);
    const hr = moment().startOf('hour').format('h:mm');
    console.log('time: ', hr);
    const before = moment().startOf('hour').subtract(time, 'minute').format('LTS');
    console.log('hmmm: ', before);
    const now = moment().format('LTS');
    console.log('now: ', now);

    timerValue = moment.utc(moment(now, "HH:mm:ss A").diff(moment(before, "HH:mm:ss A"))).format("HH:mm:ss A");
    timeOut();
});

function timeOut() {
    const timerss = setInterval(() => {
        // const sec = document.getElementById('sec');
        // const hrs = document.getElementById('hrs');
        // const mins = document.getElementById('mins');

        sec.innerText = parseInt(sec.innerText) + 10;
        if (sec.innerText < 10 || sec.innerText === 0) {
            sec.innerText = 0 + sec.innerText;
        }

        if (sec.innerText >= 60) {
            minutes(60);
        }

        if (mins.innerText >= 60) {
            hours(60);
        }
        // while (parseInt(sec.innerText) >= 60) {
        //     mins.innerText = parseInt(mins.innerText) + 1;
        //     sec.innerText = 0;
        // }
        
        // while (parseInt(mins.innerText) >= 60) {
        //     hrs.innerText = parseInt(hrs.innerText) + 1;
        //     mins.innerText = 0;
        // }

        // console.log(sec.innerText);
        $('#stop').click(function() {
            clearInterval(timerss);
        });
    }, 1000);
    return timerss;
}

function minutes(data) {
    if (parseInt(sec.innerText) >= data) {
        mins.innerText = parseInt(mins.innerText) + 10;
        if (mins.innerText < 10 || mins.innerText === 0) {
            mins.innerText = 0 + mins.innerText;
        }
        console.log(zeroSec);
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

// $('#stop').click(function() {
//     clearInterval(timeOut());
// });