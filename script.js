
const header = document.querySelector(".header");
const minuteButtons = header.querySelectorAll("button");
let timerTime = Number(document.querySelector('#start-time').textContent);
const timer = document.querySelector('.timer')
const startButton = document.querySelector('#start-button')
let countdown;

minuteButtons.forEach(function (button) {
    button.addEventListener('click', (e) =>{
        let target = e.target;
        
        if (target == document.querySelector('#minus-time')) {
            timerTime--;
            document.querySelector('#start-time').textContent = timerTime;
            document.querySelector('.timer').textContent = `${Number(timerTime)}:00`;
        }
        else if (target == document.querySelector('#plus-time')) {
            timerTime++;
            document.querySelector('#start-time').textContent = timerTime;
            document.querySelector('.timer').textContent = `${Number(timerTime)}:00`;
        }
        else if (target == document.querySelector('#minus-break')) {
            timerTime--;
            document.querySelector('#break-time').textContent = timerTime;
        }
        else {
            timerTime++;
            document.querySelector('#break-time').textContent = timerTime;
        }
    })
});

startButton.addEventListener('click', () => {
    startTimer();
})

// Display timer
function timerDisplay(num) {

    let displayMinutes = Math.floor(num / 60);
    let displaySeconds = num % 60;
    
    timer.innerHTML = formatTime(displayMinutes, displaySeconds)
    /*if (displaySeconds < 10) {
        timer.innerHTML = `${displayMinutes}:0${displaySeconds}`
    } else {
        timer.innerHTML = `${displayMinutes}:${displaySeconds}`
    }*/
}

function formatTime(min, sec) {
    if (displaySeconds < 10) { return `${min}:0${sec}`}
    { return `${min}:${sec}`}
}

function startTimer() {
    const seconds = timerTime*60
    countdown = setInterval(() => {
        secondsLeft = seconds-1;
        timerDisplay(secondsLeft)
        if (secondsLeft == 0) {
            clearInterval(countdown);
        }
    }
    , 1000);
}