'use strict'

// const TokenService = require('../services/TokenService')
const messages = require('../utils/messages')
const ESignService = require('../services/ESignService')

/**
 * ESignController
 */
class ESignController {

  /**
   * Add the signatory to the document
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Callback} next Next callback
   * @returns {Response}
   */
  static addSingleSignatory (req, res, next) {
    // Add signatory
    const eSignService = new ESignService(process.env.TUIDENTIDAD_APIKEY, process.env.TUIDENTIDAD_SERVICE_URL)
    eSignService.addSingleSignatory(req.body)
    .then( resp => {
      return res.json({ status: 'success', message: 'Document signed correctly' });
    })
    .catch( error => {
      // Return Unauthorized error
      if (error.code)
        return res.status(401).send(error)
      // Return error to sign the document
      if (error.response)
        return res.status(error.response.status).send(error.response.data)
      // Return other errors
      return next(error)
    })
  }

  /**
   * Handle request to download a document
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static downloadDocument (req, res, next) {
    // Add signatory
    const eSignService = new ESignService(process.env.TUIDENTIDAD_APIKEY, process.env.TUIDENTIDAD_SERVICE_URL)
    eSignService.downloadDocument(req.body.identifier)
    .then( response => {
      // Response
      return res.json(response.data);
    })
    .catch( error => {
      // Return Unauthorized error
      if (error.code)
        return res.status(401).send(error)
      // Return error to sign the document
      if (error.response)
        return res.status(error.response.status).send(error.response.data)
      // Return other errors
      return next(error)
    })
  }
}

module.exports = ESignController
