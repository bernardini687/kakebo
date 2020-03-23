/* eslint-env mocha */

const { strictEqual: assertEqual } = require('assert')
const { div, toCents, totalAmount } = require('./utils')

const testData = {
  periodics: [
    {
      amount: 130000,
      interval: 'M'
    },
    {
      amount: -35000,
      interval: 'M'
    },
    {
      amount: -7800,
      interval: 'M'
    },
    {
      amount: -3200,
      interval: 'Y'
    }
  ],
  expenses: [
    { amount: -100 },
    { amount: -100 },
    { amount: -100 }
  ]
}

describe('div', () => {
  it('ceils a positive number', async () => {
    const expected = div(9200, 12)
    assertEqual(767, expected)
  })

  it('ceils a negative number', async () => {
    const expected = div(-9200, 12)
    assertEqual(-767, expected)
  })

  it('returns 0', async () => {
    const expected = div(0, 12)
    assertEqual(0, expected)
  })
})

describe('toCents', () => {
  it('works with numbers', async () => {
    const expected = toCents(9.2, 'negative')
    assertEqual(-920, expected)
  })

  it('works with strings', async () => {
    const expected = toCents('-9.20', 'negative')
    assertEqual(-920, expected)
  })

  it('is sign insensitive', async () => {
    const expected = toCents(-9.20, 'positive')
    assertEqual(920, expected)
  })

  it('defaults to positive', async () => {
    const expected = toCents('9.2')
    assertEqual(920, expected)
  })
})

describe('totalAmount', async () => {
  it('works with periodics', async () => {
    const expected = totalAmount(testData.periodics)
    assertEqual(86933, expected)
  })

  it('works with expenses', async () => {
    const expected = totalAmount(testData.expenses)
    assertEqual(-300, expected)
  })
})
