const moment = require('moment')

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

function dailyBudget (amount) {
  return amount / moment().daysInMonth()
}

// just care about the first letter.
function flagsInits (opts) {
  return Object.keys(opts).map(flag => flag[0])
}

function flattenCommands (noOpts) {
  return noOpts.map(cmd => cmd.toString().trim()).join()
}

// refactor.
function formatDate (date) {
  const [day, number] = moment(date).format('ddd D').split(' ')
  return [day, number.padStart(2, ' ')].join(' ')
}

function fromCents (amount, minusSign = '−') {
  return (amount / 100)
    .toFixed(2)
    .replace(minusSign, '')
    .replace('.', ',')
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

function normalizePeriodicsInterval (interval) {
  switch (interval) {
    case 'M': return 'monthly'
    case 'Y': return 'yearly'
  }
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

// refactor.
function prettify (expenses) {
  const maxAmount = Math.max(
    ...expenses.map(x => -x.amount)
  ).toString().length + 1 // count the comma.

  return expenses.map(({ amount, date, tag }) => {
    return formatDate(date).padEnd(6 + 8, ' ') +
      fromCents(amount, '-').padStart(maxAmount, ' ') +
      '  ' + normalizeTag(tag).padEnd(8, ' ')
  })
}

function sort (expenses) {
  return expenses
    .sort((a, b) => (
      // old dates first.
      a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    ))
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

// function percent (amount, of) {
//   return (amount / 100) * of
// }

module.exports = {
  dailyBudget,
  DATE: /^\d\d?(-\d\d?(-\d{4})?)?$/,
  div,
  flagsInits,
  flattenCommands,
  fromCents,
  handleErr,
  normalizeInterval,
  normalizeOffset,
  normalizePeriodicsInterval,
  normalizeTag,
  oneFlagOf,
  // percent,
  periodicWithTag,
  prettify,
  sort,
  toCents,
  totalAmount
}
