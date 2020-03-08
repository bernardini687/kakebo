const { handleErr } = require('./utils')
const man = require('./help')

const router = {
  dispatch: function ({ _: withoutOpts, ...opts }) {
    switch (withoutOpts.length) {
      // if (!opts) then read monthly
      case 0: return this.checkRead(opts)
      // if (add) also (opts), if (read) then read monthly, if (valid n) then read n, else error
      case 1: return this.foo({ withoutOpts, ...opts })
      case 2: return this.foo({ withoutOpts, ...opts }) // if (edit | canc) also (valid n), else error
      default: this.err(man.mainHelp)
    }
  },

  checkRead: function (opts) {
    const readOpts = Object.keys(opts)
    const intervalOpt = readOpts[0]
    const optValue = opts[intervalOpt]

    if (readOpts.length !== 1) {
      this.err(man.readHelp)
      return // just in case.
    }

    if (!['number', 'boolean'].includes(typeof optValue)) {
      this.err(man.readHelp)
      return
    }

    // just care about the first letter.
    switch (intervalOpt[0]) {
      case 'd': return this.readDay(optValue)
      case 'm': return this.readMonth(optValue)
      case 'y': return this.readYear(optValue)
      default: this.err(man.readHelp)
    }
  },

  readDay: function (val) { return `day ${val}` },
  readMonth: function (val) { return `month ${val}` },
  readYear: function (val) { return `year ${val}` },

  err: function (msg) { handleErr(msg) }, // wrap error handling to ease tests.

  foo: function (bar) { console.log(bar) }
}

module.exports = router
