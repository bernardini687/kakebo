const { data } = require('../store')
const { dateFilter, apply } = require('../filters/date')
const { fromCents, prettify, sort, totalAmount } = require('../utils')

module.exports = (opts) => {
  const [[interval, offset]] = Object.entries(opts)
  const filtered = apply(data.expenses, dateFilter, offset, interval[0])

  const pretty = prettify(sort(filtered))
  const total = totalAmount(filtered)

  console.log(pretty.join('\n'))
  console.log(fromCents(total).padStart(pretty[0].length, ' '))
  return null
}
