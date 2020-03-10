/* eslint-env mocha */

const assert = require('assert')
const loader = require('../../lib/loader')
const { dateFilter, apply } = require('../../lib/filters')

describe.only('filters', () => {
  let filtered

  describe('when current date is `10 march 2020`', async () => {
    const TODAY = '2020-03-10 09' // check that UTC biz.

    filtered = await loader.then(
      data => apply(data, dateFilter, 1, 'd', TODAY)
    )

    console.log('filtered:', filtered)

    it('shows yesterday\'s entries', async () => {
      assert.strictEqual('yesterday', filtered[0].tag)
    })
  })
})
