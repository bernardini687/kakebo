const FILE = 'test.notes.json'

const jsonData = require(`../${FILE}`)
const { writeFileSync } = require('fs')

module.exports = {
  read: jsonData,

  write (collection, entry) {
    jsonData[collection].push(entry)
    writeFileSync(FILE, JSON.stringify(jsonData))
  },

  pop (collection) {
    jsonData[collection].pop()
    writeFileSync(FILE, JSON.stringify(jsonData))
  }
}
