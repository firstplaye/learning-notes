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



