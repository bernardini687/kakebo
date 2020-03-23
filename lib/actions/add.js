const shapeDate = require('shape-date')
const db = require('../simpleStore')
const { toCents } = require('../utils')

module.exports = (collection, opts) => {
  let entry
  switch (collection) {
    case 'periodics': {
      entry = composePeriodic(opts)
      console.log('[DEBUG] entry:', entry)
      break
    }
    case 'expenses': {
      entry = composeExpense(opts)
      console.log('[DEBUG] entry:', entry)
      break
    }
  }
  db.write(collection, entry)
  console.log('[DEBUG] db.read:', db.read)
}

function composePeriodic (opts) {
  let amount
  opts.income
    ? amount = toCents(findAmount(opts), 'positive')
    : amount = toCents(findAmount(opts), 'negative')
  const [interval, tag] = Object.keys(opts).sort()
  return { amount, interval, tag }
}

const findAmount = opts => Object.values(opts).find(e => Math.abs(e) > 0)

function composeExpense (opts) {
  const date = shapeDate(opts.date).toISOString()
  delete opts.date
  const [tag] = Object.keys(opts)
  const amount = -(opts[tag] * 100) // make sure it's negative.
  return { amount, date, tag }
}
