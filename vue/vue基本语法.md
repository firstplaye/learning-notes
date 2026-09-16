# vue基本语法
## 1.文本插值 {{ }}
Vue会计算双花括号中的表达式，并把结果作为文本显示。
### 插值中可以进行简单运算 `{{ price * quantity }}`
### 插值中可以调用方法 `{{ toUpperCaseName() }}`
### 不能直接写变量声明、if语句或for语句
```js
<script setup>
const message = 'Hello Vue!'
</script>

<template>
  <h1>{{ message }}</h1>
</template>
```
> 🧪 [在 Vue Playground 中运行](https://play.vuejs.org/#eNp9kUFPwzAMhf9K8GWXqQMNcZjKJECTgAMgQDtFQlVnuo40iWJnTKr633FarXBAuyXvfY6fnRZuvM/2EWEBOZWh9qwIOfqltqWzxKpBoqJCda0m92iMU+uIZxNt89mACygXxsabglFuSuXbi2XbjpVdl89ESSUjBlNgkgafdZXtyFlp36ZSDaVrfG0wPHuuJYCGheqd5BXS//ux1zhEnB71covl1z/6jg5J0/ASkDDsUcPocREq5MFevT3hQc6j2bhNNEKfMF+RnIkp44DdRruR2H+4Pu1D413g2lbvtDowWjoOlYImsut5DfIHdydG/407zy77Om072eIH0xpDelVWeJWdZ3PofgBZsJmj)

## 2.属性绑定 v-bind
### `v-bind:属性="变量"`可简写为`:属性="变量"`
```
<script setup>
const saving = true
</script>

<template>
  <button type="button" :disabled="saving">保存</button>
</template>
```
> 🧪 [在 Vue Playground 中运行](https://play.vuejs.org/#eNp9UUFOwzAQ/Iq15ypFKuJQpZUA9QAHQIA4WUJpsoQUx7bsdQiq8g8uPIE38Bn4B5tYDRyq3rwzs7uz4y2cWps0AWEOqc9dZUl4pGCXUudGe66yptKlWAhyAaVOp1HFPBeEtVUZIVdCpOtAZLSgN4sLCbGSIOZF5bO1woLBOE3C8vvr4+fzPZ1GFfen03EYTIA8b3+qymTjjWZv236BhNzUtlLori1V7E7CXAxMz2VKmdfLAeutTnZ4/oz5yx5849sek3Dj0KNrUMLIUeZKpEiv7q6w5fdI1qYIitUHyFv0RoXeY5SdBV2w7X+6we1FbY0jDuTer1pC7XdHxayF6Aa9BP6g8wOn/9mdJcdDn9Qdp/hI/gFdP5UjPEmOkhl0v5zIp7g=)

## 3.v-on
### v-on:click通常简写为@click
