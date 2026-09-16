#!/usr/bin/env node
/**
 * Vue SFC Playground 链接生成器
 * ---------------------------------------------------------------------------
 * 把示例代码转换成 https://play.vuejs.org 的分享链接，点开即可直接运行。
 *
 * 链接格式与官方 @vue/repl 完全一致：
 *   https://play.vuejs.org/# + base64(zlib(JSON.stringify(files), { level: 9 }))
 *
 * 其中 files 形如 { "App.vue": "<template>...</template>" }，
 * 键名会由 Playground 自动补上 src/ 前缀，App.vue 即主文件。
 *
 * 只依赖 Node 内置模块，无需 npm install。
 *
 * 用法：
 *   node tools/vue-playground.mjs <file.vue>              生成单个文件的链接
 *   node tools/vue-playground.mjs <file.md>               列出文件中所有 ```vue 代码块的链接
 *   node tools/vue-playground.mjs <file.md> --write       直接在代码块下方写入/更新链接
 */

import { deflateSync, inflateSync } from 'node:zlib'
import { readFileSync, writeFileSync } from 'node:fs'
import { extname } from 'node:path'
import process from 'node:process'

const PLAYGROUND_URL = 'https://play.vuejs.org/#'
const MARKER = '<!-- vue-playground -->'
const MAIN_FILE = 'App.vue'

/* -------------------------------------------------------------------------- */
/* 编码 / 解码（与 @vue/repl 的 utoa / atou 等价）                              */
/* -------------------------------------------------------------------------- */

/** 把 { 文件名: 代码 } 编码成 Playground 的 hash 字符串（不含 #）。 */
export function encodeState(files) {
  const json = JSON.stringify(files)
  const zipped = deflateSync(Buffer.from(json, 'utf8'), { level: 9 })
  // Playground 依赖 zlib 头 0x78DA 来判断新格式，不一致会解不出来。
  if (zipped[0] !== 0x78 || zipped[1] !== 0xda) {
    throw new Error(`意外的 zlib 头: ${zipped[0].toString(16)} ${zipped[1].toString(16)}`)
  }
  return zipped.toString('base64')
}

/** encodeState 的逆运算，仅用于自检。 */
export function decodeState(hash) {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  return JSON.parse(inflateSync(Buffer.from(raw, 'base64')).toString('utf8'))
}

/** 生成完整的 Playground 链接。 */
export function buildUrl(code, filename = MAIN_FILE) {
  return PLAYGROUND_URL + encodeState({ [filename]: toSfc(code) })
}

/** 如果代码只是模板片段，自动包一层 <template>。 */
function toSfc(code) {
  return /<(template|script)[\s>]/i.test(code) ? code : `<template>\n${code.trim()}\n</template>`
}

/* -------------------------------------------------------------------------- */
/* Markdown 处理                                                               */
/* -------------------------------------------------------------------------- */

/** 显式标注为 Vue SFC 的语言标识。 */
const SFC_LANGS = new Set(['vue', 'vue3', 'vuejs', 'sfc', 'vue-sfc'])

