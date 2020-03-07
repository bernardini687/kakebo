const { readFile } = require('fs').promises
const { join } = require('path')

const TEST = join(__dirname, '..', '..', 'kakebo.notes.json')

function readerPromise (path = TEST) {
  return readFile(path) // 'utf8'
}

// readerPromise().then(doYourThing).catch(console.error)

module.exports = { readerPromise }
