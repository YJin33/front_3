const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.gameField');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.gameBtn')
const gameTimer = document.querySelector('.game_Timer');
const gameScore = document.querySelector('.game_Score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up_message');
const popUpRefresh = document.querySelector('.pop-up_refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    }
    else {
        startGame();
    }
    //started 여부를 바꿔줌
});

popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
})

function initGame() {
    //벌레와 당근을 생성한 뒤 게임에 추가해줌
    score = 0;
    timer = undefined;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}


function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width;
    const y2 = fieldRect.height;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNum(x1, x2 - CARROT_SIZE);
        const y = randomNum(y1, y2 - CARROT_SIZE);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}
function randomNum(min, max) {
    return Math.random() * (max - min) + min
}
//start Game
function startGame() {
    started = true;
    playSound(bgSound);
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();

}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');

}

function showTimerAndScore() {
    gameTimer.style.visibility = "visible"
    gameScore.style.visibility = "visible";
}
function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);


}
function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}


//stop Game
function stopGame() {
    started = false;
    stopGameTimer();
    stopSound(bgSound);
    hideGameBtn();
    hideTimerAndScore();
    showPopUpWithText('REPLAY?');

}
function stopGameTimer() {
    clearInterval(timer);

}
function hideGameBtn() {
    gameTimer.style.visibility = "hidden";
    gameScore.style.visibility = "hidden";
    gameBtn.style.visibility = "hidden";
}
function hideTimerAndScore() {

}

function showPopUpWithText(txt) {
    popUpText.innerText = txt;
    popUp.classList.remove('pop-up--hide');
}

function onFieldClick(event) {
    console.log(event);
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }

    } else if (target.matches('.bug')) {
        playSound(bugSound);
        stopGameTimer();
        finishGame(false);

    }
}
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = score;

}
function finishGame(win) {
    started = false;
    hideGameBtn();
    stopSound(bgSound);
    stopGameTimer();
    showPopUpWithText(win ? 'YOU WON' : 'YOU LOST')
}
function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}