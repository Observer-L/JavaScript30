const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let timeUP = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    // bonked标记防止多次点击重复刷分
    hole.querySelector('.mole').classList.remove('bonked');
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUP) peep();
    }, time)
}

function bonk(e) {
    if (!e.isTrusted || this.classList.contains('bonked')) return;
    this.classList.add('bonked');
    this.classList.remove('up');
    score++;
    scoreBoard.textContent = score;
}


function startGame() {
    timeUP = false;
    scoreBoard.textContent = 0;
    score = 0;
    peep();
    setTimeout(() => timeUP = true, 10000);
}

moles.forEach(mole => mole.addEventListener('click', bonk));