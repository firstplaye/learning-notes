# Props与Emits
## 1.为什么需要Props与Emits
组件需要协作，但又不能互相乱改数据。Props与Emits解决了组件之间怎么传递数据和通知事情的问题。

### (1)Props是什么？为什么需要 Props？
Props 是“父组件传给子组件的数据”。同一个组件，显示不同内容。让组件接收外部数据，从而实现复用和配置。

### (2)defineProps()返回的是一个props对象，是一个只读响应式代理，子组件只能读不能修改。

### (3)将解构的 props 传递到函数中
当我们将解构的 prop 传递到函数中时，例如：  
```js
const { foo } = defineProps(['foo'])

watch(foo, /* ... */)
```
这并不会按预期工作，因为它等价于 watch(props.foo, ...)——我们给 watch 传递的是一个值而不是响应式数据源。实际上，Vue 的编译器会捕捉这种情况并发出警告。  

与使用 watch(() => props.foo, ...) 来侦听普通 prop 类似，我们也可以通过将其包装在 getter 中来侦听解构的 prop：  
```
js
watch(() => foo, /* ... */)
```
### (4)required和default
```
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  emptyMessage: {
    type: String,
    default: '没有数据',
  },
})
```
required: true表示父组件必须提供。  
default用于父组件未传值时的默认值。  
必填Prop通常不再提供默认值，否则“必须传入”的意义会变得不清楚。  

### (5)validator
在 Vue 的 defineProps() 中，validator 是一个“自定义验证器”，用来检查父组件传进来的 Props 值是否符合你规定的条件。  
```
<script setup>
const props = defineProps({
  status: {
    type: String,
    validator(value) {
      return ['工作中', '休假中', '离职'].includes(value)
    }
  }
})
</script>
```
如果传入的值在这个数组里，返回 true，验证通过；否则返回 false，验证失败。  

## 2.单向数据流
所有的 props 都遵循着单向绑定原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。  
另外，每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你不应该在子组件中去更改一个 prop。  

###  如果子组件想要更改对象 / 数组类型的 props，在大多数场景下，子组件应该抛出一个事件来通知父组件做出改变。

## 3.使用defineEmits声明事件
子组件
```
const emit = defineEmits(['changeTitle']);
console.log(emit);

function handleClick() {
  emit('changeTitle');
}
```
defineEmits()返回的是一个(event, ...args) => instance.emit(event, ...args)箭头函数

```
<script setup>
import { ref } from 'vue'
import PageTitle from './components/PageTitle.vue'
const title = ref("123");
function handleChangeTitle(newTitle,newe) {
    console.log(newTitle,newe);
    title.value = newTitle;
}
</script>

<template>
    <p>{{ title }}</p>
  <PageTitle @changeTitle="handleChangeTitle" />
</template>
```

## 4.组件v-model与Attributes
### 组件v-model本质上是特定名称的Prop和事件组合。实现双向数据绑定

## 5.透传 Attributes
#### 当父组件给子组件传入的属性，没有被子组件声明为 props 或 emits 时，这些属性会自动添加到子组件的根元素上。
#### 当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。