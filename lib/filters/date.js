const moment = require('moment')
const { normalizeOffset, normalizeInterval } = require('../utils')

const filters = {
  dateFilter (offset, interval, from) {
    const date = (from)
      ? moment(from)
      : moment()

    offset = normalizeOffset(offset)

    return date.subtract(offset, interval).get(interval)
  },

  apply (data, filter, ...filterParams) {
    const [offset, interval, from] = filterParams
    const i = normalizeInterval(interval)

    return data.expenses
      .filter(expense =>
        moment(expense.date).get(i) === filter(offset, i, from)
      )
  }
}

module.exports = filters
