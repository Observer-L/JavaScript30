const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 120;

function shadowMove(e) {
  const {offsetHeight: height, offsetWidth: width} = hero;
  let {offsetX: x, offsetY: y} = e;
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  // 四捨五入最終偏移值
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));
  console.log(xWalk, yWalk);
  // 使用textShadow來設定文字陰影
  const shadowStyle = `text-shadow:
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7) !important
  `
  text.setAttribute('style', shadowStyle);
}

hero.addEventListener('mousemove', shadowMove);
