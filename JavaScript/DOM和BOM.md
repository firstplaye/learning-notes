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
