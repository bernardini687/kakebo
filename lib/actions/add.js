const { genDate } = require('../utilities/date')
const db = require('../simpleStore')

module.exports = (collection, opts) => {
  let entry
  switch (collection) {
    case 'periodics': {
      entry = composePer(opts)
      console.log('[DEBUG] entry:', entry)
      break
    }
    case 'expenses': {
      entry = composeExp(opts)
      console.log('[DEBUG] entry:', entry)
      break
    }
  }
  db.write(collection, entry)
  console.log('[DEBUG] db.read:', db.read)
}

// function normalizeTag (tag) {
//   switch (tag) {
//     case 'b': return 'basic'
//     case 'o': return 'optional'
//     case 'l': return 'leisure'
//     case 'e': return 'extra'
//   }
// }

function composePer (opts) {
  let amount
  opts.income
    ? amount = findAmount(opts) * 100
    : amount = -(findAmount(opts) * 100) // round to avoid strange numbers!
  const [interval, tag] = Object.keys(opts).sort()
  return { amount, interval, tag }
}

const findAmount = opts => Object.values(opts).find(e => e > 0)

function composeExp (opts) {
  const date = genDate(opts.date).toISOString()
  delete opts.date
  const [tag] = Object.keys(opts)
  const amount = -(opts[tag] * 100) // make sure it's negative.
  return { amount, date, tag }
}
