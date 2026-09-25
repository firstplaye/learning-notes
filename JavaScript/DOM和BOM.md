# DOM是什么
浏览器读取 HTML 后，会把页面转换成可以由 JavaScript 操作的对象结构。这套结构称为 DOM（Document Object Model，文档对象模型）。  

#分类
document.getElementById() 功能是通过 id 得到元素节点。  
getElementsByTagName() 方法的功能是通过标签名得到节点数组。  
getElementsByClassName() 方法的功能是通过类名得到节点数组。  
querySelector() 方法的功能是通过选择器得到元素。
querySelector() 方法只能得到页面上一个元素，如果有多个元素符合条件，则只能得到第一个元素。
querySelectorAll() 方法的功能是通过选择器得到元素数组。  

# 事件监听
“监听” 顾名思义，就是让计算机随时能够发现这个事件发生了，从而执行程序员预先编写好的一些程序。  
设置事件监听的方法主要有 onxxx 和 addEventListener() 两种，二者的区别将在 “事件传播” 一课中介绍。  

# 事件冒泡和事件委托
事件冒泡：事件从目标元素开始，逐级向上传播到祖先元素。
事件委托：给它们的父元素绑定一个事件，让父元素统一处理。
```js
  <ul id="list">
        <li>
            苹果
            <button class="delete">删除</button>
        </li>

        <li>
            香蕉
            <button class="delete">删除</button>
        </li>

        <li>
            西瓜
            <button class="delete">删除</button>
        </li>
    </ul>

    <script>
        // 获取父元素
        const list = document.getElementById("list");

        // 给父元素添加 click 事件
        list.addEventListener("click", function(event) {

            // 判断点击的是否是删除按钮
            if (event.target.classList.contains("delete")) {

                // 删除按钮所在的 li
                event.target.parentElement.remove();
            }

        });
    </script>
```
事件冒泡是机制，事件委托是利用这个机制的一种编程方法。  
```
事件冒泡
    ↓
子元素的事件向父元素传播
    ↓
父元素可以接收到这个事件
    ↓
父元素通过 event.target 判断是谁触发的
    ↓
事件委托
```

# 事件捕获
事件从祖先元素开始，逐级向下传播到目标元素。  
作用：提前监听、统一检查。    
stopPropagation() 可以阻止事件继续传播。 


# target和currentTarget
target = 事件真正发生在谁身上  
currentTarget = 当前这个事件监听器绑在谁身上  
```js
.target
↓
<button id="child">

currentTarget
↓
<div id="parent">
```

# 事件传播的三个阶段
实际上，DOM 事件传播通常分为三个阶段：
```
第一阶段：捕获阶段
从 window、document 等外层逐级向目标元素传播。
第二阶段：目标阶段
事件到达真正触发事件的目标元素。
第三阶段：冒泡阶段
事件从目标元素向祖先元素逐级传播。
```

# `textContent`、`innerText` 和 `innerHTML` 的区别

这三个都是 JavaScript 中用于操作 DOM 元素内容的属性，但它们处理文本和 HTML 的方式不同。

**核心区别：**

* `textContent`：获取或设置元素的所有文本内容。
* `innerText`：获取或设置元素显示出来的文本内容。
* `innerHTML`：获取或设置元素内部的 HTML 内容，可以解析 HTML 标签。

---

## 一、区别对比

| 对比           | `textContent` | `innerText` | `innerHTML` |
| ------------ | ------------- | ----------- | ----------- |
| 获取文本         | 所有后代文本        | 渲染后的文本      | HTML 源代码    |
| 是否识别 HTML 标签 | 否             | 否           | 是           |
| 是否保留隐藏元素的文本  | 是             | 通常不包含       | 是           |
| 设置 HTML 标签   | 当作普通文本        | 当作普通文本      | 解析为 HTML    |
| 是否修改 DOM     | 设置时会          | 设置时会        | 设置时会        |

---

## 二、textContent：获取或设置纯文本

### 1. 获取文本

```html
<div id="box">
    <p>Hello</p>
    <p>World</p>
</div>
```

```javascript
const box = document.querySelector("#box");

console.log(box.textContent);
```

输出的文本包含后代元素中的文本内容：

```text
Hello
World
```

### 2. 设置文本

```javascript
box.textContent = "<strong>Hello</strong>";
```

页面会显示：

```text
<strong>Hello</strong>
```

这里的 HTML 标签被当作普通文本，不会变成加粗效果。

---

## 三、innerText：获取或设置渲染后的文本

### 1. 获取文本

```html
<div id="box">
    <p>Hello</p>
    <p style="display: none;">Hidden</p>
    <p>World</p>
</div>
```

```javascript
const box = document.querySelector("#box");

console.log(box.innerText);
```

输出：

```text
Hello

World
```

`innerText` 通常会忽略通过 CSS 隐藏的文本，并根据页面的渲染布局处理换行。

### 2. 设置文本

```javascript
box.innerText = "<strong>Hello</strong>";
```

页面会显示：

```text
<strong>Hello</strong>
```

它和 `textContent` 一样，不会把字符串中的 HTML 标签解析成真正的 HTML 元素。

---

## 四、innerHTML：获取或设置 HTML 内容

### 1. 获取 HTML

```html
<div id="box">
    <p>Hello</p>
    <strong>World</strong>
</div>
```

```javascript
const box = document.querySelector("#box");

console.log(box.innerHTML);
```

输出：

```html
<p>Hello</p>
<strong>World</strong>
```

`innerHTML` 获取的是元素内部的 HTML 标记及内容。

### 2. 设置 HTML

```javascript
box.innerHTML = "<strong>Hello</strong>";
```

页面会显示加粗的：

**Hello**

因为 `innerHTML` 会将字符串解析为 HTML 元素。

---

## 五、三者的直观区别

假设 HTML 内容如下：

```html
<div id="box">
    Hello <strong>World</strong>
</div>
```

分别执行：

```javascript
const box = document.querySelector("#box");

console.log(box.textContent);
console.log(box.innerText);
console.log(box.innerHTML);
```

结果：

| 属性            | 输出                             |
| ------------- | ------------------------------ |
| `textContent` | `Hello World`                  |
| `innerText`   | `Hello World`                  |
| `innerHTML`   | `Hello <strong>World</strong>` |

---

## 六、使用场景

| 属性            | 适合的场景           |
| ------------- | --------------- |
| `textContent` | 读取或设置纯文本、修改提示信息 |
| `innerText`   | 获取用户实际看到的文本     |
| `innerHTML`   | 动态创建或替换 HTML 结构 |

**安全提醒：** 如果内容来自用户输入，不要直接使用 `innerHTML` 插入未经处理的内容，否则可能导致 XSS 跨站脚本攻击。处理普通文本时，优先使用 `textContent`。

---

## 七、总结

```javascript
element.textContent = "普通文本";
element.innerText = "显示的文本";
element.innerHTML = "<strong>HTML内容</strong>";
```

**一句话记忆：**

* `textContent`：看所有文本。
* `innerText`：看显示的文本。
* `innerHTML`：看 HTML 结构。
