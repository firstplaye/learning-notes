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

# 立即执行函数 IIFE
函数定义完成后会立刻执行一次。  
```js
(() => {
  console.log("箭头函数立即执行");
})();
```

# 函数闭包
内部函数记住了外部函数的变量，即使外部函数已经执行结束，这些变量仍然可以被内部函数使用。
```js
    function outer() {
        let count = 0;

        function inner() {
            count++;
            console.log(count);
        }

        return inner;
    }

    const fn = outer();

    fn(); // 1
    fn(); // 2
    fn(); // 3
```

## **闭包的作用**
1.保存变量状态：让函数执行结束后，变量仍然可以被访问。  
2.实现数据私有化：让外部无法直接修改某些变量，只能通过指定的函数操作。  
3.保存函数执行时的环境：让函数记住创建时的变量。  
4.实现计数器、缓存、回调函数等功能。  


# JavaScript 中 `for`、`for...of` 和 `for...in` 的区别

这三种循环都可以用来遍历数据，但它们遍历的对象和获取的内容不一样。

## 一、核心区别

| 循环方式 | 主要用途 | 获取的是什么 |
|---|---|---|
| `for` | 根据条件控制循环 | 可以自己控制变量 |
| `for...of` | 遍历可迭代对象 | 每次获取一个值 |
| `for...in` | 遍历对象的可枚举属性 | 每次获取一个属性名（键） |

---

## 二、普通 `for` 循环

普通 `for` 循环可以自己控制循环变量的初始值、结束条件和变化方式。

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

输出：

```text
0
1
2
3
4
```

### 执行过程

```text
① let i = 0      初始化
② i < 5          判断条件
③ 执行循环体
④ i++            更新变量
⑤ 回到条件判断
```

### 示例：遍历数组

```js
const fruits = ["苹果", "香蕉", "橙子"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

输出：

```text
苹果
香蕉
橙子
```

这里通过 `i` 获取数组下标，再通过 `fruits[i]` 获取元素。

**适用场景：** 需要控制下标、指定遍历范围、跳过某些位置或倒序遍历。

---

## 三、`for...of`：遍历值

`for...of` 用于遍历可迭代对象，例如数组、字符串、`Set` 和 `Map`。

### 1. 遍历数组

```js
const fruits = ["苹果", "香蕉", "橙子"];

for (const fruit of fruits) {
    console.log(fruit);
}
```

输出：

```text
苹果
香蕉
橙子
```

这里的 `fruit` 每次直接获取数组中的一个值。

```text
第一次：fruit = "苹果"
第二次：fruit = "香蕉"
第三次：fruit = "橙子"
```

### 2. 遍历字符串

```js
const str = "ABC";

for (const char of str) {
    console.log(char);
}
```

输出：

```text
A
B
C
```

### 3. 遍历 Map

```js
const map = new Map([
    ["name", "小明"],
    ["age", 20]
]);

for (const [key, value] of map) {
    console.log(key, value);
}
```

输出：

```text
name 小明
age 20
```

**适用场景：** 只关心数组或其他可迭代对象中的值，不需要自己维护下标。

---

## 四、`for...in`：遍历属性名

`for...in` 主要用于遍历对象自身和原型链上可枚举的字符串属性名。

### 1. 遍历对象

```js
const user = {
    name: "小明",
    age: 20,
    city: "东京"
};

for (const key in user) {
    console.log(key);
}
```

输出：

```text
name
age
city
```

这里的 `key` 是对象的属性名，而不是属性值。

如果想获取属性值：

```js
for (const key in user) {
    console.log(user[key]);
}
```

输出：

```text
小明
20
东京
```

### 2. 遍历数组时要注意

```js
const fruits = ["苹果", "香蕉", "橙子"];

for (const index in fruits) {
    console.log(index);
}
```

输出：

```text
0
1
2
```

因为 `for...in` 获取的是属性名，数组的索引也是属性名。

如果想获取数组中的值：

```js
for (const index in fruits) {
    console.log(fruits[index]);
}
```

输出：

```text
苹果
香蕉
橙子
```

**注意：** `for...in` 不推荐用于普通数组的值遍历，因为它还可能遍历到其他可枚举属性，而且遍历顺序不适合用来保证数组元素的顺序。

---

## 五、三种循环放在一起对比

同一个数组：

```js
const fruits = ["苹果", "香蕉", "橙子"];
```

### 1. `for`

```js
for (let i = 0; i < fruits.length; i++) {
    console.log(i, fruits[i]);
}
```

输出：

```text
0 苹果
1 香蕉
2 橙子
```

自己控制下标，获取值需要 `fruits[i]`。

### 2. `for...of`

```js
for (const fruit of fruits) {
    console.log(fruit);
}
```

输出：

```text
苹果
香蕉
橙子
```

直接获取数组中的值。

### 3. `for...in`

```js
for (const key in fruits) {
    console.log(key);
}
```

输出：

```text
0
1
2
```

获取数组的属性名，也就是这里的索引。

---

## 六、什么时候使用哪一种？

| 需求 | 推荐方式 |
|---|---|
| 需要通过下标访问数组 | `for` |
| 需要倒序遍历数组 | `for` |
| 只需要数组中的值 | `for...of` |
| 遍历字符串中的字符 | `for...of` |
| 遍历对象的属性名 | `for...in` |
| 遍历 Map 的键和值 | `for...of` |

---

## 七、记忆口诀

- **`for`：** 自己控制下标。
- **`for...of`：** 遍历值。
- **`for...in`：** 遍历属性名。

特别记住：

**数组优先考虑 `for...of`，普通对象需要遍历属性时考虑 `for...in`。**

## 演示代码
```
// ==============================
// 1. 普通 for 循环
// 适合：需要控制循环次数、索引
// ==============================

