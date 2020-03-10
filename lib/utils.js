module.exports = {
  handleErr (err) {
    console.error(err)
    process.exit(1)
  },

  normalizeInterval (interval) {
    switch (interval.toLowerCase()) {
      case 'd': return 'day'
      case 'w': return 'week'
      case 'm': return 'month'
      case 'y': return 'year'
      default: return 'month' // could we ever go here?
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
  }
}
