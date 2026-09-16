# Vue Playground 链接生成器

把笔记里的 Vue 示例代码变成 [Vue 官方 SFC Playground](https://play.vuejs.org) 的链接，
点一下就能在浏览器里直接运行、看效果。

```
node tools/vue-playground.mjs vue/快速入门.md --write
```

运行后，每个 Vue 代码块下面会自动多出一行：

> 🧪 [在 Vue Playground 中运行](https://play.vuejs.org/#eNo9jsFK...) <!-- vue-playground -->

## 为什么用它

写笔记时最麻烦的是「示例代码看不出效果」。Vue 官方 Playground 本身很好用，
但每次都要手动复制粘贴代码进去。这个脚本直接生成带代码的链接，省掉复制粘贴。

## 安装

不需要安装任何东西：

- 只依赖 Node.js 内置模块（`node:zlib`、`node:fs`），**没有第三方依赖**，不用 `npm install`
- 需要 Node.js 16 以上（推荐 18+）

## 用法

| 场景 | 命令 |
| --- | --- |
| 有一个 `.vue` / `.js` 文件，想拿到链接 | `node tools/vue-playground.mjs src/App.vue` |
| 看看笔记里有哪些 Vue 代码块 | `node tools/vue-playground.mjs vue/快速入门.md` |
| 把链接写进笔记 | `node tools/vue-playground.mjs vue/快速入门.md --write` |
| 顺便把 ```` ```js ```` 改成 ```` ```vue ```` | `node tools/vue-playground.mjs vue/快速入门.md --write --retag` |
| CI 里检查链接是否过期 | `node tools/vue-playground.mjs vue/快速入门.md --check` |

### 在 VS Code 里一键执行

按 `Ctrl+Shift+P` → `Tasks: Run Task`，选择：

- **Vue Playground: 为当前笔记生成运行链接** — 对当前打开的 `.md` 文件执行 `--write`
- **Vue Playground: 生成当前代码的分享链接** — 对当前打开的 `.vue` 文件输出链接

## 它会识别哪些代码块

1. 显式标注的：```` ```vue ````、```` ```vue3 ````、```` ```sfc ````
2. **标签写错但内容是 SFC 的**：代码以 `<template>` 或 `<script>` 开头就认。
   笔记里常见 `` ```js `` 里放整段 SFC 代码，这种情况也能识别。

如果代码只是模板片段（没有 `<template>` / `<script>`），会自动包一层 `<template>`。

## 链接是怎么生成的

跟官方 `@vue/repl` 的 `serialize()` 完全一致：

$$\text{URL} = \texttt{https://play.vuejs.org/\#} + \mathrm{base64}\big(\mathrm{zlib}\big(\mathrm{JSON.stringify}(files),\ \text{level}=9\big)\big)$$

- `files` 形如 `{ "App.vue": "<template>...</template>" }`
- 键名不带 `src/` 前缀，Playground 载入时会自动补上
- `App.vue` 是默认主文件，所以预览区会直接显示它
- 链接里的 `App.vue` → `src/App.vue` 是 Playground 的行为，不需要你写前缀

> 注意：Playground 靠 zlib 头 `0x78DA` 判断这是新格式，所以压缩级别必须是 9。
> 脚本里做了断言，如果哪天 Node 改了这个行为会立刻报错，而不是生成一个打不开的链接。

## 已知限制

- **一个代码块只能对应一个文件**。多文件示例（需要 `import-map.json` 或额外组件）
  请直接在 Playground 里点右上角的 **Copy sharable URL** 按钮拿链接。
- 链接会比较长（代码压缩+base64 的必然结果），但点开即用，不需要额外托管。
- 代码块内容变了，记得重新跑一次 `--write`，否则链接还是旧代码。
  可以用 `--check` 检测。

## 相关

- [Vue SFC Playground](https://play.vuejs.org)
- [vuejs/repl 源码](https://github.com/vuejs/repl)（序列化逻辑见 `src/store.ts`、`src/utils.ts`）
