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

3.exec()和match()的区别<br>
`exec()`是正则对象的方法；`match()`是字符串的方法。<br>
没有`g`标志时，`match()`返回包含完整匹配和捕获分组的数组；没有匹配时返回`null`。<br>
带`g`时，`match()`返回所有完整匹配组成的数组，但不提供每一项的捕获分组详情。<br>
```js
    let s = 'abba';
    let r = /a/g;
    let r_no_g = /a/;

    console.log(s.match(r)); // ["a", "a"]
    let iterator = s.matchAll(r);
    console.log(iterator.next().value); // ['a', index: 0, input: 'abba', groups: undefined]
    console.log(iterator.next().value); // ['a', index: 3, input: 'abba', groups: undefined]
    console.log(s.match(r_no_g));//['a', index: 0, input: 'abba', groups: undefined]
    console.log(r.exec(s)); // ['a', index: 0, input: 'abba', groups: undefined]
```
