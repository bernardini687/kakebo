const loader = require('../loader')
const { fromCents, totalAmount } = require('../utils')

module.exports = async timeFrame => {
  const data = await loader.then(data => data).catch(console.error)

  const balance = totalAmount(data.periodics)

  // minus this month's expenses total!
  return fromCents(balance)
}
