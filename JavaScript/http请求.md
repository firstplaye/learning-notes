# 1.JavaScript 中的 CORS 是什么？
CORS（Cross-Origin Resource Sharing，跨源资源共享） 是一种浏览器安全机制，用于控制网页能否访问不同源的服务器资源。CORS 主要用于解决前端跨域请求的问题。


# JavaScript 中的 CORS 是什么？

**CORS（Cross-Origin Resource Sharing，跨源资源共享）** 是一种浏览器安全机制，用于控制网页能否访问不同源的服务器资源。

简单来说：

> **当网页向不同源的服务器发送请求时，浏览器会根据 CORS 规则，判断网页是否有权限读取服务器返回的数据。**

CORS 主要用于解决前端跨域请求的问题。

---

# 什么是跨域？

首先要理解什么是「同源」和「跨源」。

一个 URL 由协议、域名、端口等部分组成。

例如：

```text
前端：http://localhost:5173
后端：http://localhost:8080
```

虽然这两个地址的域名都是 `localhost`，但端口不同，因此属于**不同源**。

浏览器判断是否同源，需要同时满足：

1. 协议相同。
2. 域名相同。
3. 端口相同。

只要其中一个不同，就属于跨源。

### 常见的跨源情况

| 前端地址 | 后端地址 | 是否跨源 | 原因 |
|---|---|---|---|
| `http://localhost:5173` | `http://localhost:8080` | 是 | 端口不同 |
| `http://example.com` | `https://example.com` | 是 | 协议不同 |
| `http://a.example.com` | `http://b.example.com` | 是 | 域名不同 |
| `http://example.com` | `http://example.com` | 否 | 三者相同 |

---

## 二、为什么会出现 CORS 问题？

假设你正在学习 Vue，使用 Vite 启动前端项目：

- 前端：`http://localhost:5173`
- 后端：`http://localhost:8080`

前端通过 `fetch()` 请求后端：

```js
fetch("http://localhost:8080/api/users")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```

如果后端没有返回允许当前前端源访问的 CORS 响应头，浏览器就会阻止前端 JavaScript 读取响应内容，并在控制台显示 CORS 错误。

---

## 三、CORS 是如何工作的？

1. **前端发送请求**

   浏览器中的 JavaScript 请求后端 API，并携带请求源信息 `Origin`。

2. **后端返回响应**

   后端通过响应头声明允许哪些源访问，例如 `Access-Control-Allow-Origin`。

3. **浏览器检查权限**

   如果响应符合 CORS 规则，前端可以读取响应；否则浏览器会阻止 JavaScript 读取响应内容。

CORS 的权限检查主要由浏览器执行，服务器通过 HTTP 响应头声明允许的访问范围。

---

## 四、常见的 CORS 响应头

| 响应头 | 作用 |
|---|---|
| `Access-Control-Allow-Origin` | 指定允许访问的源 |
| `Access-Control-Allow-Methods` | 指定允许的请求方法 |
| `Access-Control-Allow-Headers` | 指定允许的请求头 |
| `Access-Control-Allow-Credentials` | 指定是否允许携带凭据进行跨源访问 |

### 示例：允许指定前端访问

后端可以返回：

```http
Access-Control-Allow-Origin: http://localhost:5173
```

表示允许来自 `http://localhost:5173` 的网页代码读取符合条件的跨源响应。

如果是公开且不需要凭据的资源，也可以使用：

```http
Access-Control-Allow-Origin: *
```

表示允许任意源访问该资源。

---

## 五、什么是预检请求（Preflight）？

有些跨源请求在发送真正的请求之前，浏览器会先发送一个 `OPTIONS` 请求，询问服务器是否允许此次请求。

这个过程叫作**预检请求**。

例如：

```http
OPTIONS /api/users HTTP/1.1
Origin: http://localhost:5173
Access-Control-Request-Method: PUT
```

后端如果允许，会通过响应头声明允许的请求方法和请求头。浏览器确认通过后，才会继续发送实际请求。

**注意：** 并不是所有跨源请求都会触发预检。

---

## 六、前端遇到 CORS 错误怎么办？

**通常需要由后端配置 CORS，而不是单纯修改前端 JavaScript。**

常见解决方法：

1. 后端为需要访问的接口配置正确的 `Access-Control-Allow-Origin`。
2. 如果请求使用了特殊方法或请求头，正确配置允许的方法和请求头。
3. 如果需要携带 Cookie 等凭据，前后端需要正确配置凭据相关选项，不能将 `Access-Control-Allow-Origin` 设置为 `*`。
4. 开发阶段可以使用 Vite 代理，将请求转发到后端，避免浏览器直接跨源请求。

---

## 七、CORS 与同源策略的关系

- **同源策略（Same-Origin Policy）**：浏览器的一项安全机制，限制网页脚本访问不同源的资源。
- **CORS**：服务器通过 HTTP 响应头授权浏览器允许特定跨源访问的一种机制。

---

## 八、总结

记住这三句话：

1. 不同协议、域名或端口，属于不同源。
2. CORS 是浏览器用于控制跨源响应能否被网页 JavaScript 读取的机制。
3. 遇到 CORS 错误，通常需要检查后端的 CORS 响应头，或者在开发环境配置代理。

**一句话理解：CORS 就是服务器告诉浏览器，哪些网页可以读取它的跨源响应。**

# Axios 是什么？
Axios 是一个基于 Promise 的 JavaScript HTTP 请求库，主要用于在前端向服务器发送 HTTP 请求、接收服务器返回的数据。