const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');
const countdownElement = document.getElementById('countdown');
const countdownTitlElement = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeElement = document.getElementById('complete');
const completeElementInfo = document.querySelectorAll('complete-info');
const completeButton = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();

let countdownActive;

let savedCountdown;

const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

// Date input 
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);

function updateDOM(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance%day)/hour);
        const minutes = Math.floor((distance%hour)/minute);
        const seconds = Math.floor((distance % minute)/second);

        inputContainer.hidden = true;

        if (distance < 0) {
            countdownElement.hidden = true;
            clearInterval(countdownActive);
            completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeElement.hidden = false;
        } else {
            countdownTitlElement.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeElement.hidden = true;
            countdownElement.hidden = false;
        }

    }, second);
}

function updateCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };

    localStorage.setItem('countdown', JSON.stringify(savedCountdown)); //For browser to remember the countdown

    if (countdownDate === '' || countdownTitle === '') {
        alert('Please give title and select a date');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
    
}

function reset() {
    countdownElement.hidden = true;
    inputContainer.hidden = false;
    completeElement.hidden = true;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

// Restore countdown 
function restoreDataFromLocalStorage() {
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listner
countdownForm.addEventListener('submit', updateCountdown);
countdownButton.addEventListener('click', reset);
completeElement.addEventListener('click', reset);

restoreDataFromLocalStorage();