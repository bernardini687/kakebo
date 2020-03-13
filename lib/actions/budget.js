const loader = require('../loader')
const { nicePrice } = require('../utils')

module.exports = interval => {
  // loader.then(
  //   data => console.table(prettify(apply(data, dateFilter, offset, interval)))
  // )
}

(async () => {
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

  console.log(nicePrice(balance))
})()
