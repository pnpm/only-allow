#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')

function box(s) {
  const lines = s.trim().split("\n")
  const width = lines.reduce((a, b) => Math.max(a, b.length), 0)
  const bar = '═'.repeat(width)
  const top = '\x1b[31m╔═══' + bar + '═══╗'
  const center = ['', ...lines, ''].map(x => '║   \x1b[0m' + x.padEnd(width) + '\x1b[31m   ║')
  const bottom = '╚═══' + bar + '═══╝\x1b[0m'
  return [top, ...center, bottom].join('\n')
}

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|cnpm|pnpm|yarn>')
  process.exit(1)
}
const wantedPM = argv[0]
if (wantedPM !== 'npm' && wantedPM !== 'cnpm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: npm, cnpm, pnpm, or yarn.`)
  process.exit(1)
}
const usedPM = whichPMRuns()
const cwd = process.env.INIT_CWD || process.cwd()
const isInstalledAsDependency = cwd.includes('node_modules')
if (true || usedPM && usedPM.name !== wantedPM && !isInstalledAsDependency) {
  switch (wantedPM) {
    case 'npm':
      console.log(box('Use "npm install" for installation in this project'))
      break
    case 'cnpm':
      console.log(box('Use "cnpm install" for installation in this project'))
      break
    case 'pnpm':
      console.log(box(`Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`))
      break
    case 'yarn':
      console.log(box(`Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`))
      break
  }
  process.exit(1)
}
