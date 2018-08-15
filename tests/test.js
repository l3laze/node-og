'use strict'

const og = require('../src/index.js')({
  logPath: __dirname
})

og.enable(process.stdout)

console.info('Hi!')
console.debug('Hmm')
console.log('Whoa')

og.disable(process.stdout)

og.enable(process.stderr)

console.error('Oops..')
console.warn('Uh-oh')

og.disable(process.stderr)
