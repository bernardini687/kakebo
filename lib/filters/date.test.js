/* eslint-env mocha */

const { data } = require('../store') // to load `mocks.json`.
const { dateFilter, apply } = require('./date')
const { strictEqual: assertEqual } = require('assert')
const { totalAmount } = require('../utils')

describe('filters', () => {
  describe('when current date is "10 March 2020"', () => {
    const TODAY = '2020-03-10' // check that UTC biz.

    describe('shows yesterday\'s entries', () => {
      it('when given (1, d)', async () => {
        const filtered = apply(data.expenses, dateFilter, 1, 'd', TODAY)

        assertEqual('yesterday', filtered[0].tag)
        assertEqual(1, filtered.length)
      })

      it('when given (-1, d)', async () => {
        const filtered = apply(data.expenses, dateFilter, -1, 'd', TODAY)

        assertEqual('yesterday', filtered[0].tag)
        assertEqual(1, filtered.length)
      })
    })

    describe('shows todays\'s entries', () => {
      it('when given (0, d)', async () => {
        const filtered = apply(data.expenses, dateFilter, 0, 'd', TODAY)
        // try two tuesdays.
        assertEqual('today', filtered[0].tag)
        assertEqual(1, filtered.length)
      })

      it('when given (true, d)', async () => {
        const filtered = apply(data.expenses, dateFilter, true, 'd', TODAY)

        assertEqual('today', filtered[0].tag)
        assertEqual(1, filtered.length)
      })
    })

    describe('shows entries from 2018', () => {
      it('when given (2, y)', async () => {
        const filtered = apply(data.expenses, dateFilter, 2, 'y', TODAY)

        assertEqual(-300, totalAmount(filtered))
        assertEqual(2, filtered.length)
      })

      it('restricts to March 2018 when given (24, m)', async () => {
        const filtered = apply(data.expenses, dateFilter, 24, 'm', TODAY)

        assertEqual('mar 2018', filtered[0].tag)
        assertEqual(1, filtered.length)
      })
    })

    describe('shows weekly entries', () => {
      it('restricts to last week when given (1, w)', async () => {
        const filtered = apply(data.expenses, dateFilter, 1, 'w', TODAY)

        assertEqual(-1300, totalAmount(filtered))
        assertEqual(2, filtered.length)
      })

      it('finds nothing from 2 weeks ago', async () => {
        const filtered = apply(data.expenses, dateFilter, 2, 'w', TODAY)

        assertEqual(0, filtered.length)
      })
    })
  })
})
