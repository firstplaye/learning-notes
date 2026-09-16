#!/usr/bin/env node
/**
 * 一键同步到 GitHub
 * ---------------------------------------------------------------------------
 * 把「add → commit → pull --rebase → push」四步合成一条命令。
 *
 * 用法：
 *   node tools/git-sync.mjs                     同步当前目录所在的仓库
 *   node tools/git-sync.mjs ../vue-demo         同步指定目录的仓库
 *   node tools/git-sync.mjs -m "自定义提交信息"   自己指定提交信息
 *   node tools/git-sync.mjs --init <仓库地址>    首次接入远端并推送
 *   node tools/git-sync.mjs --dry-run           只预览会做什么，不改动任何东西
 *
 * 只依赖 Node 内置模块，不需要 npm install。需要 Node 18+。
 */

import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import process from 'node:process'

/* -------------------------------------------------------------------------- */
/* 输出                                                                        */
/* -------------------------------------------------------------------------- */

const COLOR = Boolean(process.stdout.isTTY) && !process.env.NO_COLOR
const paint = (n, t) => (COLOR ? `\x1b[${n}m${t}\x1b[0m` : t)
const green = (t) => paint(32, t)
const red = (t) => paint(31, t)
const yellow = (t) => paint(33, t)
const gray = (t) => paint(90, t)
const bold = (t) => paint(1, t)

/** 终端里的显示宽度：中日韩字符占 2 列，其余占 1 列。 */
function width(text) {
  let n = 0
  for (const ch of text) n += /[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe6f\uff00-\uff60\uffe0-\uffe6]/.test(ch) ? 2 : 1
  return n
}

const pad = (text, n) => text + ' '.repeat(Math.max(0, n - width(text)))

function emit(icon, color, label, text) {
  console.log(`  ${color(icon)} ${pad(label, 8)}${text}`)
}

const ok = (label, text = '') => emit('✓', green, label, text)
const warn = (label, text = '') => emit('!', yellow, label, text)
const info = (label, text = '') => emit('·', gray, label, text)

function die(title, hint = '') {
  console.error(`\n  ${red('✗')} ${bold(title)}`)
  if (hint) console.error(String(hint).split('\n').map((l) => gray(`    ${l}`)).join('\n'))
  console.error('')
  process.exit(1)
}

/* -------------------------------------------------------------------------- */
/* git 封装                                                                    */
/* -------------------------------------------------------------------------- */

/** 所有命令的工作目录。会随仓库根目录更新。 */
let REPO = process.cwd()

/**
 * core.quotepath=false：让中文路径原样输出，而不是 \344\270\216 这种八进制转义
 *
 * raw=true 时保留原始 stdout（不 trim）。读取 `--porcelain` / `--name-status -z`
 * 这类带前导空格、NUL 分隔的输出时必须用它，否则 trim 会吃掉第一个条目的前导
 * 空格，导致 slice(3) 少切一位、路径首字符丢失。
 */
function git(args, { allowFail = false, raw = false } = {}) {
  const res = spawnSync('git', ['-c', 'core.quotepath=false', ...args], {
    cwd: REPO,
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: 64 * 1024 * 1024,
  })
  if (res.error) {
    die('无法执行 git', `${res.error.message}\n请确认已安装 Git，并且 git 在 PATH 里。`)
  }
  const out = raw ? (res.stdout ?? '') : (res.stdout ?? '').trim()
  const err = (res.stderr ?? '').trim()
  if (res.status !== 0 && !allowFail) {
    die(`git ${args.join(' ')} 执行失败`, err || out)
  }
  return { ok: res.status === 0, out, err }
}

/** 拆开 NUL 分隔的输出（-z 模式下路径不会被加引号，中文也不会被转义） */
const splitZ = (out) => out.split('\0').filter((s) => s.length > 0)

const isRepo = () => git(['rev-parse', '--show-toplevel'], { allowFail: true }).ok

/** 相对路径 → 中文动词 */
const VERBS = { A: '新增', M: '更新', D: '删除', R: '重命名', C: '复制', T: '改类型' }
const describe = (c) =>
  c.from ? `重命名 ${c.from} → ${c.path}` : `${VERBS[c.code] ?? '修改'} ${c.path}`

/** 已暂存的改动（`git add -A` 之后调用） */
function stagedChanges() {
  const tokens = splitZ(git(['diff', '--cached', '--name-status', '-z'], { raw: true }).out)
  const result = []
  for (let i = 0; i < tokens.length; i++) {
    const code = tokens[i][0]
    if (code === 'R' || code === 'C') {
      const from = tokens[++i]
      const to = tokens[++i]
      result.push({ code, path: to, from })
    } else {
      result.push({ code, path: tokens[++i] })
    }
  }
  return result
}

