#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const boxen = require('boxen')

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|pnpm|yarn>')
  process.exit(1)
}
const wantedPM = argv[0]
const wantedVersion = arg[1]

if (wantedPM !== 'npm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: npm, pnpm, or yarn.`)
  process.exit(1)
}
const usedPM = whichPMRuns()
if (usedPM && usedPM.name !== wantedPM && usedPM.version !== wantedVersion) {
  const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
  switch (wantedPM) {
    case 'npm':
      console.log(boxen(`Use "npm install" with npm version "${wantedVersion}" for installation in this project

If you don't have version ${wantedPM} of npm, install it via "npm i -g npm@${wantedVersion}".
For more details, go to https://www.npmjs.com/`, boxenOpts))
      break
    case 'pnpm':
      console.log(boxen(`Use "pnpm install" with pnpm version "${wantedVersion}" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm@${wantedVersion}".
For more details, go to https://pnpm.js.org/`, boxenOpts))
      break
    case 'yarn':
      console.log(boxen(`Use "yarn" with yarn version "${wantedVersion}" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn@${wantedVersion}".
For more details, go to https://yarnpkg.com/`, boxenOpts))
      break
  }
  process.exit(1)
}
