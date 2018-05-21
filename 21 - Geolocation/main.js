const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

const options = {
    enableHighAccuray: false,
    timeout: 70000,
    maximuAge: 0
};

function success(pos) {
    console.log(pos);
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');

    //改变传感器速度值和罗盘的指向
    speed.innerHTML = crd.speed;
    arrow.style.transform = `rotate(${crd.heading}deg)`;
    //手动赋值演示可视化结果
    speed.innerHTML = 12;
    arrow.style.transform = `rotate(30deg)`;
}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    console.log('Your broswer does not support the Geolocation API');
}