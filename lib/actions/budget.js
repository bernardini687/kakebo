const { data } = require('../store')
const { fromCents, totalAmount } = require('../utils')

module.exports = timeFrame => {
  const balance = totalAmount(data.periodics)
  console.log(fromCents(balance))
}