const fruits = ["苹果", "香蕉", "橙子"];

console.log("===== 普通 for =====");

for (let i = 0; i < fruits.length; i++) {
    console.log("索引：" + i + "，水果：" + fruits[i]);
}


// ==============================
// 2. for...of 循环
// 适合：直接获取数组中的值
// ==============================

console.log("===== for...of =====");

for (const fruit of fruits) {
    console.log("水果：" + fruit);
}


// ==============================
// 3. for...in 循环
// 适合：遍历对象的可枚举属性
// ==============================

const employee = {
    name: "小明",
    age: 25,
    department: "开发部"
};

console.log("===== for...in =====");

for (const key in employee) {
    console.log("属性名：" + key + "，属性值：" + employee[key]);
}
```
> [运行](https://play.vuejs.org/#eNqVVE1vElEU/Ssvb9WGZqituqDURE0XulCjxg2vMQQedNr5ysybStOQDNqYGu2AC4xgQ1ITWzVWaEK0jZP+GfsGWPUveOcL0QIps2Hevefee86Zy9vENzVNWDcpTuCkkdFFjSGDMlO7QZR4HC2OfXzIFQG5te89q45yqo746deO3fQTPes5r2yfO/XertXdL7n2Ad/+EeTdb3tutfXbKnXaH7lTvdQoomRUxWAop5siM9AiShHcfX3iNnYJnkEE9/Zr3eqr4N39UuOHFYKXF6I6VaKCpOanCPbbDVIO+uNpH+sFpiTKkAgTZhfgJxlOFCSq5NkKhGKxabRJFATPv60DNaCYYBSD0hhQOXfeuK02sIzCQbeUuOwNLHozL+v0nODxFQRBzQ31ufOh7dqfuvZPXn4H9nZ+bZ0dH3bqW9xyJnD4f6f6Iy/6NPBBEAACZSO8GWLCxAbMRwaIyvBFK+1w+yVvnnSP9jzd5abbqJ8dn/KjhmsdTLRlVNYkdYNS2IJQjpKWaQI+KG+V3fc27FkQTuchOnctPGWpltaZTBXmQx2Ll9/2XnwmGJSO3MW+plEOr9ENBOmI0wiHA5W8shOZ7JWFKxjmLCfKRb1SAIo2MRkPLgD468OBeZA0o8EpPnDEM5gZMDsn5oVVQ1Xg6vAJEZxRZU2UqH5fYyJwIzgRUSU4LUnqs7t+jOkmDQ2DmhWaWRsSXzUKXozgBzo1qL5O+5YTzNJ6nrIgvfToHi3Aez8pq1lTAvSY5EMKvpkexwB2y1SyQHsA57O9I2uqzkQl/9hYKjCqGJEoj6iHLPp4guH+vD1G+l+688JVvw78BhefMuMJ1b2uYOF1YVaYx8U/QY8SKA==)


# JavaScript 中 `...` 的作用

在 JavaScript 中，`...` 叫作三个点语法，根据使用位置不同，主要有两种作用：

1. **展开运算符（Spread）**：把数组、对象等内容展开。
2. **剩余参数（Rest）**：把多个参数或剩余元素收集起来。

**核心区别：展开是拆开，剩余是收集。**

---

# 一、展开运算符（Spread）

展开运算符可以把数组或对象中的内容展开到另一个地方。

## 1. 展开数组

```js
const arr1 = [1, 2, 3];

console.log(...arr1); // 1 2 3
```

相当于把数组中的元素依次取出来。

### 合并数组

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

const arr3 = [...arr1, ...arr2];

console.log(arr3); // [1, 2, 3, 4]
```

`...arr1` 和 `...arr2` 会将数组元素展开，再组成一个新数组。

### 复制数组

