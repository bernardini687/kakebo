/* eslint-env mocha */

const assert = require('assert')
const parseArgv = require('minimist')
const router = require('../lib/router')
const sinon = require('sinon')

describe('read actions', async () => {
  // ['--meow=foo'], // calls READ usage
  // [] // calls handleError with READ usage

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
})
