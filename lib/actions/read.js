const { data } = require('../store')
const { dateFilter, apply } = require('../filters/date')
const { fromCents, prettify, totalAmount } = require('../utils')

module.exports = (opts) => {
  const [[interval, offset]] = Object.entries(opts)
  const filtered = apply(data.expenses, dateFilter, offset, interval[0])
  const total = totalAmount(filtered)

  console.log(prettify(filtered))
  console.log(fromCents(total).padStart(42, ' '))
  return null
}
