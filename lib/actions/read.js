const loader = require('../loader')
const { dateFilter, apply } = require('../filters/date')
const { prettify } = require('../utils')

module.exports = (offset, interval) => {
  loader.then(
    data => console.table(prettify(apply(data, dateFilter, offset, interval)))
  )
}