/** 找出 Markdown 中所有围栏代码块（行号基于 0）。 */
function parseFencedBlocks(lines) {
  const blocks = []
  const openRe = /^\s*(`{3,}|~{3,})[ \t]*([A-Za-z0-9_+-]*)[ \t]*\r?$/
  for (let i = 0; i < lines.length; i++) {
    const open = openRe.exec(lines[i])
    if (!open) continue
    const fence = open[1]
    const closeRe = new RegExp('^\\s*' + fence[0] + '{' + fence.length + ',}\\s*$')
    const body = []
    let j = i + 1
    let closed = false
    for (; j < lines.length; j++) {
      if (closeRe.test(lines[j])) {
        closed = true
        break
      }
      body.push(lines[j].replace(/\r$/, ''))
    }
    if (!closed) break // 未闭合，忽略
    blocks.push({ lang: open[2], openLine: i, closeLine: j, code: body.join('\n') })
    i = j
  }
  return blocks
}

/**
 * 判断一个代码块是不是 Vue 单文件组件。
 * 除了 ```vue 这种显式标注，也兼容笔记里常见的「标签写成 js、内容却是 SFC」的情况：
 * 只要代码以 <template> 或 <script> 开头就认为它是 SFC。
 */
function isSfcBlock(block) {
  if (SFC_LANGS.has(block.lang.toLowerCase())) return true
  return /^\s*<(template|script)[\s>]/i.test(block.code)
}

/**
 * 在每个 Vue 代码块后面插入（或更新）一行运行链接。
 * 通过 MARKER 注释识别，重复执行结果不变（幂等）。
 */
function processMarkdown(lines, { retag = false } = {}) {
  const blocks = parseFencedBlocks(lines).filter(isSfcBlock)
  let added = 0
  let updated = 0
  let retagged = 0

  // 从后往前处理，避免前面的插入影响后面的行号
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i]

    // 可选：把 ```js 改成 ```vue，让编辑器/预览的高亮更准确
    if (retag && !SFC_LANGS.has(block.lang.toLowerCase())) {
      lines[block.openLine] = lines[block.openLine].replace(
        /^(\s*(?:`{3,}|~{3,}))[ \t]*[A-Za-z0-9_+-]*/,
        '$1vue',
      )
      retagged++
    }

    const linkLine = `> 🧪 [在 Vue Playground 中运行](${buildUrl(block.code)}) ${MARKER}`

    let existing = -1
    for (let k = block.closeLine + 1; k <= Math.min(block.closeLine + 3, lines.length - 1); k++) {
      if (lines[k].includes(MARKER)) {
        existing = k
        break
      }
      if (lines[k].trim() !== '') break // 中间隔了别的内容，就不再找了
    }

    if (existing !== -1) {
      if (lines[existing] !== linkLine) {
        lines[existing] = linkLine
        updated++
      }
    } else {
      lines.splice(block.closeLine + 1, 0, '', linkLine)
      added++
    }
  }

  return { total: blocks.length, added, updated, retagged }
}

/* -------------------------------------------------------------------------- */
/* CLI                                                                         */
/* -------------------------------------------------------------------------- */

function usage() {
  console.log(`
Vue Playground 链接生成器

用法:
  node tools/vue-playground.mjs <file.vue|file.js>   生成单个文件的分享链接
  node tools/vue-playground.mjs <file.md>            列出所有 Vue 代码块的链接
  node tools/vue-playground.mjs <file.md> --write    把链接写入代码块下方（幂等，可重复执行）
  node tools/vue-playground.mjs <file.md> --check    检查已有链接是否过期，过期则退出码为 1

选项:
  -w, --write   写回 Markdown 文件
      --retag   同时把 \`\`\`js 的 Vue 代码块改成 \`\`\`vue
      --check   仅检查链接是否为最新
`)
}

/**
 * 按文件真实的换行风格切分。
 * 不能简单用 split('\n')：那样在 CRLF 文件里，插入的新行会是裸 LF，
 * 造成同一文件混用两种行尾；而且已有行会带尾随 \r，导致「内容相同」被误判成「需要更新」。
 */
function splitByEol(text) {
  const eol = text.includes('\r\n') ? '\r\n' : '\n'
  return { lines: text.split(eol), eol }
}

function runOnMarkdown(file, { write, check, retag }) {
  const markdown = readFileSync(file, 'utf8')
  const { lines, eol } = splitByEol(markdown)

  if (write) {
    const { total, added, updated, retagged } = processMarkdown(lines, { retag })
    const output = lines.join(eol)
    if (output === markdown) {
      console.log(`${file}: ${total} 个 Vue 代码块，链接均为最新，未改动`)
    } else {
      writeFileSync(file, output, 'utf8')
      console.log(
        `${file}: 处理 ${total} 个 Vue 代码块，新增 ${added} 个链接，更新 ${updated} 个链接` +
          (retag ? `，改写 ${retagged} 个代码块标记` : ''),
      )
    }
    return 0
  }

  if (check) {
    const probe = lines.slice()
    processMarkdown(probe, { retag })
    if (probe.join(eol) === markdown) {
      console.log(`${file}: 链接均为最新 ✅`)
      return 0
    }
    console.log(`${file}: 存在过期或缺失的链接，请运行 --write ❌`)
    return 1
  }

  const blocks = parseFencedBlocks(lines).filter(isSfcBlock)
  if (!blocks.length) {
    console.log(`${file}: 没有找到 Vue 代码块（\`\`\`vue，或以 <template>/<script> 开头的代码块）`)
    return 0
  }
  console.log(`${file}: 找到 ${blocks.length} 个 Vue 代码块\n`)
  for (const block of blocks) {
    console.log(`第 ${block.openLine + 1}-${block.closeLine + 1} 行`)
    console.log(`  ${buildUrl(block.code)}\n`)
  }
  return 0
}

function main() {
  const argv = process.argv.slice(2)
  if (!argv.length || argv.includes('-h') || argv.includes('--help')) {
    usage()
    return argv.length ? 0 : 1
  }

  const write = argv.includes('--write') || argv.includes('-w')
  const check = argv.includes('--check')
  const retag = argv.includes('--retag')
  const targets = argv.filter((a) => !a.startsWith('-'))
  if (!targets.length) {
    usage()
    return 1
  }

  let code = 0
  for (const target of targets) {
    const ext = extname(target).toLowerCase()
    if (ext === '.md' || ext === '.markdown') {
      code = Math.max(code, runOnMarkdown(target, { write, check, retag }))
    } else {
      if (write || check) {
        console.error('--write / --check 只对 Markdown 文件有效')
        return 1
      }
      console.log(buildUrl(readFileSync(target, 'utf8')))
    }
  }
  return code
}

process.exitCode = main()
