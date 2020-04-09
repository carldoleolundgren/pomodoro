const header = document.querySelector(".header");
const minuteButtons = header.querySelectorAll("button");
let chosenWorkTime = Number(document.querySelector('#start-time').textContent);
let timer = document.querySelector('.timer');
const startButton = document.querySelector('#start-button');
const resetButton = document.querySelector('#reset-button');
const pauseButton = document.querySelector('#pause-button');
const stopButton = document.querySelector('#stop-button');
let chosenBreakTime = Number(document.querySelector('#break-time').textContent);
const startTime = document.querySelector('#start-time');
let countdown;
let seconds = chosenWorkTime * 60;
let timerStatus = false;
let secondsLeft;

displayTimer(1500);

minuteButtons.forEach(function (button) {
    button.addEventListener('click', (e) =>{
        let target = e.target;
        
        if (target == document.querySelector('#minus-time')) {
            if (chosenWorkTime == 1) {
                return;
            }
            chosenWorkTime--;
            seconds = chosenWorkTime * 60;
            startTime.textContent = chosenWorkTime;
            timer.textContent = `${Number(chosenWorkTime)}:00`;
        }
        else if (target == document.querySelector('#plus-time')) {
            chosenWorkTime++;
            seconds = chosenWorkTime * 60;
            startTime.textContent = chosenWorkTime;
            timer.textContent = `${Number(chosenWorkTime)}:00`;
        }
        else if (target == document.querySelector('#minus-break')) {
            if (chosenBreakTime == 1) {
                return;
            }
            chosenBreakTime--;
            document.querySelector('#break-time').textContent = chosenBreakTime;
        }
        else {
            chosenBreakTime++;
            document.querySelector('#break-time').textContent = chosenBreakTime;
        }
    })
});

startButton.addEventListener('click', () => {
    //can't press twice
    while(timerStatus) {
        return;
    }
    
    startTimer();
})

resetButton.addEventListener('click', () => {
    resetTimer();
})

pauseButton.addEventListener('click', () => {
    stopTimer();
    seconds = secondsLeft;
})

stopButton.addEventListener('click', () => {
    stopTimer();
    seconds = chosenWorkTime*60;
    displayTimer(seconds);
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
    secondsLeft = seconds;
    let workStatus = true
    countdown = setInterval(() => {
        secondsLeft--;
        displayTimer(secondsLeft)
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
    , 50);
}

function resetTimer() {
    displayTimer(1500);
    chosenWorkTime = 25;
    seconds = chosenWorkTime  * 60;
    document.querySelector('#start-time').textContent = 25;
    chosenBreakTime = 5;
    document.querySelector('#break-time').textContent = 5;
    stopTimer();
}

function stopTimer() {
    clearInterval(countdown);
    timerStatus = false;
}

