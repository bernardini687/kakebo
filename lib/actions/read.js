const { data } = require('../store')
const { dateFilter, apply } = require('../filters/date')
// const { prettify } = require('../utils')

module.exports = (opts) => {
  const [[interval, offset]] = Object.entries(opts)
  console.log('[DEBUG] interval, offset:', [interval[0], offset])

  console.table(apply(data.expenses, dateFilter, offset, interval[0]))
  return null
}
