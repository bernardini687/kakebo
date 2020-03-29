const db = require('../store')

module.exports = (opts) => {
  if (opts.e) {
    db.pop('expenses')
  } else if (opts.p) {
    db.pop('periodics')
  } else if (opts.i) {
    db.pop('income')
  }
  // failure(man.cancHelp)
}
