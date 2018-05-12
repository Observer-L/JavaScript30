const video = document.querySelector('.viewer');
const controls = document.querySelector('.player__controls ');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const skipBtns = document.querySelectorAll('button[data-skip]');
const zoom = document.querySelector('.zoom');

function toggleVideo() {

  const method = video.paused
    ? 'play'
    : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused
    ? '►'
    : '❚ ❚';
  toggle.textContent = icon;
}

function toggleScreen() {
  const method = video.requestFullscreen ? 'webkitExitFullScreen' : 'webkitRequestFullScreen';
  video[method]()
}

function handleProgress() {

  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function skip() {
  console.log(1);
  const step = this.dataset['skip'];
  video.currentTime += parseFloat(step);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
video.addEventListener('click', toggleVideo);
toggle.addEventListener('click', toggleVideo)
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
zoom.addEventListener('click', toggleScreen);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
