# Day10 Hold Shift and Check Checkboxes

## 实现效果
[Live Domo](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index.html)  
按住 Shift 多选

## 过程指南

1. 获取所有的 `<input>` 元素，并添加事件监听

	```js
	const boxs = document.querySelectorAll('.inbox input[type="checkbox"]');
	boxs.forEach(box => box.addEventListener('click', handleCheck));
	```
	
2. 编写 handleCheck 内部的处理逻辑（细节请看下一部分）

## 解决思路

在谈具体的代码时，先讲讲思路。首先来复现一下，当你按下 Shift 键进行多选时，发生了什么？

1. 选中 A 项
2. 按下 Shift
3. 再选中 B 项
4. A-B 之间的所有项都被选中

关键点就在于 A、B 划出了一个范围，在这个范围之内的元素状态发生了改变。A 是上一次操作选中的对象，B 是此次操作对象，之后的内容将会用这两个单词来叙述。下面的方案就依据划定范围的方法不同来进行区分。

### 方法一

Wes Bos 在文档里提供了一种解决办法：用一个变量，来标记这个范围。

变量初始值为 `false`，当按下 Shift 键且同时选中了某个元素的时候，遍历所有项，遍历过程中，若遇到 A 或 B，则将标记值取反。同时，将所有标记为 `true` 的项设置为选中。

```js
let lastChecked;

//	处理方法一：用变量 inBetween 对需要选中的元素进行标记
function handleCheck0(e) {
	let inBetween = false;
	if(e.shiftKey && this.checked){
		boxs.forEach(input => {
			console.log(input);
			if(input === lastChecked || input ===this) {
				inBetween = !inBetween;
			}
			if(inBetween) {
				console.log("on");
				input.checked = true;
			}
	});
	}
	lastChecked = this;
}
```

> 延伸思考    

上面会出现一个问题，初次加载页面时，按住 Shift 再点击某一项，此项之后的元素都会被选中。此外，对于取消选中，无法批量操作。所以我参照了 Stack Overflow 的一个答案： [How can I shift-select multiple checkboxes like GMail?](http://stackoverflow.com/a/659571/6820726) 改进得到第二种解决方案。

### 方法二

方法一中的 `inBetween` 仅仅表示此项是否在被选中的范围中，此处会赋给它更多的意义，用它来表示此项是选中还是未选中，而范围划定则由数组来解决。

首先将获取到的 `<input>` 组转化为数组，针对每次操作，获取 A 和 B，利用 `indexOf()` 来获得 A 和 B 在数组中的索引值，由此即可确定范围，并能通过 `slice()` 来直接截取 A-B 的所有 DOM 元素，并进行状态改变的操作，而变量 `onOff` 表示 A-B 范围内的状态，`true` 表示选中，`false` 表示取消选中。

1. 转换 Nodelist 为数组  

	````js
	const boxs = document.querySelectorAll('.inbox input[type="checkbox"]');
	const boxArr = Array.from(boxs);
	````
	
2. 针对按下了 Shift 键的情况，获取 A-B 范围  

	````js
	let start = boxArr.indexOf(this);
	let end = boxArr.indexOf(lastChecked);
	````
	
3. 截取该范围内的数组元素，并改变选中状态  

	```js
	boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
					   .forEach(input => input.checked = onOff);
	```
	
4. 确定选中 or 取消选中    

	````js
	onOff = lastChecked.checked ? true : false;
	````
	
5. 标记 A 值    
 
	````js
	if(!lastChecked) lastChecked = this;
	/* ... */
	lastChecked = this;
	````
	
注意，以上几点是按点抽出的分块代码，整合起来的解决办法如下：

```js
const boxArr = Array.from(boxs);
let lastChecked;
let onOff = false;

// 处理方法二：利用数组索引获取需要选中的范围
function handleCheck1(e) {
	if(!lastChecked) lastChecked = this;
	onOff = lastChecked.checked ? true : false;
	if(e.shiftKey) {
		let start = boxArr.indexOf(this);
		let end = boxArr.indexOf(lastChecked);
		boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
		           .forEach(input => input.checked = onOff);
		console.log(start + "+" + end);
	}
	lastChecked = this;
}
```


## **探索** By @guahsu
一開始做完原本作者講述的方法（也就是上面那段）的做法後，  
發現有些小問題，例如直接對著同一個checkbox點選會導致全選，  
也沒有辦法做區間取消選取的功能，所以重新寫了一個可以區間選取/取消的版本。

### 分析動作
想一下會使用連續選取時，我自己的動作會有這幾種：

1. 單選：單純的點一下進行勾選/取消
2. 範圍選取：按住shift後點到其他checkbox
3. 範圍取消：在2按住shift的狀態下，點到已勾選的checkbox

所以我依據這些動作分別寫了對應的功能。

### 程式備註
````javascript
// 選取所有checkbox
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let click; // 單純的點擊
let selectClick; // 按下shift後的選取 
let cancelClick; // 按下shift後的取消
    
const handleCheck = function (e) {
    if (e.shiftKey && this.checked) {
        selectClick = this;
        selectBox();
    } else if (e.shiftKey && !this.checked) {
        cancelClick = this;
        cancleBox();
    } else if (this.checked) {
        click = this;
        selectClick = undefined;
        cancelClick = undefined;
    } else {
        click = undefined;
        selectClick = undefined;
        cancelClick = undefined;
    }
    // 選取功能
    function selectBox() {
        let inBetween = false;
        checkboxes.forEach(checkbox => {
            // 將選取範圍內的checkbox加上標記
            if (checkbox === selectClick || checkbox === click) {
                inBetween = !inBetween;
            }
            // 將有標記的checkbox勾選（且click不為undefined與selectClick是為了避免點自己全選）
            if (inBetween && click !== undefined && click !== selectClick) {
                checkbox.checked = true;
            }
        })
    }
    //取消選取
    function cancleBox(el) {
        let inBetween = false;
        checkboxes.forEach(checkbox => {
            // 將選取範圍內的checkbox加上標記
            if (checkbox === selectClick || checkbox === cancelClick) {
                inBetween = !inBetween;
            }
            // 將有標記的checkbox勾選（以及selectClick）
            if (inBetween || checkbox === selectClick) {
                checkbox.checked = false;
            }
        })
    }
}
// 偵測checkbox的click
checkboxes.forEach(checkbox => { checkbox.addEventListener('click', handleCheck) });
// 偵測當shift放開時讓click恢復未選取的狀態
window.addEventListener('keyup', (e) => {
    if (e.keyCode === 16 || e.shiftKey) {
        click = undefined;
    };
})
````
