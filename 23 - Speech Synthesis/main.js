const msg = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// 要读的信息即是输入栏中的值
msg.text = document.querySelector('[name="text"]').value;


// 将获取支持语言并添加至下拉列表的代码段封装在一个函数中
function getSupportVoice() {
    voices = synth.getVoices();
//     voices = voices.filter(voice => voice.lang.includes('zh') || voice.lang.includes('en'));
//     for (let v of voices) {
//         const option = document.createElement('option');
//         option.setAttribute('value', v.name);
//         option.innerText = `${v.name} (${v.lang})`;
//         // if (v.name.includes('粤語')) option.setAttribute('selected', 'selected');
//         voicesDropdown.appendChild(option);
//     }
// };

    voicesDropdown.innerHTML = voices
        // 使用filter篩選出包含zh及en的語系
        .filter(voice => voice.lang.includes('zh') || voice.lang.includes('en'))
        // 篩選後的array透過map把資料組成html
        .map(voice => `<option value=${voice.name}>${voice.name} (${voice.lang})</option>`)
        // 用join來合併且消除原本陣列的逗點
        .join('');
 //   [].forEach.call(voicesDropdown.children, option => option.text.includes('粤語') ? option.setAttribute('selected','selected') : null);
}

function setOption() {
    msg[this.name] = this.value;
    toggle();
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}


// 播放切換
function toggle(starOver = true) {
    speechSynthesis.cancel();
    if (starOver) {
        speechSynthesis.speak(msg);
    }
}

speechSynthesis.addEventListener('voiceschanged', getSupportVoice);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(input => input.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));