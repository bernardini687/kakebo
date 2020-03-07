const { join } = require('path')
const { readFile } = require('fs').promises

const TEST = join(__dirname, '..', 'kakebo.notes.json')

/*
  readData()
    .then(doYourThing)
    .catch(console.error)
*/
module.exports = {
  readData: (path = TEST) => readFile(path, 'utf8')
}
