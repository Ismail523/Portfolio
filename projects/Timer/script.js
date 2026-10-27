let countdownInterval = null;
let totalSeconds = 0;
let isPaused = false;

// DOM Elements
const hrsInput = document.getElementById('hrs-input');
const minsInput = document.getElementById('mins-input');
const secsInput = document.getElementById('secs-input');
const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const inputsContainer = document.getElementById('inputs-container');

function updateDisplay() {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    display.textContent = 
        `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    // If starting fresh (not pulling from a pause state)
    if (!isPaused && countdownInterval === null) {
        const hours = parseInt(hrsInput.value) || 0;
        const minutes = parseInt(minsInput.value) || 0;
        const seconds = parseInt(secsInput.value) || 0;

        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        if (totalSeconds <= 0) {
            alert("Please enter a valid time duration.");
            return;
        }

        // Hide inputs configuration layout visually if desired, or keep view clean
        inputsContainer.style.opacity = "0.5";
    }

    isPaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            alert("Your Time's up!");
            resetTimer();
            return;
        }
        
        totalSeconds--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdownInterval);
    countdownInterval = null;
    isPaused = true;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(countdownInterval);
    countdownInterval = null;
    totalSeconds = 0;
    isPaused = false;
    
    // Reset Inputs and UI
    hrsInput.value = '';
    minsInput.value = '';
    secsInput.value = '';
    display.textContent = "00:00:00";
    inputsContainer.style.opacity = "1";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
