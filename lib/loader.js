const { handleErr } = require('./utils')
const { readData } = require('./storer')

function toJson (rawData) {
  try {
    return JSON.parse(rawData) // (key, value) => value
  } catch (err) {
    handleErr(err)
  }
}

// export a Promise who's job is giving the data
module.exports =
  readData()
    .then(toJson)
    .catch(handleErr)
