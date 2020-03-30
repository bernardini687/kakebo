const { data } = require('../store')
const { dateFilter, apply } = require('../filters/date')
const { fromCents, prettify, sort, totalAmount } = require('../utils')

module.exports = (opts) => {
  const [[interval, offset]] = Object.entries(opts)
  const filtered = apply(data.expenses, dateFilter, offset, interval[0])

  if (filtered.length === 0) {
    process.exit(0) // exitOnEmpty(filtered)
  }

  const prettified = prettify(sort(filtered))
  const total = totalAmount(filtered)

  console.log(prettified.join('\n'))
  // minus `optional`.length + 2 = 10
  console.log(
    fromCents(total, '-').padStart(prettified[0].length - 10, ' ')
  )
}
