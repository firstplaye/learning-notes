# learning-notes
1.什么是正则表达式？
正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，按照给定模式来匹配文本。

2.带有 `g` 或`y`的修饰符在进行`.test()`操作时，每执行完一行`test()`后都会从上一次执行的位置开始执行。
```js
    var r = /x/g;
    var s = '_x_x';

    console.log(r.test(s));//true
    console.log(r.test(s));//true
    console.log(r.test(s));//false
```
