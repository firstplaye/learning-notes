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
v-show元素始终存在于 DOM 中，只是通过 CSS 的 display 属性控制是否显示。简单提示频繁显示和隐藏时推荐使用v-show
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

## 5.v-for
Vue 中的列表渲染，就是把一个数组中的多个数据，自动生成多个 HTML 元素。
```
<script setup>
const fruits = ['苹果', '香蕉', '橘子']
</script>

<template>
  <ul>
    <li v-for="fruit in fruits" :key="fruit">
      {{ fruit }}
    </li>
  </ul>
</template>
```
> [运行](https://play.vuejs.org/#eNp9Uc1KAzEQfpWQSy91V1A8lK2g0oMeVFS8GJGynda02STkp1aWfQDx4kVQEI+CBx/AB7LUt3CSbasH6Skz833zzTeTku5onYw90BbNbG64dsSC83qbyVxJ60jfeO4saZOLxuz+c/r60miSxvfb8+zxLkTT96evj4fGJZNZWvdjJyYOCi26DjAjJPMivhgJTsZrfWXajEZlwuV8BKOkNYLbBcDovIWQsqwppKrmKqngtXAalbN0OY42qbPovM8HydAqiXuVgclorgrNBZgj7ThuxmiLRCRgXSHUzUGsOeOhuajn15CP/qkP7STUGD02YMGMgdEl5rpmAGg/wJ3TQ5hgvAQL1fMC2SvAE7BK+OCxpu162UPbf3jR7X6hlXFcDs5sZ+JA2sVSwWhgVpHPKH7u3orVf+1uJJuxj8kKr3jl7DmYoIon3ErWkw1a/QCk37qW)

### (1)为什么要写 :key？
key 是 Vue 用来识别每一个列表项目的标识。

### (2)为什么不建议直接用数组索引？
如果列表会增加、删除、排序，索引可能发生变化，Vue 就不容易准确识别原来的项目。

### (3)push()、find()、属性赋值和filter() 的区别
`push()`：在数组末尾添加元素,返回值： 修改后的数组长度   
`find()`: 查找符合条件的第一个元素,返回值：第一个符合条件的元素,找不到时： undefined。  
属性赋值不是一个数组方法，而是直接给对象属性设置新值。  
`filter()`：筛选出符合条件的所有元素,返回值：一个新数组
```
const fruits = [
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橘子' }
]

const result = fruits.filter(item => item.id !== 2)

console.log(result)
```

### (4)区分有数据和空列表状态
判断列表为空时用`tasks.length === 0` 
```
<script setup lang="ts">
import { ref } from "vue";

type Task = {
  id: number;
  title: string;
};

const tasks = ref<Task[]>([]);

function addTask() {
  tasks.value.push({
    id: Date.now(),
    title: "学习 Vue"
  });
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter(task => task.id !== id);//将不等于带删除值的新数组赋给原数组
}
</script>

<template>
  <button @click="addTask">
    添加任务
  </button>

  <p v-if="tasks.length === 0">//
    暂无任务
  </p>

  <ul v-else>
    <li
      v-for="task in tasks"
      :key="task.id"
    >
      {{ task.title }}

      <button @click="deleteTask(task.id)">
        删除
      </button>
    </li>
  </ul>
</template>
```
> [完成](https://play.vuejs.org/#eNp9U81u00AQfpXBp0QqdqUiDmlS8dcDHABB1UtdIdcep9ts1tbuOm0VRUKoQvyI3gC1F4qEeqvUC6IQHidO4C2Y3XXTVEX1wdqd2fnmm29m+t7dPPd7BXoNr6liyXINCnWRA49EuxV6WoXeUihYN8+khj5ITGEAqcy6EHoUF3qLoQiF3s0RViLVgRb0QwHAkgaIoruBkvwAmmmODVBaMtEmy8BGxZlQGjSFKYoj6KaBWFtfqq2t1+2LtBCxZpmAKEmMr1Z38DbG70W8QD8v1GbNWl3aB5FGX2TbtfqcM1bJQ688OR79PIJVQ9u4BibJ4FKeBDlqtKkuSrialOjOUkgZ1yhrxgStJevyWQI3Wi1iVF8MgvL09ejsw+Tk7ejXfnl2XL45+nvwrXz5e3K4N/50Ov54Ohnu/fn+fjI8KPe/uKtl1gxcU6gFdNHYzTlVRzeA5kahNTG+E3MWd6hVlUS2X6bs8Y9h+e5oNKT/VxsQuAiLRdccejdZanpsK+Eo2noTWsR5njCCoEI5fDX+fAklPwcoOCEgV44PGThzByB7mskKGphwYjnRzdfo4G7lJZ3O7RUMQL/vJLSNg4HtkPNcKXqmXxVafSqA+ZzS0/ALCdyVM6dlUHA6NIOpwt4cjT7NZ8ra/pbKBO2HnYHQi7NuzjjKJ7kZGCqq4abD+CLOs+1H1qZlgdX8Ucwmxp3/2LfUjrGF3lOJCmWP5nLq05Fso3bu5eePcYfOU2c3SwpOr69xPkOV8cJwdM/uFSIh2jPvLNuHdrNpK1fU8o5Goc6LMkTtktj3dtnvX1P6Bd0F/5aNowEmFV9otYrSoJKEt/15f8Eb/APEXJNz)

