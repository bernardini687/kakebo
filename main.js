#!/usr/bin/env node

require('./lib/router').dispatch(require('minimist')(process.argv.slice(2)))
