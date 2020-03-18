const { genDate } = require('../utilities/date')
const db = require('../simpleStore')

module.exports = (collection, opts) => {
  let entry
  switch (collection) {
    case 'periodics': return (
      opts.tag === 'income'
        ? 'amount: ensure pos Object.values * 100, interval: Object.keys'
        : 'amount: ensure neg (Object.values - true), [interval, tag] = Object.keys.sort()'
    )
    case 'expenses': {
      entry = composeEntry(opts)
      console.log('[DEBUG] entry:', entry)
      break
    }
  }
  db.write(collection, entry)
  console.log('[DEBUG] db.read:', db.read)
}

function normalizeTag (tag) {
  switch (tag) {
    case 'b': return 'basic'
    case 'o': return 'optional'
    case 'l': return 'leisure'
    case 'e': return 'extra'
  }
}

function composeEntry (opts) {
  const date = genDate(opts.date).toISOString()
  delete opts.date
  const [tag] = Object.keys(opts)
  const amount = -(opts[tag] * 100) // make sure it's negative
  return {
    date,
    amount,
    tag
  }
}
