/* eslint-env mocha */

const { strictEqual: assertEqual } = require('assert')
const budget = require('./budget')
const { totalAmount } = require('../utils')

const testData = {
  periodics: [
    {
      amount: 130000,
      interval: 'M',
      tag: 'income'
    },
    {
      amount: -35000,
      interval: 'M',
      tag: 'basic'
    },
    {
      amount: -7800,
      interval: 'M',
      tag: 'basic'
    },
    {
      amount: -3200,
      interval: 'Y',
      tag: 'optional'
    }
  ]
}

describe('budget action', () => {
  it('', async () => {
    const expected = await budget()
    assertEqual(86933, expected)
  })

  it('', async () => {
    const expected = totalAmount(testData.periodics)
    assertEqual(86933, expected)
  })
})
