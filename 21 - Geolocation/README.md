# Day21 Geolocation

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

## 挑战任务
本次的挑战任务，是利用浏览器内置`Web Geolocation API`,将获取到的地理位置及相关坐标，与`index-start.html`中的可视化指南针连接在一起。

## 实现效果
[结果展示](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/21%20-%20Geolocation/index.html)
由于笔记本电脑一般不带速度及方向传感器，从结果中可以看到返回值中`heading`及`speed`键值均为`null`,为演示可视化效果，代码中采用手动赋值的方式进行演示。   

## 相关知识
1.有关地理位置接口`Geolocation`的说明，可查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)中的相关解释。    

2.`getCurrentPosition()`方法和`watchPosition()`方法
`getCurrentPosition()`方法在调用时返回一次相关信息，`watchPosition()`方法调用后将持续返回相关信息，两个方法调用时除了传入相关的回调函数外，还需要传入`options`配置对象作为第三参数，`options`相关键值如下：
- `enableHighAccuracy`参数表示是否高精度可用，为Boolean类型，默认为false，如果开启，响应时间会变慢，同时，在手机设备上会用掉更多的流量，也就是money了。
- `timeout`参数表示等待响应的最大时间，默认是0毫秒，表示无穷时间。
- `maximumAge`表示应用程序的缓存时间。单位毫秒，默认是0，意味着每次请求都是立即去获取一个全新的对象内容。

## 过程指南
1.使用`getCurrentPosition()`方法获得相关信息   
```js
  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(success, error, options);
  }else{
    console.log('Your broswer does not support the Geolocation API');
  }
```   
2.当成功返回结果时，在控制台输出结果，并根据结果对相应的DOM元素进行样式调整   
```js
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
  
};
```

