const minuteButtons = document.querySelectorAll(".header-button");
let chosenWorkTime = Number(document.querySelector('#start-time').textContent);
let chosenBreakTime = Number(document.querySelector('#break-time').textContent);
const startButton = document.querySelector('#start-button');
const resetButton = document.querySelector('#reset-button');
const pauseButton = document.querySelector('#pause-button');
const stopButton = document.querySelector('#stop-button');
const status = document.querySelector('.status');
const startTime = document.querySelector('#start-time');
const timer = document.querySelector('.timer');

let countdown;
let timerStatus = false;
let pauseStatus = false;
let secondsLeft;

displayTimer(1500);

minuteButtons.forEach(function (button) {
    button.addEventListener('click', (e) =>{
        if (timerStatus || pauseStatus) {
            return;
        }
        let target = e.target;
        if (target == document.querySelector('#minus-time') || target == document.querySelector('#plus-time')) {
            if (target == document.querySelector('#minus-time')) {
                if (chosenWorkTime == 1) {
                    return;
                }
                chosenWorkTime--;
            }
            else { chosenWorkTime++; }
            startTime.textContent = chosenWorkTime;
            timer.textContent = `${Number(chosenWorkTime)}:00`;
        }
        else {
            if (target == document.querySelector('#minus-break')) {
                if (chosenBreakTime == 1) {
                    return;
                }
                chosenBreakTime--;
            } 
            else { chosenBreakTime++; }
        document.querySelector('#break-time').textContent = chosenBreakTime;
        }
    })
});

startButton.addEventListener('click', () => {
    if (pauseStatus) {
        pauseStatus = false;
        startTimer();
    }
        
    //can't press while timer is running
    while(timerStatus) {
        return;
    }
    
    startTimer();
})

resetButton.addEventListener('click', () => {
    resetTimer();
})

pauseButton.addEventListener('click', () => {
    if (timerStatus == false) {
        return;
    } 
    pauseStatus = true;
    stopTimer();
})

stopButton.addEventListener('click', () => {
    stopTimer();
    secondsLeft = chosenWorkTime * 60
    displayTimer(secondsLeft);
})

// Display timer
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
        secondsLeft = chosenWorkTime * 60;
    }
    let workStatus = true
    countdown = setInterval(() => {
        secondsLeft--;
        displayTimer(secondsLeft)
        if (workStatus) {
            status.innerHTML = "Work Time"
        }
        else { status.innerHTML = "Break Time"}
        if (secondsLeft == 0) {
            if (workStatus) {
                workStatus = false
                secondsLeft = chosenBreakTime*60;
            }
            else {
                workStatus = true;
                secondsLeft = chosenWorkTime*60;
            }
        }
    }
    , 1000);
}

function resetTimer() {
    displayTimer(1500);
    secondsLeft = null;
    chosenWorkTime = 25;
    document.querySelector('#start-time').textContent = 25;
    chosenBreakTime = 5;
    document.querySelector('#break-time').textContent = 5;
    stopTimer();
    pauseStatus = false;
}

function stopTimer() {
    clearInterval(countdown);
    timerStatus = false;
}