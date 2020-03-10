module.exports = (offset, interval) => {
  return `offset: ${offset}, interval: ${interval}`
} // why does it breaks if this is undefined?

/*
  1, d -> yesterday

  true, d -> today

  0, d -> today

  3, m -> 3 months ago

  1, y -> 2019

  -3, y -> 2017

  .9, y -> 2019
*/

// function applyFilter1 (entries, filter) {
//   return entries // 8 days ago.
//     .filter(entry => entry.date)
//     .filter(expense => moment(expense.date).dayOfYear() === filter(8, 'd').dayOfYear())
// }
