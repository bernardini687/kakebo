const dataCache = require('./lib/loader')

console.log(process.argv.slice(2))

dataCache.then(data => console.log(data[0]))
