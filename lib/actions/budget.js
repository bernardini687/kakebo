const { data } = require('../store')
const { dailyBudget, fromCents, totalAmount } = require('../utils')

module.exports = timeFrame => {
  const balance = totalAmount(data.periodics)
  const daily = dailyBudget(balance)
  // const toSave = percent(20, balance)
  console.table([
    { monthly: fromCents(balance), daily: fromCents(daily) }
  ])
}
