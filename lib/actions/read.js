const { data } = require('../store')
const { dateFilter, apply } = require('../filters/date')
// const { prettify } = require('../utils')

module.exports = (opts) => {
  const [[interval, offset]] = Object.entries(opts)
  console.log('[DEBUG] interval, offset:', [interval[0], offset])

  // return apply(data, dateFilter, offset, interval[0])
  console.table(apply(data, dateFilter, offset, interval[0]))
  return null
}
