
const header = document.querySelector(".header");
const minuteButtons = header.querySelectorAll("button");

minuteButtons.forEach(function (button) {
    button.addEventListener('click', (e) =>{
        let target = e.target;
        
        if (target == document.querySelector('#minus-time')) {
            let timerTime = Number(document.querySelector('#start-time').textContent);
            timerTime--;
            document.querySelector('#start-time').textContent = timerTime;
            document.querySelector('.timer').textContent = Number(timerTime);
        }
        else if (target == document.querySelector('#plus-time')) {
            let timerTime = Number(document.querySelector('#start-time').textContent);
            timerTime++;
            document.querySelector('#start-time').textContent = timerTime;
            document.querySelector('.timer').textContent = Number(timerTime);
        }
        else if (target == document.querySelector('#minus-break')) {
            let timerTime = Number(document.querySelector('#break-time').textContent);
            timerTime--;
            document.querySelector('#break-time').textContent = timerTime;
        }
        else {
            let timerTime = Number(document.querySelector('#break-time').textContent);
            timerTime++;
            document.querySelector('#break-time').textContent = timerTime;
        }
    })
});

