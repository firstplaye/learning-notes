# 1.CSS 的作用
CSS 用来设置网页元素的颜色、大小、位置和布局。  

# 2.css的三种引入方式
## 1.行内样式
行内样式写在标签的 style 属性中：
```
<div style="color: red; font-size: 12px;">
    青春不常在，抓紧谈恋爱
</div>
```
## 2.内部样式
内部样式表写在 HTML 的 style 标签中：
```
<style>
    div {
        color: red;
        font-size: 12px;
    }
</style>
```
## 3.外部样式
外部样式表把 CSS 写到单独文件中，再用 link 引入：
```
<link rel="stylesheet" href="css/style.css">
```

# 3.id选择器和class选择器有什么区别
CSS 中，id 选择器和 class 选择器都用于选中 HTML 元素并设置样式，主要区别在于：**id 通常用于唯一标识一个元素，class 用于给一个或多个元素分组。**

# 4.CSS 浮动（float）是什么？
CSS 浮动（float） 是一种让元素向左或向右移动，并允许后续的行内内容环绕在它周围的布局方式。浮动最初常用于实现文字环绕图片的效果，后来也曾广泛用于网页布局。  
## 浮动会带来什么问题？
父元素高度塌陷。
## 如何清除浮动？
使用 clear 属性,使用 overflow: hidden

# 5.css选择器的优先级规则
```
!important
   ↓
行内样式
   ↓
ID 选择器
   ↓
Class / 属性 / 伪类
   ↓
元素 / 伪元素
   ↓
通配符
```

# 6.如何实现元素的水平居中
## 1. 使用 text-align: center
适用：文字、行内元素、行内块元素。
## 2.使用 margin: 0 auto
块级元素水平居中方法
## 3.使用 Flex 布局
{
    display: flex;
    justify-content: center;
}

# 7.display：none和visibility的区别
1. display: none：隐藏元素，不占据布局空间  
2. visibility: hidden：隐藏元素，但保留布局空间  

