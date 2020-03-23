/* eslint-env mocha */

const budget = require('./budget')
const { strictEqual: assertEqual } = require('assert')

describe('budget action', () => {
  it('defaults to the total monthly budget', async () => {
    const expected = budget()
    assertEqual(869.33, expected)
  })
})