/** 工作区里的改动（--dry-run 用，不碰暂存区） */
function workingChanges() {
  const tokens = splitZ(git(['status', '--porcelain', '-z'], { raw: true }).out)
  const result = []
  for (let i = 0; i < tokens.length; i++) {
    const entry = tokens[i]
    const x = entry[0]
    const y = entry[1]
    const path = entry.slice(3)
    // -z 模式下重命名写成 "XY 新路径\0旧路径\0"，旧路径要跳过
    if (x === 'R' || x === 'C') i++
    let code = 'M'
    if (x === '?' || x === 'A') code = 'A'
    else if (x === 'D' || y === 'D') code = 'D'
    else if (x === 'R' || y === 'R') code = 'R'
    result.push({ code, path })
  }
  return result
}

/** 自动拼一条提交信息 */
function buildMessage(changes) {
  let subject
  if (changes.length === 1) subject = describe(changes[0])
  else subject = `同步 ${changes.length} 个文件`
  if (width(subject) > 72) subject = subject.slice(0, 69) + '...'

  const body = changes.length > 1 ? changes.map((c) => `- ${describe(c)}`).join('\n') : ''
  return { subject, body }
}

/** 还有多少提交没推上去 */
function countPending(upstream) {
  const range = upstream ? `${upstream}..HEAD` : 'HEAD'
  const res = git(['rev-list', '--count', range], { allowFail: true })
  return res.ok ? Number(res.out || 0) : 0
}

/* -------------------------------------------------------------------------- */
/* 主流程                                                                      */
/* -------------------------------------------------------------------------- */

