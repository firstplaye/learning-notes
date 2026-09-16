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

---

# 附：一键同步到 GitHub（`git-sync.mjs`）

> 上面讲的都是 `vue-playground.mjs`，下面这份是同一个目录里的另一个工具。

把「`add` → `commit` → `pull --rebase` → `push`」四步合成一条命令，提交信息不用自己想。

```bash
node tools/git-sync.mjs
```

## 用法

| 场景 | 命令 |
| --- | --- |
| 日常同步当前目录 | `node tools/git-sync.mjs` |
| 同步别处的仓库 | `node tools/git-sync.mjs ../vue-demo` |
| 自己指定提交信息 | `node tools/git-sync.mjs -m "修正: xxx"` |
| 新仓库首次接入远端 | `node tools/git-sync.mjs --init https://github.com/<用户名>/<仓库>.git` |
| 只预览，不改任何东西 | `node tools/git-sync.mjs --dry-run` |

## 在 VS Code 里点一下

`Ctrl+Shift+P` → `Tasks: Run Task`，选：

- **Git: 一键同步到 GitHub** — 真正执行同步
- **Git: 预览将要同步的内容** — 等价于 `--dry-run`

也可以直接双击 `tools/sync.cmd`。把一个文件夹拖到它上面，就能同步那个目录里的仓库。

## 执行顺序

```
1. 找仓库根目录，检查远端和提交者身份
2. git add -A
3. 有改动就提交（信息自动生成，或用 -m 指定）
4. git pull --rebase --autostash    ← 先对齐远端，避免 push 被拒
5. git push
```

第 4 步是关键：如果你在 GitHub 网页上直接改过文件，本地就落后于远端，
这时直接 `push` 会被 `non-fast-forward` 拒掉，先 rebase 就永远不会遇到。

## 出错时的行为

| 情况 | 表现 |
| --- | --- |
| 没有改动、也没有待推送的提交 | 打印「已经是最新」直接退出，什么都不做 |
| 没配 `user.name` / `user.email` | 停在第 1 步，并提示可以直接沿用历史提交里的身份 |
| 拉取时和远端冲突 | 自动 `git rebase --abort` 还原现场，再让你手动处理 |
| 目录不是 Git 仓库 | 提示加 `--init <仓库地址>` |
| 处于游离 HEAD | 提示先 `git switch <分支>` |

**任何一步失败都会立刻停下**，不会带着半成品状态继续往下走。

## 相关

- [Vue SFC Playground](https://play.vuejs.org)
- [vuejs/repl 源码](https://github.com/vuejs/repl)（序列化逻辑见 `src/store.ts`、`src/utils.ts`）
