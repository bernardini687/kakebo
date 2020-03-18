const loader = require('../loader')
const { dateFilter, apply } = require('../filters/date')
const { prettify } = require('../utils')

module.exports = (opts) => {
  const [[interval, offset]] = Object.entries(opts)
  console.log('[DEBUG] interval, offset:', [interval[0], offset])

  loader.then(
    data => console.table(prettify(apply(data, dateFilter, offset, interval[0])))
  )
}
