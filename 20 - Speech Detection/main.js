const words = document.querySelector('.words');
const speech = new webkitSpeechRecognition();
speech.interimResults = true;
speech.lang = 'en-US';
speech.start();

speech.addEventListener('result', e => {
    const results = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    words.innerHTML = results;

})

//开始捕获到音频时
speech.onaudiostart = function (e) {
    console.log('start');
}
//出现错误时
speech.onerror = function (e) {
    console.log(e.error);
}
//语音识别结束时重新开始捕获语音
speech.onend = function () {
    speech.start();
}