function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help) {
    usage()
    return 0
  }

  const target = resolve(opts.dir ?? process.cwd())
  process.chdir(target)
  REPO = target

  console.log(`\n${bold('🔄 同步到 GitHub')}   ${gray(target)}\n`)

  /* ---------- 1. 仓库 ---------- */
  const existed = isRepo()
  if (!existed) {
    if (!opts.init) {
      die('这个目录不是 Git 仓库', '首次同步请用：node tools/git-sync.mjs --init <仓库地址>\n或者自己先执行 git init。')
    }
    info('初始化', 'git init -b main')
    if (opts.dryRun) {
      console.log(gray('\n  （dry-run 结束：仓库还不存在，没有可预览的内容）\n'))
      return 0
    }
    git(['init', '-b', 'main'])
  }
  REPO = git(['rev-parse', '--show-toplevel']).out
  info('仓库', REPO)

  /* ---------- 2. 远端 ---------- */
  let remotes = git(['remote']).out.split('\n').filter(Boolean)
  if (opts.init && !remotes.includes('origin')) {
    info('接入', `git remote add origin ${opts.init}`)
    git(['remote', 'add', 'origin', opts.init])
    remotes = ['origin']
  }
  if (!remotes.length) {
    die('没有配置远端仓库', '执行：git remote add origin <仓库地址>\n然后再跑一次本脚本。')
  }
  const remoteName = remotes.includes('origin') ? 'origin' : remotes[0]

  /* ---------- 3. 分支与跟踪 ---------- */
  const branchRes = git(['symbolic-ref', '--short', 'HEAD'], { allowFail: true })
  if (!branchRes.ok) {
    die('当前不处于任何分支（游离 HEAD）', '先切回分支：git switch main')
  }
  const branch = branchRes.out
  info('分支', branch)

  const upRes = git(['rev-parse', '--abbrev-ref', '--symbolic-full-name', `${branch}@{u}`], { allowFail: true })
  let upstream = upRes.ok ? upRes.out : null
  if (upstream) info('跟踪', upstream)
  else info('跟踪', `${remoteName}/${branch}（尚未建立，等下推送时自动建立）`)

  /* ---------- 4. 先探一下远端，让判断更准 ---------- */
  if (!opts.dryRun) git(['fetch', remoteName, '--quiet'], { allowFail: true })

  /* ---------- 5. 提交者身份 ---------- */
  const ident = git(['var', 'GIT_AUTHOR_IDENT'], { allowFail: true })
  if (ident.ok) {
    const m = /^(.*?)\s*<([^>]*)>/.exec(ident.out)
    if (m) info('身份', `${m[1]} <${m[2]}>`)
  } else {
    const last = git(['log', '-1', '--format=%an\t%ae'], { allowFail: true })
    const hint = last.ok
      ? ['检测到历史提交用的是这个身份，可以直接沿用：',
         `  git config --global user.name  "${last.out.split('\t')[0]}"`,
         `  git config --global user.email "${last.out.split('\t')[1] ?? ''}"`].join('\n')
      : 'git config --global user.name  "你的名字"\ngit config --global user.email "你的邮箱"'
    die('没有配置提交者身份，git 会拒绝提交', hint)
  }

  /* ---------- 6. 暂存 ---------- */
  if (!opts.dryRun) git(['add', '-A'])
  const changes = opts.dryRun ? workingChanges() : stagedChanges()

  const pendingBefore = countPending(upstream)
  if (!changes.length && pendingBefore === 0) {
    console.log(`\n${green('✅ 没有改动，也没有待推送的提交，已经是最新')}\n`)
    return 0
  }

  /* ---------- 7. 提交 ---------- */
  if (!changes.length) {
    ok('提交', '没有新的改动，跳过')
  } else {
    const shown = changes.slice(0, 12)
    for (const c of shown) console.log(gray(`      ${c.code}  ${c.path}`))
    if (changes.length > shown.length) console.log(gray(`      ... 还有 ${changes.length - shown.length} 个文件`))

    const { subject, body } = opts.message
      ? { subject: opts.message, body: '' }
      : buildMessage(changes)

    if (opts.dryRun) {
      ok('提交', `会提交为「${subject}」`)
    } else {
      const args = ['commit', '-m', subject]
      if (body) args.push('-m', body)
      git(args)
      ok('提交', subject)
    }
  }

  if (opts.dryRun) {
    console.log(`\n${gray('（dry-run 结束，仓库没有任何改动）')}\n`)
    return 0
  }

  /* ---------- 8. 拉取（rebase） ---------- */
  if (upstream) {
    const pull = git(['pull', '--rebase', '--autostash'], { allowFail: true })
    if (!pull.ok) {
      git(['rebase', '--abort'], { allowFail: true })
      die('拉取远端失败，可能和远端有冲突',
        `${pull.err || pull.out}\n\n已经自动执行 git rebase --abort 把仓库还原到干净状态。\n请手动跑 git pull --rebase，解决冲突后再执行本脚本。`)
    }
    ok('拉取', '已与远端对齐')
  }

  /* ---------- 9. 推送 ---------- */
  const pending = countPending(upstream)
  if (upstream && pending === 0) {
    ok('推送', '远端已是最新，无需推送')
  } else {
    const args = upstream ? ['push'] : ['push', '-u', remoteName, branch]
    const push = git(args, { allowFail: true })
    if (!push.ok) {
      die('推送失败', push.err || push.out)
    }
    ok('推送', upstream ? `已推送到 ${upstream}` : `已推送到 ${remoteName}/${branch}，并建立跟踪`)
    // 建立跟踪后，下一次就不用再 -u 了
    if (!upstream) upstream = `${remoteName}/${branch}`
  }

  console.log(`\n${green('✅ 同步完成')}   ${gray(upstream ?? '')}\n`)
  return 0
}

/* -------------------------------------------------------------------------- */
/* CLI                                                                         */
/* -------------------------------------------------------------------------- */

function parseArgs(argv) {
  const opts = { dir: null, message: null, init: null, dryRun: false, help: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-h' || a === '--help') opts.help = true
    else if (a === '-n' || a === '--dry-run') opts.dryRun = true
    else if (a === '-m' || a === '--message') opts.message = argv[++i] ?? die('-m 后面要跟提交信息')
    else if (a === '--init') opts.init = argv[++i] ?? die('--init 后面要跟仓库地址')
    else if (a.startsWith('-')) die(`无法识别的参数：${a}`, '用 --help 查看用法。')
    else if (opts.dir === null) opts.dir = a
    else die('只能指定一个目录')
  }
  return opts
}

function usage() {
  console.log(`
${bold('一键同步到 GitHub')}

用法:
  node tools/git-sync.mjs <目录?>            同步该目录所在的仓库（默认当前目录）
  node tools/git-sync.mjs -m "<提交信息>"     自定义提交信息
  node tools/git-sync.mjs --init <仓库地址>   首次接入远端并推送
  node tools/git-sync.mjs --dry-run          只预览，不改动任何东西

做的事（顺序固定，出错会停下并说明原因）:
  git add -A  →  git commit  →  git pull --rebase  →  git push

选项:
  -m, --message <文本>   指定提交信息，不写则根据改动文件自动生成
      --init <仓库地址>   新仓库首次接入，等价于 git remote add origin <地址>
  -n, --dry-run          只显示将要发生什么，不写仓库、不联网
  -h, --help             显示本帮助
`)
}

process.exitCode = main()
