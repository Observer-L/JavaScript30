const divs = document.querySelectorAll('div');
divs.forEach(div => div.addEventListener('click', logText1, {
    // once: true,
    capture: false
}));

function logText1(e) {
    console.log(this.classList.value);
    // e.stopPropagation();
}

function logText2(e) {
    console.log(this.classList.value);
    e.stopPropagation();
}