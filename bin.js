#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')

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
if (usedPM && usedPM.name !== wantedPM && !isInstalledAsDependency) {
  switch (wantedPM) {
    case 'npm':
      console.log(`\
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   Use "npm install" for installation in this project   ║
║                                                        ║
╚════════════════════════════════════════════════════════╝`)
      break
    case 'cnpm':
      console.log(`
╔═════════════════════════════════════════════════════════╗
║                                                         ║
║   Use "cnpm install" for installation in this project   ║
║                                                         ║
╚═════════════════════════════════════════════════════════╝`)
      break
    case 'pnpm':
      console.log(`\
╔═════════════════════════════════════════════════════════════╗
║                                                             ║
║   Use "pnpm install" for installation in this project.      ║
║                                                             ║
║   If you don't have pnpm, install it via "npm i -g pnpm".   ║
║   For more details, go to https://pnpm.js.org/              ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝`)
      break
    case 'yarn':
      console.log(`\
╔═════════════════════════════════════════════════════════════╗
║                                                             ║
║   Use "yarn" for installation in this project.              ║
║                                                             ║
║   If you don't have Yarn, install it via "npm i -g yarn".   ║
║   For more details, go to https://yarnpkg.com/              ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝`)
      break
  }
  process.exit(1)
}
