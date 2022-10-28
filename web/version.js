/** eslint-disable */

const fs = require('fs')
const prettier = require('prettier')

const packageJSON = 'package.json'
const versionFile = 'dist/version.txt'
const regex = /(\d{2})\.(\d{2})\.?(\d{1,2})?/

let versionDays = 0
const cmdArgs = process.argv.slice(2)
if (cmdArgs[0] && cmdArgs[1] && cmdArgs[0] === '--days') {
  versionDays = parseInt(cmdArgs[1])
}

fs.readFile(packageJSON, 'utf8', function (err, file) {
  if (err) {
    return console.log(err)
  }

  const packageFile = JSON.parse(file)
  const currentVersion = packageFile['version']

  let iteration = 0

  const d = new Date()
  d.setDate(d.getDate() + versionDays)
  const week = getWeekNumber(d)

  const year = String(d.getFullYear()).slice(2, 4)

  const matches = currentVersion.match(regex)
  if (matches && week === matches[2] && year === matches[1]) {
    iteration = matches[3] ? parseInt(matches[3]) + 1 : iteration
  }

  const versionNumber = year + '.' + week + '.' + iteration
  fs.writeFile(versionFile, versionNumber, 'utf8', function (err) {
    if (err) return console.log(err)
  })

  packageFile['version'] = versionNumber
  fs.writeFile(
    packageJSON,
    prettier.format(JSON.stringify(packageFile, null, 2), {
      parser: 'json-stringify',
    }),
    'utf8',
    function (err) {
      if (err) return console.log(err)
    }
  )
})

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return ('00' + weekNo).slice(-2)
}
