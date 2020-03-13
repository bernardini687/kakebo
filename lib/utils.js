const moment = require('moment')

module.exports = {
  handleErr (err) {
    console.error(err)
    process.exit(1)
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
