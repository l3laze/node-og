'use strict'

const { appendFileSync } = require('fs')
const pjoin = require('path').join
const debug = require('ebug')('og')

function verifyOptions (opts = {}) {
  // debug('Options -- before\n\t%j', opts)

  opts.logPath = typeof opts.logPath !== 'undefined' ? opts.logPath : pjoin(__dirname, 'logs')
  opts.logFile = typeof opts.logFile !== 'undefined' ? opts.logFile : 'log.txt'
  // opts.encoding = typeof opts.encoding !== 'undefined' ? opts.encoding : 'utf8'

  // debug('Options -- after\n\t%j', opts)

  return opts
}

module.exports = function (opts) {
  const module = {}
  const options = verifyOptions(opts)
  let oldStream
  let ignorePatterns = [
    /\+(\d)+ms/
  ]

  module.enable = function enable (stream) {
    debug('Enabling og')

    let i
    oldStream = stream

    stream.write = (function (write) {
      return function (string, encoding, fd) {
        write.apply(oldStream, arguments)

        for (i = 0; i < ignorePatterns.length; i++) {
          if (ignorePatterns[ i ].test(string) === false) {
            // debug('Logging line: %s', string)

            try {
              appendFileSync(pjoin(options.logPath, options.logFile), string)
            } catch (err) {
              console.error(err)
              process.exit(1)
            }
          }
        }
      }
    }(stream.write))
  }

  module.disable = function disable (stream) {
    debug('Disabling og')
    stream.write = oldStream.write
  }

  module.ignoreLinesLike = function (patterns, append) {
    if (append) {
      ignorePatterns.concat(patterns)
    } else {
      ignorePatterns = patterns
    }
  }

  return module
}
