const { readerPromise } = require('./modules/storer')

readerPromise()
  .then(console.log)
  .catch(console.error)
