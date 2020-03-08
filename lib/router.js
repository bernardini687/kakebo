const { handleErr } = require('./utils')

// separate file for usage messages.
const usage = `
  kakebo
  kakebo -m
  kakebo add [opts]
  kakebo [edit | canc] n
`

const router = {
  dispatch: function ({ _: withoutOpts, ...opts }) {
    switch (withoutOpts.length) {
      // if (!opts) then read monthly
      case 0: return this.checkRead(opts)
      // if (add) also (opts), if (read) then read monthly, if (valid n) then read n, else error
      case 1: return this.foo({ withoutOpts, ...opts })
      case 2: return this.foo({ withoutOpts, ...opts }) // if (edit | canc) also (valid n), else error
      default: handleErr(usage)
    }
  },

  checkRead: function (opts) {
    const readOpts = Object.keys(opts)

    if (readOpts.length !== 1) {
      handleErr('kakebo [d | m | y [n]]')
      return
    }

    const intervalOpt = readOpts[0]

    switch (intervalOpt[0]) {
      case 'd': return this.readDay(opts[intervalOpt])
      case 'm': return this.readMonth(opts[intervalOpt])
      case 'y': return this.readYear(opts[intervalOpt])
      default: handleErr('use d, m or y!')
    }
  },

  readDay: function (val) { return `day ${val}` },
  readMonth: function (val) { return `month ${val}` },
  readYear: function (val) { return `year ${val}` },

  foo: function (bar) { console.log(bar) }
}

module.exports = router
