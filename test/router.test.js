/* eslint-env mocha */

const assert = require('assert')
const man = require('../lib/help')
const parseArgv = require('minimist')
const router = require('../lib/router')
const sinon = require('sinon')

describe('read actions', async () => {
  describe('monthly options', async () => {
    beforeEach(async () => {
      sinon.spy(router, 'readMonth')
    })

    afterEach(async () => {
      sinon.restore()
    })

    it('calls `readMonth` with `true` when given `-m`', async () => {
      router.dispatch(parseArgv(['-m']))
      const readMonthSpy = router.readMonth.getCall(0)

      assert.strictEqual(true, readMonthSpy.calledWithExactly(true))
    })

    it('calls `readMonth` with `1` when given `--month 1`', async () => {
      router.dispatch(parseArgv(['--month', '1']))
      const readMonthSpy = router.readMonth.getCall(0)

      assert.strictEqual(true, readMonthSpy.calledWithExactly(1))
    })

    it('calls `readMonth` with `-1` when given `--meow=-1`', async () => {
      router.dispatch(parseArgv(['--meow=-1']))
      const readMonthSpy = router.readMonth.getCall(0)

      assert.strictEqual(true, readMonthSpy.calledWithExactly(-1))
    })
  })

  describe('invalid options', async () => {
    beforeEach(async () => {
      sinon.stub(router, 'err').callsFake(() => null)
    })

    afterEach(async () => {
      sinon.restore()
    })

    it('shows help when given nothing', async () => {
      router.dispatch({ _: [] })
      const errSpy = router.err.getCall(0)

      assert.strictEqual(true, errSpy.calledWithExactly(man.readHelp))
    })

    it('shows help when given more than one option', async () => {
      router.dispatch(parseArgv(['-1', '-2']))
      const errSpy = router.err.getCall(0)

      assert.strictEqual(true, errSpy.calledWithExactly(man.readHelp))
    })

    it('shows help when option\'s value is not numeric', async () => {
      router.dispatch(parseArgv(['--meow=foo']))
      const errSpy = router.err.getCall(0)

      assert.strictEqual(true, errSpy.calledWithExactly(man.readHelp))
    })
  })
})
