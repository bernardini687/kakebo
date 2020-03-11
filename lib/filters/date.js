const moment = require('moment')
const { normalizeOffset, normalizeInterval } = require('../utils')

const filters = {
  dateFilter (offset, interval, from) {
    offset = normalizeOffset(offset)
    interval = normalizeInterval(interval)

    // if from is undefined, moment gives current date.
    const start = moment(from).subtract(offset, interval).startOf(interval)
    const end = moment(from).subtract(offset, interval).endOf(interval)

    return [start, end]
  },

  apply (data, filter, ...filterParams) {
    const [offset, interval, from] = filterParams
    const [start, end] = filter(offset, interval, from)
    return data.expenses
      .filter(expense =>
        moment(expense.date).isBetween(start, end)
      )
  }
}

module.exports = filters
