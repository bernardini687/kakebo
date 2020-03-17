const actions = require('./actions')
// const man = require('./help')
const {
  DATE,
  flagsInits,
  flattenCommands,
  handleErr,
  oneFlagOf,
  periodicWithTag
} = require('./utils')

const router = {
  dispatch: function ({ _: noOpts, ...opts }) {
    const { call } = this
    const command = flattenCommands(noOpts)
    const flags = flagsInits(opts)

    if (command === '') {
      return this.dispatchEmptyCommand(opts)
    } else if (command.match(DATE) && oneFlagOf('bole', flags)) {
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
    } else if (periodicWithTag(flags)) {
      call('add.periodics', opts)
    } else if (oneFlagOf('bole', flags)) {
      call('add.entries', opts)
    } else if (oneFlagOf('dwmy', flags)) {
      call('read', opts)
    }
    // failure(man.mainHelp)
  },

  call: function (meta, opts) {
    const [action, location] = meta.split('.')
    console.log(meta)

    switch (action) {
      case 'add': return actions.add(location, opts)
      case 'budget': return actions.budget(opts)
      case 'read': return actions.read(opts)
    }
  },

  failure: function (msg) {
    handleErr(msg) // wrap error handling to ease sinon.
  }
}

module.exports = router
