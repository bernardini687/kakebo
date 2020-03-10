module.exports = (offset, interval) => {
  return `offset: ${offset}, interval: ${interval}`
}

/*
  1, d -> yesterday

  true, d -> today

  0, d -> today

  3, m -> 3 months ago

  1, y -> 2019

  -3, y -> 2017

  .9, y -> 2019
*/

// function applyFilter1 (data, filter) {
//   return data.expenses // 8 days ago.
//     .filter(expense => moment(expense.date).dayOfYear() === filter(8, 'd').dayOfYear())
// }
