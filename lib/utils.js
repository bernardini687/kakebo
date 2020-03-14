const moment = require('moment')

module.exports = {
  handleErr (err) {
    console.error(err)
    process.exit(1)
  },

  flattenCommands (noOpts) {
    return noOpts.map(x => x.toString().trim()).join()
  },

  // just care about the first letter.
  flagsInits (opts) {
    return Object.keys(opts).map(flag => flag[0])
  },

  // return the found flag between a String of valid values, otherwise `false`.
  oneFlagOf: function (valids, flags) {
    switch (flags.length) {
      case 1: return (
        valids.split('').includes(flags[0])
          ? flags[0]
          : false
      )
      default: return false
    }
  },

  periodicWithTagFlags (flags) {
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
  },

  normalizeInterval (interval) {
    switch (interval) {
      case 'd': return 'day'
      case 'w': return 'week'
      case 'm': return 'month'
      case 'y': return 'year'
    }
  },

  normalizeOffset (offset) {
    if (offset === true) {
      offset = 0
    }
    if (offset < 0) {
      offset = -(offset)
    }
    return offset
  },

  totalAmount (entries) {
    return entries.reduce((tot, { amount }) => {
      tot += amount
      return tot
    }, 0)
  },

  prettify (entries) {
    return entries.map(({ date, amount, ...fields }) => ({
      date: moment(date).format('dddd, D MMM Y'),
      amount: -(Number.parseFloat(amount) / 100).toFixed(2), // use nicePrice()!
      ...fields
    }))
  },

  nicePrice (amount) {
    return (Number.parseFloat(amount) / 100).toFixed(2)
  }
}
