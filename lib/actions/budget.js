const { data } = require('../store')
const { fromCents, totalAmount } = require('../utils')

module.exports = timeFrame => {
  const balance = totalAmount(data.periodics)

  // minus this month's expenses total!
  // return fromCents(balance)
  console.log(fromCents(balance))
  return null
}
