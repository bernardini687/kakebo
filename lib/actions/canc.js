const db = require('../simpleStore')

module.exports = (opts) => {
  if (opts.e) {
    db.pop('expenses')
  } else if (opts.p) {
    db.pop('periodics')
  }
  console.log('[DEBUG] db.read:', db.read)
  // failure(man.cancHelp)
}
