/* eslint-env mocha */

const moment = require('moment')
const assert = require('assert')
const { genDate } = require('./date')

describe('genDate', () => {
  let expected
  beforeEach(() => {
    expected = moment()
  })

  it('generates a date when given D', async () => {
    const result = genDate('1')
    expected.date('1')
    assert.strictEqual(true, result.isSame(expected, 'day'))
  })

  it('generates a date when given DD', async () => {
    const result = genDate('01')
    expected.date(1)
    assert.strictEqual(true, result.isSame(expected, 'day'))
  })

  it('generates a date when given D-M', async () => {
    const result = genDate('1-1')
    expected.date(1).month(0)
    assert.strictEqual(true, result.isSame(expected, 'day'))
  })

  it('generates a date when given D-MM-YYYY', async () => {
    const result = genDate('1-01-2019')
    expected.date(1).month(0).year(2019)
    assert.strictEqual(true, result.isSame(expected, 'day'))
  })

  it('generates current date when given nothing', async () => {
    const result = genDate()
    assert.strictEqual(true, result.isSame(expected, 'day'))
  })

  it.skip('does not generate a date in the future', async () => {
    genDate('1-03')
  })

  it.skip('does not generate a date in the future', async () => {
    genDate('1-02-2021')
  })
})
