const moment = require('moment')

const filters = {
  dateFilter (offset, interval, from) {
    const date = (from)
      ? moment(from)
      : moment()

    offset = normalizeOffset(offset)
    // interval = normalizeInterval(interval)

    return date.subtract(offset, interval).get(interval)
  },

  apply (data, filter, ...filterParams) {
    const [offset, interval, from] = filterParams
    const i = normalizeInterval(interval)

    return data // 3 months ago.
      .filter(entry => entry.date)
      .filter(expense =>
        moment(expense.date).get(i) === filter(offset, i, from)
      )
  }
}

function normalizeInterval (interval) {
  switch (interval) {
    case 'd': return 'day'
    case 'w': return 'week'
    case 'm': return 'month'
    case 'y': return 'year'
    default: return 'month' // could we ever go here?
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

module.exports = filters
