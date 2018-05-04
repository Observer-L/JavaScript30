// 获取秒针、分钟、小时节点
const hourHand = document.querySelector('.hour-hand');
const minHnad = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

const clockTick = document.querySelector('.clock-tick');

let secondDeg = 0,
  minDeg = 0,
  hourDeg = 0;

// 初始化 Date 对象
function initDate() {
  const date = new Date();
  const second = date.getSeconds();
  const min = date.getMinutes();
  const hour = date.getHours();

  // 计算秒、分、小时角度
  secondDeg = 90 + (second / 60) * 360;
  minDeg = 90 + (min / 60) * 360 + ((second / 60) / 60) * 360;
  hourDeg = 90 + (hour / 12) * 360 + ((min / 60) / 12) * 360 + (((second / 60) / 60) / 12) * 360;
}

function setDate() {
  // 每秒更新角度值，让这个角度值一直保持增长
  secondDeg += (1 / 60) * 360;
	minDeg += ((1 / 60) / 60) * 360;
	hourDeg += (((1 / 60) / 60) / 12);

  // 根据角度设置样式
  secondHand.style.transform = `rotate(${secondDeg}deg)`;
  minHnad.style.transform = `rotate(${minDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;

  clockTick.play();
}

initDate();

// 设置定时器，每秒调用一次setDate函数
setInterval(setDate, 1000);
