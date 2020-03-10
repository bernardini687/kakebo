/* eslint-env mocha */

const assert = require('assert')
const loader = require('../../lib/loader') // to load `kakebo.fake.json`.
const { dateFilter, apply } = require('../../lib/filters')

describe('filters', () => {
  describe('when current date is `10 march 2020`', () => {
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
      it('when given `0` and `d`', async () => {
        const filtered = await loader.then(
          data => apply(data, dateFilter, 0, 'd', TODAY)
        )

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
  })
})
