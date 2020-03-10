#!/usr/bin/env node

const parseArgv = require('minimist')
const router = require('./lib/router')

const argv = process.argv.slice(2)
console.log('[DEBUG] argv', argv)

const parsed = parseArgv(argv)
console.log('[DEBUG] parsed', parsed)

router.dispatch(parsed)

// require('./lib/loader').then(data => console.table(data))
