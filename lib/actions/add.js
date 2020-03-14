module.exports = (collection, opts) => {
  switch (collection) {
    case 'periodics': return (
      opts.tag === 'income'
        ? 'amount: ensure pos Object.values * 100, interval: Object.keys'
        : 'amount: ensure neg (Object.values - true), [interval, tag] = Object.keys.sort()'
    )
    case 'entries': return (
      opts.date
        ? 'compose date, tag: (Object.keys - date), amount: ensure pos (Object.values - date)'
        : 'date: moment(), amount: ensure neg Object.values, tag: Object.keys'
    )
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

function composeEntry ([interval, tag]) {
  return {
    interval,
    tag: normalizeTag(tag)
  }
}

(async () => {
  const entry = composeEntry(Object.keys(parsed).slice(1))

  console.log(entry)
})()
