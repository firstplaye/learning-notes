<h2>1.什么是正则表达式？</h2>
正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，按照给定模式来匹配文本。

<h2>2.带有 `g` 或`y`的修饰符在进行`.test()`操作时，每执行完一行`test()`后都会从上一次执行的位置开始执行。</h2>
```js
    var r = /x/g;
    var s = '_x_x';

    console.log(r.test(s));//true
    console.log(r.test(s));//true
    console.log(r.test(s));//false
```

<h2>3.exec()和match()的区别</h2>
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

<h2>4.方法总结</h2>
1.字符串对象的`search()`方法，返回第一个满足条件的匹配结果在整个字符串中的位置。<br>
2.字符串对象的`replace()`方法可以替换匹配的值。<br>
3.字符串对象的`split()`方法按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。<br>

<h2>5.特殊字符</h2>
1.点字符`.`匹配除回车`\r`、换行`\n` 、行分隔符`\u2028`和段分隔符`\u2029`以外的所有字符。
2.要匹配这些字符本身，通常在前面写反斜杠。例如`\.`匹配点号，`\+` 匹配加号。正则字面量中要匹配 `/` 时写成 `\/`。
3.位置字符:`^`表示字符串的开始位置,`$`表示字符串的结束位置。<br>
4.选择符:竖线符号`|`在正则表达式中表示“或关系”（OR），即`cat|dog`表示匹配`cat`或`dog`。<br>
注：字符类`[1-31]`，不代表1到31，只代表1到3。

<h2>6.字符类</h2>
1.字符类表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内，比如`[xyz]`表示`x`、`y`、`z`之中任选一个匹配。<br>
2.排除字符组`[^]`：字符组开头的 ^ 表示“不是其中的字符”,比如`/[^0-9]/`表示不是0-9内。<br>
3.连字符（-）：某些情况下，对于连续序列的字符，连字符`-`用来提供简写形式，表示字符的连续范围。比如，`[abc]`可以写成`[a-c]`，`[0123456789]`可以写成`[0-9]`，同理`[A-Z]`表示26个大写字母。<br>

<h2>7.分组和动态构造方法</h2>
1.正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。<br>
2.规则固定时优先使用正则字面量。规则需要根据变量动态生成时，可以使用`RegExp`<br>
`const pattern = new RegExp(`^${prefix}-\\d{5}$`);`
