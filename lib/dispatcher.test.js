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

describe.only('actions', () => {
  describe('add', () => {
    beforeEach(() => {
      sinon.stub(dispatcher, 'call').callsFake(() => null)
    })
    afterEach(() => {
      sinon.restore()
    })

    it.skip('calls add for a new entry', async () => {
      dispatcher.dispatch(parseArgv(['-l', '3']))
      const callSpy = dispatcher.call.getCall(0)

      assert.strictEqual(true, callSpy.calledWithExactly('add.entry', { l: 5 }))
    })

    it('calls add for a new entry with date', async () => {
      dispatcher.dispatch(parseArgv(['10', '-b', '3']))
      const call = dispatcher.call.getCall(0)

      assert.strictEqual(true, call.calledWithExactly('add.entry', { date: '10', b: 3 }))
    })

    it.skip('calls add for a new income', async () => {
      dispatcher.dispatch(parseArgv(['-M', '780']))
      const call = dispatcher.call.getCall(0)

      assert.strictEqual(true, call.calledWithExactly('add.periodic', { M: 780, tag: 'income' }))
    })

    it.skip('calls add for a new periodic', async () => {
      dispatcher.dispatch(parseArgv(['-Y=200', '-b']))
      const call = dispatcher.call.getCall(0)

      assert.strictEqual(true, call.calledWithExactly('add.periodic', { Y: 200, b: true }))
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
      const call = dispatcher.call.getCall(0)

      assert.strictEqual(true, call.calledWithExactly('budget', {}))
    })

    it('calls budget with valid shortcut', async () => {
      dispatcher.dispatch(parseArgv(['budget', '-m']))
      const call = dispatcher.call.getCall(0)

      assert.strictEqual(true, call.calledWithExactly('budget', { m: true }))
    })

    it('calls budget with full option', async () => {
      dispatcher.dispatch(parseArgv(['budget', '--day']))
      const call = dispatcher.call.getCall(0)

      assert.strictEqual(true, call.calledWithExactly('budget', { day: true }))
    })
  })
})
