/* eslint-env mocha */

const { strictEqual: assertEqual } = require('assert')
const budget = require('./budget')

describe('budget action', () => {
  it('defaults to the total monthly budget', async () => {
    const expected = await budget()
    assertEqual(869.33, expected)
  })
})
