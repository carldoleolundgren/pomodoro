const buttons = {
    minuteIncrementers: document.querySelectorAll(".header-button"),
    start: document.querySelector('#start-button'),
    reset: document.querySelector('#reset-button'),
    pause: document.querySelector('#pause-button')
}

const chosenTime = {
    work: Number(document.querySelector('#start-time').textContent), 
    break: Number(document.querySelector('#break-time').textContent)
}

const status = document.querySelector('.status');
const startTime = document.querySelector('#start-time');
const timer = document.querySelector('.timer');

let countdown;
let timerStatus = false;
let pauseStatus = false;
let secondsLeft;

displayTimer(1500);

buttons.minuteIncrementers.forEach(function (button) {
    button.addEventListener('click', (e) =>{
        if (timerStatus || pauseStatus) {
            return;
        }
        let target = e.target;
        if (target == document.querySelector('#minus-time') || target == document.querySelector('#plus-time')) {
            if (target == document.querySelector('#minus-time')) {
                if (chosenTime.work == 1) {
                    return;
                }
                chosenTime.work--;
            } else { chosenTime.work++; }
            startTime.textContent = chosenTime.work;
            timer.textContent = `${Number(chosenTime.work)}:00`;
        }
        else {
            if (target == document.querySelector('#minus-break')) {
                if (chosenTime.break == 1) {
                    return;
                }
                chosenTime.break--;
            } 
            else { chosenTime.break++; }
        document.querySelector('#break-time').textContent = chosenTime.break;
        }
    })
});

buttons.start.addEventListener('click', () => {
    if (pauseStatus) {
        startTimer();
        pauseStatus = false;
    }
        
    //can't press while timer is running
    while(timerStatus) {
        return;
    }
    startTimer();
})

buttons.reset.addEventListener('click', () => {
    resetTimer();
})

buttons.pause.addEventListener('click', () => {
    if (timerStatus == false) {
        return;
    } 
    pauseStatus = true;
    stopTimer();
})

buttons.stop.addEventListener('click', () => {
    stopTimer();
    secondsLeft = chosenWorkTime * 60
    displayTimer(secondsLeft);
})

function displayTimer(num) {
    let displayMinutes = Math.floor(num / 60);
    let displaySeconds = num % 60;
    timer.innerHTML = formatTime(displayMinutes, displaySeconds)
}

function formatTime(min, sec) {
    if (sec < 10) { return `${min}:0${sec}`}
    { return `${min}:${sec}`}
}

function startTimer() {
    timerStatus = true;
    if (secondsLeft == '' || secondsLeft == null) {
        secondsLeft = chosenTime.work * 60;
    }
    let workStatus = true
    countdown = setInterval(() => {
        secondsLeft--;
        displayTimer(secondsLeft)
        
        if (workStatus) {
            status.innerHTML = "Work Time"
        } else { status.innerHTML = "Break Time"}

        if (secondsLeft == 0) {
            if (workStatus) {
                workStatus = false
                secondsLeft = chosenTime.break*60;
            } else {
                workStatus = true;
                secondsLeft = chosenTime.work*60;
            }
        }
    }
    , 100);
}

function resetTimer() {
    displayTimer(1500);
    secondsLeft = null;
    chosenTime.work = 25;
    document.querySelector('#start-time').textContent = 25;
    chosenTime.break = 5;
    document.querySelector('#break-time').textContent = 5;
    stopTimer();
    pauseStatus = false;
}

function stopTimer() {
    clearInterval(countdown);
    timerStatus = false;
}

// stop button broken
// clicking pause then start when in break time changes status to "work time"