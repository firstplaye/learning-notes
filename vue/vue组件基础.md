# 什么是 Vue 组件？
把页面中某一部分的 HTML、CSS、JavaScript 以及相关逻辑封装到一起，形成一个可以重复使用的独立模块。  

## 1.scoped的作用
scoped是Vue单文件组件<style>标签的一个属性，用来实现组件样式的局部作用域。  

## 2.局部注册（Local Registration）：只在注册它的那个组件中可以使用。全局注册（Global Registration）：注册一次，整个 Vue 应用中的组件都可以使用。
`App.vue`
```
<script setup>
import TaskCounter from './components/TaskCounter.vue'
</script>

<template>
  <PageTitle />
  <!-- 全局导入无需再import -->
  <TaskCounter />
  <!-- 局部导入，每次都需要import -->
  <TaskCounter />
  <TaskCounter />
</template>
```
`main.js`
```
import { createApp } from 'vue'
import App from './App.vue'
import PageTitle from './components/PageTitle.vue'

const app = createApp(App)

app.component('PageTitle', PageTitle)//应用级全局注册

app.mount('#app')
```