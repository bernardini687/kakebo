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
      call('add.expenses', Object.assign(opts, { date: command }))
    } else if (command.match(/^budget$/)) {
      call('budget', opts)
    } else if (command.match(/^canc$/) && oneFlagOf('pe', flags)) {
      call('canc', opts)
    }
    // failure(man.mainHelp)
  },

  dispatchEmptyCommand: function (opts) {
    const { call } = this
    const flags = flagsInits(opts)

    if (oneFlagOf('MY', flags)) {
      call('add.periodics', Object.assign(opts, { income: true }))
    } else if (periodicWithTag(flags)) {
      call('add.periodics', opts)
    } else if (oneFlagOf('bole', flags)) {
      call('add.expenses', opts)
    } else if (oneFlagOf('dwmy', flags)) {
      call('read', opts)
    }
    // failure(man.mainHelp)
  },

  call: function (meta, opts) {
    const [action, collection] = meta.split('.')
    console.log('[DEBUG] meta:', meta)

    switch (action) {
      case 'add': {
        actions.add(collection, opts)
        break
      }
      case 'budget': {
        actions.budget(opts)
        break
      }
      case 'read': {
        actions.read(opts)
        break
      }
      case 'canc': {
        actions.canc(opts)
        break
      }
    }
  },

  failure: function (msg) {
    handleErr(msg) // wrap error handling to ease sinon.
  }
}

module.exports = router
