const parseArgv = require('minimist')

const parsed = parseArgv(['-Y', 200, '--basic'])
console.log(parsed)

module.exports = interval => {
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
