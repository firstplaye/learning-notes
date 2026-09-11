# javascript解决什么问题  
HTML 负责页面结构，CSS 负责页面样式，JavaScript 负责页面行为。

# JavaScript 的三种引入方式  
行内引入，内部引入，外部引入  
`<script src="js/app.js" defer></script>`  
defer 表示：先解析 HTML，等页面结构准备好后再执行 JavaScript。  

# javascript有哪些数据类型  
基本类型：string,number,boolean,null,undefined,symbol
引用类型，object（array,function,date,regexp）

# null和undefined和NaN的区别  
undefined表示变量已声明但未赋值。  
null表示一个空对象引用，通常用于显式清空变量。主动清空，或者在查找时找不到也会为null  
null属于object类
数组属于对象，因此`typeof`数组也得到 "object"。  
```js
    const input = document.querySelector("#input-text");
    console.log(input);//null
    console.log(typeof null);//object
```
NaN不是有效数字，NaN属于number，判断时需要用`isNaN()`不能用`===`因为`NaN===NaN`为`false`  

# 变量提升
JavaScript执行代码前，会先处理当前作用域中的变量声明。这个现象称为变量提升（hoisting）。  
var，let，const，function都会变量提升，但是let，const会暂时性死区，不能被提前调用。  
```js
    sayHello();//Hello
    function sayHello() {
        console.log("Hello");
    }
```
但是`let a = function(){}`不能被提前调用  

# == 和 === 的区别
`==`会进行类型转换所以判断相等要用`===`

# 是否修改原数组
`push()`直接修改了`statuses`。  
```js
    const statuses = ["pending", "approved"];
    statuses.push("cancelled");

    console.log(statuses);// ["pending", "approved", "cancelled"]
```
slice() 返回新数组，不修改 statuses。  
```js
    const statuses = ["pending", "approved", "cancelled"];
    const firstTwo = statuses.slice(0, 2);
    
    console.log(statuses); // 原数组不变
    console.log(firstTwo); // ["pending", "approved"]
```

# 回调函数是什么
把一个函数作为参数传给另一个函数，等合适的时候，再由另一个函数调用它。
```js
    function sayHello() {
        console.log("Hello");
        return "我是返回值";
    }

    function test(callback) {
        console.log("开始执行 test");//开始执行 test

        callback();//Hello

        console.log("test 收到的参数：", callback);//test 收到的参数： ƒ sayHello() {
                                                  //console.log("Hello");
                                                  //return "我是返回值";
    }
    test(sayHello);
```
注：`test(sayHello())`是将函数的返回值传入，此时会报错  

# 少传参数,多传参数，默认参数，剩余参数  
少传参数没有收到实参的形参值为 undefined。   
```jsfunction add(a, b) {
  return a + b;
}
console.log(add(10)); // NaN
```
多出的实参不会自动报错。普通形参只接收对应位置的值：    
```js
function showUserName(name) {
    console.log(name);
}

showUserName("山田 太郎", "development");// 山田 太郎
```
默认参数:默认参数在实参为 undefined 或没有传入时生效。 
```js
    function formatUserName(suffix = "さん") {
        return suffix;
    }

    console.log(formatUserName()); // "さん"  
    console.log(formatUserName("様")); // "様"
    console.log(formatUserName(null));// null
```
剩余参数:剩余参数使用 ... 收集多出的实参，得到一个真正的数组。
```js
function calculateTotal(...daysList) {
  let total = 0;

  for (const days of daysList) {
    total += days;
  }

  return total;
}

console.log(calculateTotal(1, 2, 3)); // 6
```

# arguments
arguments 是 JavaScript 普通函数内部自带的一个特殊对象，用来获取调用这个函数时传进来的所有参数。
箭头函数没有自己的 arguments  
```js
    function test() {
        console.log(arguments);
    }

    test(10, 20, 30); Arguments(3)//[10, 20, 30, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
`函数名.length`：函数定义中，默认参数之前声明了多少个形参。  
`arguments.length`：本次调用实际传入了多少个实参。  
```js
function createUser(accountId, name, department) {
  console.log(arguments.length);
}

console.log(createUser.length); // 3
createUser("yamada", "山田");   // arguments.length 是 2
```
