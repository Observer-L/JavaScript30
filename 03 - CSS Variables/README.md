# Day3 实时更新CSS变量
## 实现效果
[Live Domo](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/03%20-%20CSS%20Variables/index.html)

**涉及到的特性：**
- :root 伪类 与 CSS 变量
- `forEach()`
- `dataset`
- CSS 滤镜 `filter`
- `document.documentElement`


## 个人思路
1. 声明全局（:root）的 CSS 变量，应用到需要实时更新样式的元素
2. 给控制器`input`添加监听事件`change`、`mousemove`
3. 处理CSS变量的函数中需要获取`input`的值和名,同时还需要获取属性值的后缀
4. 用`document.documentElement`和上一步中获取到的参数和后缀来修改根元素的属性/样式，


## 解决难点

1. **如何处理参数值（一个有 px 、另一个没有）**

	运用 `dataset` 储存后缀，有 px 后缀的标签中设置 `<input data-sizing: px>`：
	
	```html
	<input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
    <input type="color" name="base" value="#8aa8af">
	```
	
	JS 中通过 `dataset.sizing` 来获取后缀值：

	```javascript
	const suffix = this.dataset.sizing || ''; 
	```
	
	此时 suffix 获取到的值，针对颜色为空，而针对长度类的则为 'px'。
	
2. 	**如何用 JavaScript 改变 CSS 属性值？**

	在 JavaScript 中 `document.documentElement` 即代表文档根元素。所以要改变全局的 CSS 变量，可以这样写：
	
	```js
	document.documentElement.style.setProperty('--base', '#fff');
	```
