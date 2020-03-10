const { join } = require('path')
const { readFile } = require('fs').promises

const DATA = (process.env.TEST)
  ? joiner('..', 'test', 'kakebo.fake.json')
  : joiner('..', 'kakebo.notes.json')

function joiner (...pathElements) {
  return join(__dirname, ...pathElements)
}

/*
  readData()
    .then(doYourThing)
    .catch(console.error)
*/
module.exports = {
  readData: (path = DATA) => readFile(path, 'utf8')
}
