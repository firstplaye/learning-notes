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


