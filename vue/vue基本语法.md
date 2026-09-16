# vue基本语法
## 1.文本插值 {{ }}
Vue会计算双花括号中的表达式，并把结果作为文本显示。  
```js
<script setup>
const message = 'Hello Vue!'
</script>

<template>
  <h1>{{ message }}</h1>
</template>
```
> 🧪 [在 Vue Playground 中运行](https://play.vuejs.org/#eNp9kUFPwzAMhf9K8GWXqQMNcZjKJECTgAMgQDtFQlVnuo40iWJnTKr633FarXBAuyXvfY6fnRZuvM/2EWEBOZWh9qwIOfqltqWzxKpBoqJCda0m92iMU+uIZxNt89mACygXxsabglFuSuXbi2XbjpVdl89ESSUjBlNgkgafdZXtyFlp36ZSDaVrfG0wPHuuJYCGheqd5BXS//ux1zhEnB71covl1z/6jg5J0/ASkDDsUcPocREq5MFevT3hQc6j2bhNNEKfMF+RnIkp44DdRruR2H+4Pu1D413g2lbvtDowWjoOlYImsut5DfIHdydG/407zy77Om072eIH0xpDelVWeJWdZ3PofgBZsJmj)

## 2.