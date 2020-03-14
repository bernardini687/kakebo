/* eslint-env mocha */

const assert = require('assert')
const man = require('./help')
const parseArgv = require('minimist')
const dispatcher = require('./dispatcher')
const sinon = require('sinon')

describe.skip('failures', () => {
  beforeEach(() => {
    sinon.stub(dispatcher, 'failure').callsFake(() => null)
  })
  afterEach(() => {
    sinon.restore()
  })

  it('shows help when given nothing', async () => {
    dispatcher.dispatch({ _: [] })
    const failureSpy = dispatcher.failure.getCall(0)

    assert.strictEqual(true, failureSpy.calledWithExactly(man.readHelp))
  })
})

describe('actions', () => {
  describe('add', () => {
    beforeEach(() => {
      sinon.stub(dispatcher, 'call').callsFake(() => null)
    })
    afterEach(() => {
      sinon.restore()
    })

    it('calls add for a new income', async () => {
      dispatcher.dispatch(parseArgv(['-M', '780']))
      const opts = { M: 780, tag: 'income' }

      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('add.periodics', opts))
    })

    it('calls add for a new periodic', async () => {
      dispatcher.dispatch(parseArgv(['-Y=200', '-b']))
      const opts = { Y: 200, b: true }

      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('add.periodics', opts))
    })

    it('calls add for a new entry', async () => {
      dispatcher.dispatch(parseArgv(['-l', '3']))
      const opts = { l: 3 }

      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('add.entries', opts))
    })

    it('calls add for a new entry with date', async () => {
      dispatcher.dispatch(parseArgv(['10', '-b', '3']))
      const opts = { date: '10', b: 3 }

      const call = dispatcher.call.getCall(0)

      assert.strictEqual(true, call.calledWithExactly('add.entries', opts))
    })
  })

  describe('budget', () => {
    beforeEach(() => {
      sinon.stub(dispatcher, 'call').callsFake(() => null)
    })
    afterEach(() => {
      sinon.restore()
    })

    it('calls budget without options', async () => {
      dispatcher.dispatch(parseArgv(['budget']))
      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('budget', {}))
    })

    it('calls budget with dirty input', async () => {
      dispatcher.dispatch(parseArgv([' budget ']))
      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('budget', {}))
    })

    it('calls budget with valid shortcut', async () => {
      dispatcher.dispatch(parseArgv(['budget', '-m']))
      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('budget', { m: true }))
    })

    it('calls budget with full option', async () => {
      dispatcher.dispatch(parseArgv(['budget', '--day']))
      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('budget', { day: true }))
    })
  })
})
