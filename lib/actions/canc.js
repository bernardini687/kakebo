const db = require('../store')

module.exports = (opts) => {
  if (opts.e) {
    db.pop('expenses')
  } else if (opts.p) {
    db.pop('periodics')
  }
  // failure(man.cancHelp)
}
