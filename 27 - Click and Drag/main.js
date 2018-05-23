const slider = document.querySelector('.items');
let isMouseDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
    isMouseDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseup', () => {
    isMouseDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', e => {
    if (!isMouseDown) return;
    e.preventDefault;
    const x = e.pageX - slider.offsetLeft;
    console.log(x);
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
})