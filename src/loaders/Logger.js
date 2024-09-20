'use strict'

const winston = require('winston')

// Create logger
const LoggerInstance = winston.createLogger({
  defaultMeta: { service: 'user-service' },
  format: winston.format.json(),
  level: 'info',
  transports: [
    // Write all logs with level 'info' and below to 'combined.log'
    // Write all logs error (and below) to 'error.log'
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

module.exports = LoggerInstance
