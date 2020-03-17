const { genDate } = require('../utilities/date')

module.exports = (collection, opts) => {
  switch (collection) {
    case 'periodics': return (
      opts.tag === 'income'
        ? 'amount: ensure pos Object.values * 100, interval: Object.keys'
        : 'amount: ensure neg (Object.values - true), [interval, tag] = Object.keys.sort()'
    )
    case 'entries': {
      console.log(composeEntry(opts))
      break
    }
  }
  // loader.then(
  //   data => console.table(prettify(apply(data, dateFilter, offset, interval)))
  // )
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
