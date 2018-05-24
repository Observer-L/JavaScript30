const speed = document.querySelector(".speed");
const speedBar = speed.querySelector(".speed-bar");
const video = document.querySelector(".flex");

function changeSpeed(e) {
    const height = e.offsetY;
    const percentage = e.offsetY / speed.offsetHeight;
    const min = 0.5;
    const max = 5;
    const playbackRate = percentage * (max - min) + min;
    speedBar.style.height = Math.round(percentage * 100) + '%';
    speedBar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
}
speed.addEventListener('click', changeSpeed);