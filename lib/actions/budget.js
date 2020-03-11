const loader = require('../loader')
// const { dateFilter, apply } = require('../filters/date')
const { nicePrice } = require('../utils')

module.exports = interval => {
  // loader.then(
  //   data => console.table(prettify(apply(data, dateFilter, offset, interval)))
  // )
}

/*
  go through periodics

*/

(async () => {
  const data = await loader.then(data => data).catch(console.error)

  const mBalance = data.periodics.reduce((tot, { amount, interval }) => {
    if (interval === 'a') {
      tot += amount / 12
    } else {
      tot += amount
    }
    return tot
  }, 0)

  const mDays = 31

  const rawRes = mBalance / mDays

  console.log(nicePrice(rawRes))
})()
