# watch是什么
watch 是 Vue 3 提供的一个侦听器，用于：监听响应式数据的变化，当数据发生变化时，执行指定的操作。
watch() 负责监听变化，回调函数负责接收新值和旧值，并执行后续操作。  
```
<script setup>
import { ref, watch } from "vue";

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log("新值：", newValue);
  console.log("旧值：", oldValue);
});

function increment() {
  count.value++;
}
</script>

<template>
  <p>当前数量：{{ count }}</p>
  <button @click="increment">增加</button>
</template>
```
> [运行](https://play.vuejs.org/#eNp9Uk1rFEEQ/StFn2bJMBuIeIizix/koAcVlZwaZOyt3UzS0930x+7CMOBNFMSDqOBBxIvX/ID4cybgyb9gdY87EZTcuuu91/VeVbfsjjHFOiA7ZKUTtjYeHPpg5lzVjdHWQwsWlzlsKi9OoIOl1Q1wRhLObnHFldDKeRA6KA+zyM32JwlIiiwBOWQKN8eVDJiDlot0msBsDi1XQGLltMRC6lXG2eXH8/7lxa+Lz5zlsJPFJ/8hfvp+RRxfJWI3GFgGJXytFdRKWGxQ+Wyya0iminXk7+1FAVfldIhPwenisTGy8kg3gNLM+x/v+9dvLz+c/3z1jhq27Z/AXVdO46yI9CJ4T71uC1mLsxlnY1PO5v23L/2br+V04BC/nI4dWM68o2DLelWcOq1oE8kjZ0I3ppZoH5mYwnF2OLiPWCWl3jxINW9pqru6OEFx9p/6qdvGGmePLTq0a9reiPnKrpBsRvjo6UPc0nkEG70IktjXgE+QlhKix4F2N6gF2f6Ll9zeT/+pVqtn7mjrUbldqGg0MrvET3/r3jXRr+weFDeSjhZIU3zu3THa+CqN8GaxXxyw7jcOqgT3)

## 1.为什么需要 watch()？
当响应式数据发生变化时，我们希望自动执行某些“额外操作”。这些额外操作通常叫作副作用（side effect）。
例如：向服务器发送请求；
将数据保存到 localStorage；
输出日志；
修改页面标题；
显示提示消息；
根据数据变化执行某个异步操作；
清理定时器或取消请求。

### 如果没有 watch()，需要手动处理
```
import { ref } from "vue";

const keyword = ref("");

function search() {
  console.log("搜索：", keyword.value);
}
keyword.value = "Vue";
search();

keyword.value = "React";
search();//每次修改完后都需要自己调用函数
```

## 2.为什么需要清理旧操作？
旧操作还没有结束，新操作又开始了，导致资源浪费、重复执行或数据错乱。  
```
请求 A：搜索 "V"
请求 B：搜索 "Vu"
请求 C：搜索 "Vue"
假设网络响应顺序不是发送顺序：
请求 C 先返回 → Vue 的结果
请求 A 后返回 → V 的结果
```

##  immediate与执行时机
首次立即执行时没有“上一次变化”，因此旧值通常是undefined。回调如果使用旧值，要先处理这种情况：
```
watch(keyword, (newValue, oldValue) => {
  if (oldValue === undefined) {
    console.log('首次读取：', newValue)
    return
  }
  console.log('发生变化：', oldValue, '→', newValue)
}, { immediate: true })
```

## watch的三个参数
### watch(source, callback, options)
```
watch(
  第1个参数,  // 监听谁
  第2个参数,  // 变化后做什么
  第3个参数   // 怎么监听
)
```
#### source需要接收一个Getter 函数、一个 Ref、一个 Reactive 对象，或者这些类型的数组。
点三次button，console会输出什么  
```
<script setup>
import { reactive, watch } from 'vue'

const user = reactive({
  name: '张三',
  age: 18
})

watch(user.age, (newAge, oldAge) => {
  console.log(`年龄变了：${newAge}`)
},{immediate : true})

</script>

<template>
  <button type="button" @click="user.age++">+1</button>
</template>
```
> [运行](https://play.vuejs.org/#eNp9UsFqFEEQ/ZWiEXbDDrOGiMgyuxglBz2oqHhqMONsZdJJT3fTXbO7MsxNBE9exZMf4UEl+DXZgyd/weoesuYQcpqueu9Vv1fTnTh0Ll+1KGaiCJVXjiAgtW4hjWqc9QQdeCwrUivMYF1SdQo9nHjbwIhlI2mkqawJBG1AD/MdedxJA2DKBmcw2l58u/zxaZTFVllzZ/+BNP1eFKeR4yjOGclgbHB9GA9WL/m7B/MFpFHxFqsx17YeH29/fv/z+8P285fLXx//Xny90w2q/phn9lmnmgaXqiSEGZBvcbiqmA4JORsXhI3TTOEKoHjXElkD9N7hXIqhkgIeVlpV59y5MjiZSLGY7BfTgcLiYrqbJDJBgX2eqDo/C9bwUpN1KSrbOKXRP3ekOIcUsyFUxEqt7fpp6kWvaUlJc4rV+Q39s7CJPSleeGRXK5Rih1Hpa6QBPnr1DDd83oGNXbaa2beAL5F33EaPA+1Ra5Zs+xovuX2SnoYy9etwtCE04SpUNBqZfeJLwU/k8S3R/9s9yO8lHf8+3uJbCm/Qx6m8wvv53fxA9P8ApePryg==)

<details>
<summary>点击展开</summary>
这里只会输出一个undefined,因为user.age是一个值而不是一个监听对象或者数据源，需要写成`()=>user.age才行。
</details>