const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

// 计时器
function timer(seconds) {
    clearInterval(countdown);
    // 取得时间
    const now = Date.now();
    const timeStamp = now + seconds * 1000;
    // 显示计时
    displayTimeLeft(seconds);
    displayEndTime(timeStamp);
    countdown = setInterval(() => {
        // 总时长
        const secondsLeft = Math.round((timeStamp - Date.now()) / 1000);
        // 计时结束去除定时器
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // 更新时间
        displayTimeLeft(secondsLeft);
    }, 1000);
}

// 显示倒数时间
function displayTimeLeft(seconds) {
    // 用地板除取分钟数
    const minutes = Math.floor(seconds / 60);
    // 取余得到扣除分钟数后的秒数
    const remainderSeconds = seconds % 60;
    console.log({
        minutes,
        remainderSeconds
    });
    //显示时间格式化
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    // 显示对应时间
    document.title = display;
    timerDisplay.textContent = display;
}

// 显示结束时间
function displayEndTime(timestamp) {
    // 转化时间戳为具体时间
    const end = new Date(timestamp);
    const hour = end.getHours();
    // 转化为12小时制
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    // 时间格式化
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// 开始计时
function startTimer() {
    // 获取dataset中的秒数值
    const seconds = parseInt(this.dataset.time);
    // 传入计时器
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// 自定义倒数时长
document.customForm.addEventListener('submit', function (e) {
    // 避免表单提交默认跳转
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})