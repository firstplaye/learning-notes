## 在 Vue Router 中，route 和 router的区别
route 表示当前正在访问的路由对象，里面有当前 URL、路径参数、查询参数等信息。  
```
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.path)   // 当前路径，例如 /users/123
console.log(route.params) // 路径参数，例如 { id: '123' }
console.log(route.query)  // 查询参数，例如 { keyword: 'vue' }
</script>
```

## router：路由器，用来进行导航
router 表示路由器实例，负责管理路由、切换页面。  
```
router.push()	跳转到新路由，保留历史记录
router.replace()	跳转到新路由，不新增历史记录
router.back()	返回上一页
router.go(-1)	前进或后退指定的历史记录步数
```

## 动态路由与params
任务详情路径中的编号每次不同，可以使用动态参数：  
```
{
  path: '/tasks/:id',
  name: 'task-detail',
  component: TaskDetailView,
}
```
## RouterLink 和 RouterView
1. RouterLink：路由导航链接:RouterLink 用来创建不会触发整页刷新的路由链接。
```
<template>
  <nav>
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/about">关于我们</RouterLink>
  </nav>
</template>
```
2.RouterView：路由组件显示的位置,RouterView 是一个占位组件。
```
<template>
  <header>
    <h1>我的网站</h1>
  </header>

  <RouterView />
</template>
```
```
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]
```
```
访问 /
    ↓
RouterView 显示 Home.vue

访问 /about
    ↓
RouterView 显示 About.vue
```
RouterView 自己不是首页，也不是关于页面，它只是显示匹配组件的位置。  
## RouterLink 会利用客户端路由机制，通常避免整页重新加载。
从/tasks/1直接进入/tasks/2时，两条URL使用同一个详情组件，Vue Router可能复用组件实例，因此onMounted()不会再次执行。

## 子路由
父组件中必须有 <RouterView />
子路由的组件显示在哪里？
显示在父组件的 <RouterView /> 中。
```
URL：/user/profile
        ↓
匹配父路由 /user
        ↓
App.vue 的 RouterView
显示 User.vue
        ↓
User.vue 的 RouterView
显示 Profile.vue
```

## 路由懒加载
路由懒加载就是：只有当用户真正访问某个路由时，才加载这个路由对应的组件代码。  