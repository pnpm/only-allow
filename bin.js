#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const boxen = require('boxen')
const { compare, validate } = require('compare-versions')

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|pnpm|yarn>')
  process.exit(1)
}
const wantedPM = argv[0].split('@')
if (['npm', 'yarn', 'pnpm', 'npminstall'].indexOf(wantedPM[0]) === -1) {
  console.log(`"${wantedPM[0]}" is not a valid package manager. Available package managers are: npm, pnpm, or yarn.`)
  process.exit(1)
}
const usedPM = whichPMRuns()
const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }

if (usedPM.name !== wantedPM[0]) {
  switch (wantedPM[0]) {
    case 'npm':
      console.log(boxen('使用 "npm install" 安装此项目', boxenOpts))
      break
    case 'pnpm':
      console.log(boxen(`使用 "pnpm install" 安装此项目.

如果没有 pnpm, 执行此命令安装 "npm i -g pnpm".
更多信息, 请查看 https://pnpm.js.org/`, boxenOpts))
      break
    case 'yarn':
      console.log(boxen(`使用 "yarn" 安装此项目.

如果没有 Yarn, 执行此命令安装 "npm i -g yarn".
更多信息, 请查看 https://yarnpkg.com/`, boxenOpts))
      break
  }
  process.exit(1)
} else if (wantedPM[1]) {
  if (!validate(wantedPM[1])) {
    console.log(boxen('preinstall 中的版本号不合法 ' + argv[0], boxenOpts))
  } else if (compare(wantedPM[1], usedPM.version, '>=')) {
    console.log(boxen('当前版本过低, 请升级到 ' + argv[0] + ' 以上', boxenOpts))
  }
}
