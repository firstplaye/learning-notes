# ref与reactive

## 1.ref声明一个响应式值

### （1）脚本中先通过task.value取得对象，再访问对象字段。

### （2）在模板表达式里会自动解包不能再.value

```js
<script setup>
import { ref } from 'vue'

const task = ref({
  id: 101,
  title: '规格确认',
  assignee: '田中',
  priority: 'normal',
  status: 'todo',
  dueDate: '2026-09-30',
})

</script>

<template>
  <p>任务数量：{{ task.id }}</p>
  <button @click="task.value.id++">+1</button>
  <!-- Cannot read properties of undefined (reading 'id') -->
</template>


```
