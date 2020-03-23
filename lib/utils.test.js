/* eslint-env mocha */

const { strictEqual: assertEqual } = require('assert')
const { toCents, div } = require('./utils')

describe('toCents', () => {
  it('works with numbers', async () => {
    const expected = toCents(9.2, 'negative')
    assertEqual(-920, expected)
  })

  it('works with strings', async () => {
    const expected = toCents('-9.20', 'negative')
    assertEqual(-920, expected)
  })

  it('does not consider input\'s sign', async () => {
    const expected = toCents(-9.20, 'positive')
    assertEqual(920, expected)
  })

  it('defaults to positive', async () => {
    const expected = toCents('9.2')
    assertEqual(920, expected)
  })
})

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
