const buttons = {
    minuteIncrementers: document.querySelectorAll(".header-button"),
    start: document.querySelector('#start-button'),
    reset: document.querySelector('#reset-button'),
    pause: document.querySelector('#pause-button'),
    stop: document.querySelector('#stop-button')
}

const chosenTime = {
    work: Number(document.querySelector('#start-time').textContent), 
    break: Number(document.querySelector('#break-time').textContent)
}

const status = {
    timerActive: false,
    paused: false,
    workActive: true
}

const intervalLabel = document.querySelector('.status');
const startTime = document.querySelector('#start-time');
const timer = document.querySelector('.timer');

let countdown;
let secondsLeft;

displayTimer(1500);

buttons.minuteIncrementers.forEach(function (button) {
    button.addEventListener('click', (e) =>{
        if (status.timerActive || status.paused) {
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
    if (status.paused == true) {
        startTimer();
        status.paused = false;
    }

        
    //can't press while timer is running
    while(status.timerActive) {
        return;
    }
    startTimer();
})

buttons.reset.addEventListener('click', () => {
    resetTimer();
})

buttons.pause.addEventListener('click', () => {
    if (status.timerActive == false) {
        return;
    } 
    status.paused = true;
    stopTimer();
})

buttons.stop.addEventListener('click', () => {
    stopTimer();
    secondsLeft = chosenTime.work * 60
    displayTimer(secondsLeft);
    intervalLabel.innerHTML = "Work Time";
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
    status.timerActive = true;
    if (!status.paused) {
        secondsLeft = chosenTime.work * 60;
    }
    countdown = setInterval(() => {
        secondsLeft--;
        displayTimer(secondsLeft)

        if (secondsLeft == 0) {
            if (status.workActive) {
                status.workActive = false
                secondsLeft = chosenTime.break*60;
                intervalLabel.innerHTML = "Break Time"
            } else {
                status.workActive = true;
                secondsLeft = chosenTime.work*60;
                intervalLabel.innerHTML = "Work Time"
            }
        }
    }
    , 1000);
}

function resetTimer() {
    displayTimer(1500);
    secondsLeft = null;
    chosenTime.work = 25;
    document.querySelector('#start-time').textContent = 25;
    chosenTime.break = 5;
    document.querySelector('#break-time').textContent = 5;
    stopTimer();
    status.paused = false;
}

function stopTimer() {
    clearInterval(countdown);
    status.timerActive = false;
    status.workActive = true;
}

// stop button broken
// clicking pause then start when in break time changes status to "work time"