```js
const arr1 = [1, 2, 3];

const arr2 = [...arr1];

console.log(arr2); // [1, 2, 3]
```

`arr2` 是一个新数组，修改它的数组结构不会影响 `arr1`。

注意：这是**浅拷贝**。如果数组中包含对象，内部对象仍然是共享引用。

---

## 2. 展开对象

可以把一个对象的属性展开到另一个对象中。

```js
const user = {
  name: "小明",
  age: 20
};

const newUser = {
  ...user,
  city: "东京"
};

console.log(newUser);
// { name: "小明", age: 20, city: "东京" }
```

### 复制对象

```js
const user = {
  name: "小明",
  age: 20
};

const copyUser = { ...user };

console.log(copyUser); // { name: "小明", age: 20 }
```

`copyUser` 是一个新对象，但同样属于浅拷贝。

### 合并对象与覆盖属性

```js
const user = {
  name: "小明",
  age: 20
};

const updatedUser = {
  ...user,
  age: 25
};

console.log(updatedUser);
// { name: "小明", age: 25 }
```

**重点：** 如果展开的对象和后面的属性存在同名属性，后面的值会覆盖前面的值。

---

## 3. 展开运算符用于函数调用

可以把数组中的元素展开，作为函数的多个参数。

```js
function add(a, b, c) {
  return a + b + c;
}

const nums = [10, 20, 30];

console.log(add(...nums)); // 60
```

相当于：

```js
add(10, 20, 30);
```

---

# 二、剩余参数（Rest）

剩余参数的作用是：**把多个参数或剩余元素收集到一个数组或对象中。**

## 1. 函数剩余参数

```js
function test(...args) {
  console.log(args);
}

test(10, 20, 30);
```

输出：

```js
[10, 20, 30]
```

`...args` 会把传入的所有参数收集到 `args` 数组中。

### 实际示例：计算任意多个数字的总和

```js
function sum(...numbers) {
  let total = 0;

  for (const num of numbers) {
    total += num;
  }

  return total;
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(10, 20, 30, 40)); // 100
```

---

## 2. 数组解构中的剩余元素

```js
const [first, ...rest] = [10, 20, 30, 40];

console.log(first); // 10
console.log(rest);  // [20, 30, 40]
```

`...rest` 会把剩下的元素收集成一个新数组。

注意：数组解构中的剩余元素必须放在最后。

---

## 3. 对象解构中的剩余属性

```js
const user = {
  name: "小明",
  age: 20,
  city: "东京"
};

const { name, ...rest } = user;

console.log(name); // "小明"
console.log(rest); // { age: 20, city: "东京" }
```

`...rest` 会把没有被解构出来的属性收集到一个新对象中。

---

# 三、展开运算符与剩余参数的区别

| 对比 | 展开运算符 Spread | 剩余参数 Rest |
|---|---|---|
| 作用 | 展开内容 | 收集内容 |
| 常见位置 | 数组、对象、函数调用 | 函数参数、解构 |
| 示例 | `[...arr]` | `function fn(...args)` |
| 结果 | 把元素或属性展开 | 得到数组或对象 |

### 记忆口诀

- `const arr2 = [...arr1]`：把 `arr1` 展开，放入新数组。
- `function fn(...args)`：把传入的参数收集到 `args` 数组。

---

# 四、容易混淆的地方

## 1. `...` 和 `arguments` 的区别

```js
function test(...args) {
  console.log(args);
}

test(1, 2, 3); // [1, 2, 3]
```

`args` 是一个真正的数组，可以直接使用 `map()`、`filter()` 等数组方法。

而普通函数中的 `arguments` 是类数组对象，不是真正的数组。

---

## 2. 展开对象时的属性覆盖

```js
const a = { name: "小明" };
const b = { name: "小红" };

const result = { ...a, ...b };

console.log(result); // { name: "小红" }
```

后展开的对象会覆盖前面同名的属性。

---

## 3. 展开运算符是浅拷贝

```js
const user = {
  name: "小明",
  address: {
    city: "东京"
  }
};

const copyUser = { ...user };

copyUser.name = "小红";
copyUser.address.city = "大阪";

console.log(user.name); // "小明"
console.log(user.address.city); // "大阪"
```

原因：

- `name` 是基本类型，修改复制对象的 `name` 不会影响原对象。
- `address` 是对象，复制后仍然引用同一个内部对象。

---

# 五、总结

记住这三个最常见的用法：

```js
// 1. 展开数组
const arr = [...[1, 2, 3]];

// 2. 复制或合并对象
const obj = { ...{ name: "小明" }, age: 20 };

// 3. 收集函数参数
function test(...args) {
  console.log(args);
}
```

**核心理解：** `...` 的含义取决于所在的语法位置：

- 展开运算符：把内容展开。
- 剩余参数：把剩余内容收集起来。