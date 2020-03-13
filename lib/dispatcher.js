const actions = require('./actions')
// const man = require('./help')
const { handleErr } = require('./utils')

const router = {
  dispatch: function ({ _: commands, ...opts }) {
    const command = commands.map(x => x.toString().trim()).join()

    if (command === '') {
      return this.dispatchEmptyCommand(opts)
    } else if (command.match(/^\d\d?(-\d\d?(-\d{4})?)?$/)) {
      this.call('add.entry', Object.assign(opts, { date: command }))
    } else if (command.match(/^budget$/)) {
      this.call('budget', opts)
    }
  },

  dispatchEmptyCommand (opts) {

  },

  call: function (action, opts) {
    switch (action) {
      case 'add.entry': return actions.add('entry', opts)
      case 'budget': return actions.budget(opts)
    }
  },

  failure: function (msg) {
    handleErr(msg) // wrap error handling to ease sinon.
  }
}

module.exports = router
