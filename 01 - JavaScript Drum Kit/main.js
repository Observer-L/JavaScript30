// 添加键盘事件监听
window.addEventListener('keydown', playSound);

function playSound(e) {
  // 接受键盘按键事件，得到键码，根据键码播放相应的音乐
  // 利用 keydown 事件中的 keyCode 属性来链接按钮和音乐
  let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;
  key.classList.add('actived');
  audio.currentTime = 0;
  audio.play();

  // 避免使用定时器修改 CSS transition ，减少CSS和JS代码耦合
  // setTimeout(()=>key.classList.remove('actived'),70)
}

// 监听每个对象的 transitionend 过渡事件
let keys = document.getElementsByClassName('key');
[].forEach.call(keys, key => key.addEventListener('transitionend', removeTransition))

// 过渡效果结束后,移除样式
function removeTransition(e) {
  // 发生 transition 的样式属性不止一个（box-shadow, transform, border-color）
  // 所以需要添加一个判断语句，使每发生一次按键事件时，只去除一次样式
  if (e.propertyName !== 'border-left-color') return;
  this.classList.remove('actived');
}
