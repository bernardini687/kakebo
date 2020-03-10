const { join } = require('path')
const { readFile } = require('fs').promises

const DATA = (process.env.TEST)
  ? join(__dirname, '..', 'mocks.json')
  : join(__dirname, '..', 'notes.json') // will be a generated `~/.kakebo/data.json`

/*
  readData()
    .then(doYourThing)
    .catch(console.error)
*/
module.exports = {
  readData: (path = DATA) => readFile(path, 'utf8')
}
