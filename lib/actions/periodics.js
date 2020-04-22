const { data } = require('../store')
const { fromCents, normalizePeriodicsInterval, normalizeTag } = require('../utils')

module.exports = () => {
  const periodics = data.periodics.sort((a, b) => b.amount - a.amount)
  const prettyPer = periodics.map(({ amount, interval, tag }) => (
    {
      amount: fromCents(amount),
      interval: normalizePeriodicsInterval(interval),
      tag: normalizeTag(tag)
    }
  ))
  console.table(prettyPer)
}
