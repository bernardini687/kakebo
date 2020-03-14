const actions = require('./actions')
// const man = require('./help')
const {
  flagsInits,
  flattenCommands,
  handleErr,
  oneFlagOf,
  periodicWithTagFlags
} = require('./utils')

const router = {
  dispatch: function ({ _: noOpts, ...opts }) {
    const { call } = this
    const command = flattenCommands(noOpts)

    if (command === '') {
      return this.dispatchEmptyCommand(opts)
    } else if (command.match(/^\d\d?(-\d\d?(-\d{4})?)?$/)) {
      call('add.entries', Object.assign(opts, { date: command }))
    } else if (command.match(/^budget$/)) {
      call('budget', opts)
    }
    // failure(man.mainHelp)
  },

  dispatchEmptyCommand: function (opts) {
    const { call } = this
    const flags = flagsInits(opts)

    if (oneFlagOf('MY', flags)) {
      call('add.periodics', Object.assign(opts, { tag: 'income' }))
    } else if (periodicWithTagFlags(flags)) {
      call('add.periodics', opts)
    } else if (oneFlagOf('bole', flags)) {
      call('add.entries', opts)
    }
    // failure(man.mainHelp)
  },

  call: function (meta, opts) {
    const [action, location] = meta

    switch (action) {
      case 'add': return actions.add(location, opts)
      case 'budget': return actions.budget(opts)
    }
  },

  failure: function (msg) {
    handleErr(msg) // wrap error handling to ease sinon.
  }
}

module.exports = router
