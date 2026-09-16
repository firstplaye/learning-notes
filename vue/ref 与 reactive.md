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

### (2)`reactive()`和`ref()`的区别

#### (1)当ref(对象)时，对于对象.value重新赋值时本质上是给了value一个新的对象。

```
  <script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  title: '',
  assignee: '',
  priority: 'normal',
})

const user = ref({
  name: '张三',
  age: 20
})

const current_user = user.value;//

user.value = {
  name: '李四',
  age: 30
}

console.log(current_user === user.value);//false
console.log(current_user);//Proxy(Object) {name: '张三', age: 20}
console.log(user.value);//Proxy(Object) {name: '李四', age: 30}
</script>

<template>
  <p>{{current_user.name}}</p>
  <!-- 张三 -->
  <p>{{user.name}}</p>
  <!-- 李四 -->
</template>
```

> [运行](https://play.vuejs.org/#eNp9U8Fu1DAQ/RXjy+5Ku0nFIg5LWglQD3CgFSBOlqqQToIXx7bsybJVlA/gwg9USP0MDpz4Fsp3ME6aTbbq9mR75r03bzx2zV9aG20q4Cue+MxJi8wDVvZEaFla45DVzEGaodzAnHY5a1juTMkmRJoILXRmtEeWG1ey4x10WgvNGEpUsGKTyTycUu9loWEIWCeNk3hFAU30VIVwMxtEKw+uFc07PZ2WgX37++bvr+93ogVFnh7t87LKOdB4cccPS7RJVQUv4jighgBlx8r/fv64vb4eKS+Dci9sFETKFNN9+eNxgRlVyFPl4TAjQM6d2V5Nzz6vIcPZn5v6XmN9V1R5rLJf5oBG30LvnzSSuJsszZQOCKVVKQKdGEvsSV2P3UVBpmmSOLwAyj9ZLFhniy0WA+UQtKveQZN4VEpoPufoqZ1cFtHaG00vrr16wTNTWqnAnVmU1K7gq24oIZcqZb69bWPoKmgn03K+QPb1gfjab0NM8HMH5HEDgu9ymLoCsEuffngHW9rvkqW5rBShH0m+BxpFFTx2sFeVviTbI1zr9k37b6QuPvrTLYL2fVPBaEA2LV5w+kGvH2l9sLuMnrU8eot0ixfoP4ELqnSFz6OjaMmb/xsDUbA=)

#### (2)reactive不能随意整体替换
```
<script setup>
import { reactive, ref } from 'vue'
const user = reactive({
  name: '张三',
  age: 20
})

// user = {
//   name: '李四',
//   age: 30
// }
//此时会报错，因为user本身属于const对象不能再被指向其他对象
user.name = '李四'
user.age = 30
console.log(user.name);
console.log(user.age);

</script>

<template>
  <p>{{ user.name }}</p>
  <p>{{ user.age }}</p>
</template>
```
> [运行](https://play.vuejs.org/#eNp9UkFr1EAY/SvDXLaFJSmueFhjQaUHPaioeBqQkH4bU5OZYWayLoScREVpi4IouioqeqoivZS6rv8mCevJv+A3EzdWKL2EzHvfm/fmzRT0vJTeOAc6pIGOVCIN0WByuc54kkmhDCmIgjAyyRj6+DciJRkpkZEeinqMR4JrQ3INipzrBlcKxgnhYQZD0qvn76vDx72+hcIYkVNrjJerjDPu+0slCnDRaZq3u/V0ajUOdbIBynBV2m/z9VPz8qCav26efP71/NXv+XY9RZeZ3a1582Ux26v331WzXZeu/vZ9sf+hOtxZ3P9ZP9xZfNxrth/VT5/VDw6qHy9alnEr9aw9pln6/0XRHkHrb/cTKXipiFc6werZYwjUWJzxwG9rxUJxYSCTaWgAV4QEcr0oXAOtcVkGvi3+P8aaL4nAP6JnnPap0eg8SmJvSwuOd+iKZzQSmUxSUFelSTAZo0PbMDaJXJim4t5lhxmVg7sXp7kD0d1j8C09sRij1xRgoDEw2nEmVDGYlt64cQUm+N+RmdjMU5w+gbwO2FpuM7ZjF3K+ibGPzLm0l9xLTHh8U29MDHC9PJQNaidLN88ovsmLJxz9X9yBd9rp8CVii7eNvgXK7ooVnvHWvAEt/wBRNijp)

## 3.toRefs()[扩展]