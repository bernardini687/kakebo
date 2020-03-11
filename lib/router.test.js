/* eslint-env mocha */

const assert = require('assert')
const man = require('./help')
const parseArgv = require('minimist')
const router = require('./router')
const sinon = require('sinon')

describe('read actions', () => {
  describe('invalid options', () => {
    beforeEach(() => {
      sinon.stub(router, 'err').callsFake(() => null)
    })

    afterEach(() => {
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

    it('shows help when option\'s flag is not allowed', async () => {
      router.dispatch(parseArgv(['-x'])) // only d, w, m, y are ok!
      const errSpy = router.err.getCall(0)

      assert.strictEqual(true, errSpy.calledWithExactly(man.readHelp))
    })
  })

  describe('daily options', () => {
    beforeEach(() => {
      sinon.stub(router, 'callRead').callsFake(() => null)
    })

    afterEach(() => {
      sinon.restore()
    })

    it('calls `read` with `true` and `d` when given `-d`', async () => {
      router.dispatch(parseArgv(['-d']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(true, 'd'))
    })

    it('calls `read` with `1` and `d` when given `--day 1`', async () => {
      router.dispatch(parseArgv(['--day', '1']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(1, 'd'))
    })
  })

  describe('weekly options', () => {
    beforeEach(() => {
      sinon.stub(router, 'callRead').callsFake(() => null)
    })

    afterEach(() => {
      sinon.restore()
    })

    it('calls `read` with `true` and `w` when given `-w`', async () => {
      router.dispatch(parseArgv(['-w']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(true, 'w'))
    })

    it('calls `read` with `1` and `w` when given `--week 1`', async () => {
      router.dispatch(parseArgv(['--week', '1']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(1, 'w'))
    })
  })

  describe('monthly options', () => {
    beforeEach(() => {
      sinon.stub(router, 'callRead').callsFake(() => null)
    })

    afterEach(() => {
      sinon.restore()
    })

    it('calls `read` with `true` and `m` when given `-m`', async () => {
      router.dispatch(parseArgv(['-m']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(true, 'm'))
    })

    it('calls `read` with `1` and `m` when given `--month 1`', async () => {
      router.dispatch(parseArgv(['--month', '1']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(1, 'm'))
    })

    it('calls `read` with `-1` and `m` when given `--meow=-1`', async () => {
      router.dispatch(parseArgv(['--meow=-1']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(-1, 'm'))
    })
  })

  describe('yearly options', () => {
    beforeEach(() => {
      sinon.stub(router, 'callRead').callsFake(() => null)
    })

    afterEach(() => {
      sinon.restore()
    })

    it('calls `read` with `true` and `y` when given `-y`', async () => {
      router.dispatch(parseArgv(['-y']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(true, 'y'))
    })

    it('calls `read` with `1` and `y` when given `--year 1`', async () => {
      router.dispatch(parseArgv(['--year', '1']))
      const callReadSpy = router.callRead.getCall(0)

      assert.strictEqual(true, callReadSpy.calledWithExactly(1, 'y'))
    })
  })
})
