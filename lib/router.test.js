/* eslint-env mocha */

const man = require('./help')
const parseArgv = require('minimist')
const router = require('./router')
const sinon = require('sinon')
const { strictEqual: assertEqual } = require('assert')

describe.skip('failures', () => {
  beforeEach(() => {
    sinon.stub(router, 'failure').callsFake(() => null)
  })
  afterEach(() => {
    sinon.restore()
  })

  it('shows help when given nothing', async () => {
    router.dispatch({ _: [] })
    const failureSpy = router.failure.getCall(0)

    assertEqual(true, failureSpy.calledWithExactly(man.readHelp))
  })
})

describe('actions', () => {
  beforeEach(() => {
    sinon.stub(router, 'call').callsFake(() => null)
  })
  afterEach(() => {
    sinon.restore()
  })

  describe('add', () => {
    describe('periodics', () => {
      it('calls add for a new income', async () => {
        router.dispatch(parseArgv(['-M', '780']))
        const opts = { M: 780, income: true }

        const callSpy = router.call.getCall(0)

        assertEqual(true, callSpy.calledWithExactly('add.periodics', opts))
      })

      it('calls add for a new periodic', async () => {
        router.dispatch(parseArgv(['-Y=200', '-b']))
        const opts = { Y: 200, b: true }

        const callSpy = router.call.getCall(0)

        assertEqual(true, callSpy.calledWithExactly('add.periodics', opts))
      })
    })

    describe('expenses', () => {
      it('calls add for a new entry', async () => {
        router.dispatch(parseArgv(['-l', '2.99']))
        const opts = { l: 2.99 }

        const callSpy = router.call.getCall(0)

        assertEqual(true, callSpy.calledWithExactly('add.expenses', opts))
      })

      it('calls add for a new entry with date', async () => {
        router.dispatch(parseArgv(['10', '-b', '2.99']))
        const opts = { date: '10', b: 2.99 }

        const call = router.call.getCall(0)

        assertEqual(true, call.calledWithExactly('add.expenses', opts))
      })

      it('calls add for a new entry with day-month', async () => {
        router.dispatch(parseArgv(['10-3', '-b', '2.99']))
        const opts = { date: '10-3', b: 2.99 }

        const call = router.call.getCall(0)

        assertEqual(true, call.calledWithExactly('add.expenses', opts))
      })

      it('calls add for a new entry with full date', async () => {
        router.dispatch(parseArgv(['10-03-2020', '-b', '2.99']))
        const opts = { date: '10-03-2020', b: 2.99 }

        const call = router.call.getCall(0)

        assertEqual(true, call.calledWithExactly('add.expenses', opts))
      })

      it.skip('does not call add with invalid date', async () => {
        // debug!
        router.dispatch(parseArgv(['10.', '-b', '2.99']))
        assertEqual(true, router.call.notCalled)
      })
    })

    it('does not call add with invalid option', async () => {
      router.dispatch(parseArgv(['--foo']))
      assertEqual(true, router.call.notCalled)
    })

    it('does not call add with too many options', async () => {
      router.dispatch(parseArgv(['-Mdb']))
      assertEqual(true, router.call.notCalled)
    })

    it('does not call add with invalid pair of options', async () => {
      router.dispatch(parseArgv(['M', '-m']))
      assertEqual(true, router.call.notCalled)
    })
  })

  describe('budget', () => {
    it('calls budget without options', async () => {
      router.dispatch(parseArgv(['budget']))
      const callSpy = router.call.getCall(0)

      assertEqual(true, callSpy.calledWithExactly('budget', {}))
    })

    it('calls budget with dirty input', async () => {
      router.dispatch(parseArgv([' budget ']))
      const callSpy = router.call.getCall(0)

      assertEqual(true, callSpy.calledWithExactly('budget', {}))
    })

    it('calls budget with valid shortcut', async () => {
      router.dispatch(parseArgv(['budget', '-m']))
      const callSpy = router.call.getCall(0)

      assertEqual(true, callSpy.calledWithExactly('budget', { m: true }))
    })

    it('calls budget with full option', async () => {
      router.dispatch(parseArgv(['budget', '--day']))
      const callSpy = router.call.getCall(0)

      assertEqual(true, callSpy.calledWithExactly('budget', { day: true }))
    })

    it('does not call budget with invalid command', async () => {
      router.dispatch(parseArgv(['budgets']))
      assertEqual(true, router.call.notCalled)
    })
  })

  describe('read', () => {
    it('calls read with valid shortcut', async () => {
      router.dispatch(parseArgv(['-m']))
      const opts = { m: true }

      const callSpy = router.call.getCall(0)

      assertEqual(true, callSpy.calledWithExactly('read', opts))
    })

    it('calls read with full option', async () => {
      router.dispatch(parseArgv(['--day', '3']))
      const opts = { day: 3 }

      const callSpy = router.call.getCall(0)

      assertEqual(true, callSpy.calledWithExactly('read', opts))
    })

    it('does not call read with invalid option', async () => {
      router.dispatch(parseArgv(['--foo']))
      assertEqual(true, router.call.notCalled)
    })
  })

  describe('edit', () => {})

  describe('canc', () => {})
})
