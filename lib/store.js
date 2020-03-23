const { join } = require('path')
const { writeFileSync } = require('fs')

const FILE = process.env.TEST
  ? join(__dirname, '..', 'mocks.json')
  : join(__dirname, '..', 'test.notes.json') // will be a generated `~/.kakebo/data.json`

// try {} catch {} ?
const jsonData = require(FILE)

module.exports = {
  data: jsonData,

  write (collection, entry) {
    jsonData[collection].push(entry)
    writeFileSync(FILE, JSON.stringify(jsonData))
  },

  pop (collection) {
    jsonData[collection].pop()
    writeFileSync(FILE, JSON.stringify(jsonData))
  }
}
