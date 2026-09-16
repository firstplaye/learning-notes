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

> 🧪 [在 Vue Playground 中运行](https://play.vuejs.org/#eNp9UsFqFEEQ/ZWyL5OwmdndrARcJosac9CDioqnBhlnatfOznQP3TXryjI3QfDiRS+eDAieDDkKyefEJJ78Bat7MMkh5Nb93qvmvde1EvfqOlk0KMYidblVNYFDauqJ1KqqjSVYgcUptDC1poKIpZHUUudGOwLK3By2vWBtJTWAKsYwHAw3/JkUlTiG6PzH+9Nvx2f7B+cH36PAZM6pmUZPnn0+PPn1s4Nrq4xV9I5hbWyVlR3sKKPGMUimMB1UNPggIz+/Odjcigd34tHAM+26t5b2uyAcgS+EVV2ymG8AaT05OTr6/XH/9Mvhnw+f/h5/Xa1CiEQV0LZp3+dm2euGyGi4m5cqn29LESSLrGyQhb2eFJPeMO13qm7iVhzDTqa1IW4jKziMqdGSQgdmCo0ucKo0FrDmWaVnEKkiWoc45vG0f8Wk1GJDkON+p2qW7Dmj+WtCuVLkpqpVifZJTYr7l2IMgfFcVpbm7aOAkW0w9BRm3mA+vwbfc0uPSfHUokO7QCkuOMrsDKmjd58/xiWfL8jKFE3J6hvIZ+hM2XiPnew+52fbV3TB7cOwYFzGC7e7JNTufyhv1CvboJeCl27nhuiXdkfJ7TDHq8AtviL3Eq1/lSvcSgbJSLT/ADQJAkI=)

## 2.reactive返回代理对象

### (1)`reactive()`接收对象，并返回一个Vue可以跟踪的代理对象（Proxy）。Vue 的 reactive() 底层就是利用Proxy拦截对属性的操作来实现响应式。

```
  数据发生变化
     ↓
  Proxy检测到
     ↓
  Vue知道数据变了
     ↓ 
  重新更新需要更新的页面
```
