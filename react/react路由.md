# Nested Route（嵌套路由）负责组织页面层级，Layout Route（布局路由）负责复用页面布局，Outlet 负责显示当前匹配的子路由。
Nested Route: 建立父子路由关系  
Layout Route: 让多个页面共用布局  
Outlet: 显示匹配到的子路由组件

# `<Routes>，<Route>`
`<Routes>`：负责匹配当前 URL 对应的路由。  
`<Route>`：负责定义一条路由规则，即什么路径显示什么组件。 
```
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </BrowserRouter>
  );
}
```

# `<Link>`
用来跳转到其他路由页面；不刷新页面，只改变路径。
## navigate() 的作用是通过代码控制页面跳转

# 路由守卫
通常通过中间组件封装权限检查