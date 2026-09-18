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