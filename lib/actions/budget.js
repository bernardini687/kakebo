const loader = require('../loader')
const { nicePrice } = require('../utils')

module.exports = async interval => {
  const data = await loader.then(data => data).catch(console.error)

  const balance = data.periodics.reduce((tot, { amount, interval }) => {
    if (interval === 'Y') {
      tot += amount / 12
    } else {
      tot += amount
    }
    return tot
  }, 0)

  // minus this month's expenses total!
  // return balance
  console.log(nicePrice(balance))
}
