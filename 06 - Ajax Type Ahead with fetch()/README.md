# Day6 Ajax Type Ahead with fetch()

## 实现效果
[Live Domo](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/06%20-%20Ajax%20Type%20Ahead%20with%20fetch()/index.html)  
在输入框中输入一个词，迅速匹配，展示含有这个词的诗句，诗句的来源 json 数据是加载页面时从网络中异步获得。

## 涉及特性

- Promise
	- `fetch()`
	- `then()`
	- `json()`
- Array
	- `filter()`
	- `map()`
	- `push()`
	- `join()`
	- Spread syntax 扩展语句
- RegExp
	- `match()`
	- `replace()`
  
## 过程指南

1. 声明一个空数组，用于存放解析 json 后的数据
2. 运用 `fetch()` 发送 HTTP 请求
	1. 获取返回的 Promise 对象
	2. 解析 JSON 数据
	3. 存入数组
3. 获取两个主要 HTML 元素（`<input>`，`<ul>`），给 `<input>` 添加事件监听（`change`, `keyup`）
4. 编写匹配输入的函数
	1. 运用 `filter()` 过滤数组数据
	2. 创建正则表达式，构造过滤条件
5. 编写展示匹配结果的函数
	1. 获取匹配数据
	2. 替换关键词放入高亮的标签
	3. 构造 HTML 标签数据
	4. 将匹配值的 HTML 标签放入 `<ul>` 中
