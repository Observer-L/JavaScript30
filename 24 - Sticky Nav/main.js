const nav = document.querySelector('#main');
const logo = nav.querySelector('.logo');
// 当navbar固定时OffsetTop会变成0，因此需定义变量来保存初始OffsetTop
const navOffsetTop = nav.offsetTop;

function adjustNav() {
    if (window.scrollY >= navOffsetTop) {
        nav.classList.add('fixed-nav');
        document.body.style.paddingTop += `${nav.offsetHeight}px`;
        document.body.classList.add('fixed-nav');
    } else {
        nav.classList.remove('fixed-nav')
        document.body.style.paddingTop = '';
        document.body.classList.remove('fixed-nav');
    }
}

window.addEventListener('scroll', adjustNav);