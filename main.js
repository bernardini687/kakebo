#!/usr/bin/env node

const parsed = require('minimist')(process.argv.slice(2))
const router = require('./lib/router')
router.dispatch(parsed)
