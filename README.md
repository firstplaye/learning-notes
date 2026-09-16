# 学习笔记

## JavaScript

- [认识 JavaScript](./JavaScript/认识%20JavaScript.md)
- [this 关键字](./JavaScript/this关键字.md)
- [DOM 和 BOM](./JavaScript/DOM和BOM.md)
- [正则表达式](./JavaScript/正则表达式.md)

## TypeScript

- [快速入门](./TypeScript/快速入门.md)

## Vue

- [快速入门](./vue/快速入门.md)
- [Vue 基本语法](./vue/vue基本语法.md)
- [ref 与 reactive](./vue/ref%20与%20reactive.md)

---

## 工具

笔记里的 Vue 示例可以直接在浏览器里跑起来：

```bash
node tools/vue-playground.mjs vue/快速入门.md --write
```

它会在每个 Vue 代码块下面生成一行「🧪 在 Vue Playground 中运行」的链接，
点开就是 <https://play.vuejs.org> 并已载入这段代码。详见 [tools/README.md](./tools/README.md)。

### 一键同步到 GitHub

写完笔记不用手敲 git 命令：

```bash
node tools/git-sync.mjs
```

它会按 `add → commit → pull --rebase → push` 的顺序全自动完成，提交信息根据改动
文件自动生成。想先看看会发生什么，加 `--dry-run`。

在 VS Code 里也可以 `Ctrl+Shift+P` → `Tasks: Run Task` → **Git: 一键同步到 GitHub**，
或者直接双击 `tools/sync.cmd`。

