# Day2 时钟
## 实现效果
[Live Domo](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/02%20-%20JS%20%2B%20CSS%20Clock/index.html)

## 关键要点
1. 表盘上指针的样式：旋转的效果
2. 获取实时的时间
3. 每一秒改变一次指针状态

**涉及到的特性：**
- `transform-oragin`
- `transform: rotate()`
- `transition`
- `transition-timing-function: cubic-bezier(x, x, x, x)`
- `setInterval(callback, time)`
- `new Date()`

## 个人思路
1. 用`border`和`border-radius`画表框
2. 调整指针的初始位置，用`transform-oragin`调整指针旋转的轴点
3. 在JS中利用`setInterval`和`Date`对象来更新时分秒的数值，计算转化为旋转度数并应用旋转的样式
4. 完善样式和动效(`box-shadow`、`transition`等)

## 延伸思考

> 2017-01-06 更新完善，感谢 [@cody1991 提的 issue](https://github.com/soyaine/JavaScript30/issues/1) 

此处存在一个小瑕疵，当秒针旋转一圈之后回到初始位置，开始第二圈旋转，角度值的变化时 444° → 90° → 96° .... 这个过程中，指针会先逆时针从 444° 旋转至 90°，再继续我们期望的顺时针旋转，由于秒针变换时间只有 0.05s，所以呈现的效果就是秒针闪了一下，如果想要观察细节，可以将 `.second` 设为 `transition: all 1s`。要解决这个问题，目前找到了两种解决办法：

#### 方法一

在这个特殊点将指针的 `transition` 属性去掉，由于距离短、时间短，将逆时针回旋的过程瞬间完成。

```js
if (secondDeg === 90) secHand.style.transition = 'all 0s';
else secHand.style.transition = 'all 0.05s';

if (minDeg === 90) minHand.style.transition = 'all 0s';
else minHand.style.transition = 'all 0.1s';
```

#### 方法二

既然引发问题的是角度的大小变化，那就可以对这个值进行处理。此前的代码中，每秒都会重新 new 一个 Date 对象，用来计算角度值，但如果让这个角度值一直保持增长，也就不会出现逆时针回旋的问题了。

这是 @cody1991 提供的思路。只在页面第一次加载时 new 一次 Date 对象，此后每秒直接更新角度值。

```js
let secondDeg = 0,
minDeg = 0,
hourDeg = 0;

function initDate() {
	const date = new Date();
	const second = date.getSeconds();
	secondDeg = 90 + (second / 60) * 360;
	const min = date.getMinutes();
	minDeg = 90 + (min / 60) * 360 + ((second / 60) / 60) * 360;
	const hour = date.getHours();
	hourDeg = 90 + (hour / 12) * 360 + ((min / 60) / 12) * 360 + (((second / 60) / 60) / 12) * 360;
}

function updateDate() {
	secondDeg += (1 / 60) * 360;
	minDeg += ((1 / 60) / 60) * 360;
	hourDeg += (((1 / 60) / 60) / 12);
	
	secHand.style.transform = `rotate(${ secondDeg}deg)`;
	minHand.style.transform = `rotate(${ minDeg }deg)`;
	hourHand.style.transform = `rotate(${ hourDeg }deg)`;
}
