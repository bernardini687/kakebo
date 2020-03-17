const moment = require('moment')

const utils = {
  genDate (date) {
    const now = moment()

    if (typeof date === 'undefined') {
      return now
    }

    const [d, m = now.month() + 1, y = now.year()] = date
      .split('-')
      .map(n => parseInt(n))

    return moment().date(d).month(m - 1).year(y)
  }
}

module.exports = utils
