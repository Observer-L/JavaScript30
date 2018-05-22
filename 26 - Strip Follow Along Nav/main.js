const triggers = document.querySelectorAll('.cool > li');
const bg = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter(e) {
    // trigger-enter 操控菜单的显示/隐藏（display)，trigger-enter-active 操控菜单的透明度
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    bg.classList.add('open');
    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();
    console.log(dropdownCoords);
    
    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left
    };

    bg.style.setProperty('width', `${coords.width}px`);
    bg.style.setProperty('height', `${coords.height}px`);
    bg.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave(e) {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    bg.classList.remove('open');
}


triggers.forEach(item => {
    item.addEventListener('mouseover', handleEnter);
    item.addEventListener('mouseout', handleLeave);
})