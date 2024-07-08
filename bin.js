#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const availablePMList = ['npm', 'cnpm', 'pnpm', 'yarn', 'bun']

function box(s) {
  const lines = s.trim().split("\n")
  const width = lines.reduce((a, b) => Math.max(a, b.length), 0)
  const surround = x => '║   \x1b[0m' + x.padEnd(width) + '\x1b[31m   ║'
  const bar = '═'.repeat(width)
  const top = '\x1b[31m╔═══' + bar + '═══╗'
  const pad = surround('')
  const bottom = '╚═══' + bar + '═══╝\x1b[0m'
  return [top, pad, ...lines.map(surround), pad, bottom].join('\n')
}

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log(`Please specify the wanted package manager: only-allow <${availablePMList.join('|')}>`)
  process.exit(1)
}
const wantedPM = argv[0]
if (!availablePMList.includes(wantedPM)) {
  const pmStr = `${availablePMList.slice(0, -1).join(', ')} or ${availablePMList[availablePMList.length - 1]}`
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: ${pmStr}.`)
  process.exit(1)
}
const usedPM = whichPMRuns()
const cwd = process.env.INIT_CWD || process.cwd()
const isInstalledAsDependency = cwd.includes('node_modules') || cwd.includes('_cacache')
if (usedPM && usedPM.name !== wantedPM && !isInstalledAsDependency) {
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
For more details, go to https://pnpm.io/`))
      break
    case 'yarn':
      console.log(box(`Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`))
      break

    case 'bun':
      console.log(box(`Use "bun install" for installation in this project.

If you don't have Bun, go to https://bun.sh/docs/installation and find installation method that suits your environment.`))
      break
  }
  process.exit(1)
}
