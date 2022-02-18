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
      console.log(boxen('Use "npm install" for installation in this project', boxenOpts))
      break
    case 'pnpm':
      console.log(boxen(`Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`, boxenOpts))
      break
    case 'yarn':
      console.log(boxen(`Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`, boxenOpts))
      break
  }
  process.exit(1)
} else if (wantedPM[1]) {
  if (!validate(wantedPM[1])) {
    console.log(boxen('invalid version ' + argv[0], boxenOpts))
  } else if (compare(usedPM.version, wantedPM[1], '>=')) {
    console.log(boxen('Current version is too low, please upgrade to ' + argv[0] + ' or higher', boxenOpts))
  }
}
