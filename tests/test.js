'use strict'

const og = require('../src/index.js')({
  logPath: __dirname
})

og.enable(process.stdout)
og.enable(process.stderr)

console.info('Hi!')
console.debug('Hmm')
console.log('Whoa')
console.error('Oops..')
console.warn('Uh-oh')
