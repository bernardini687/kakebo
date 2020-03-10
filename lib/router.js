const actions = require('./actions')
const man = require('./help')
const { handleErr } = require('./utils')

const router = {
  dispatch: function ({ _: withoutOpts, ...opts }) {
    switch (withoutOpts.length) {
      case 0: return this.checkRead(opts)
      case 1: return this.foo({ withoutOpts, ...opts }) // if (add) also (opts), if (read) then read monthly, if (valid n) then read n, else error
      case 2: return this.foo({ withoutOpts, ...opts }) // if (edit | canc) also (valid n), else error
      default: this.err(man.mainHelp)
    }
  },

  checkRead: function (opts) {
    const readOpts = Object.keys(opts)
    const intervalOpt = readOpts[0]
    const offset = opts[intervalOpt]

    if (readOpts.length !== 1) {
      this.err(man.readHelp) // too many options given!
      return // just in case.
    }

    if (!['number', 'boolean'].includes(typeof offset)) {
      this.err(man.readHelp) // invalid offset!
      return
    }

    // just care about the first letter.
    const intervalFlag = intervalOpt[0]

    if ('dwmy'.split('').includes(intervalFlag)) {
      this.callRead(offset, intervalFlag)
    } else {
      this.err(man.readHelp) // invalid flag!
    }
  },

  callRead: function (offset, intervalFlag) {
    actions.read(offset, intervalFlag)
  },

  err: function (msg) {
    handleErr(msg) // wrap error handling to ease sinon.
  },

  // WIP
  foo: function (bar) { console.log(bar) }
}

module.exports = router
