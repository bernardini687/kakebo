/* eslint-env mocha */

const assert = require('assert')
const loader = require('../loader') // to load `mocks.json`.
const { dateFilter, apply } = require('./date')
const { totalAmount } = require('../utils')

describe('filters', () => {
  describe('when current date is `10 March 2020`', () => {
    const TODAY = '2020-03-10 09' // check that UTC biz.

    describe('shows yesterday\'s entries', () => {
      it('when given `1` and `d`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, 1, 'd', TODAY)
        )

        assert.strictEqual('yesterday', filtered[0].tag)
        assert.strictEqual(1, filtered.length)
      })

      it('when given `-1` and `D`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, -1, 'D', TODAY)
        )

        assert.strictEqual('yesterday', filtered[0].tag)
        assert.strictEqual(1, filtered.length)
      })
    })

    describe('shows todays\'s entries', () => {
      // can we end up here with a 0?
      it('when given `0` and `d`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, 0, 'd', TODAY)
        )
        // try two tuesdays.
        assert.strictEqual('today', filtered[0].tag)
        assert.strictEqual(1, filtered.length)
      })

      it('when given `true` and `d`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, true, 'd', TODAY)
        )

        assert.strictEqual('today', filtered[0].tag)
        assert.strictEqual(1, filtered.length)
      })
    })

    describe('shows entries from 2018', () => {
      it('when given `2` and `y`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, 2, 'y', TODAY)
        )

        assert.strictEqual(-300, totalAmount(filtered))
        assert.strictEqual(2, filtered.length)
      })

      it('restricts to March when given `24` and `m`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, 24, 'm', TODAY)
        )

        assert.strictEqual('mar 2018', filtered[0].tag)
        assert.strictEqual(1, filtered.length)
      })
    })

    describe('shows weekly entries', () => {
      it('restricts to last week when given `1` and `w`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, 1, 'w', TODAY)
        )

        assert.strictEqual(-1300, totalAmount(filtered))
        assert.strictEqual(2, filtered.length)
      })

      it('finds nothing from 2 weeks ago', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, 2, 'w', TODAY)
        )

        assert.strictEqual(0, filtered.length)
      })
    })
  })
})
