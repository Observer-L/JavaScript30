# Day5 Array Cardio

## 实现效果
[Live Domo](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/05%20-%20Flex%20Panel%20Gallery/index.html)  
点击任意一张图片，图片展开，同时从图片上下两方分别移入文字。点击已经展开的图片后，图片被压缩，同时该图片上下两端的文字被挤走。

## 涉及特性
- flexbox
- transform: translateX/translateY
- transitionend 事件（或用transition delay代替实现）

## 延伸思考by [SOYAINE](https://github.com/soyaine/JavaScript30/blob/master/05%20-%20Flex%20Panel%20Gallery/README.md)

在 index-FINISHED.html 的解决方案中，用了两种 `class` 值来分别控制 `div` 元素和 `p` 元素的动画，这就会造成一个问题，当快速点击两下时，会出现相反的组合（图片缩小 + 上下文字出现）。

那为什么还要将文字的移动动画用 `.open-actived` 这个类来控制，同时还多加上了一个 `transitionend` 的事件监听，而不是直接用 `.open` 控制文字的移动，并且只采用一个 `click` 事件监听呢？

我试了一下，发现如果将要触发的文字移动（`transform`）用 `.open` 来控制，那么会出现有点不协调的状况。

要找到问题所在，可以先研究一下动画效果，由于录 GIF 很容易掉帧，最好打开网页来看细节。

当拉伸图片时，首先往里压缩（阶段①），然后再展开（阶段②），而文字是阶段②出现的；而当压缩图片时，也是同样的道理，先微微拉开一点（阶段①），然后再往里缩（阶段②），文字也是在阶段②才往上移动的，这样就形成了一种被 pia 飞的效果。

这样也就可以回答我最开始的疑问，为何要多添加一个 [`transitioned` 的事件监听](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend)，这个事件会在 `transition` 结束之后被触发，所以目的是先让图片的压缩拉伸完成，再移动文字。

也就是说，如果除去字体大小的变化，具体的动画细节其实是这样的：
- 图片展开：微微压缩一段距离 -> 展开图片 -> 文字向中心移动
- 图片压缩：微微展开一段距离 -> 压缩图片 -> 文字向上下移动

这就解释了为什么我改动之后出现了不协调，此时看到的动画，像是文字主导了图片的压缩伸展，原因就是文字动画的时机不太对，找到了这个原因，就很好解决了。（见 [index-SOYAINE2.html](https://github.com/soyaine/JavaScript30/blob/master/05%20-%20Flex%20Panel%20Gallery/index-SOYAINE2.html)）

```css
.panel > * {
	/* ... */
	transition:transform 0.5s 0.7s;
}

/* 修改 .open-actived -> .open*/
.panel.open p:first-child {
	transform: translateY(0);
}

.panel.open p:last-child {
	transform: translateY(0);
}
```

```js
const panels = document.querySelectorAll('.panel');

function toggleOpen(e) {
    this.classList.toggle('open');
}

panels.forEach( panel => panel.addEventListener('click', toggleOpen, false));
// 去掉对于 transitionend 的事件监听
```

解决思路是让 `p` 标签的文字动画效果延迟一下，添加 `transition` 属性的 `delay` 值，使其到图片变换的阶段②再发生，此处我选用了图片的动画最长时间 0.7s，圆满解决。

**挑战 5 Pass ~\(≧▽≦)/~**
