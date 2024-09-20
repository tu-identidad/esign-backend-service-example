'use strict'

class ServiceError extends Error {
  constructor (code, message, url, statusCode) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.message = message
    this.url = url
    this.statusCode = statusCode
  }

  toJson () {
    return {
      code: this.code,
      message: this.message,
      url: this.url
    }
  }
}

module.exports = ServiceError
