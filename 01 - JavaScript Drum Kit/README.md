# Day1 打鼓
## 实现效果
模拟一个打鼓的页面。用户在键盘上按下 ASDFGHJKL 这几个键时，页面上与字母对应的按钮变大变亮，对应的鼓点声音响起来。  
[Live Domo](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/01%20-%20JavaScript%20Drum%20Kit/index.html)

## 关键要点
1. 键盘事件
2. HTML DOM Audio 对象
3. 改变样式

## 个人思路
1. 按键后改变按钮的样式并播放音乐
2. 我需要将我按下的键码对应到指定的按钮和音乐（按钮和音乐都有提供给按键匹配的键码）
3. 在全局/window上添加键盘`keydown`事件,拿到`keyCode`
4. 获取对应`keyCode`的元素
5. 如有对应的元素则添加样式并播放音乐(设置`audio.currentTime = 0`以连续播放)  
4. 为所有的按钮添加`transitionened`事件，之后就可以在过渡完成后移除样式了。

## 细节说明
- 用原生js（`getElementsByClassName`、`querySelectorAll`等）获取的DOM集合是一个类数组对象，所以不能直接利用数组的方法（例如：forEach，map等），需要进行转换为数组后，才能用数组的方法。  
wesbos用的是`document.querySelectorAll`返回的是[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)，虽然本身作为类数组对象不支持`Array.forEach`，但`NodeList`实现了自己的[NodeList.forEach](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)。  
我用`getElementsByClassName`得到一个[HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)后用了`Array.prototype.slice.call（elems）`方法转化为数组，`[].forEach.call`是它的简写。

- 由于激活的按钮有`transition`的特效，我想在过渡结束后移除样式，如果在js中使用定时器`setTimeout`处理的话会造成与`transition-duration`的重复，增加JS和CSS代码的耦合。好在我们可以利用`transitionened`事件来解决这一问题，它会在元素的`transition`结束后执行回调函数（在这里是`removeTransition`）。
