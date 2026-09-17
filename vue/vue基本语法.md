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
```
<script setup>
function showMessage() {
  window.alert('确认了任务内容')
}
</script>

<template>
  <button type="button" @click="showMessage">
    确认
  </button>
</template>
```
> [运行](https://play.vuejs.org/#eNp9UctOAjEU/ZWmGyAhgwnGBUHjIyw08RE1rpqYsVyGgZm2aW8ZDGEpC/+CxDV75Xcg+hnemQnIwrDrPefc03PaCT8zJhh54C3edtLGBpkD9OZEqJ5XEmOtmOvr7BqcCyOo1thEKMayWHV1FoQJWKxWvueLn8XH6mu2Wi7X7/P17G29+KzUhJoK1W6UtmRIA0JqkhCBJsbaLx6R/PHVwLHg5SQ4O5VJLIeE7FwseLHCWHlXsd4oN4hoN3aMeZ2jk1r14igYOK2oWpFZcKlTE1PkW5P3coK3yjY5FyaJzq4KDK2H+gaXfZDDf/CBG+eY4HcWHNgRJdxyGNoIsKQ7DzcwpvOWTHXXJ6TeQ96D04nPM5ayc6+6FHtHV6S9TI22GKvo0XXGCMptSuVBc+W00AtO/3uxp/pf3GZwWOzRz9ErPqN7Apu70hMeBQdBk09/Ac2PxKI=)

## 4.v-if
v-if条件为真时创建DOM，为假时不创建。  
```
<script setup>
import { ref } from 'vue'

const status = ref('loading')

function changeStatus() {
  if (status.value === 'loading') {
    status.value = 'success'
  } else if (status.value === 'success') {
    status.value = 'error'
  } else {
    status.value = 'loading'
  }
}
</script>

<template>
  <div>
    <p v-if="status === 'loading'">正在加载...</p>
    <p v-else-if="status === 'success'">加载成功！</p>
    <p v-else>加载失败，请重试。</p>

    <button @click="changeStatus">
      切换状态
    </button>
  </div>
</template>
```
> [运行](https://play.vuejs.org/#eNp9U01r20AQ/SvDXuxAKhdSegiS6Qc5tIe2NKWnhaLKI0eJtCv2QzWYQNJLgmmgl94KLf2AXkoolPaS/Joi1znlL2SktRRD4oAOq5n3Zt68nR2z+3nuFRbZOvN1pJLcgEZj8z4XSZZLZWAMCmPYhVjJDDoE7XDBRSSFJqgJjdUQVJBuJ5XhIBHDzkoFiK2ITCIFRFuhGOJmjeyuwJgLgCSGruN6RZhahCAI4JLvQDAv30Cgo20UodYkAEgQphqXVGqASyuhUlIt1lmCayTVSC7o83vOJjKIfgxmeRoapD8Af5AU9YGOORS3kjjgrLFocUDO+tOfX8uPP8rJ59npqed5fq9yvGVWkq7S2/FZ3xGnh+/Lyafzk/1r6HNI+e3X7Pf385N3s+O/ZwdHs+MP//beOvic8NoaQ9d0L0qTaIc6Lt4XdXIogPLwYHr05f/kz3Rvf87sOaqbveeG93utJWyVGU17EidDb1tLQStWu0wtZJYnKaqnebUh1GW98Z+zME3lm8d1zCiLq0082sJo55r4th5VMc6eKdSoCuSszZlQDdG49MbmExzRuU1mcmBTQt+QfI5aprbS6GAPrBiQ7AVcrfZR/VDoYl/ojZFBoZuhKqH15tR4zujxPLxh9Eu5a96dZuPIxVdGv0RVVSUL73q3vTW2ewG6m1AJ)

### 注：v-show和v-if的区别
v-show元素始终存在于 DOM 中，只是通过 CSS 的 display 属性控制是否显示。 
```
<script setup>
import { ref } from 'vue'

const isShow = ref(true)
</script>

<template>
  <p v-show="isShow">这段文字可以显示或隐藏</p>

  <button @click="isShow = !isShow">
    切换显示
  </button>
</template>
```
> [运行](https://play.vuejs.org/#eNp9UT1PAjEY/iu1C5rgnQnGgRzEjzDooEaMUxODR4HCXdu0PSAhN8NicAJ1NDqqk4sm+mfkxH9h2wung2Fr3+ejz/N2AHc4d7oRhkXoSV8QroDEKuJlREnImVBgAARugBg0BAtBTlNziCLqMyoVILLaYj1QMpRVJSK8hqjnpj7aQV8UDnlQU1jfAPA46K5LrSghmEoRLM8/bpKnl2QynD1OZ+Pnz7eH5Pr96/41GU2+b6/m07HnmjRWfxEpxSjY9gPidzIT/f5KZmd4AMxGw+TyLjWySjeVathzs0wwD5XUTRqk6bQlo3oJA8NG0GchJwEWR1wR3RTBIrCIwWpBwHoHdmYq5xdzv4X9zj/ztuybGYLHAkssuhjBDFM10cQqhSvVQ9zX5wwMWT0KNHsJeIIlCyKTMaXtRrSuY//h2bT79isJbZ7KSl9hKhelTFDDjC0fQf29e0uq/8YtOJtWh2ist3iu5BkWxlWvcMvZcAow/gGP69gF)