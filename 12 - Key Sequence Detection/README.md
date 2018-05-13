# DAY12 - Key Sequence Detection
## 实现效果
[Live Domo](http://htmlpreview.github.io/?https://github.com/Observer-L/JavaScript30/blob/master/12%20-%20Key%20Sequence%20Detection/index.html)  
当在此页面完整输入了“暗号”（一串事先定义好的字符串）时，生成新的 Cornify 特效。

## To-Do
1. 支持指令的增减重输入操作
2. 当输入正确时，视窗抖动


## **JavaScript語法&備註** By @guahsu
### **Array.prototype.splice()**
`splice(start, deleteCount, item1, item2, ...)`可以對陣列內容過行刪除或新增  
第一個參數`start`為開始位置，若為負值則會返著數（由陣列尾部開始數），
第二個參數`deleteCount`為移除數量，若為0則不移除、若為負值則沒反應，  
第三個參數`item1..`開始的為加入元素，可從第一個參數位置開始塞陣列元素。  
例如
````javascript
var arr = [1,2,3];
arr.splice(0, 1);  //代表從位置0開始刪除1個元素，arr變成[2,3]
arr.splice(-1, 1); //代表從陣列尾巴第一個開始刪除1個元素，arr變成[1,2]
arr.splice(0, -1); //第二個參數不接受複數，arr不變
arr.splice(0, 1, '4') //從位置0刪除1個元素，並從位置0塞入'4'，arr變成['4',2,3]
````
所以回到練習中的這段code，就會了解為何這樣可以維持陣列長度並堆疊替換第一個元素  
````javascript
  const pressed = []; 
  const secretCode = 'guahsu'
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
````
以此範例來說，第一個參數始終會是-7，第二個參數會是當前輸入陣列長度-6，  
所以當事件觸發到第七個陣列值（第七個輸入被觸發且`push`進pressed時），  
例如`[1,2,3,4,5,6,7]`時會變成`pressed.splice(-7,1)`，  
等於刪除倒數第七個元素（也就是index0第一筆），  
並透過陣列長度-設定密碼長度來決定刪除數量，使其維持在固定長度，  
之後每次的`push`會加在尾段，而`splice`會刪除第一個元素。
>其實有卡住一點點，  
>因為作者寫的第一個參數用`-secretCode.length - 1`，
>我一直搞不清楚跟用0有什麼差別囧  
>
>參閱：[MDN-Array.prototype.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)


### **Array.prototype.join()** 
用`join()`可以把陣列轉為字串，並透過參數設定連接符號。  
例如：
````javascript
var arr = [1,2,3];
arr.join(''); // '123'
arr.join('@@'); // '1@@2@@3'
````
>參閱：[Array.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)


### **Array.prototype.includes()**
在string跟array都有`includes()`可以使用，  
都是去判斷string/array是否包含incudes設定的參數後回傳`true/false`  
在這個練習中，因為使用`pressed.join('').includes(secretCode)`;  
依據處理優先序在`pressed.join()`時已經被轉字串了，所以這裡的`incudes()`是屬於string的。
>參閱：[Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)


## 探索
這次雖然只是小小的效果，在寫心得的時候真的也是學到很多以前沒注意的東西，  
並在寫`includes()`才也知道string也有這個效果，以往我都只會使用`match()`，  
`includes()`屬於ES6的語法，爬文後整理到關於字串比對的使用還有以下各種方法：
````javascript
var str = 'abcde';
var check1 = 'ab'; //包含ab，期待值是true
var check2 = 'ac'; //包含ac，期待值是false

//用includes()來取得true/false
str.includes(check1); //true
str.includes(check2); //false

//用match()來處理，判斷是否為null來取得true/false
str.match(check1); // object
str.match(check2); // null

//用indexOf()來處理，判斷是否為-1來取得true/false
str.indexOf(check1); // 0
str.indexOf(check2); // -1

//用search()，判斷是否為-1來取得true/false
str.search(check1); // 0
str.search(check2); // -1

//用RegExp正規表示式來取得true/false
var reg1 = /ab/;
var reg2 = /ac/;
reg1.test(str); // true
reg2.test(str); // false
````
