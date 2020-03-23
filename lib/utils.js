// const moment = require('moment')

function ceilAbs (amount) {
  return Math.ceil(Math.abs(amount))
}

function div (amount, divisor) {
  switch (Math.sign(amount)) {
    case -1: return -ceilAbs(amount / divisor)
    case 0: return 0
    case 1: return ceilAbs(amount / divisor)
  }
}

// just care about the first letter.
function flagsInits (opts) {
  return Object.keys(opts).map(flag => flag[0])
}

function flattenCommands (noOpts) {
  return noOpts.map(cmd => cmd.toString().trim()).join()
}

function fromCents (amount) {
  return (amount / 100) // .toFixed(2)
}

function handleErr (err) {
  console.error(err)
  process.exit(1)
}

function normalizeInterval (interval) {
  switch (interval) {
    case 'd': return 'day'
    case 'w': return 'week'
    case 'm': return 'month'
    case 'y': return 'year'
  }
}

function normalizeOffset (offset) {
  if (offset === true) {
    offset = 0
  }
  if (offset < 0) {
    offset = -(offset)
  }
  return offset
}

function normalizeTag (tag) {
  switch (tag) {
    case 'b': return 'basic'
    case 'o': return 'optional'
    case 'l': return 'leisure'
    case 'e': return 'extra'
  }
}

// find the flag among a given String of valid values, otherwise `false`.
function oneFlagOf (valids, flags) {
  switch (flags.length) {
    case 1: return (
      valids.split('').includes(flags[0])
        ? flags[0]
        : false
    )
    default: return false
  }
}

function periodicWithTag (flags) {
  switch (flags.length) {
    case 2: {
      // make sure the capital letter goes first.
      const [interval, tag] = flags.sort()

      return (
        'MY'.split('').includes(interval) && 'bole'.split('').includes(tag)
          ? flags
          : false
      )
    }
    default: return false
  }
}

function toCents (amount, sign = 'positive') {
  switch (sign) {
    case 'negative': return -ceilAbs(amount * 100)
    case 'positive': return ceilAbs(amount * 100)
  }
}

function totalAmount (entries) {
  return entries.reduce((tot, { amount, interval }) => {
    if (interval === 'Y') {
      tot += div(amount, 12)
    } else {
      tot += amount
    }
    return tot
  }, 0)
}

// function prettify (entries) {
//   return entries.map(({ date, amount, ...fields }) => ({
//     date: moment(date).format('dddd, D MMM Y'),
//     amount: -(Number.parseFloat(amount) / 100).toFixed(2), // use nicePrice()!
//     ...fields
//   }))
// }

// function percent (amount, of) {
//   return (amount / 100) * of
// }

module.exports = {
  DATE: /^\d\d?(-\d\d?(-\d{4})?)?$/,
  div,
  flagsInits,
  flattenCommands,
  fromCents,
  handleErr,
  normalizeInterval,
  normalizeOffset,
  normalizeTag,
  oneFlagOf,
  periodicWithTag,
  toCents,
  totalAmount
}
