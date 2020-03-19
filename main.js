#!/usr/bin/env node

// const parsed = require('minimist')(process.argv.slice(2))
const parseArgv = require('minimist')
const router = require('./lib/router')

const argv = process.argv.slice(2)
const parsed = parseArgv(argv)
console.log('[DEBUG] argv, parsed:', [argv, parsed])

router.dispatch(parsed)
